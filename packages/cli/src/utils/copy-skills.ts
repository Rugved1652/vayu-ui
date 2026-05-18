import {existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync} from 'node:fs'
import {dirname, join, relative} from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const SKILLS_TEMPLATE_DIR = existsSync(join(__dirname, '..', 'templates', 'skills'))
  ? join(__dirname, '..', 'templates', 'skills')
  : join(__dirname, 'templates', 'skills')

export function copySkills(root: string, log: (msg: string) => void): void {
  const skillsDirs = [join(root, '.agents', 'skills'), join(root, '.claude', 'skills')]

  if (!existsSync(SKILLS_TEMPLATE_DIR)) {
    log(`  Skills templates not found at ${SKILLS_TEMPLATE_DIR}`)
    return
  }

  const skillFolders = readdirSync(SKILLS_TEMPLATE_DIR).filter((name) => {
    const stat = statSync(join(SKILLS_TEMPLATE_DIR, name))
    return stat.isDirectory()
  })

  let copiedCount = 0

  for (const skillsDir of skillsDirs) {
    mkdirSync(skillsDir, {recursive: true})

    for (const folder of skillFolders) {
      const srcDir = join(SKILLS_TEMPLATE_DIR, folder)
      const destDir = join(skillsDir, folder)

      mkdirSync(destDir, {recursive: true})

      const files = readdirSync(srcDir)
      for (const file of files) {
        const srcFile = join(srcDir, file)
        const destFile = join(destDir, file)
        const stat = statSync(srcFile)

        if (stat.isFile()) {
          const content = readFileSync(srcFile, 'utf8')
          writeFileSync(destFile, content)
          copiedCount++
        }
      }

      log(`    copied ${relative(root, join(skillsDir, folder))}/`)
    }
  }

  log(`  Copied ${skillFolders.length} skill sets to ${skillsDirs.length} locations (${copiedCount} files)`)
}
