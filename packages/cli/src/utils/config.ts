import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { detectProject, type ProjectInfo } from './project.js';

const CONFIG_FILE = 'vayu-ui.config.json';

export interface VayuConfig {
  $schema?: string;
  version: number;
  uiPath: string;
  cssFile: string | null;
  tokensFile: string;
  installed: Record<string, InstalledEntry>;
}

export interface InstalledEntry {
  type: 'component' | 'hook';
  installedAt: string;
}

export function readConfig(root: string): VayuConfig | null {
  const path = join(root, CONFIG_FILE);
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, 'utf-8'));
}

export function writeConfig(root: string, config: VayuConfig): void {
  writeFileSync(join(root, CONFIG_FILE), JSON.stringify(config, null, 2) + '\n');
}

export function resolveConfig(): { root: string; config: VayuConfig | null; project: ProjectInfo } {
  const project = detectProject(process.cwd());
  const config = readConfig(project.root);
  return { root: project.root, config, project };
}

export function getUiPath(config: VayuConfig | null, project: ProjectInfo): string {
  return config?.uiPath ?? project.uiDir;
}

export function markInstalled(root: string, config: VayuConfig | null, entries: Array<{ slug: string; type: 'component' | 'hook' }>): VayuConfig {
  const now = new Date().toISOString();
  const base: VayuConfig = config
    ? { ...config, installed: config.installed ?? {} }
    : { version: 1, uiPath: '', cssFile: null, tokensFile: '', installed: {} };

  for (const entry of entries) {
    base.installed[entry.slug] = {
      type: entry.type,
      installedAt: now,
    };
  }

  writeConfig(root, base);
  return base;
}

export function markUninstalled(root: string, config: VayuConfig, slugs: string[]): VayuConfig {
  for (const slug of slugs) {
    delete config.installed[slug];
  }

  writeConfig(root, config);
  return config;
}
