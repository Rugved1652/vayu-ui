import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// In built code, __dirname is dist/; in source, it's src/utils/
const TEMPLATE_DIR = existsSync(join(__dirname, '..', 'templates'))
  ? join(__dirname, '..', 'templates')
  : join(__dirname, 'templates')

const FOLDER_STRUCTURE = {
  api: ['services', 'hooks', 'types'],
  components: [],
  containers: ['Modals', 'Forms', 'PopOver', 'Drawer', 'Card', 'Sections'],
  hooks: [],
  lib: [],
  types: ['api-types', 'enums'],
  utils: ['validations', 'columns'],
  ws: ['services', 'hooks', 'types'],
}

export function createFolderStructure(
  root: string,
  hasSrc: boolean,
  log: (msg: string) => void,
): void {
  const baseDir = hasSrc ? join(root, 'src') : root

  // Create all directories
  for (const [mainDir, subDirs] of Object.entries(FOLDER_STRUCTURE)) {
    const mainPath = join(baseDir, mainDir)
    mkdirSync(mainPath, {recursive: true})

    for (const subDir of subDirs) {
      mkdirSync(join(mainPath, subDir), {recursive: true})
    }
  }

  log(`  Created folder structure`)

  // Write template files
  writeApiTemplate(baseDir, log)
  writeWsTemplate(baseDir, log)
  writeBarrelFiles(baseDir, log)
}

function writeApiTemplate(baseDir: string, log: (msg: string) => void): void {
  const apiPath = join(baseDir, 'api', 'api.ts')
  if (!existsSync(apiPath)) {
    const template = readTemplate('api.ts')
    writeFileSync(apiPath, template)
    log(`    wrote api/api.ts`)
  }
}

function writeWsTemplate(baseDir: string, log: (msg: string) => void): void {
  const wsPath = join(baseDir, 'ws', 'ws.ts')
  if (!existsSync(wsPath)) {
    const template = readTemplate('ws.ts')
    writeFileSync(wsPath, template)
    log(`    wrote ws/ws.ts`)
  }
}

function writeBarrelFiles(baseDir: string, log: (msg: string) => void): void {
  const barrelTemplate = readTemplate('barrel.ts')
  const barrelPaths = [
    join(baseDir, 'api', 'services', 'index.ts'),
    join(baseDir, 'api', 'hooks', 'index.ts'),
    join(baseDir, 'ws', 'services', 'index.ts'),
    join(baseDir, 'ws', 'hooks', 'index.ts'),
  ]

  for (const path of barrelPaths) {
    if (!existsSync(path)) {
      writeFileSync(path, barrelTemplate)
      const relPath = path.replace(baseDir + '/', '')
      log(`    wrote ${relPath}`)
    }
  }
}

function readTemplate(name: string): string {
  const path = join(TEMPLATE_DIR, name)
  if (!existsSync(path)) {
    throw new Error(`Template not found: ${path}`)
  }

  return readFileSync(path, 'utf8')
}
