import type {ComponentRegistryEntry, HookRegistryEntry, RegistryEntry} from 'vayu-ui-registry'

import {Args, Command, Flags, ux} from '@oclif/core'
import {execSync} from 'node:child_process'
import {existsSync, mkdirSync, writeFileSync} from 'node:fs'
import {join} from 'node:path'
import {allEntries} from 'vayu-ui-registry'

import {markInstalled, readConfig} from '../utils/config.js'
import {copySkills} from '../utils/copy-skills.js'
import {createFolderStructure} from '../utils/create-folder-structure.js'
import {fetchComponentFiles, fetchHookFile, fetchUtils} from '../utils/fetcher.js'
import {runInit} from '../utils/init-runner.js'
import {confirm, detectProject, prompt} from '../utils/project.js'
import InstallMcp from './install-mcp.js'

type Framework = 'next' | 'vite'

interface CreateOptions {
  appRouter: boolean
  eslint: boolean
  framework: Framework
  packageManager: string
  skipInit: boolean
  skipInstall: boolean
  skipMcp: boolean
  srcDir: boolean
  tailwind: boolean
  typescript: boolean
}

const STARTER_SLUGS = ['button', 'typography', 'use-local-storage', 'use-debounce', 'use-on-click-outside']

export default class Create extends Command {
  static args = {
    name: Args.string({
      description: 'Project name (used as directory name)',
      required: true,
    }),
  }
  static description =
    'Scaffolds a new React project (Next.js or Vite) and initializes Vayu UI with starter components and hooks.'
  static examples = [
    '<%= config.bin %> create my-app',
    '<%= config.bin %> create my-app --framework next',
    '<%= config.bin %> create my-app --framework vite',
    '<%= config.bin %> create my-app --force',
  ]
  static flags = {
    'app-router': Flags.boolean({
      default: true,
      description: 'Use App Router (Next.js only)',
      required: false,
    }),
    eslint: Flags.boolean({
      default: true,
      description: 'Include ESLint',
      required: false,
    }),
    force: Flags.boolean({
      default: false,
      description: 'Skip all prompts, use defaults',
      required: false,
    }),
    framework: Flags.option({
      description: 'Framework to scaffold',
      options: ['next', 'vite'] as const,
      required: false,
    })(),
    'package-manager': Flags.option({
      description: 'Package manager to use',
      options: ['npm', 'pnpm', 'yarn', 'bun'] as const,
      required: false,
    })(),
    'skip-init': Flags.boolean({
      default: false,
      description: 'Skip Vayu UI initialization after scaffolding',
      required: false,
    }),
    'skip-install': Flags.boolean({
      default: false,
      description: 'Skip npm install during scaffolding',
      required: false,
    }),
    'skip-mcp': Flags.boolean({
      default: false,
      description: 'Skip MCP server installation',
      required: false,
    }),
    'src-dir': Flags.boolean({
      default: true,
      description: 'Use src/ directory',
      required: false,
    }),
    tailwind: Flags.boolean({
      default: true,
      description: 'Include Tailwind CSS',
      required: false,
    }),
    typescript: Flags.boolean({
      default: true,
      description: 'Use TypeScript',
      required: false,
    }),
  }
  static summary = 'Create a new project with Vayu UI'

