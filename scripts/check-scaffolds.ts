import { mkdtempSync, mkdirSync, writeFileSync, symlinkSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import ts from 'typescript';
import { allEntries } from '../packages/registry/src/entries.js';
import { scaffoldComponent } from '../packages/mcp/src/lib/scaffold-templates/index.js';
import { installationPlan, resolveEntries } from '../packages/cli/src/utils/installer.js';
const root = mkdtempSync(join(tmpdir(), 'vayu-scaffolds-'));
try {
  symlinkSync(resolve('node_modules'), join(root, 'node_modules'), 'dir');
  const plan = installationPlan(resolveEntries(allEntries.map((entry) => entry.slug)), {
    version: 1,
    uiPath: 'src/ui',
    cssFile: null,
    tokensFile: '',
    installed: {},
  });
  for (const [path, content] of plan) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), content);
  }
  const files: string[] = [];
  const failures: string[] = [];
  mkdirSync(join(root, 'examples'));
  for (const entry of allEntries) {
    try {
      const file = `examples/${entry.slug}.tsx`;
      const result = scaffoldComponent(entry, { fromFile: file });
      writeFileSync(join(root, file), result.code);
      files.push(join(root, file));
    } catch (error) {
      failures.push(`${entry.slug}: ${error}`);
    }
  }
  const program = ts.createProgram(files, {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    jsx: ts.JsxEmit.ReactJSX,
    strict: true,
    skipLibCheck: true,
    noEmit: true,
    esModuleInterop: true,
    types: ['react', 'react-dom'],
    typeRoots: [resolve('node_modules/@types')],
  });
  const diagnostics = ts.getPreEmitDiagnostics(program);
  if (diagnostics.length)
    console.error(
      ts.formatDiagnosticsWithColorAndContext(diagnostics, {
        getCurrentDirectory: () => root,
        getCanonicalFileName: (p) => p,
        getNewLine: () => '\n',
      }),
    );
  if (failures.length) console.error(failures.join('\n'));
  if (diagnostics.length || failures.length) process.exitCode = 1;
  else
    console.log(`Type-checked ${files.length} MCP scaffolds against CLI-generated source files.`);
} finally {
  rmSync(root, { recursive: true, force: true });
}
