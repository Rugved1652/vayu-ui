import { z } from 'zod';
import { registerTool } from '../lib/register-tool.js';
import { findEntry } from 'vayu-ui-registry';
import { entryImport, importOptionsSchema } from '../lib/imports.js';

export function registerGetInstallGuide(server: Parameters<typeof registerTool>[0]) {
  registerTool(
    server,
    'get_install_guide',
    'Get CLI installation commands and imports resolved for the usage file and vayu-ui.config.json. Defaults to copied source files; select package mode only for npm vayu-ui imports.',
    {
      slug: z.string(),
      ...importOptionsSchema,
      cwd: z.string().optional().describe('Project/workspace directory passed to CLI --cwd'),
    },
    async (params) => {
      const entry = findEntry(params.slug);
      if (!entry)
        return {
          isError: true,
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({ error: `Unknown slug "${params.slug}"` }),
            },
          ],
        };
      const symbol = entry.type === 'component' ? entry.rootComponent : entry.name;
      const cwd = params.cwd ? ` --cwd '${params.cwd.replaceAll("'", "'\\''")}'` : '';
      const response = {
        slug: entry.slug,
        name: entry.name,
        type: entry.type,
        cliCommands:
          params.mode === 'package'
            ? 'npm install vayu-ui'
            : `# Initialize once (preserves existing configuration):\nnpx vayu-ui-cli init${cwd}\n# Installs source and dependencies:\nnpx vayu-ui-cli add ${entry.slug}${cwd}`,
        imports: [`import { ${symbol} } from '${entryImport(entry, params)}';`],
        fromFile: params.fromFile ?? 'src/App.tsx',
        registryDependencies: entry.registryDependencies.map((dep) => dep.slug),
        npmDependencies: entry.npmDependencies,
        notes:
          'Read the local vayu-ui.config.json and pass its paths/aliases plus the file receiving this import. Source paths are relative to fromFile. Run workspace commands from the config directory or pass --cwd. CLI add installs transitive dependencies automatically.',
        designGuidance:
          'Use Typography for application text. Keep the default semantic heading scale; card and overlay titles should not become marketing heroes. Modal.Header and Drawer.Header include in-flow close controls.',
      };
      return { content: [{ type: 'text' as const, text: JSON.stringify(response, null, 2) }] };
    },
  );
}
