import {execFileSync} from 'node:child_process'
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs'
import {dirname, join, posix, relative} from 'node:path'
import {fileURLToPath} from 'node:url'
import {findEntry, type RegistryEntry, sourceManifest} from 'vayu-ui-registry'

import {markInstalled, projectPath, sourceTarget, type VayuConfig} from './config.js'

const moduleDir = dirname(fileURLToPath(import.meta.url))
const sourceRoot = [
  join(moduleDir, '../registry'),
  join(moduleDir, 'registry'),
  join(moduleDir, '../../../ui/src'),
].find((path) => existsSync(join(path, 'utils/index.ts')))

export function resolveEntries(slugs: string[]): RegistryEntry[] {
  const result: RegistryEntry[] = []
  const seen = new Set<string>()
  const visit = (slug: string) => {
    const entry = findEntry(slug)
    if (!entry) throw new Error(`Unknown slug "${slug}". Run vayu-ui list to see available items.`)
    if (seen.has(entry.slug)) return
    seen.add(entry.slug)
    for (const dependency of entry.registryDependencies) visit(dependency.slug)
    result.push(entry)
  }

  for (const slug of slugs) visit(slug)
  return result
}

export function installationPlan(entries: RegistryEntry[], config: VayuConfig): Map<string, string> {
  if (!sourceRoot) throw new Error('Bundled component sources are missing. Rebuild or reinstall vayu-ui-cli.')
  const files = new Set(entries.flatMap((entry) => sourceManifest[entry.slug as keyof typeof sourceManifest].files))
  const plan = new Map<string, string>()
  for (const source of files) {
    let content = readFileSync(join(sourceRoot, source), 'utf8')
    // Rewrite relative imports when components, hooks and utilities use separate folders.
    content = content.replaceAll(
      /((?:from\s*|import\s*\(|import\s*)['"])(\.[^'"]+)(['"])/g,
      (match, before, spec, after) => {
        const base = posix.normalize(posix.join(posix.dirname(source), spec.replace(/\.js$/, '')))
        const imported = [base, `${base}.ts`, `${base}.tsx`, `${base}/index.ts`, `${base}/index.tsx`].find((path) =>
          files.has(path),
        )
        if (!imported) return match
        let path = relative(dirname(sourceTarget(source, config)), sourceTarget(imported, config))
          .replaceAll('\\', '/')
          .replace(/\.tsx?$/, '')
        if (!path.startsWith('.')) path = `./${path}`
        return `${before}${path}${after}`
      },
    )
    const target = sourceTarget(source, config)
    if (plan.has(target)) throw new Error(`Multiple sources map to ${target}. Check config.paths.`)
    plan.set(target, content)
  }

  return plan
}

export function installEntries(options: {
  config: VayuConfig
  dryRun?: boolean
  log: (message: string) => void
  overwrite?: boolean
  packageManager: string
  root: string
  skipInstall?: boolean
  slugs: string[]
}): void {
  const entries = resolveEntries(options.slugs)
  const plan = installationPlan(entries, options.config)
  // Validate every destination before writing any files.
  for (const path of plan.keys()) projectPath(options.root, path)
  const packageRoot = options.config.packagePath ? projectPath(options.root, options.config.packagePath) : options.root
  const dependencies = Object.fromEntries(
    entries.flatMap((entry) => entry.npmDependencies.map((dep) => [dep.name, dep.version ?? 'latest'])),
  )
  const packageFile = join(packageRoot, 'package.json')
  if (Object.keys(dependencies).length > 0 && !existsSync(packageFile))
    throw new Error(`Missing ${packageFile}. Create a package.json before adding components.`)
  let changed = 0
  for (const [path, content] of plan) {
    const target = projectPath(options.root, path)
    if (existsSync(target) && (!options.overwrite || readFileSync(target, 'utf8') === content)) continue
    changed++
    options.log(`  ${options.dryRun ? 'would write' : 'wrote'} ${path}`)
    if (!options.dryRun) {
      mkdirSync(dirname(target), {recursive: true})
      writeFileSync(target, content)
    }
  }

  if (!options.dryRun) {
    if (Object.keys(dependencies).length > 0) {
      const packageFile = join(packageRoot, 'package.json')
      if (!existsSync(packageFile))
        throw new Error(`Missing ${packageFile}. Create a package.json before adding components.`)
      const pkg = JSON.parse(readFileSync(packageFile, 'utf8'))
      pkg.dependencies ??= {}
      for (const [name, version] of Object.entries(dependencies))
        if (!pkg.dependencies[name] && !pkg.devDependencies?.[name]) pkg.dependencies[name] = version
      writeFileSync(packageFile, JSON.stringify(pkg, null, 2) + '\n')
      markInstalled(options.root, options.config, entries)
      if (!options.skipInstall) execFileSync(options.packageManager, ['install'], {cwd: packageRoot, stdio: 'inherit'})
    }

    markInstalled(options.root, options.config, entries)
  }

  options.log(
    `  ${options.dryRun ? 'Dry run: ' : ''}${entries.length} items, ${changed} files ${options.dryRun ? 'would change' : 'changed'}.`,
  )
}