  async run(): Promise<void> {
    const {args, flags} = await this.parse(Create)
    const projectName = args.name as string
    const projectPath = join(process.cwd(), projectName)

    this.validateProjectName(projectName)

    if (existsSync(projectPath)) {
      this.error(`Directory "${projectName}" already exists.`)
    }

    const options = await this.resolveOptions(flags)

    this.log('')
    this.log(ux.colorize('bold', `  Creating ${projectName}`))
    this.log(ux.colorize('dim', '  ─────────────────────────────────────────────────────'))
    this.log('')
    this.printOptions(options, projectName)
    this.log('')

    this.scaffold(projectName, options)

    if (!options.skipInit) {
      this.log('')
      this.log(ux.colorize('bold', '  Initializing Vayu UI...'))
      this.log('')

      await runInit({
        force: true,
        log: (m) => this.log(m),
        root: projectPath,
        skipTailwind: !options.tailwind,
      })

      this.log('')
      this.log(ux.colorize('green', '  Vayu UI initialized.'))

      await this.addStarterKit(projectPath, options)

      // Create full folder structure
      this.log('')
      this.log(ux.colorize('bold', '  Creating folder structure...'))
      this.log('')
      createFolderStructure(projectPath, options.srcDir, (m) => this.log(m))
      this.log('')
      this.log(ux.colorize('green', '  Folder structure created.'))

      // Copy skill files
      this.log('')
      this.log(ux.colorize('bold', '  Adding Vayu UI skills...'))
      this.log('')
      copySkills(projectPath, (m) => this.log(m))
      this.log('')
      this.log(ux.colorize('green', '  Skills added.'))

      // Install MCP server
      if (!options.skipMcp) {
        this.log('')
        this.log(ux.colorize('bold', '  Installing MCP server...'))
        this.log('')
        try {
          const mcpCommand = new InstallMcp([], this.config)
          await mcpCommand.run()
          this.log('')
          this.log(ux.colorize('green', '  MCP server installed.'))
        } catch {
          this.warn('Failed to install MCP server. You can install it manually later.')
        }
      }
    }

    this.printSuccess(projectName, options)
  }

  private async addStarterKit(projectPath: string, options: CreateOptions): Promise<void> {
    this.log('')
    this.log(ux.colorize('bold', '  Adding starter components and hooks...'))
    this.log('')

    const registry = new Map<string, RegistryEntry>()
    for (const entry of allEntries) {
      registry.set(entry.slug, entry)
    }

    // Resolve all entries including transitive deps
    const visited = new Set<string>()
    const resolved: RegistryEntry[] = []

    const resolve = (slug: string): void => {
      if (visited.has(slug)) return
      visited.add(slug)
      const entry = registry.get(slug)
      if (!entry) return
      for (const dep of entry.registryDependencies) {
        resolve(dep.slug)
      }

      resolved.push(entry)
    }

    for (const slug of STARTER_SLUGS) resolve(slug)

    const components = resolved.filter((e): e is ComponentRegistryEntry => e.type === 'component')
    const hooks = resolved.filter((e): e is HookRegistryEntry => e.type === 'hook')

    const project = detectProject(projectPath)
    const config = readConfig(projectPath)
    const uiDir = config?.uiPath ?? project.uiDir
    const uiAbsDir = join(projectPath, uiDir)

    // Write utils (cn + useMergeRefs)
    const utilsDir = join(uiAbsDir, 'utils')
    mkdirSync(utilsDir, {recursive: true})
    const utilsResult = await fetchUtils()
    writeFileSync(join(utilsDir, 'index.ts'), utilsResult.content)
    this.log(ux.colorize('dim', '    wrote utils/index.ts'))

    // Write component files
    const compResults = await Promise.all(
      components.map(async (comp) => {
        const compDir = join(uiAbsDir, 'components', comp.directoryName)
        mkdirSync(compDir, {recursive: true})
        const fileNames = comp.files.map((f) => f.name)
        return fetchComponentFiles(comp.directoryName, fileNames)
      }),
    )
    for (const compFiles of compResults) {
      for (const {content, path: relPath} of compFiles) {
        writeFileSync(join(uiAbsDir, 'components', relPath), content)
        this.log(ux.colorize('dim', `    wrote components/${relPath}`))
      }
    }

    // Write hook files
    const hooksDir = join(uiAbsDir, 'hooks')
    mkdirSync(hooksDir, {recursive: true})
    const hookResults = await Promise.all(hooks.map((hook) => fetchHookFile(hook.fileName)))
    for (const {content, path: fileName} of hookResults) {
      writeFileSync(join(hooksDir, fileName), content)
      this.log(ux.colorize('dim', `    wrote hooks/${fileName}`))
    }

    // Collect and install npm deps
    const npmDeps = new Map<string, string>()
    for (const entry of resolved) {
      for (const dep of entry.npmDependencies) {
        npmDeps.set(dep.name, dep.version ?? 'latest')
      }
    }

    npmDeps.set('clsx', 'latest')
    npmDeps.set('tailwind-merge', 'latest')

    if (npmDeps.size > 0 && !options.skipInstall) {
      const pkgs = [...npmDeps.entries()].map(([name, version]) => (version === 'latest' ? name : `${name}@${version}`))

      const pm = options.packageManager
      const addCmd =
        pm === 'npm'
          ? `npm install ${pkgs.join(' ')}`
          : pm === 'pnpm'
            ? `pnpm add ${pkgs.join(' ')}`
            : pm === 'yarn'
              ? `yarn add ${pkgs.join(' ')}`
              : `bun add ${pkgs.join(' ')}`

      this.log('')
      this.log(ux.colorize('dim', `  Installing: ${[...npmDeps.keys()].join(', ')}`))
      try {
        execSync(addCmd, {cwd: projectPath, stdio: 'pipe'})
        this.log(ux.colorize('green', '  Dependencies installed.'))
      } catch {
        this.warn('Failed to install dependencies. Run manually: cd ' + options.packageManager + ' && ' + addCmd)
      }
    }

    // Track installed items in config
    markInstalled(
      projectPath,
      config,
      resolved.map((e) => ({slug: e.slug, type: e.type})),
    )

    this.log('')
    this.log(ux.colorize('green', `  Added ${resolved.length} starter items.`))
  }

