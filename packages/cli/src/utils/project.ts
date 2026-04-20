import { existsSync, readFileSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { join } from 'node:path';

export interface ProjectInfo {
  root: string;
  hasSrc: boolean;
  framework: string;
  cssFile: string | null;
  uiDir: string;
  packageManager: string;
  hasTailwind: boolean;
}

const CSS_SEARCH_PATHS: Record<string, string[]> = {
  'next-app': [
    'src/app/globals.css',
    'src/app/global.css',
    'app/globals.css',
    'app/global.css',
  ],
  'next-pages': [
    'src/styles/globals.css',
    'styles/globals.css',
  ],
  vite: [
    'src/index.css',
    'src/App.css',
  ],
  cra: [
    'src/index.css',
    'src/App.css',
  ],
  unknown: [
    'src/index.css',
    'src/globals.css',
    'src/global.css',
    'src/styles/globals.css',
    'styles/globals.css',
    'globals.css',
    'index.css',
  ],
};

export function detectProject(cwd: string): ProjectInfo {
  const root = findProjectRoot(cwd);
  const hasSrc = existsSync(join(root, 'src'));
  const framework = detectFramework(root);
  const cssFile = findCssFile(root, framework);
  const packageManager = detectPackageManager(root);
  const hasTailwind = checkTailwind(root);
  const uiDir = hasSrc ? 'src/ui' : 'ui';

  return { root, hasSrc, framework, cssFile, uiDir, packageManager, hasTailwind };
}

export function findProjectRoot(cwd: string): string {
  let dir = cwd;
  while (dir !== '/') {
    if (existsSync(join(dir, 'package.json'))) return dir;
    dir = join(dir, '..');
  }
  return cwd;
}

function detectFramework(root: string): string {
  const nextConfigs = ['next.config.ts', 'next.config.mjs', 'next.config.js', 'next.config.cjs'];
  if (nextConfigs.some((f) => existsSync(join(root, f)))) {
    if (existsSync(join(root, 'src', 'app')) || existsSync(join(root, 'app'))) {
      return 'next-app';
    }

    return 'next-pages';
  }

  const viteConfigs = ['vite.config.ts', 'vite.config.mjs', 'vite.config.js'];
  if (viteConfigs.some((f) => existsSync(join(root, f)))) return 'vite';

  try {
    const pkg = readPkg(root);
    if (pkg.dependencies?.['react-scripts'] || pkg.devDependencies?.['react-scripts']) return 'cra';
  } catch {}

  return 'unknown';
}

function findCssFile(root: string, framework: string): string | null {
  const paths = CSS_SEARCH_PATHS[framework] ?? CSS_SEARCH_PATHS.unknown;
  for (const p of paths) {
    if (existsSync(join(root, p))) return p;
  }
  return null;
}

function detectPackageManager(root: string): string {
  if (existsSync(join(root, 'pnpm-lock.yaml'))) return 'pnpm';
  if (existsSync(join(root, 'yarn.lock'))) return 'yarn';
  if (existsSync(join(root, 'bun.lockb')) || existsSync(join(root, 'bun.lock'))) return 'bun';
  return 'npm';
}

function checkTailwind(root: string): boolean {
  try {
    const pkg = readPkg(root);
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    return 'tailwindcss' in deps;
  } catch {
    return false;
  }
}

export function readPkg(root: string): Record<string, any> {
  return JSON.parse(readFileSync(join(root, 'package.json'), 'utf-8'));
}

export async function confirm(message: string): Promise<boolean> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(`${message} (y/N) `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}
