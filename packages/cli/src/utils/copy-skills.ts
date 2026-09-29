import {copyFileSync, existsSync, mkdirSync, readdirSync} from 'node:fs'
import {dirname, join, relative} from 'node:path'
import {fileURLToPath} from 'node:url'

const moduleDir = dirname(fileURLToPath(import.meta.url))
const templates = [
  join(moduleDir, '../templates/skills'),
  join(moduleDir, 'templates/skills'),
  join(moduleDir, '../../../../skills'),
].find((path) => existsSync(path))

export function copySkills(root: string, log: (message: string) => void): void {
  if (!templates) throw new Error('Bundled skills are missing. Rebuild or reinstall the CLI.')
  for (const agent of ['.agents', '.agent', '.claude', '.cursor']) {
    const target = join(root, agent, 'skills')
    mkdirSync(target, {recursive: true})
    for (const entry of readdirSync(templates, {withFileTypes: true})) {
      if (!entry.isDirectory()) continue
      const destination = join(target, entry.name)
      copyTree(join(templates, entry.name), destination)
      log(`  Added ${relative(root, destination)}`)
    }
  }
}

function copyTree(source: string, target: string): void {
  mkdirSync(target, {recursive: true})
  for (const item of readdirSync(source, {withFileTypes: true})) {
    const destination = join(target, item.name)
    if (item.isDirectory()) copyTree(join(source, item.name), destination)
    else if (!existsSync(destination)) copyFileSync(join(source, item.name), destination)
  }
}