  private detectPackageManager(): string {
    const cwd = process.cwd()
    if (existsSync(join(cwd, 'pnpm-lock.yaml'))) return 'pnpm'
    if (existsSync(join(cwd, 'yarn.lock'))) return 'yarn'
    if (existsSync(join(cwd, 'bun.lockb')) || existsSync(join(cwd, 'bun.lock'))) return 'bun'
    return 'npm'
  }

  private printOptions(options: CreateOptions, projectName: string): void {
    const dim = (s: string) => ux.colorize('dim', s)
    const bold = (s: string) => ux.colorize('bold', s)

    this.log(`  ${dim('Framework:')}       ${bold(options.framework === 'next' ? 'Next.js' : 'Vite')}`)
    this.log(`  ${dim('Package manager:')}  ${bold(options.packageManager)}`)
    this.log(`  ${dim('TypeScript:')}       ${options.typescript ? ux.colorize('green', 'yes') : dim('no')}`)
    this.log(`  ${dim('Tailwind CSS:')}     ${options.tailwind ? ux.colorize('green', 'yes') : dim('no')}`)
    if (options.framework === 'next') {
      this.log(`  ${dim('App Router:')}       ${options.appRouter ? ux.colorize('green', 'yes') : dim('no')}`)
    }

    this.log(`  ${dim('ESLint:')}           ${options.eslint ? ux.colorize('green', 'yes') : dim('no')}`)
    this.log(`  ${dim('src/ directory:')}   ${options.srcDir ? ux.colorize('green', 'yes') : dim('no')}`)
    this.log(`  ${dim('MCP server:')}      ${options.skipMcp ? dim('no') : ux.colorize('green', 'yes')}`)
    this.log(
      `  ${dim('Starter kit:')}      ${bold('Button, Typography, useLocalStorage, useDebounce, useOnClickOutside')}`,
    )
    this.log(`  ${dim('Project path:')}     ${bold(projectName)}/`)
  }

  private printSuccess(projectName: string, options: CreateOptions): void {
    this.log('')
    this.log(ux.colorize('green', `  Project created at ${projectName}/`))
    this.log('')
    this.log(ux.colorize('dim', '  Next steps:'))
    this.log(ux.colorize('dim', `    ${ux.colorize('bold', `cd ${projectName}`)}`))
    this.log(ux.colorize('dim', `    ${ux.colorize('bold', `${options.packageManager} run dev`)}`))
    if (!options.skipInit) {
      this.log('')
      this.log(ux.colorize('dim', '  Add more components:'))
      this.log(
        ux.colorize(
          'dim',
          `    ${ux.colorize('bold', 'npx vayu-ui-cli@latest list')}       Browse available components`,
        ),
      )
      this.log(
        ux.colorize('dim', `    ${ux.colorize('bold', 'npx vayu-ui-cli@latest add modal')}   Add a modal component`),
      )
      this.log('')
      this.log(ux.colorize('dim', '  Enable AI integration:'))
      this.log(
        ux.colorize(
          'dim',
          `    ${ux.colorize('bold', 'npx vayu-ui-cli@latest mcp install')}      Set up the Vayu UI MCP server for your AI tools`,
        ),
      )
      this.log('')
      this.log(ux.colorize('dim', '  Add Vayu UI skills (Vercel Skills platform):'))
      this.log(
        ux.colorize(
          'dim',
          `    ${ux.colorize('bold', 'npx skills add Rugved1652/vayu-ui')}   Install Vayu UI skills for your AI coding agent`,
        ),
      )
    }

    this.log('')
  }

