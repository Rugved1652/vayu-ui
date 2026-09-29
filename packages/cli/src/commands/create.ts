import {Args, Command, Flags} from '@oclif/core'
import {execFileSync} from 'node:child_process'
import {existsSync, rmSync, writeFileSync} from 'node:fs'
import {dirname, join, relative, resolve} from 'node:path'

import {defaultConfig, readConfig, writeConfig} from '../utils/config.js'
import {copySkills} from '../utils/copy-skills.js'
import {createFolderStructure} from '../utils/create-folder-structure.js'
import {runInit} from '../utils/init-runner.js'
import {installEntries} from '../utils/installer.js'
import {ALL_TOOL_IDS, TOOL_DEFINITIONS, writeMcpConfig} from '../utils/mcp-config.js'
import {detectPackageManager, detectProject} from '../utils/project.js'
import {scaffoldProject} from '../utils/scaffold-project.js'

export default class Create extends Command {
  static args = {name: Args.string({description: 'Project directory name', required: true})}
  static description = 'Create a Next.js or Vite starter, optionally in a Turborepo with a shared UI package.'
  static flags = {
    'app-router': Flags.boolean({allowNo: true, default: true, description: 'Use the Next.js App Router'}),
    eslint: Flags.boolean({allowNo: true, default: true, description: 'Include ESLint'}),
    force: Flags.boolean({default: false, description: 'Use defaults without prompts'}),
    framework: Flags.string({default: 'next', description: 'Framework to scaffold', options: ['next', 'vite']}),
    'package-manager': Flags.string({description: 'Package manager', options: ['npm', 'pnpm', 'yarn', 'bun']}),
    'skip-init': Flags.boolean({default: false, description: 'Skip Vayu components, skills and tokens'}),
    'skip-install': Flags.boolean({default: false, description: 'Write all files and dependencies without installing'}),
    'skip-mcp': Flags.boolean({default: false, description: 'Skip project MCP configuration'}),
    'src-dir': Flags.boolean({allowNo: true, default: true, description: 'Use a src directory'}),
    tailwind: Flags.boolean({allowNo: true, default: true, description: 'Include Tailwind CSS'}),
    turbo: Flags.boolean({default: false, description: 'Create a Turborepo with apps/web and packages/ui'}),
    typescript: Flags.boolean({
      allowNo: true,
      default: true,
      description: 'Use TypeScript application files (Vayu sources remain TypeScript)',
    }),
  }
  static summary = 'Create a new project with Vayu UI'

  async run(): Promise<void> {
    const {args, flags} = await this.parse(Create)
    if (!/^[a-z0-9][a-z0-9_-]*$/.test(args.name))
      this.error('Invalid project name. Use lowercase letters, numbers, hyphens, and underscores.')
    const root = resolve(args.name)
    if (existsSync(root)) this.error(`Directory "${args.name}" already exists.`)
    const packageManager = flags['package-manager'] ?? detectPackageManager(process.cwd())
    const options = {
      appRouter: flags['app-router'],
      eslint: flags.eslint,
      framework: flags.framework as 'next' | 'vite',
      packageManager,
      skipInit: flags['skip-init'],
      srcDir: flags['src-dir'],
      tailwind: flags.tailwind,
      turbo: flags.turbo,
      typescript: flags.typescript,
    }
    const {appRoot, cssPath, uiRoot} = scaffoldProject(root, args.name, options)
    if (!options.skipInit) {
      const base = options.srcDir ? 'src/' : ''
      if (options.turbo) {
        // One root config owns shared generation. Dependency installation targets packages/ui.
        writeConfig(root, {
          ...defaultConfig(detectProject(root)),
          aliases: {components: '@repo/ui/components', hooks: '@repo/ui/hooks'},
          cssFile: `apps/web/${cssPath}`,
          packagePath: 'packages/ui',
          tokensFile: flags.tailwind ? 'packages/ui/src/styles.css' : '',
          uiPath: 'packages/ui/src',
        })
        if (flags.tailwind) {
          await runInit({
            cssPath: 'src/styles.css',
            force: true,
            log: (m) => this.log(m),
            merge: true,
            root: uiRoot,
            skipTailwind: true,
            uiDir: 'src',
          })
          rmSync(join(uiRoot, 'vayu-ui.config.json'))
          const css = join(appRoot, cssPath)
          const source = relative(dirname(css), join(uiRoot, 'src')).replaceAll('\\', '/')
          writeFileSync(css, `@import '@repo/ui/styles.css';\n@source '${source}';\n`)
        }
      } else if (flags.tailwind) {
        await runInit({cssPath, force: true, log: (m) => this.log(m), root, skipTailwind: true, uiDir: `${base}ui`})
      } else {
        writeConfig(root, {...defaultConfig(detectProject(root)), cssFile: cssPath, uiPath: `${base}ui`})
      }

      installEntries({
        config: readConfig(root)!,
        log: (m) => this.log(m),
        packageManager,
        root,
        skipInstall: true,
        slugs: ['button', 'typography', 'select', 'use-local-storage', 'use-debounce', 'use-on-click-outside'],
      })
      createFolderStructure(appRoot, options.srcDir, (m) => this.log(m), !options.turbo)
      copySkills(root, (m) => this.log(m))
      if (!flags['skip-mcp'])
        for (const id of ALL_TOOL_IDS) writeMcpConfig(TOOL_DEFINITIONS[id], root, {dryRun: false, force: false})
    }

    if (!flags['skip-install']) {
      try {
        execFileSync(packageManager, ['install'], {cwd: root, stdio: 'inherit'})
      } catch {
        this.error(
          `Project files are ready, but dependency installation failed. Run ${packageManager} install in ${root} to retry.`,
        )
      }
    }

    this.log(
      `\nCreated ${args.name}.\n  cd ${args.name}\n${flags['skip-install'] ? `  ${packageManager} install\n` : ''}  ${packageManager} run dev`,
    )
  }
}
