import {execFileSync} from 'node:child_process'
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs'
import {dirname, join, relative} from 'node:path'

import {TOKENS_END_MARKER, TOKENS_START_MARKER, VAYU_TOKENS_CSS} from '../templates/tokens.js'
import {projectPath, readConfig, type VayuConfig} from './config.js'
import {confirm, detectProject, type ProjectInfo, readPkg} from './project.js'

const CONFIG_FILE = 'vayu-ui.config.json'
const TOKENS_FILE = 'vayu-ui-tokens.css'
const UI_FOLDERS = ['components', 'hooks', 'utils']

export interface InitOptions {
  cssPath?: string
  error?: (msg: string) => void
  force?: boolean
  log: (msg: string) => void
  merge?: boolean
  root: string
  skipTailwind?: boolean
  uiDir?: string
}

export async function runInit(opts: InitOptions): Promise<void> {
  const {log} = opts
  const error =
    opts.error ??
    ((m: string) => {
      throw new Error(m)
    })
  const project = detectProject(opts.root)

  // Check for existing config
  if (existsSync(join(project.root, CONFIG_FILE))) {
    log('  Found existing vayu-ui.config.json')
    if (!opts.force) {
      const overwrite = await confirm('  Overwrite configuration?')
      if (!overwrite) {
        log('  Keeping existing config. Aborting.')
        return
      }
    }
  }

  const existingConfig = readConfig(project.root)
  const uiDir = opts.uiDir ?? existingConfig?.uiPath ?? project.uiDir
  const cssFile = resolveCssFile(project, opts.cssPath ?? existingConfig?.cssFile ?? undefined)
  projectPath(project.root, uiDir)
  if (cssFile) projectPath(project.root, cssFile)

  // 1. Tailwind check
  if (!opts.skipTailwind) {
    await handleTailwind(project, opts.force, log, error)
  }

  // 2. Create folder structure
  createFolderStructure(project.root, uiDir, log, existingConfig?.paths)

  // 3. Handle CSS tokens
  const tokensRelPath = handleCssTokens(
    project.root,
    cssFile,
    opts.merge || existingConfig?.tokensFile === cssFile,
    log,
    existingConfig?.tokensFile || undefined,
  )

  // 4. Write config
  writeInitConfig(project.root, {cssFile, tokensFile: tokensRelPath, uiDir}, log)
}

function resolveCssFile(project: ProjectInfo, cssPathFlag?: string): null | string {
  if (cssPathFlag) return cssPathFlag
  if (project.cssFile) return project.cssFile

  switch (project.framework) {
    case 'next-app': {
      return project.hasSrc ? 'src/app/globals.css' : 'app/globals.css'
    }

    case 'next-pages': {
      return project.hasSrc ? 'src/styles/globals.css' : 'styles/globals.css'
    }

    default: {
      return project.hasSrc ? 'src/index.css' : 'index.css'
    }
  }
}

async function handleTailwind(
  project: ProjectInfo,
  force: boolean | undefined,
  log: (msg: string) => void,
  error: (msg: string) => void,
): Promise<void> {
  const pkg = readPkg(project.root)
  const deps = {...pkg.dependencies, ...pkg.devDependencies}
  const hasPostcssConfig = ['js', 'cjs', 'mjs', 'ts'].some((ext) =>
    existsSync(join(project.root, `postcss.config.${ext}`)),
  )
  if (project.hasTailwind && (hasPostcssConfig || deps['@tailwindcss/vite'])) {
    log('  Tailwind CSS integration already configured.')
    return
  }

  const missing = ['tailwindcss', '@tailwindcss/postcss', 'postcss'].filter((name) => !deps[name])
  if (missing.length > 0) {
    const shouldInstall = force || (await confirm(`  Install ${missing.join(', ')} for Tailwind CSS v4?`))
    if (!shouldInstall) {
      log('  Skipping Tailwind installation. You can install it manually later.')
      return
    }

    const args = [project.packageManager === 'npm' ? 'install' : 'add', '-D', ...missing]
    log(`  Running: ${project.packageManager} ${args.join(' ')}`)
    try {
      execFileSync(project.packageManager, args, {cwd: project.root, stdio: 'pipe'})
    } catch (error_: unknown) {
      error(`Failed to install Tailwind: ${error_ instanceof Error ? error_.message : String(error_)}`)
      return
    }
  }

  if (!hasPostcssConfig) {
    writeFileSync(
      join(project.root, 'postcss.config.mjs'),
      'export default {\n  plugins: {\n    "@tailwindcss/postcss": {},\n  },\n};\n',
    )
    log('  Created postcss.config.mjs')
  }
}