  private async promptFramework(): Promise<Framework> {
    this.log('  Select a framework:')
    this.log('    1. Next.js')
    this.log('    2. Vite')
    const answer = await prompt('  Choose', '1')
    return answer === '2' ? 'vite' : 'next'
  }

  private async resolveOptions(flags: Record<string, boolean | string | undefined>): Promise<CreateOptions> {
    const framework = (flags.framework as Framework) ?? (flags.force ? 'next' : await this.promptFramework())
    const packageManager = (flags['package-manager'] as string) ?? this.detectPackageManager()

    if (flags.force) {
      return {
        appRouter: Boolean(flags['app-router']),
        eslint: Boolean(flags.eslint),
        framework,
        packageManager,
        skipInit: Boolean(flags['skip-init']),
        skipInstall: Boolean(flags['skip-install']),
        skipMcp: Boolean(flags['skip-mcp']),
        srcDir: Boolean(flags['src-dir']),
        tailwind: Boolean(flags.tailwind),
        typescript: Boolean(flags.typescript),
      }
    }

    const typescript = Boolean(flags.typescript)
    const eslint = Boolean(flags.eslint)
    const tailwind = Boolean(flags.tailwind)
    const srcDir = Boolean(flags['src-dir'])
    const skipMcp = Boolean(flags['skip-mcp'])
    let appRouter = Boolean(flags['app-router'])

    if (framework === 'next') {
      appRouter = await confirm('  Use App Router?')
    }

    return {
      appRouter,
      eslint,
      framework,
      packageManager,
      skipInit: Boolean(flags['skip-init']),
      skipInstall: Boolean(flags['skip-install']),
      skipMcp,
      srcDir,
      tailwind,
      typescript,
    }
  }

  private scaffold(projectName: string, options: CreateOptions): void {
    if (options.framework === 'next') {
      this.scaffoldNext(projectName, options)
    } else {
      this.scaffoldVite(projectName, options)
    }
  }

  private scaffoldNext(projectName: string, options: CreateOptions): void {
    const pm = options.packageManager
    const runner = pm === 'pnpm' ? 'pnpm dlx' : pm === 'bun' ? 'bunx' : 'npx'
    const args = [
      'create-next-app@latest',
      projectName,
      options.typescript ? '--typescript' : '--js',
      options.appRouter ? '--app' : '--no-app',
      options.eslint ? '--eslint' : '--no-eslint',
      options.tailwind ? '--tailwind' : '--no-tailwind',
      options.srcDir ? '--src-dir' : '--no-src-dir',
      '--no-import-alias',
      `--use-${pm}`,
    ]

    if (options.skipInstall) {
      args.push('--skip-install')
    }

    const cmd = `${runner} ${args.join(' ')}`
    this.log(ux.colorize('dim', `  Running: ${cmd}`))
    this.log('')

    try {
      execSync(cmd, {stdio: 'inherit'})
    } catch {
      this.error('Failed to scaffold Next.js project.')
    }
  }

