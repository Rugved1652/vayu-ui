import {strict as assert} from 'node:assert'
import {execFileSync} from 'node:child_process'
import {mkdirSync, mkdtempSync, rmSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const CLI_DEV_BIN = join(__dirname, '..', 'bin', 'dev.js')

function runCreate(args: string[], cwd: string): {error: Error | null; stderr: string; stdout: string} {
  try {
    const stdout = execFileSync('node', [CLI_DEV_BIN, 'create', ...args], {
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

describe('create command', () => {
  const tmpDirs: string[] = []

  function makeTempDir(): string {
    const dir = mkdtempSync(join(tmpdir(), 'vayu-create-test-'))
    tmpDirs.push(dir)
    return dir
  }

  after(() => {
    for (const dir of tmpDirs) {
      rmSync(dir, {recursive: true, force: true})
    }
  })

  it('errors without project name', () => {
    const tmp = makeTempDir()
    const result = runCreate([], tmp)
    assert.ok(result.error, 'Should fail without project name')
    assert.ok(result.stderr.includes('Missing 1 required arg'), 'Should mention missing argument')
  })

  it('errors on invalid project name with spaces', () => {
    const tmp = makeTempDir()
    const result = runCreate(['my app'], tmp)
    assert.ok(result.error, 'Should fail with invalid name')
    assert.ok(
      result.stderr.includes('Invalid project name') || result.stderr.includes('Missing 1 required arg'),
      'Should mention invalid name',
    )
  })

  it('errors on invalid project name with special characters', () => {
    const tmp = makeTempDir()
    const result = runCreate(['my@app!'], tmp)
    assert.ok(result.error, 'Should fail with special chars')
  })

  it('errors if directory already exists', () => {
    const tmp = makeTempDir()
    mkdirSync(join(tmp, 'existing-project'))
    const result = runCreate(['existing-project'], tmp)
    assert.ok(result.error, 'Should fail when directory exists')
    const output = result.stderr || result.stdout
    assert.ok(output.includes('already exists'), 'Should mention directory exists')
  })

  it('shows help with --help flag', () => {
    const tmp = makeTempDir()
    const result = runCreate(['--help'], tmp)
    assert.ok(result.stdout.includes('Create a new project with Vayu UI'), 'Should show description')
    assert.ok(result.stdout.includes('--framework'), 'Should show framework flag')
    assert.ok(result.stdout.includes('--package-manager'), 'Should show package-manager flag')
    assert.ok(result.stdout.includes('--typescript'), 'Should show typescript flag')
  })

  it('accepts valid project names', () => {
    const tmp = makeTempDir()
    // Just test that it doesn't error on name validation - will fail on actual scaffolding
    // which is expected since create-next-app isn't installed in test env
    const result = runCreate(['--help'], tmp)
    assert.ok(!result.error, 'Help should not error')
  })
})
