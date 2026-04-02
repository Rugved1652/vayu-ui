import {Command, Flags} from '@oclif/core'
import chalk from 'chalk'
import ora from 'ora'
import path from 'path'
import fs from 'fs-extra'
import {fetchFromGitHub, installDependencies, detectPackageManager} from '../utils/installer'

// ============================================================================
// Vayu UI Design Tokens CSS (clean version without Fumadocs imports)
// ============================================================================

const VAYU_UI_CSS = `@import 'tailwindcss';

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-primary-100: var(--color-lime-100);
  --color-primary-200: var(--color-lime-200);
  --color-primary-300: var(--color-lime-300);
  --color-primary-400: var(--color-lime-400);
  --color-primary-500: var(--color-lime-500);
  --color-primary-600: var(--color-lime-600);
  --color-primary-700: var(--color-lime-700);
  --color-primary-800: var(--color-lime-800);
  --color-primary-900: var(--color-lime-900);
  --color-primary-950: var(--color-lime-950);

  --color-secondary-100: var(--color-indigo-100);
  --color-secondary-200: var(--color-indigo-200);
  --color-secondary-300: var(--color-indigo-300);
  --color-secondary-400: var(--color-indigo-400);
  --color-secondary-500: var(--color-indigo-500);
  --color-secondary-600: var(--color-indigo-600);
  --color-secondary-700: var(--color-indigo-700);
  --color-secondary-800: var(--color-indigo-800);
  --color-secondary-900: var(--color-indigo-900);
  --color-secondary-950: var(--color-indigo-950);

  --color-tertiary-100: var(--color-amber-100);
  --color-tertiary-200: var(--color-amber-200);
  --color-tertiary-300: var(--color-amber-300);
  --color-tertiary-400: var(--color-amber-400);
  --color-tertiary-500: var(--color-amber-500);
  --color-tertiary-600: var(--color-amber-600);
  --color-tertiary-700: var(--color-amber-700);
  --color-tertiary-800: var(--color-amber-800);
  --color-tertiary-900: var(--color-amber-900);
  --color-tertiary-950: var(--color-amber-950);

  --color-ground-50: var(--color-zinc-50);
  --color-ground-100: var(--color-zinc-100);
  --color-ground-200: var(--color-zinc-200);
  --color-ground-300: var(--color-zinc-300);
  --color-ground-400: var(--color-zinc-400);
  --color-ground-500: var(--color-zinc-500);
  --color-ground-600: var(--color-zinc-600);
  --color-ground-700: var(--color-zinc-700);
  --color-ground-800: var(--color-zinc-800);
  --color-ground-900: var(--color-zinc-900);
  --color-ground-950: var(--color-zinc-950);

  --color-warning-100: var(--color-yellow-100);
  --color-warning-200: var(--color-yellow-200);
  --color-warning-300: var(--color-yellow-300);
  --color-warning-400: var(--color-yellow-400);
  --color-warning-500: var(--color-yellow-500);
  --color-warning-600: var(--color-yellow-600);
  --color-warning-700: var(--color-yellow-700);
  --color-warning-800: var(--color-yellow-800);
  --color-warning-900: var(--color-yellow-900);
  --color-warning-950: var(--color-yellow-950);

  --color-success-100: var(--color-green-100);
  --color-success-200: var(--color-green-200);
  --color-success-300: var(--color-green-300);
  --color-success-400: var(--color-green-400);
  --color-success-500: var(--color-green-500);
  --color-success-600: var(--color-green-600);
  --color-success-700: var(--color-green-700);
  --color-success-800: var(--color-green-800);
  --color-success-900: var(--color-green-900);
  --color-success-950: var(--color-green-950);

  --color-error-100: var(--color-red-100);
  --color-error-200: var(--color-red-200);
  --color-error-300: var(--color-red-300);
  --color-error-400: var(--color-red-400);
  --color-error-500: var(--color-red-500);
  --color-error-600: var(--color-red-600);
  --color-error-700: var(--color-red-700);
  --color-error-800: var(--color-red-800);
  --color-error-900: var(--color-red-900);
  --color-error-950: var(--color-red-950);

  --color-info-100: var(--color-blue-100);
  --color-info-200: var(--color-blue-200);
  --color-info-300: var(--color-blue-300);
  --color-info-400: var(--color-blue-400);
  --color-info-500: var(--color-blue-500);
  --color-info-600: var(--color-blue-600);
  --color-info-700: var(--color-blue-700);
  --color-info-800: var(--color-blue-800);
  --color-info-900: var(--color-blue-900);
  --color-info-950: var(--color-blue-950);

  --radius-xss: 2px;
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-3xl: 32px;
  --radius-4xl: 40px;
  --radius-5xl: 48px;
  --radius-6xl: 56px;
  --radius-full: 9999px;

  --shadow-color: rgba(0, 0, 0, 0.1);
  --shadow-xs: 0 0 0 1px var(--shadow-color);
  --shadow-sm: 0 1px 2px 0 var(--shadow-color);
  --shadow-md:
    0 4px 6px -1px var(--shadow-color), 0 2px 4px -1px var(--shadow-color);
  --shadow-lg:
    0 10px 15px -3px var(--shadow-color), 0 4px 6px -2px var(--shadow-color);
  --shadow-xl:
    0 20px 25px -5px var(--shadow-color), 0 10px 10px -5px var(--shadow-color);
  --shadow-2xl: 0 25px 50px -12px var(--shadow-color);
  --shadow-inner: inset 0 2px 4px 0 var(--shadow-color);

  --font-primary: "Oswald", sans-serif;
  --font-secondary: "Mulish", sans-serif;
  --font-tertiary: "Geist Mono", monospace;

  --transition-fast: 150ms ease-in-out;
  --transition-medium: 300ms ease-in-out;
  --transition-slow: 500ms ease-in-out;

  /* Typography */
  --text-h1: 2.25rem;
  --text-h2: 1.875rem;
  --text-h3: 1.5rem;
  --text-h4: 1.25rem;
  --text-h5: 1.125rem;
  --text-h6: 1rem;
  --text-para: 0.875rem;

  /* Keyframes */
  --keyframes-marquee-scroll: marquee-scroll;
  @keyframes marquee-scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  /* Animation */
  --animate-marquee-scroll: marquee-scroll var(--marquee-duration, 20s) linear
    infinite;
}

body {
  @apply bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100;
  overscroll-behavior: none;
}
`

