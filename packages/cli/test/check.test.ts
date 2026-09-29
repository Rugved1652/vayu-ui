import {strict as assert} from 'node:assert'
import {execFileSync} from 'node:child_process'
import {mkdirSync, mkdtempSync, rmSync, writeFileSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const CLI_DEV_BIN = join(__dirname, '..', 'bin', 'run.js')

function runCheck(args: string[], cwd: string): {error: Error | null; stderr: string; stdout: string} {
  try {
    const stdout = execFileSync('node', [CLI_DEV_BIN, 'check', ...args], {
      cwd,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    })
    return {error: null, stderr: '', stdout}
  } catch (error_) {
    return {
      error: error_ as Error,
      stderr: (error_ as Error & {stderr?: string}).stderr ?? '',
      stdout: (error_ as Error & {stdout?: string}).stdout ?? '',
    }
  }
}

function createProjectFixture(name: string): string {
  const dir = mkdtempSync(join(tmpdir(), `vayu-check-${name}-`))
  mkdirSync(join(dir, 'src'), {recursive: true})
  writeFileSync(join(dir, 'package.json'), JSON.stringify({name, private: true, version: '0.0.0'}, null, 2))
  return dir
}

describe('check command', () => {
  it('passes in strict mode for clean files', () => {
    const projectDir = createProjectFixture('clean')

    try {
      writeFileSync(
        join(projectDir, 'src', 'clean.tsx'),
        `import { Avatar } from 'vayu-ui'
// Example only: localStorage.getItem('token')

export function CleanCard() {
  return (
    <Avatar size="small" username="Vayu User">
      <Avatar.Initials username="Vayu User" />
    </Avatar>
  )
}
`,
      )

      const result = runCheck(['--strict', '--path', 'src'], projectDir)
      assert.equal(result.error, null, `Expected strict check to pass, got: ${result.stderr}`)
      assert.ok(result.stdout.includes('No compliance issues found'), 'Should print clean report')
    } finally {
      rmSync(projectDir, {force: true, recursive: true})
    }
  })

  it('fails in strict mode when anti-patterns are present', () => {
    const projectDir = createProjectFixture('violations')

    try {
      writeFileSync(
        join(projectDir, 'src', 'bad.tsx'),
        `import { motion } from 'framer-motion'

export function BadCard() {
  const raw = localStorage.getItem('token')
  return (
    <motion.div className="rounded-full w-16 h-16 bg-blue-500 text-white">
      {raw}
    </motion.div>
  )
}
`,
      )

      const result = runCheck(['--strict', '--path', 'src'], projectDir)
      assert.ok(result.error, 'Strict check should fail when violations exist')
      const output = `${result.stdout}\n${result.stderr}`
      assert.ok(output.includes('prefer-use-local-storage'), 'Should report localStorage rule')
      assert.ok(output.includes('animation-component-preferred'), 'Should report framer-motion rule')
    } finally {
      rmSync(projectDir, {force: true, recursive: true})
    }
  })
})