function createFolderStructure(
  root: string,
  uiDir: string,
  log: (msg: string) => void,
  paths?: VayuConfig['paths'],
): void {
  for (const sub of UI_FOLDERS) {
    const dir = projectPath(root, paths?.[sub as keyof NonNullable<VayuConfig['paths']>] ?? `${uiDir}/${sub}`)
    if (!existsSync(dir)) {
      mkdirSync(dir, {recursive: true})
    }
  }

  log(`  Prepared component, hook and utility folders`)
}

function handleCssTokens(
  root: string,
  cssFile: null | string,
  merge: boolean,
  log: (msg: string) => void,
  configuredTokens?: string,
): string {
  const tokensContent = `${TOKENS_START_MARKER}\n${VAYU_TOKENS_CSS}\n${TOKENS_END_MARKER}`

  if (merge && cssFile) {
    const absPath = join(root, cssFile)
    mkdirSync(dirname(absPath), {recursive: true})
    let existing = existsSync(absPath) ? readFileSync(absPath, 'utf8') : ''
    if (configuredTokens && configuredTokens !== cssFile) {
      const tokenPath = projectPath(root, configuredTokens)
      existing = existing.replaceAll(/@import\s+['"]([^'"]+)['"];?\s*/g, (match, specifier: string) =>
        join(dirname(absPath), specifier) === tokenPath ? '' : match,
      )
    }

    if (existing.includes(TOKENS_START_MARKER)) {
      const start = existing.indexOf(TOKENS_START_MARKER)
      const end = existing.indexOf(TOKENS_END_MARKER) + TOKENS_END_MARKER.length
      if (!existing.includes(TOKENS_END_MARKER)) throw new Error(`Missing token end marker in ${cssFile}`)
      const updated = existing.slice(0, Math.max(0, start)) + tokensContent + existing.slice(Math.max(0, end))
      writeFileSync(absPath, updated)
      log(`  Updated tokens in ${cssFile}`)
    } else {
      const importLine = /@import\s+['"]tailwindcss['"]/.test(existing) ? '' : "@import 'tailwindcss';\n"
      writeFileSync(absPath, `${importLine}${existing}\n\n${tokensContent}\n`)
      log(`  Appended tokens to ${cssFile}`)
    }

    return cssFile
  }

  const cssDir = cssFile ? dirname(join(root, cssFile)) : root
  mkdirSync(cssDir, {recursive: true})
  const tokensPath = configuredTokens ? projectPath(root, configuredTokens) : join(cssDir, TOKENS_FILE)
  mkdirSync(dirname(tokensPath), {recursive: true})
  const tokensRelPath = relative(root, tokensPath)

  writeFileSync(tokensPath, `@import 'tailwindcss';\n\n${tokensContent}\n`)
  log(`  Created ${tokensRelPath}`)

  if (cssFile && !merge) {
    const absPath = join(root, cssFile)
    mkdirSync(dirname(absPath), {recursive: true})
    if (!existsSync(absPath)) {
      writeFileSync(absPath, '')
      log(`  Created ${cssFile}`)
    }

    if (existsSync(absPath)) {
      const existing = readFileSync(absPath, 'utf8')
      const tokenImport = relative(cssDir, tokensPath).replaceAll('\\', '/')
      const importLine = `@import '${tokenImport.startsWith('.') ? tokenImport : `./${tokenImport}`}';`
      if (!existing.includes(importLine)) {
        writeFileSync(absPath, `${importLine}\n${existing}`)
        log(`  Added @import to ${cssFile}`)
      }
    }
  }

  return tokensRelPath
}

function writeInitConfig(
  root: string,
  paths: {cssFile: null | string; tokensFile: string; uiDir: string},
  log: (msg: string) => void,
): void {
  const config = {
    ...readConfig(root),
    $schema: 'https://vayu.design/schema/config.json',
    cssFile: paths.cssFile,
    installed: readConfig(root)?.installed ?? {},
    tokensFile: paths.tokensFile,
    uiPath: paths.uiDir,
    version: 1,
  }
  writeFileSync(join(root, CONFIG_FILE), JSON.stringify(config, null, 2) + '\n')
  log(`  Created ${CONFIG_FILE}`)
}