const POSTCSS_CONFIG = `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
`

// ============================================================================
// Project Type Detection
// ============================================================================

type ProjectType = 'nextjs' | 'vite' | 'cra' | 'unknown'

function detectProjectType(cwd: string): ProjectType {
  const pkgPath = path.join(cwd, 'package.json')
  if (!fs.existsSync(pkgPath)) return 'unknown'

  try {
    const pkg = fs.readJsonSync(pkgPath)
    const allDeps = {...pkg.dependencies, ...pkg.devDependencies}

    if (allDeps.next) return 'nextjs'
    if (allDeps.vite) return 'vite'
    if (allDeps['react-scripts']) return 'cra'
  } catch {
    // ignore parse errors
  }

  return 'unknown'
}

function getDefaultCssPath(projectType: ProjectType): string {
  switch (projectType) {
    case 'nextjs':
      return 'src/app/globals.css'
    case 'vite':
    case 'cra':
      return 'src/index.css'
    default:
      return 'src/globals.css'
  }
}

// ============================================================================
// `vayu-ui init`
// ============================================================================

export default class Init extends Command {
  static summary = 'Initialize Vayu UI in your project'

  static description = `
Sets up Vayu UI design tokens and Tailwind CSS in your existing project.
Writes the Vayu UI CSS file with all design tokens (colors, radii, shadows, fonts, transitions).
Installs Tailwind CSS v4 and PostCSS if not already present.

Examples:
  $ vayu-ui init
  $ vayu-ui init --path src/styles/vayu-ui.css
  $ vayu-ui init --overwrite
`

