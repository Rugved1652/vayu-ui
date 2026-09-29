import { cpSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const at = (path) => fileURLToPath(new URL(path, import.meta.url));
mkdirSync(at('../packages/cli/dist'), { recursive: true });
cpSync(at('../packages/cli/src/templates'), at('../packages/cli/dist/templates'), {
  recursive: true,
});
cpSync(at('../skills'), at('../packages/cli/dist/templates/skills'), { recursive: true });
cpSync(at('../packages/ui/src'), at('../packages/cli/dist/registry'), {
  recursive: true,
  filter: (path) => !path.endsWith('.md'),
});
