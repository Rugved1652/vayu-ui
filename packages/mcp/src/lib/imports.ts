import { posix } from 'node:path';
import { allEntries, publicExports, type RegistryEntry } from 'vayu-ui-registry';
import { z } from 'zod';

export const importOptionsSchema = {
  mode: z
    .enum(['source', 'package'])
    .optional()
    .describe('source for CLI-copied files (default); package only when vayu-ui is installed'),
  fromFile: z
    .string()
    .optional()
    .describe(
      'Project-relative file receiving the code, e.g. src/app/page.tsx (default src/App.tsx)',
    ),
  config: z
    .object({
      uiPath: z.string().optional(),
      paths: z
        .object({
          components: z.string().optional(),
          hooks: z.string().optional(),
          utils: z.string().optional(),
        })
        .optional(),
      aliases: z
        .object({
          components: z.string().optional(),
          hooks: z.string().optional(),
          utils: z.string().optional(),
        })
        .optional(),
    })
    .optional()
    .describe(
      'Copy uiPath, paths and aliases from vayu-ui.config.json; aliases must exist in the app resolver',
    ),
};
export interface ImportOptions {
  mode?: 'source' | 'package';
  fromFile?: string;
  config?: {
    uiPath?: string;
    paths?: { components?: string; hooks?: string; utils?: string };
    aliases?: { components?: string; hooks?: string; utils?: string };
  };
}
export function entryImport(entry: RegistryEntry, options: ImportOptions): string {
  if (options.mode === 'package') return 'vayu-ui';
  const kind = entry.type === 'component' ? 'components' : 'hooks';
  const name =
    entry.type === 'component' ? entry.directoryName : entry.fileName.replace(/\.ts$/, '');
  const alias = options.config?.aliases?.[kind];
  if (alias) return `${alias.replace(/\/$/, '')}/${name}`;
  const target = posix.join(
    options.config?.paths?.[kind] ?? `${options.config?.uiPath ?? 'src/ui'}/${kind}`,
    name,
  );
  const path = posix.relative(posix.dirname(options.fromFile ?? 'src/App.tsx'), target);
  return path.startsWith('.') ? path : `./${path}`;
}

export function adaptImports(
  code: string,
  options: ImportOptions,
): { code: string; slugs: string[] } {
  const slugs = new Set<string>();
  code = code.replace(
    /import\s+(type\s+)?\{([^}]+)\}\s+from\s+['"]vayu-ui['"];?/g,
    (_, typeOnly, names: string) => {
      const groups = new Map<string, string[]>();
      for (const specifier of names
        .split(',')
        .map((name) => name.trim())
        .filter(Boolean)) {
        const name = specifier.replace(/^type\s+/, '').split(/\s+as\s+/)[0];
        const slug = publicExports[name];
        const entry = allEntries.find((entry) => entry.slug === slug);
        if (!entry) throw new Error(`Example imports unknown Vayu export "${name}".`);
        slugs.add(slug);
        const path = entryImport(entry, options);
        groups.set(path, [...(groups.get(path) ?? []), specifier]);
      }
      return [...groups]
        .map(([path, names]) => `import ${typeOnly ?? ''}{ ${names.join(', ')} } from '${path}';`)
        .join('\n');
    },
  );
  return { code, slugs: [...slugs] };
}

/** Keep semantic text on the shared application type scale. */
export function applyTypography(code: string): string {
  let changed = false;
  code = code.replace(/<(\/?)(h[1-6]|p)(?=[\s>])/g, (_, closing, tag: string) => {
    changed = true;
    return `<${closing}Typography.${tag.toUpperCase()}`;
  });
  if (changed && !/import\s*\{[^}]*\bTypography\b[^}]*\}\s*from/.test(code))
    code = `import { Typography } from 'vayu-ui';\n${code}`;
  return code;
}
