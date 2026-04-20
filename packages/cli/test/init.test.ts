import { strict as assert } from 'node:assert';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLI_DEV_BIN = join(__dirname, '..', 'bin', 'dev.js');

function createProject(name: string): string {
  const dir = mkdtempSync(join(tmpdir(), `vayu-cli-${name}-`));
  writeFileSync(join(dir, 'package.json'), JSON.stringify({ name, version: '0.0.0' }, null, 2));
  writeFileSync(join(dir, 'next.config.js'), 'module.exports = {};');
  return dir;
}

function runInit(projectDir: string): void {
  execFileSync('node', [CLI_DEV_BIN, 'init', '--skip-tailwind', '--force'], {
    cwd: projectDir,
    stdio: 'pipe',
  });
}

describe('init command css path behavior', () => {
  it('creates app globals and tokens when next app router has no css file', () => {
    const projectDir = createProject('next-app-no-css');
    mkdirSync(join(projectDir, 'app'), { recursive: true });

    try {
      runInit(projectDir);

      const cssPath = join(projectDir, 'app', 'globals.css');
      const tokensPath = join(projectDir, 'app', 'vayu-ui-tokens.css');
      const configPath = join(projectDir, 'vayu-ui.config.json');

      assert.equal(existsSync(cssPath), true);
      assert.equal(existsSync(tokensPath), true);
      assert.equal(existsSync(configPath), true);

      const cssContent = readFileSync(cssPath, 'utf-8');
      assert.equal(cssContent.includes("@import './vayu-ui-tokens.css';"), true);

      const config = JSON.parse(readFileSync(configPath, 'utf-8'));
      assert.equal(config.cssFile, 'app/globals.css');
      assert.equal(config.tokensFile, 'app/vayu-ui-tokens.css');
    } finally {
      rmSync(projectDir, { recursive: true, force: true });
    }
  });

  it('creates styles globals and tokens for next pages projects with no css', () => {
    const projectDir = createProject('next-pages-no-css');

    try {
      runInit(projectDir);

      const cssPath = join(projectDir, 'styles', 'globals.css');
      const tokensPath = join(projectDir, 'styles', 'vayu-ui-tokens.css');
      const configPath = join(projectDir, 'vayu-ui.config.json');

      assert.equal(existsSync(cssPath), true);
      assert.equal(existsSync(tokensPath), true);
      assert.equal(existsSync(configPath), true);

      const cssContent = readFileSync(cssPath, 'utf-8');
      assert.equal(cssContent.includes("@import './vayu-ui-tokens.css';"), true);

      const config = JSON.parse(readFileSync(configPath, 'utf-8'));
      assert.equal(config.cssFile, 'styles/globals.css');
      assert.equal(config.tokensFile, 'styles/vayu-ui-tokens.css');
    } finally {
      rmSync(projectDir, { recursive: true, force: true });
    }
  });
});
