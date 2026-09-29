import {Command, Flags, ux} from '@oclif/core'
import {existsSync, readdirSync, readFileSync, statSync} from 'node:fs'
import {extname, join, relative, resolve, sep} from 'node:path'
import {allEntries, type DoNotRule, type RegistryCapability} from 'vayu-ui-registry'

import {resolveConfig, sourceTarget} from '../utils/config.js'

type Severity = 'error' | 'warn'

interface Violation {
  file: string
  message: string
  rule: string
  severity: Severity
  suggestion: string
}

interface CapabilityCatalog {
  names: Record<RegistryCapability, string[]>
  slugs: Record<RegistryCapability, string[]>
}

const SCANNED_EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx'])
const SKIP_DIRS = new Set([
  '.git',
  '.next',
  '.turbo',
  'build',
  'coverage',
  'dist',
  'node_modules',
  'out',
  'storybook-static',
])

function findRule(slug: string, matcher: (rule: DoNotRule) => boolean): DoNotRule | undefined {
  const entry = allEntries.find((item) => item.slug === slug)
  return entry?.doNot.find((rule) => matcher(rule))
}

function createCapabilityCatalog(): CapabilityCatalog {
  const capabilities: RegistryCapability[] = [
    'content-primitive',
    'surface-primitive',
    'overlay-primitive',
    'feedback-primitive',
    'navigation-primitive',
    'state-persistence',
    'animation-primitive',
  ]
  const names = Object.fromEntries(capabilities.map((capability) => [capability, [] as string[]])) as Record<
    RegistryCapability,
    string[]
  >
  const slugs = Object.fromEntries(capabilities.map((capability) => [capability, [] as string[]])) as Record<
    RegistryCapability,
    string[]
  >

  for (const entry of allEntries) {
    for (const capability of entry.capabilities ?? []) {
      names[capability].push(entry.name)
      slugs[capability].push(entry.slug)
    }
  }

  return {names, slugs}
}

function normalizeWhitespace(value: string): string {
  return value.replaceAll(/\s+/g, ' ').trim()
}

function toRelativePath(root: string, filePath: string): string {
  return relative(root, filePath).replaceAll('\\', '/')
}

function collectSourceFiles(root: string): string[] {
  const files: string[] = []

  const walk = (dir: string): void => {
    for (const entry of readdirSync(dir)) {
      const abs = join(dir, entry)
      const stat = statSync(abs)

      if (stat.isDirectory()) {
        if (SKIP_DIRS.has(entry)) continue
        walk(abs)
        continue
      }

      if (SCANNED_EXTENSIONS.has(extname(entry))) {
        files.push(abs)
      }
    }
  }

  walk(root)
  return files
}

function listCapabilitySuggestions(capability: RegistryCapability, catalog: CapabilityCatalog): string {
  const names = catalog.names[capability]
  const slugs = catalog.slugs[capability]
  if (names.length === 0) {
    return 'Use MCP discovery (`find_component` -> `get_component_summary`) to select a matching Vayu primitive.'
  }

  const paired = names.map((name, index) => `${name} (${slugs[index]})`)
  return `Use a ${capability} from Vayu: ${paired.join(', ')}.`
}

function fileUsesCapability(content: string, capability: RegistryCapability, catalog: CapabilityCatalog): boolean {
  for (const componentName of catalog.names[capability]) {
    const usagePattern = new RegExp(`<${componentName}\\b|${componentName}\\.`, 'm')
    const importPattern = new RegExp(`\\b${componentName}\\b`, 'm')
    if (usagePattern.test(content) || importPattern.test(content)) {
      return true
    }
  }

  return false
}

