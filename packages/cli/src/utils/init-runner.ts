import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';

import { TOKENS_END_MARKER, TOKENS_START_MARKER, VAYU_TOKENS_CSS } from '../templates/tokens.js';
import { confirm, detectProject, type ProjectInfo } from './project.js';

const CONFIG_FILE = 'vayu-ui.config.json';
const TOKENS_FILE = 'vayu-ui-tokens.css';
const UI_FOLDERS = ['components', 'hooks', 'utils'];

export interface InitOptions {
  cssPath?: string;
  error?: (msg: string) => void;
  force?: boolean;
  log: (msg: string) => void;
  merge?: boolean;
  root: string;
  skipTailwind?: boolean;
  uiDir?: string;
}

export async function runInit(opts: InitOptions): Promise<void> {
  const {log} = opts;
  const error = opts.error ?? ((m: string) => { throw new Error(m); });
  const project = detectProject(opts.root);

  // Check for existing config
  if (existsSync(join(project.root, CONFIG_FILE))) {
    log('  Found existing vayu-ui.config.json');
    if (!opts.force) {
      const overwrite = await confirm('  Overwrite configuration?');
      if (!overwrite) {
        log('  Keeping existing config. Aborting.');
        return;
      }
    }
  }

  const uiDir = opts.uiDir ?? project.uiDir;
  const cssFile = resolveCssFile(project, opts.cssPath);

  // 1. Tailwind check
  if (!opts.skipTailwind) {
    await handleTailwind(project, opts.force, log, error);
  }

  // 2. Create folder structure
  createFolderStructure(project.root, uiDir, log);

  // 3. Handle CSS tokens
  const tokensRelPath = handleCssTokens(project.root, cssFile, opts.merge ?? false, log);

  // 4. Write config
  writeInitConfig(project.root, { cssFile, tokensFile: tokensRelPath, uiDir }, log);
}

function resolveCssFile(project: ProjectInfo, cssPathFlag?: string): null | string {
  if (cssPathFlag) return cssPathFlag;
  if (project.cssFile) return project.cssFile;

  switch (project.framework) {
    case 'next-app': {
      return project.hasSrc ? 'src/app/globals.css' : 'app/globals.css';
    }

    case 'next-pages': {
      return project.hasSrc ? 'src/styles/globals.css' : 'styles/globals.css';
    }

    default: {
      return project.hasSrc ? 'src/index.css' : 'index.css';
    }
  }
}

async function handleTailwind(
  project: ProjectInfo,
  force: boolean | undefined,
  log: (msg: string) => void,
  error: (msg: string) => void,
): Promise<void> {
  if (project.hasTailwind) {
    log('  Tailwind CSS already installed.');
    return;
  }

  log('  Tailwind CSS v4 is not installed.');
  const shouldInstall = force || await confirm('  Install tailwindcss and @tailwindcss/postcss?');
  if (!shouldInstall) {
    log('  Skipping Tailwind installation. You can install it manually later.');
    return;
  }

  const cmd = `${project.packageManager} ${project.packageManager === 'npm' ? 'install' : 'add'
    }${project.packageManager === 'npm' || project.packageManager === 'pnpm' ? ' -D' : ''} tailwindcss @tailwindcss/postcss postcss`;

  log(`  Running: ${cmd}`);
  try {
    execSync(cmd, { cwd: project.root, stdio: 'pipe' });
    log('  Tailwind CSS installed.');
  } catch (error_: unknown) {
    const msg = error_ instanceof Error ? error_.message : String(error_);
    error(`Failed to install Tailwind: ${msg}`);
  }

  const postcssPath = join(project.root, 'postcss.config.mjs');
  if (!existsSync(postcssPath)) {
    writeFileSync(postcssPath, 'export default {\n  plugins: {\n    "@tailwindcss/postcss": {},\n  },\n};\n');
    log('  Created postcss.config.mjs');
  }
}

function createFolderStructure(root: string, uiDir: string, log: (msg: string) => void): void {
  const absUiDir = join(root, uiDir);
  for (const sub of UI_FOLDERS) {
    const dir = join(absUiDir, sub);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
      writeFileSync(join(dir, '.gitkeep'), '');
    }
  }

  log(`  Created ${uiDir}/ with components/, hooks/, utils/`);
}

function handleCssTokens(root: string, cssFile: null | string, merge: boolean, log: (msg: string) => void): string {
  const tokensContent = `${TOKENS_START_MARKER}\n${VAYU_TOKENS_CSS}\n${TOKENS_END_MARKER}`;

  if (merge && cssFile) {
    const absPath = join(root, cssFile);
    mkdirSync(dirname(absPath), { recursive: true });
    const existing = existsSync(absPath) ? readFileSync(absPath, 'utf8') : '';

    if (existing.includes(TOKENS_START_MARKER)) {
      const start = existing.indexOf(TOKENS_START_MARKER);
      const end = existing.indexOf(TOKENS_END_MARKER) + TOKENS_END_MARKER.length;
      const updated = existing.slice(0, Math.max(0, start)) + tokensContent + existing.slice(Math.max(0, end));
      writeFileSync(absPath, updated);
      log(`  Updated tokens in ${cssFile}`);
    } else {
      const importLine = existing.includes("@import 'tailwindcss'") ? '' : "@import 'tailwindcss';\n";
      writeFileSync(absPath, `${importLine}${existing}\n\n${tokensContent}\n`);
      log(`  Appended tokens to ${cssFile}`);
    }

    return cssFile;
  }

  const cssDir = cssFile ? dirname(join(root, cssFile)) : root;
  mkdirSync(cssDir, { recursive: true });
  const tokensPath = join(cssDir, TOKENS_FILE);
  const tokensRelPath = relative(root, tokensPath);

  writeFileSync(tokensPath, `@import 'tailwindcss';\n\n${tokensContent}\n`);
  log(`  Created ${tokensRelPath}`);

  if (cssFile && !merge) {
    const absPath = join(root, cssFile);
    mkdirSync(dirname(absPath), { recursive: true });
    if (!existsSync(absPath)) {
      writeFileSync(absPath, '');
      log(`  Created ${cssFile}`);
    }

    if (existsSync(absPath)) {
      const existing = readFileSync(absPath, 'utf8');
      const importLine = `@import './${TOKENS_FILE}';`;
      if (!existing.includes(importLine)) {
        writeFileSync(absPath, `${importLine}\n${existing}`);
        log(`  Added @import to ${cssFile}`);
      }
    }
  }

  return tokensRelPath;
}

function writeInitConfig(root: string, paths: { cssFile: null | string; tokensFile: string; uiDir: string; }, log: (msg: string) => void): void {
  const config = {
    $schema: 'https://vayu.design/schema/config.json',
    cssFile: paths.cssFile,
    tokensFile: paths.tokensFile,
    uiPath: paths.uiDir,
    version: 1,
  };
  writeFileSync(join(root, CONFIG_FILE), JSON.stringify(config, null, 2) + '\n');
  log(`  Created ${CONFIG_FILE}`);
}
