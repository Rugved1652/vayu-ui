import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { allEntries } from '../packages/registry/src/entries.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = join(root, 'packages/ui/src');
const pkg = JSON.parse(readFileSync(join(root, 'packages/ui/package.json'), 'utf8'));
const versions = { ...pkg.peerDependencies, ...pkg.dependencies, ...pkg.optionalDependencies };
const slash = (path: string) => path.replaceAll('\\', '/');
const filesIn = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? filesIn(join(dir, entry.name))
      : /\.tsx?$/.test(entry.name)
        ? [slash(relative(sourceRoot, join(dir, entry.name)))]
        : [],
  );
const owners = new Map<string, string>();
const seeds = new Map(
  allEntries.map((entry) => {
    const files =
      entry.type === 'component'
        ? filesIn(join(sourceRoot, 'components', entry.directoryName))
        : [`hooks/${entry.fileName}`];
    for (const file of files) owners.set(file, entry.slug);
    return [entry.slug, files];
  }),
);
for (const component of readdirSync(join(sourceRoot, 'components'), { withFileTypes: true }).filter(
  (entry) => entry.isDirectory(),
)) {
  if (
    !allEntries.some(
      (entry) => entry.type === 'component' && entry.directoryName === component.name,
    )
  )
    throw new Error(`Unregistered component: ${component.name}`);
}
for (const hook of readdirSync(join(sourceRoot, 'hooks')).filter((name) =>
  /^use.*\.ts$/.test(name),
)) {
  if (!allEntries.some((entry) => entry.type === 'hook' && entry.fileName === hook))
    throw new Error(`Unregistered hook: ${hook}`);
}
const manifest: Record<
  string,
  {
    files: string[];
    registryDependencies: string[];
    npmDependencies: { name: string; version: string }[];
  }
> = {};
for (const entry of allEntries) {
  const files = new Set<string>();
  const deps = new Set<string>();
  const npm = new Set<string>();
  const walk = (file: string) => {
    if (files.has(file)) return;
    files.add(file);
    const source = readFileSync(join(sourceRoot, file), 'utf8');
    const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
    const imports: string[] = [];
    const visit = (node: ts.Node) => {
      if (
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        node.moduleSpecifier &&
        ts.isStringLiteral(node.moduleSpecifier)
      )
        imports.push(node.moduleSpecifier.text);
      if (
        ts.isImportTypeNode(node) &&
        ts.isLiteralTypeNode(node.argument) &&
        ts.isStringLiteral(node.argument.literal)
      )
        imports.push(node.argument.literal.text);
      if (
        ts.isCallExpression(node) &&
        node.expression.kind === ts.SyntaxKind.ImportKeyword &&
        node.arguments[0] &&
        ts.isStringLiteral(node.arguments[0])
      )
        imports.push(node.arguments[0].text);
      ts.forEachChild(node, visit);
    };
    visit(ast);
    for (const spec of imports) {
      if (!spec.startsWith('.')) {
        const name = spec.startsWith('@')
          ? spec.split('/').slice(0, 2).join('/')
          : spec.split('/')[0];
        if (!['react', 'react-dom'].includes(name)) npm.add(name);
        continue;
      }
      const base = resolve(sourceRoot, dirname(file), spec.replace(/\.js$/, ''));
      const target = [
        base,
        `${base}.ts`,
        `${base}.tsx`,
        join(base, 'index.ts'),
        join(base, 'index.tsx'),
      ].find((p) => existsSync(p) && /\.tsx?$/.test(p));
      if (!target) throw new Error(`Unresolved source import ${file}: ${spec}`);
      const path = slash(relative(sourceRoot, target));
      const owner = owners.get(path);
      if (owner && owner !== entry.slug) deps.add(owner);
      walk(path);
    }
  };
  for (const file of seeds.get(entry.slug)!) walk(file);
  manifest[entry.slug] = {
    files: [...files].sort(),
    registryDependencies: [...deps].sort(),
    npmDependencies: [...npm].sort().map((name) => {
      if (!versions[name]) throw new Error(`Undeclared package ${name} used by ${entry.slug}`);
      return { name, version: versions[name] };
    }),
  };
}
const program = ts.createProgram([join(sourceRoot, 'index.ts')], {
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  module: ts.ModuleKind.ESNext,
  jsx: ts.JsxEmit.ReactJSX,
  skipLibCheck: true,
});
const checker = program.getTypeChecker();
const module = checker.getSymbolAtLocation(program.getSourceFile(join(sourceRoot, 'index.ts'))!)!;
const publicExports: Record<string, string> = {};
for (const symbol of checker.getExportsOfModule(module)) {
  const original = symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
  const file = original.declarations?.[0]?.getSourceFile().fileName;
  const owner = file && owners.get(slash(relative(sourceRoot, file)));
  if (owner) publicExports[symbol.name] = owner;
}
const output = `// Generated by scripts/registry-sources.ts. Do not edit.\nexport const sourceManifest = ${JSON.stringify(manifest, null, 2)};\nexport const publicExports: Record<string, string> = ${JSON.stringify(publicExports, null, 2)};\n`;

const target = join(root, 'packages/registry/src/source-manifest.ts');
if (process.argv.includes('--check')) {
  if (!existsSync(target) || readFileSync(target, 'utf8') !== output)
    throw new Error('Registry source manifest is stale. Run npm run registry:sync.');
} else writeFileSync(target, output);
console.log(`Validated source imports for ${allEntries.length} registry entries.`);