  private scaffoldVite(projectName: string, options: CreateOptions): void {
    const projectDir = join(process.cwd(), projectName)
    const srcDir = join(projectDir, 'src')
    mkdirSync(srcDir, {recursive: true})

    const ts = options.typescript
    const ext = ts ? 'tsx' : 'jsx'

    // package.json
    writeFileSync(
      join(projectDir, 'package.json'),
      JSON.stringify(
        {
          dependencies: {
            react: '^19.0.0',
            'react-dom': '^19.0.0',
          },
          devDependencies: {
            '@vitejs/plugin-react': '^4.0.0',
            vite: '^6.0.0',
            ...(ts ? {'@types/react': '^19.0.0', '@types/react-dom': '^19.0.0', typescript: '^5.0.0'} : {}),
          },
          name: projectName,
          private: true,
          scripts: {
            build: `vite build${ts ? ' && tsc -b' : ''}`,
            dev: 'vite',
            preview: 'vite preview',
          },
          type: 'module',
          version: '0.0.0',
        },
        null,
        2,
      ) + '\n',
    )

    // vite.config.ts
    writeFileSync(
      join(projectDir, `vite.config.${ts ? 'ts' : 'js'}`),
      `import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\nexport default defineConfig({\n  plugins: [react()],\n})\n`,
    )

    // index.html
    writeFileSync(
      join(projectDir, 'index.html'),
      `<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>${projectName}</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.${ext}"></script>\n  </body>\n</html>\n`,
    )

    // src/main.tsx
    writeFileSync(
      join(srcDir, `main.${ext}`),
      `import { StrictMode } from 'react'\nimport { createRoot } from 'react-dom/client'\nimport './index.css'\nimport App from './App.${ext}'\n\ncreateRoot(document.getElementById('root')!).render(\n  <StrictMode>\n    <App />\n  </StrictMode>,\n)\n`,
    )

    // src/App.tsx
    writeFileSync(
      join(srcDir, `App.${ext}`),
      `import './App.css'\n\nfunction App() {\n  return (\n    <div>\n      <h1>${projectName}</h1>\n      <p>Edit src/App.${ext} and save to test HMR</p>\n    </div>\n  )\n}\n\nexport default App\n`,
    )

    // src/App.css
    writeFileSync(
      join(srcDir, 'App.css'),
      `#root {\n  max-width: 1280px;\n  margin: 0 auto;\n  padding: 2rem;\n  text-align: center;\n}\n`,
    )

    // src/index.css (placeholder — Vayu UI tokens will be injected here)
    writeFileSync(join(srcDir, 'index.css'), '')

    // tsconfig files
    if (ts) {
      writeFileSync(
        join(projectDir, 'tsconfig.json'),
        JSON.stringify(
          {
            compilerOptions: {
              allowImportingTsExtensions: true,
              isolatedModules: true,
              jsx: 'react-jsx',
              lib: ['ES2020', 'DOM', 'DOM.Iterable'],
              module: 'ESNext',
              moduleDetection: 'force',
              moduleResolution: 'bundler',
              noEmit: true,
              noFallthroughCasesInSwitch: true,
              noUncheckedSideEffectImports: true,
              noUnusedLocals: true,
              noUnusedParameters: true,
              skipLibCheck: true,
              strict: true,
              target: 'ES2020',
              useDefineForClassFields: true,
            },
            include: ['src'],
          },
          null,
          2,
        ) + '\n',
      )

      writeFileSync(
        join(projectDir, 'tsconfig.node.json'),
        JSON.stringify(
          {
            compilerOptions: {
              allowImportingTsExtensions: true,
              isolatedModules: true,
              lib: ['ES2023'],
              module: 'ESNext',
              moduleDetection: 'force',
              moduleResolution: 'bundler',
              noEmit: true,
              noFallthroughCasesInSwitch: true,
              noUncheckedSideEffectImports: true,
              noUnusedLocals: true,
              noUnusedParameters: true,
              skipLibCheck: true,
              strict: true,
              target: 'ES2022',
            },
            include: [`vite.config.ts`],
          },
          null,
          2,
        ) + '\n',
      )
    }

    this.log(ux.colorize('green', '  Vite project scaffolded.'))

    // Install deps
    if (!options.skipInstall) {
      const pm = options.packageManager
      const installCmd =
        pm === 'npm' ? 'npm install' : pm === 'pnpm' ? 'pnpm install' : pm === 'yarn' ? 'yarn' : 'bun install'

      this.log(ux.colorize('dim', `  Installing dependencies...`))
      try {
        execSync(installCmd, {cwd: projectDir, stdio: 'pipe'})
        this.log(ux.colorize('green', '  Dependencies installed.'))
      } catch {
        this.warn('Failed to install dependencies. Run manually: cd ' + projectName + ' && ' + installCmd)
      }
    }
  }

  private validateProjectName(name: string): void {
    if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
      this.error('Invalid project name. Use only letters, numbers, hyphens, and underscores.')
    }
  }
}
