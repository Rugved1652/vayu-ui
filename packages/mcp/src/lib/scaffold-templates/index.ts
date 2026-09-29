import { allEntries, type RegistryEntry, type NpmDependency } from 'vayu-ui-registry';
import { adaptImports, applyTypography, type ImportOptions } from '../imports.js';

interface ScaffoldOptions extends ImportOptions {
  variant?: string;
  size?: string;
  features?: string[];
}

/** Registry examples preserve required props and compound component nesting. */
export function scaffoldComponent(
  entry: RegistryEntry,
  options: ScaffoldOptions,
): { code: string; imports: string[]; dependencies: NpmDependency[]; installSlugs: string[] } {
  if (entry.type === 'component') {
    for (const [kind, definition] of [
      ['variant', entry.variants],
      ['size', entry.sizes],
    ] as const) {
      const value = options[kind];
      if (value && (!definition || !definition.options.includes(value)))
        throw new Error(
          `Unsupported ${kind} "${value}" for ${entry.slug}. Inspect get_component_variants.`,
        );
    }
  }
  const features = options.features ?? [];
  const example = features.length
    ? entry.examples.find((example) => features.every((feature) => example.tags?.includes(feature)))
    : entry.examples[0];
  if (!example && features.length)
    throw new Error(
      `No example combines these feature tags. Call get_component_example to discover supported tags for ${entry.slug}.`,
    );
  if (!example)
    throw new Error(
      `No verified scaffold available for ${entry.slug}. Inspect the component props and composition.`,
    );
  let code = example.code;
  if (entry.type === 'component') {
    for (const [kind, definition] of [
      ['variant', entry.variants],
      ['size', entry.sizes],
    ] as const) {
      if (!options[kind] || !definition) continue;
      const prop = definition.propName;
      const pattern = new RegExp(`(<${entry.rootComponent})(?=[\\s>])([^>]*)(>)`, 'g');
      code = code.replace(pattern, (_, open, props, close) => {
        const clean = props.replace(
          new RegExp(`\\s${prop}=(?:"[^"]*"|'[^']*'|\\{[^}]*\\})`, 'g'),
          '',
        );
        return `${open} ${prop}="${options[kind]}"${clean}${close}`;
      });
    }
  }
  const adapted = adaptImports(applyTypography(code), options);
  const dependencies = new Map<string, NpmDependency>();
  const installSlugs = new Set([entry.slug, ...adapted.slugs]);
  for (const slug of installSlugs)
    for (const dependency of allEntries.find((entry) => entry.slug === slug)!.npmDependencies)
      dependencies.set(dependency.name, dependency);
  return {
    code: `'use client';\n\n${adapted.code}`,
    imports: adapted.code.match(/^import[\s\S]*?from\s+['"][^'"]+['"];?/gm) ?? [],
    dependencies: [...dependencies.values()],
    installSlugs: [...installSlugs],
  };
}
