/* eslint-disable unicorn/consistent-function-scoping -- Recursive AST visitor closes over each source file. */
import {strict as assert} from 'node:assert'
import {execFileSync} from 'node:child_process'
import {existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {dirname, join, resolve} from 'node:path'
import {parse as parseToml} from 'smol-toml'
import ts from 'typescript'
import {allEntries} from 'vayu-ui-registry'

import {readConfig} from '../src/utils/config.js'
import {installationPlan, resolveEntries} from '../src/utils/installer.js'
import {ALL_TOOL_IDS, TOOL_DEFINITIONS, writeMcpConfig} from '../src/utils/mcp-config.js'
const bin = resolve('bin/run.js')
const dirs: string[] = []
const temp = () => {
  const dir = mkdtempSync(join(tmpdir(), 'vayu-stability-'))
  dirs.push(dir)
  return dir
}

const run = (cwd: string, ...args: string[]) =>
  execFileSync(process.execPath, [bin, ...args], {cwd, encoding: 'utf8', stdio: 'pipe'})
const json = (path: string) => JSON.parse(readFileSync(path, 'utf8'))
const project = () => {
  const root = temp()
  writeFileSync(join(root, 'package.json'), '{"name":"fixture","private":true}')
  mkdirSync(join(root, 'src'))
  return root
}

const config = {cssFile: null, installed: {}, tokensFile: '', uiPath: 'src/ui', version: 1}
after(() => {
  for (const dir of dirs) rmSync(dir, {force: true, recursive: true})
})

describe('stability', () => {
  describe('complete source registry', () => {
    it('resolves every relative source import for every component and hook installed alone', () => {
      for (const entry of allEntries) {
        const files = installationPlan(resolveEntries([entry.slug]), {
          ...config,
          paths: {components: 'lib/widgets', hooks: 'features/hooks', utils: 'shared/lib'},
        })
        for (const [path, source] of files) {
          const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true)
          const check = (specifier: string) => {
            if (!specifier.startsWith('.')) return
            const base = join(dirname(path), specifier).replaceAll('\\', '/')
            assert.ok(
              [base, `${base}.ts`, `${base}.tsx`, `${base}/index.ts`].some((candidate) => files.has(candidate)),
              `${entry.slug}: ${path} cannot resolve ${specifier}`,
            )
          }

          const visit = (node: ts.Node) => {
            if (
              (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
              node.moduleSpecifier &&
              ts.isStringLiteral(node.moduleSpecifier)
            )
              check(node.moduleSpecifier.text)
            if (
              ts.isImportTypeNode(node) &&
              ts.isLiteralTypeNode(node.argument) &&
              ts.isStringLiteral(node.argument.literal)
            )
              check(node.argument.literal.text)
            ts.forEachChild(node, visit)
          }

          visit(ast)
        }
      }
    })
  })

  describe('CLI lifecycle', () => {
    it('adds all entries, repairs missing files on update, and removes an item', () => {
      const root = project()
      run(root, 'add', '--all', '--yes', '--skip-install')
      const saved = readConfig(root)!
      assert.equal(saved.uiPath, 'src/ui')
      assert.equal(Object.keys(saved.installed).length, allEntries.length)
      for (const file of installationPlan(resolveEntries(allEntries.map((e) => e.slug)), saved).keys())
        assert.ok(existsSync(join(root, file)), file)
      rmSync(join(root, 'src/ui/components/Modal'), {recursive: true})
      run(root, 'update', 'modal', '--skip-install')
      assert.ok(existsSync(join(root, 'src/ui/components/Modal/index.ts')))
      run(root, 'remove', 'modal', '--force')
      assert.ok(!existsSync(join(root, 'src/ui/components/Modal')))
      assert.ok(!readConfig(root)!.installed.modal)
      assert.ok(existsSync(join(root, 'src/ui/utils/input-styles.ts')))
    })

    it('adds Select alone with its exact-case files and required hooks', () => {
      const root = project()
      run(root, 'add', 'select', '--skip-install')
      for (const path of [
        'components/Select/index.ts',
        'components/Select/Selectitem.tsx',
        'components/Select/SelectOptionList.tsx',
        'components/Select/SelectStates.tsx',
        'hooks/useKeyPress.ts',
        'hooks/useLockBodyScroll.ts',
        'hooks/useOnClickOutside.ts',
        'utils/input-styles.ts',
      ]) {
        assert.ok(existsSync(join(root, 'src/ui', path)), path)
      }

      const saved = readConfig(root)!
      for (const slug of ['select', 'use-key-press', 'use-lock-body-scroll', 'use-on-click-outside'])
        assert.ok(saved.installed[slug], slug)
      const deps = json(join(root, 'package.json')).dependencies
      assert.ok(deps.clsx)
      assert.ok(deps['lucide-react'])
    })

    it('adds multiple components and hooks with flags between positional arguments', () => {
      const root = project()
      run(root, 'add', 'select', 'modal', '--skip-install', 'drawer', 'text-input', 'use-in-view', 'select')
      for (const name of ['Select', 'Modal', 'Drawer', 'TextInput']) {
        assert.ok(existsSync(join(root, `src/ui/components/${name}/index.ts`)), name)
      }

      assert.ok(existsSync(join(root, 'src/ui/hooks/useInView.ts')))
      const saved = readConfig(root)!
      for (const slug of ['select', 'modal', 'drawer', 'text-input', 'use-in-view'])
        assert.ok(saved.installed[slug], slug)
      assert.equal(Object.keys(saved.installed).filter((slug) => slug === 'select').length, 1)
    })

    it('rejects an invalid item in a multiple-add request before writing other items', () => {
      const root = project()
      assert.throws(() => run(root, 'add', 'select', 'not-a-component', 'modal', '--skip-install'))
      assert.ok(!existsSync(join(root, 'src/ui')))
      assert.ok(!existsSync(join(root, 'vayu-ui.config.json')))
    })

    it('generates in noninteractive agent usage without silently skipping', () => {
      const root = project()
      run(root, 'add', 'button', '--skip-install')
      assert.ok(existsSync(join(root, 'src/ui/components/Button/index.ts')))
    })

    it('configures PostCSS when Tailwind dependencies already exist', () => {
      const root = project()
      writeFileSync(
        join(root, 'package.json'),
        JSON.stringify({
          devDependencies: {'@tailwindcss/postcss': '^4', postcss: '^8', tailwindcss: '^4'},
          name: 'fixture',
        }),
      )
      run(root, 'init', '--force')
      assert.ok(existsSync(join(root, 'postcss.config.mjs')))
    })

    it('keeps dry runs side-effect free and rejects unknown slugs', () => {
      const root = project()
      run(root, 'add', 'modal', '--dry-run')
      assert.ok(!existsSync(join(root, 'vayu-ui.config.json')))
      assert.ok(!existsSync(join(root, 'src/ui')))
      assert.throws(() => run(root, 'add', 'not-a-component', '--yes', '--skip-install'))
    })

    it('respects split folders, nested execution and workspace targeting', () => {
      const root = project()
      writeFileSync(
        join(root, 'vayu-ui.config.json'),
        JSON.stringify({...config, paths: {components: 'widgets', hooks: 'data/hooks', utils: 'shared'}}),
      )
      mkdirSync(join(root, 'src/deep'), {recursive: true})
      run(join(root, 'src/deep'), 'add', 'text-input', 'use-in-view', '--yes', '--skip-install')
      assert.ok(existsSync(join(root, 'widgets/TextInput/Input.tsx')))
      assert.ok(existsSync(join(root, 'data/hooks/useInView.ts')))
      assert.ok(readFileSync(join(root, 'widgets/TextInput/Input.tsx'), 'utf8').includes('../../shared/index'))
      run(temp(), 'remove', 'text-input', '--cwd', root, '--force')
      assert.ok(!existsSync(join(root, 'widgets/TextInput')))
    })

    it('preserves configured folders and installed items when init is repeated', () => {
      const root = project()
      run(root, 'init', '--skip-tailwind', '--force', '--path', 'src/primitives')
      run(root, 'add', 'button', '--yes', '--skip-install')
      run(root, 'init', '--skip-tailwind', '--force')
      assert.equal(readConfig(root)!.uiPath, 'src/primitives')
      assert.ok(readConfig(root)!.installed.button)
      run(root, 'update', '--css', '--skip-install')
      assert.ok(readFileSync(join(root, readConfig(root)!.tokensFile), 'utf8').includes('--color-brand'))
    })

    it('uses component aliases and root config across nested workspace packages', () => {
      const root = project()
      writeFileSync(
        join(root, 'vayu-ui.config.json'),
        JSON.stringify({...config, packagePath: 'packages/ui', uiPath: 'packages/ui/src'}),
      )
      mkdirSync(join(root, 'packages/ui'), {recursive: true})
      mkdirSync(join(root, 'apps/web/src'), {recursive: true})
      writeFileSync(join(root, 'packages/ui/package.json'), '{"name":"@repo/ui","private":true}')
      writeFileSync(join(root, 'apps/web/package.json'), '{"name":"@repo/web","private":true}')
      run(join(root, 'apps/web/src'), 'add', 'textinput', 'tabs', '--yes', '--skip-install')
      assert.ok(existsSync(join(root, 'packages/ui/src/components/TextInput/index.ts')))
      assert.ok(existsSync(join(root, 'packages/ui/src/components/Tab/index.ts')))
      assert.ok(readConfig(root)!.installed['text-input'])
      assert.ok(json(join(root, 'packages/ui/package.json')).dependencies.clsx)
      run(join(root, 'apps/web'), 'remove', 'textinput', '--force')
      assert.ok(!readConfig(root)!.installed['text-input'])
    })

    it('preserves a custom token file and merges without duplicate blocks on reinit', () => {
      const root = project()
      writeFileSync(
        join(root, 'vayu-ui.config.json'),
        JSON.stringify({...config, cssFile: 'src/app.css', tokensFile: 'theme/tokens.css'}),
      )
      run(root, 'init', '--skip-tailwind', '--force')
      assert.equal(readConfig(root)!.tokensFile, 'theme/tokens.css')
      assert.ok(readFileSync(join(root, 'src/app.css'), 'utf8').includes('../theme/tokens.css'))
      run(root, 'init', '--skip-tailwind', '--force', '--merge')
      run(root, 'init', '--skip-tailwind', '--force')
      assert.equal(readConfig(root)!.tokensFile, 'src/app.css')
      const css = readFileSync(join(root, 'src/app.css'), 'utf8')
      assert.equal(css.match(/--color-brand:/g)?.length, 1)
    })

    it('rejects paths outside the config root before generating', () => {
      const root = project()
      writeFileSync(join(root, 'vayu-ui.config.json'), JSON.stringify({...config, uiPath: '../escape'}))
      assert.throws(() => run(root, 'add', 'button', '--yes', '--skip-install'))
    })
  })

  describe('create variants', () => {
    for (const framework of ['vite', 'next'])
      for (const turbo of [false, true])
        for (const typescript of [false, true]) {
          it(`${framework}, turbo=${turbo}, typescript=${typescript}: creates complete offline starter`, () => {
            const cwd = temp()
            run(
              cwd,
              'create',
              'starter',
              '--framework',
              framework,
              '--skip-install',
              '--force',
              ...(turbo ? ['--turbo'] : []),
              ...(typescript ? [] : ['--no-typescript']),
              '--package-manager',
              'npm',
            )
            const root = join(cwd, 'starter')
            if (framework === 'vite' && !turbo && typescript) run(root, 'check', '--strict')
            const app = turbo ? join(root, 'apps/web') : root
            const ui = turbo ? join(root, 'packages/ui/src') : join(root, 'src/ui')
            assert.ok(existsSync(join(ui, 'utils/use-merge-refs.ts')))
            for (const path of [
              'components/Select/index.ts',
              'components/Select/Selectitem.tsx',
              'hooks/useKeyPress.ts',
              'hooks/useLockBodyScroll.ts',
              'utils/input-styles.ts',
            ])
              assert.ok(existsSync(join(ui, path)), path)
            assert.ok(readConfig(root)!.installed.select)

            assert.ok(existsSync(join(root, '.agents/skills/taste-design/SKILL.md')))
            assert.ok(existsSync(join(root, '.codex/config.toml')))
            assert.ok(json(join(turbo ? join(root, 'packages/ui') : root, 'package.json')).dependencies.clsx)
            assert.ok(json(join(app, 'package.json')).devDependencies.tailwindcss)
            assert.ok(!existsSync(join(root, 'node_modules')))
            const ext = typescript ? 'tsx' : 'jsx'
            if (framework === 'vite')
              assert.ok(!readFileSync(join(app, `src/main.${ext}`), 'utf8').includes("('root')!"))
            if (turbo) assert.ok(existsSync(join(root, 'turbo.json')))
          })
        }

    it('supports no-src, Pages Router, and no-Tailwind', () => {
      const cwd = temp()
      run(
        cwd,
        'create',
        'starter',
        '--framework',
        'next',
        '--skip-install',
        '--skip-mcp',
        '--no-src-dir',
        '--no-app-router',
        '--no-tailwind',
        '--no-eslint',
      )
      const root = join(cwd, 'starter')
      assert.ok(existsSync(join(root, 'pages/_app.tsx')))
      assert.ok(existsSync(join(root, 'ui/components/Typography/index.ts')))
      assert.ok(!json(join(root, 'package.json')).devDependencies.tailwindcss)
      assert.ok(!existsSync(join(root, 'eslint.config.mjs')))
    })
  })

  describe('MCP configurations', () => {
    it('configures all clients through the noninteractive CLI and previews safely', () => {
      const root = project()
      run(root, 'install-mcp', '--all', '--dry-run')
      assert.ok(!existsSync(join(root, '.codex/config.toml')))
      run(root, 'install-mcp', '--all')
      for (const id of ALL_TOOL_IDS) assert.ok(existsSync(join(root, TOOL_DEFINITIONS[id].configFileName)))
      run(root, 'install-mcp', '--tool', 'codex,cursor')
      assert.throws(() => run(root, 'install-mcp', '--tool', 'missing'))
    })

    for (const id of ALL_TOOL_IDS)
      it(`writes and preserves ${id} settings`, () => {
        const root = temp()
        const def = TOOL_DEFINITIONS[id]
        const path = join(root, def.configFileName)
        mkdirSync(dirname(path), {recursive: true})
        writeFileSync(
          path,
          id === 'codex'
            ? 'model = "test-model"\n[mcp_servers.other]\ncommand = "other"\n'
            : JSON.stringify({[def.topLevelKey]: {other: {command: 'other'}}, setting: true}),
        )
        const before = readFileSync(path, 'utf8')
        writeMcpConfig(def, root, {dryRun: true, force: false})
        assert.equal(readFileSync(path, 'utf8'), before)
        writeMcpConfig(def, root, {dryRun: false, force: false})
        const content = readFileSync(path, 'utf8')
        const value: Record<string, Record<string, unknown>> = id === 'codex' ? parseToml(content) : JSON.parse(content)
        assert.ok(value[def.topLevelKey].other)
        assert.ok(value[def.topLevelKey]['vayu-ui'])
        assert.equal(writeMcpConfig(def, root, {dryRun: false, force: false}).action, 'skipped-exists')
        assert.equal(readFileSync(path, 'utf8'), content)
      })

    it('preserves VS Code comments and fails before writing malformed config', () => {
      const root = temp()
      mkdirSync(join(root, '.vscode'))
      const file = join(root, '.vscode/mcp.json')
      writeFileSync(file, '{\n// local server\n"servers": {},\n}')
      writeMcpConfig(TOOL_DEFINITIONS.vscode, root, {dryRun: false, force: false})
      assert.ok(readFileSync(file, 'utf8').includes('// local server'))
      writeFileSync(file, '{ invalid')
      assert.throws(() => writeMcpConfig(TOOL_DEFINITIONS.vscode, root, {dryRun: false, force: false}))
      assert.equal(readFileSync(file, 'utf8'), '{ invalid')
    })
  })
})
