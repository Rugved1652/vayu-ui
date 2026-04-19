import { z } from 'zod';
import { registerTool } from '../lib/register-tool.js';
import { allEntries } from 'vayu-ui-registry';

export function registerGetInstallGuide(server: Parameters<typeof registerTool>[0]) {
  registerTool(server,
    'get_install_guide',
    'Get the exact CLI commands and import statements needed to install and use a component or hook. Returns vayu-ui add commands, npm install commands, and import statements. Call this before writing code to know what to install.',
    {
      slug: z.string().describe('Component or hook slug, e.g. "button", "modal", "use-debounce"'),
    },
    async (params) => {
      const { slug } = params as { slug: string };
      const entry = allEntries.find((e) => e.slug === slug);
      if (!entry) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({ error: `No entry found for slug "${slug}"` }),
            },
          ],
          isError: true,
        };
      }

      // Resolve all registry dependencies transitively
      const allSlugs = resolveTransitiveSlugs(slug);

      const commands: string[] = [];

      // Init step
      commands.push('# If not already initialized:');
      commands.push('npx vayu-ui init');
      commands.push('');

      // Add command with all dependencies
      if (allSlugs.length > 1) {
        commands.push(`# Install ${entry.name} with dependencies:`);
        commands.push(`npx vayu-ui add ${allSlugs.join(' ')}`);
      } else {
        commands.push(`# Install ${entry.name}:`);
        commands.push(`npx vayu-ui add ${slug}`);
      }

      // NPM deps
      const npmDeps = collectNpmDeps(allSlugs);
      if (npmDeps.length > 0) {
        commands.push('');
        commands.push('# Install npm dependencies:');
        commands.push(`npm install ${npmDeps.join(' ')}`);
      }

      // Import statements
      const imports: string[] = [];
      if (entry.type === 'component') {
        imports.push(`import { ${entry.rootComponent} } from 'vayu-ui';`);
        const hasLoading = entry.states.some((s) => s.name === 'loading');
        if (hasLoading) {
          imports[0] = `import { ${entry.rootComponent}, Status } from 'vayu-ui';`;
        }
      } else {
        imports.push(`import { ${entry.name} } from 'vayu-ui';`);
      }

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(
              {
                slug: entry.slug,
                name: entry.name,
                type: entry.type,
                cliCommands: commands.join('\n'),
                imports,
                registryDependencies: entry.registryDependencies.map((d) => d.slug),
                npmDependencies: entry.npmDependencies.map((d) => d.name),
              },
              null,
              2,
            ),
          },
        ],
      };
    },
  );
}

function resolveTransitiveSlugs(slug: string): string[] {
  const visited = new Set<string>();
  const result: string[] = [];

  function walk(s: string) {
    if (visited.has(s)) return;
    visited.add(s);
    const entry = allEntries.find((e) => e.slug === s);
    if (!entry) return;
    for (const dep of entry.registryDependencies) {
      walk(dep.slug);
    }
    result.push(s);
  }

  walk(slug);
  return result;
}

function collectNpmDeps(slugs: string[]): string[] {
  const names = new Set<string>();
  for (const s of slugs) {
    const entry = allEntries.find((e) => e.slug === s);
    if (!entry) continue;
    for (const dep of entry.npmDependencies) {
      names.add(dep.name);
    }
  }
  return [...names];
}