function detectFramerMotion(file: string, content: string, animationRule: DoNotRule | undefined): Violation[] {
  const regex = /from\s+['"]framer-motion['"]|import\s*\(\s*['"]framer-motion['"]\s*\)/m
  if (!regex.test(content)) return []

  return [
    {
      file,
      message: 'Found framer-motion import; prefer Vayu Animation and token animations.',
      rule: 'animation-component-preferred',
      severity: 'error',
      suggestion:
        animationRule?.good ??
        'Replace framer-motion usage with `Animation` compound variants (`Animation.Fade`, `Animation.Slide`, `Animation.Zoom`) and token-backed animation classes.',
    },
  ]
}

function detectRawLocalStorage(
  file: string,
  content: string,
  localStorageRule: DoNotRule | undefined,
  useLocalStorageInstalled: boolean,
): Violation[] {
  const lowerPath = file.toLowerCase()
  if (lowerPath.includes('/templates/')) return []
  if (lowerPath.includes('uselocalstorage.ts') || lowerPath.includes('use-local-storage.ts')) return []

  const regex = /localStorage\.(getItem|setItem|removeItem|clear)\(/g
  if (!regex.test(content)) return []

  const installHint = useLocalStorageInstalled
    ? 'The project already has `useLocalStorage` installed.'
    : 'Install with `npx vayu-ui-cli add use-local-storage` and migrate raw storage access.'

  return [
    {
      file,
      message: 'Found direct localStorage usage outside useLocalStorage hook.',
      rule: 'prefer-use-local-storage',
      severity: 'error',
      suggestion:
        `${normalizeWhitespace(localStorageRule?.good ?? '')} ${installHint}`.trim() ||
        'Use `useLocalStorage` instead of direct `localStorage` reads/writes in components.',
    },
  ]
}

function detectContentPrimitiveIntent(file: string, content: string, catalog: CapabilityCatalog): Violation[] {
  if (!file.endsWith('.tsx') && !file.endsWith('.jsx')) return []
  const semanticTextPattern = /<h[1-6]\b|<p\b/m
  if (!semanticTextPattern.test(content)) return []

  return [
    {
      file,
      message:
        'Detected semantic text tags (`h1-h6` or `p`) in application code. Use Typography for application headings and paragraphs.',
      rule: 'capability-content-primitive-required',
      severity: 'warn',
      suggestion: `${listCapabilitySuggestions('content-primitive', catalog)} If you intentionally keep raw HTML tags, document a one-line justification.`,
    },
  ]
}

function detectSurfacePrimitiveIntent(file: string, content: string, catalog: CapabilityCatalog): Violation[] {
  if (!file.endsWith('.tsx') && !file.endsWith('.jsx')) return []
  const surfacePattern =
    /className\s*=\s*["'`][^"'`]*(?:rounded-(?:surface|overlay|xl|2xl|3xl)|shadow-(?:surface|elevated)|border)[^"'`]*["'`]/m
  if (!surfacePattern.test(content)) return []
  if (fileUsesCapability(content, 'surface-primitive', catalog)) return []

  return [
    {
      file,
      message:
        'Detected surface-container styling intent (rounded/shadow/border) without a registered Vayu surface primitive.',
      rule: 'capability-surface-primitive-required',
      severity: 'warn',
      suggestion: `${listCapabilitySuggestions('surface-primitive', catalog)} If a custom container is required, add a short architectural justification.`,
    },
  ]
}

function detectCustomAvatar(file: string, content: string, avatarRule: DoNotRule | undefined): Violation[] {
  const classLikeAvatarRegex = /className\s*=\s*["'`][^"'`]*rounded-full[^"'`]*(?:w-\d+|h-\d+)[^"'`]*bg-[^"'`]*["'`]/m
  const hasAvatarImport = /import\s+.*\bAvatar\b.*from\s+['"][^'"]+['"]/m.test(content) || /<Avatar\b/m.test(content)
  if (!classLikeAvatarRegex.test(content) || hasAvatarImport) return []

  return [
    {
      file,
      message: 'Detected custom rounded avatar block without Vayu Avatar component.',
      rule: 'prefer-avatar-component',
      severity: 'warn',
      suggestion:
        avatarRule?.good ??
        'Use `Avatar` with `size` and `Avatar.Initials`/`Avatar.Image` instead of hand-rolled rounded divs.',
    },
  ]
}

function detectCustomPopover(file: string, content: string, popoverRule: DoNotRule | undefined): Violation[] {
  const hasOverlayPattern =
    /className\s*=\s*["'`][^"'`]*fixed[^"'`]*inset-0[^"'`]*["'`]/m.test(content) ||
    /onClick=\{[^}]*set\w+\(false\)/m.test(content)
  const usesPopover = /<Popover\b|Popover\./m.test(content)
  if (!hasOverlayPattern || usesPopover) return []

  return [
    {
      file,
      message: 'Detected custom overlay/dropdown close pattern without Vayu Popover/Modal primitives.',
      rule: 'prefer-popover-or-modal',
      severity: 'warn',
      suggestion:
        popoverRule?.good ??
        'Replace custom overlay/dropdown logic with `Popover` (or `Modal` for dialog flows) and apply MCP a11y guidance.',
    },
  ]
}

function detectCustomSidebar(file: string, content: string, sidebarRule: DoNotRule | undefined): Violation[] {
  const hasAsideNav = /<aside\b[\s\S]*<nav\b|<nav\b[\s\S]*<aside\b/m.test(content)
  const usesSidebar = /<Sidebar\b|SidebarProvider|SidebarMenuItem|MobileMenuButton/m.test(content)
  if (!hasAsideNav || usesSidebar) return []

  return [
    {
      file,
      message: 'Detected custom sidebar structure without Vayu Sidebar primitives.',
      rule: 'prefer-sidebar-component',
      severity: 'warn',
      suggestion:
        sidebarRule?.good ??
        'Use `SidebarProvider`, `Sidebar`, `SidebarMenu`, and `SidebarMenuItem` instead of custom `<aside>/<nav>` implementations.',
    },
  ]
}

function runDetectors(
  file: string,
  content: string,
  context: {
    animationRule?: DoNotRule
    avatarRule?: DoNotRule
    capabilityCatalog: CapabilityCatalog
    localStorageRule?: DoNotRule
    popoverRule?: DoNotRule
    sidebarRule?: DoNotRule
    useLocalStorageInstalled: boolean
  },
): Violation[] {
  return [
    ...detectFramerMotion(file, content, context.animationRule),
    ...detectRawLocalStorage(file, content, context.localStorageRule, context.useLocalStorageInstalled),
    ...detectContentPrimitiveIntent(file, content, context.capabilityCatalog),
    ...detectSurfacePrimitiveIntent(file, content, context.capabilityCatalog),
    ...detectCustomAvatar(file, content, context.avatarRule),
    ...detectCustomPopover(file, content, context.popoverRule),
    ...detectCustomSidebar(file, content, context.sidebarRule),
  ]
}

export default class Check extends Command {
  static description =
    'Scans source files for common anti-patterns (raw localStorage, custom avatar/sidebar/dropdown patterns, framer-motion imports) and suggests Vayu component/hook replacements based on registry doNot guidance.'
  static examples = [
    '<%= config.bin %> check',
    '<%= config.bin %> check --strict',
    '<%= config.bin %> check --path src',
  ]
  static flags = {
    cwd: Flags.string({description: 'Target project or workspace directory'}),
    path: Flags.string({
      description: 'Directory to scan (relative to project root)',
      required: false,
    }),
    strict: Flags.boolean({
      default: false,
      description: 'Exit with code 1 when violations are found',
      required: false,
    }),
  }
  static summary = 'Detect anti-patterns and suggest Vayu replacements'

  async run(): Promise<void> {
    const {flags} = await this.parse(Check)
    const {config, root} = resolveConfig(flags.cwd)
    const scanRoot = join(root, flags.path ?? '.')

    if (!existsSync(scanRoot)) {
      this.error(`Path does not exist: ${flags.path ?? '.'}`)
    }

    const capabilityCatalog = createCapabilityCatalog()
    const localStorageRule = findRule('use-local-storage', (rule) =>
      rule.title.toLowerCase().includes('localstorage key outside the lazy initializer'),
    )
    const avatarRule = findRule('avatar', (rule) => rule.title.toLowerCase().includes('hardcoding avatar colors'))
    const popoverRule = findRule('popover', (rule) => rule.title.toLowerCase().includes('trigger without aschild'))
    const sidebarRule = findRule('sidebar', (rule) => rule.title.toLowerCase().includes('sidebar components outside'))
    const animationRule = findRule('animation', (rule) => rule.title.toLowerCase().includes('nesting animation'))
    const useLocalStorageInstalled = Boolean(config?.installed?.['use-local-storage'])

    const generatedDirs = config
      ? ['components', 'hooks', 'utils'].map((kind) => resolve(root, sourceTarget(`${kind}/`, config)))
      : []
    const files = collectSourceFiles(scanRoot).filter(
      (file) => !generatedDirs.some((dir) => file.startsWith(dir + sep) || file === dir),
    )
    const violations: Violation[] = []

    for (const absPath of files) {
      const content = readFileSync(absPath, 'utf8').replaceAll(/^\s*\/\/.*$/gm, '')
      const relativePath = toRelativePath(root, absPath)
      if (/<(?:Typography\.H[1-6]|h[1-6])\b[^>]*className=["'][^"']*(?:text-[4-9]xl|text-\[[^\]]+\])/.test(content)) {
        violations.push({
          file: relativePath,
          message: 'Large display heading detected. Confirm this is an intentional hero, not an application panel.',
          rule: 'heading-scale',
          severity: 'warn',
          suggestion:
            'Use Typography and the text-h1–text-h6 scale for application headings; reserve display sizes for an explicit hero design.',
        })
      }

      violations.push(
        ...runDetectors(relativePath, content, {
          animationRule,
          avatarRule,
          capabilityCatalog,
          localStorageRule,
          popoverRule,
          sidebarRule,
          useLocalStorageInstalled,
        }),
      )
    }

    const errors = violations.filter((violation) => violation.severity === 'error')
    const warnings = violations.filter((violation) => violation.severity === 'warn')

    this.log('')
    this.log(ux.colorize('bold', '  Vayu UI Compliance Report'))
    this.log(ux.colorize('dim', '  ─────────────────────────────────────────────────────'))
    this.log(ux.colorize('dim', `  Scanned files: ${files.length}`))
    this.log(ux.colorize('dim', `  Errors: ${errors.length}  Warnings: ${warnings.length}`))

    if (violations.length === 0) {
      this.log('')
      this.log(ux.colorize('green', '  No compliance issues found.'))
      this.log('')
      return
    }

    for (const violation of violations) {
      this.log('')
      const color = violation.severity === 'error' ? 'red' : 'yellow'
      this.log(ux.colorize(color, `  ${violation.severity.toUpperCase()}  ${violation.file}`))
      this.log(`    Rule: ${violation.rule}`)
      this.log(`    Issue: ${violation.message}`)
      this.log(`    Suggested fix: ${normalizeWhitespace(violation.suggestion)}`)
    }

    this.log('')
    this.log(
      ux.colorize('dim', '  Tip: run MCP discovery before implementation (find_component -> get_component_summary).'),
    )
    this.log('')

    if (flags.strict && violations.length > 0) {
      this.error(`Compliance check failed with ${violations.length} issue(s).`, {exit: 1})
    }
  }
}