  static flags = {
    path: Flags.string({
      char: 'p',
      description: 'Custom CSS file path (default: auto-detected based on project type)',
    }),
    overwrite: Flags.boolean({
      char: 'o',
      description: 'Overwrite existing CSS file',
      default: false,
    }),
    force: Flags.boolean({
      char: 'f',
      description: 'Skip project detection, just write files',
      default: false,
    }),
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(Init)
    const cwd = process.cwd()

    // ── 1. Detect project type ──────────────────────────────────────────
    const projectType = detectProjectType(cwd)

    if (projectType === 'unknown' && !flags.force) {
      this.log('')
      this.log(chalk.yellow('⚠  Could not detect project type (no Next.js, Vite, or CRA found).'))
      this.log(chalk.dim('   Use --force to proceed anyway, or --path to specify the CSS location.'))
      this.log('')
      return
    }

    if (projectType !== 'unknown') {
      this.log('')
      this.log(chalk.dim(`  Detected project: ${chalk.white(projectType)}`))
    }

    // ── 2. Determine CSS file path ──────────────────────────────────────
    const cssPath = flags.path || getDefaultCssPath(projectType)
    const fullCssPath = path.join(cwd, cssPath)

    // ── 3. Check if file already exists ─────────────────────────────────
    if (fs.existsSync(fullCssPath) && !flags.overwrite) {
      this.log('')
      this.log(chalk.yellow(`⚠  ${cssPath} already exists.`))
      this.log(chalk.dim('   Use --overwrite to replace it.'))
      this.log('')
      return
    }

    // ── 4. Write the CSS file ───────────────────────────────────────────
    const cssSpinner = ora({
      text: `Writing Vayu UI design tokens to ${chalk.cyan(cssPath)}`,
      color: 'cyan',
    }).start()

    try {
      await fs.ensureDir(path.dirname(fullCssPath))
      await fs.writeFile(fullCssPath, VAYU_UI_CSS, 'utf-8')
      cssSpinner.succeed(chalk.green(`Vayu UI CSS written`) + chalk.dim(` → ${cssPath}`))
    } catch (error) {
      cssSpinner.fail(chalk.red('Failed to write CSS file'))
      this.log(chalk.dim(`  Error: ${(error as Error).message}`))
      this.exit(1)
    }

    // ── 5. Write postcss.config.mjs if missing ─────────────────────────
    const postcssPath = path.join(cwd, 'postcss.config.mjs')

    if (!fs.existsSync(postcssPath)) {
      const postcssSpinner = ora({
        text: 'Creating postcss.config.mjs',
        color: 'cyan',
      }).start()

      try {
        await fs.writeFile(postcssPath, POSTCSS_CONFIG, 'utf-8')
        postcssSpinner.succeed(chalk.green('postcss.config.mjs created'))
      } catch (error) {
        postcssSpinner.fail(chalk.red('Failed to create postcss.config.mjs'))
        this.log(chalk.dim(`  Error: ${(error as Error).message}`))
      }
    } else {
      this.log(chalk.dim('  postcss.config.mjs already exists — skipped'))
    }

    // ── 6. Install Tailwind CSS v4 dependencies ─────────────────────────
    const tailwindDeps = ['tailwindcss', '@tailwindcss/postcss', 'postcss']
    const pm = detectPackageManager()

    // Check which deps are already installed
    const pkgPath = path.join(cwd, 'package.json')
    let missingDeps = tailwindDeps

    if (fs.existsSync(pkgPath)) {
      try {
        const pkg = fs.readJsonSync(pkgPath)
        const allDeps = {...pkg.dependencies, ...pkg.devDependencies}
        missingDeps = tailwindDeps.filter((d) => !allDeps[d])
      } catch {
        // proceed with installing all
      }
    }

    if (missingDeps.length > 0) {
      this.log('')
      const depSpinner = ora({
        text: `Installing via ${chalk.bold(pm)}: ${missingDeps.join(', ')}`,
        color: 'cyan',
      }).start()

      try {
        installDependencies(missingDeps)
        depSpinner.succeed(chalk.green('Tailwind CSS packages installed'))
      } catch {
        depSpinner.fail(chalk.red('Failed to install packages'))
        this.log(chalk.dim(`  Run manually: ${pm} install ${missingDeps.join(' ')}`))
      }
    } else {
      this.log(chalk.dim('  Tailwind CSS already installed — skipped'))
    }

    // ── 7. Done ─────────────────────────────────────────────────────────
    this.log('')
    this.log(chalk.bold.green('✓ Vayu UI initialized!'))
    this.log('')
    this.log(chalk.dim("  What's next:"))
    this.log(chalk.white(`    1. Import the CSS in your app entry point`))
    this.log(chalk.white(`    2. Run ${chalk.cyan('vayu-ui add <component>')} to add components`))
    this.log(chalk.white(`    3. Run ${chalk.cyan('vayu-ui list')} to see all available items`))
    this.log('')
  }
}
