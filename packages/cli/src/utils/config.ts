import {existsSync, readFileSync, statSync, writeFileSync} from 'node:fs'
import {dirname, isAbsolute, join, relative, resolve} from 'node:path'

import {detectProject, type ProjectInfo} from './project.js'

export const CONFIG_FILE = 'vayu-ui.config.json'
export interface InstalledEntry {
  installedAt: string
  type: 'component' | 'hook'
}
export interface VayuConfig {
  $schema?: string
  aliases?: Partial<Record<'components' | 'hooks' | 'utils', string>>
  cssFile: null | string
  installed: Record<string, InstalledEntry>
  packagePath?: string
  paths?: Partial<Record<'components' | 'hooks' | 'utils', string>>
  tokensFile: string
  uiPath: string
  version: number
}

export function projectPath(root: string, path: string): string {
  if (!path || isAbsolute(path) || path.includes('\\'))
    throw new Error(`Expected a relative project path, received "${path}".`)
  const target = resolve(root, path)
  const rel = relative(root, target)
  if (rel === '..' || rel.startsWith('../'))
    throw new Error(`Path "${path}" escapes the project. Place the config at the workspace root for shared packages.`)
  return target
}

export function readConfig(root: string): null | VayuConfig {
  const path = join(root, CONFIG_FILE)
  if (!existsSync(path)) return null
  let value: VayuConfig
  try {
    value = JSON.parse(readFileSync(path, 'utf8'))
  } catch {
    throw new Error(`Invalid JSON in ${path}.`)
  }

  if (!value || typeof value !== 'object' || Array.isArray(value) || value.version !== 1)
    throw new Error(`Unsupported ${CONFIG_FILE}; expected version 1.`)
  if (typeof value.uiPath !== 'string') throw new Error(`${CONFIG_FILE}: uiPath must be a relative path.`)
  // Recover configs written by older add commands with an empty uiPath.
  value.uiPath ||= detectProject(root).uiDir
  projectPath(root, value.uiPath)
  for (const key of ['paths', 'aliases'] as const) {
    if (value[key] !== undefined && (!value[key] || typeof value[key] !== 'object' || Array.isArray(value[key])))
      throw new Error(`${key} must be an object.`)
    for (const [kind, path] of Object.entries(value[key] ?? {})) {
      if (!['components', 'hooks', 'utils'].includes(kind) || typeof path !== 'string' || !path)
        throw new Error(`Invalid ${key}.${kind}.`)
      if (key === 'paths') projectPath(root, path)
    }
  }

  for (const path of [value.cssFile, value.tokensFile, value.packagePath]) if (path) projectPath(root, path)
  value.installed ??= {}
  if (typeof value.installed !== 'object' || Array.isArray(value.installed))
    throw new Error('installed must be an object.')
  return value
}

export function writeConfig(root: string, config: VayuConfig): void {
  writeFileSync(join(root, CONFIG_FILE), JSON.stringify(config, null, 2) + '\n')
}

export function resolveConfig(cwd = process.cwd()): {config: null | VayuConfig; project: ProjectInfo; root: string} {
  let dir = resolve(cwd)
  if (!existsSync(dir) || !statSync(dir).isDirectory()) throw new Error(`Project directory does not exist: ${cwd}`)
  while (true) {
    if (existsSync(join(dir, CONFIG_FILE))) return {config: readConfig(dir), project: detectProject(dir), root: dir}
    // Nearest configuration wins; a root config can own shared workspace sources.
    if (dirname(dir) === dir) break
    dir = dirname(dir)
  }

  const project = detectProject(cwd)
  return {config: readConfig(project.root), project, root: project.root}
}

export function getUiPath(config: null | VayuConfig, project: ProjectInfo): string {
  return config?.uiPath || project.uiDir
}

export function defaultConfig(project: ProjectInfo): VayuConfig {
  return {
    $schema: 'https://vayu.design/schema/config.json',
    cssFile: project.cssFile,
    installed: {},
    tokensFile: '',
    uiPath: project.uiDir,
    version: 1,
  }
}

export function sourceTarget(source: string, config: VayuConfig): string {
  const [kind, ...parts] = source.split('/')
  const base = config.paths?.[kind as 'components' | 'hooks' | 'utils'] ?? `${config.uiPath}/${kind}`
  return `${base}/${parts.join('/')}`
}

export function markInstalled(
  root: string,
  config: null | VayuConfig,
  entries: Array<{slug: string; type: 'component' | 'hook'}>,
): VayuConfig {
  const base = config ?? defaultConfig(detectProject(root))
  base.installed = {...base.installed}
  for (const entry of entries) base.installed[entry.slug] = {installedAt: new Date().toISOString(), type: entry.type}
  writeConfig(root, base)
  return base
}

export function markUninstalled(root: string, config: VayuConfig, slugs: string[]): VayuConfig {
  for (const slug of slugs) delete config.installed[slug]
  writeConfig(root, config)
  return config
}
