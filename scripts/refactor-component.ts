import fs from "fs"
import path from "path"
import { runClaudePrompt } from "./runClaude"

const name = process.argv[2]

if (!name) {
    console.error("Usage: npm run refactor <component-name>")
    process.exit(1)
}

// ============================================================================
// Paths — mapped to actual monorepo structure
// ============================================================================

const ROOT = path.resolve(__dirname, "..")

const componentPath = path.join(ROOT, `packages/ui/src/components/ui/${name}.tsx`)
const demoPath = path.join(ROOT, `apps/docs/src/components/demos/${name}-demo.tsx`)
const docsPath = path.join(ROOT, `apps/docs/content/docs/components/${name}.mdx`)
const rulesPath = path.join(ROOT, `rules/design-system-rules.md`)
const tokensPath = path.join(ROOT, `apps/docs/src/app/global.css`)
const demoTemplatePath = path.join(ROOT, `rules/component-demo.tsx`)
const docsTemplatePath = path.join(ROOT, `rules/component-doc.mdx`)

// ============================================================================
// Read files (gracefully handle missing ones)
// ============================================================================

const component = fs.existsSync(componentPath)
    ? fs.readFileSync(componentPath, "utf-8")
    : "Component does not exist. Generate a new one."

const demo = fs.existsSync(demoPath)
    ? fs.readFileSync(demoPath, "utf-8")
    : ""

const docs = fs.existsSync(docsPath)
    ? fs.readFileSync(docsPath, "utf-8")
    : ""

const rules = fs.readFileSync(rulesPath, "utf-8")
const tokens = fs.readFileSync(tokensPath, "utf-8")
const demoTemplate = fs.readFileSync(demoTemplatePath, "utf-8")
const docsTemplate = fs.readFileSync(docsTemplatePath, "utf-8")

// ============================================================================
// Build prompt
// ============================================================================

const isNew = !fs.existsSync(componentPath)

const prompt = `
You are a senior design-system maintainer for VedUI.

Goal:
${isNew
        ? `Generate a NEW component called "${name}" following the design system rules.`
        : `Standardize and refactor the existing "${name}" component to match the design system rules.`
    }

Component Name: ${name}

Inputs:

--- Component Source ---
${component}

--- Existing Demo ---
${demo || "(No demo exists yet. Generate one.)"}

--- Existing Docs ---
${docs || "(No docs exist yet. Generate one.)"}

--- Design System Rules ---
${rules}

--- Global CSS Tokens ---
${tokens}

--- Demo Template (follow this structure) ---
${demoTemplate}

--- Docs Template (follow this structure) ---
${docsTemplate}

Tasks:

1. Ensure WCAG 2.2 AA accessibility (keyboard nav, focus visible, ARIA, semantic HTML)
2. Apply compound component pattern if appropriate
3. Replace hardcoded styles with design tokens
4. Generate/update demo following the demo template format
5. Generate/update documentation following the docs template format
6. Component must import from "vayu-ui" in demo
7. Docs must use Fumadocs Tab/Tabs for Preview/Code sections
8. Include full source code in the docs

CRITICAL — Tailwind v4 Design Token Usage:

This project uses Tailwind CSS v4 with @theme for design tokens.
Tokens defined in @theme automatically generate utility classes:
  --radius-*    → rounded-*    (e.g. --radius  = the bare token → class "rounded")
  --shadow-*    → shadow-*     (e.g. --shadow-outer → class "shadow-outer")
  --inset-shadow-* → inset-shadow-* (e.g. --inset-shadow-inner → class "inset-shadow-inner")
  --color-*     → bg-*, text-*, border-* etc.
  --font-*      → font-*       (e.g. --font-primary → class "font-primary")
  --text-*      → text-*       (e.g. --text-h1 → class "text-h1")

RADIUS:
  - Use the "rounded" class for border-radius (maps to --radius: 4px)
  - NEVER hardcode border-radius px values. Always use "rounded".
  - Example: className="rounded" → applies border-radius: var(--radius)

SHADOWS:
  - Use "shadow-outer" class for cards, modals, dropdowns, popovers.
  - Use "inset-shadow-inner" class for pressed buttons, active inputs.
  - NEVER hardcode box-shadow values or rgba().
  - Example: className="shadow-outer rounded" → outer shadow + system radius

COLORS:
  - Use semantic color tokens: primary-*, ground-*, error-*, warning-*, success-*, info-*
  - Example: className="bg-primary-500 text-ground-900"
  - NEVER hardcode hex, rgb, hsl, or oklch. Always use token classes.

FONTS:
  - Use "font-primary" (Oswald) for headings, labels, nav
  - Use "font-secondary" (Mulish) for body text, descriptions
  - Use "font-tertiary" (Geist Mono) for code/technical values

Important paths for reference:
- Component lives at: packages/ui/src/components/ui/${name}.tsx
- Demo lives at: apps/docs/src/components/demos/${name}-demo.tsx
- Docs lives at: apps/docs/content/docs/components/${name}.mdx

Return ONLY in this exact format (no extra text):

COMPONENT:
<full component code>

DEMO:
<full demo code>

DOCS:
<full docs mdx code>
`

// ============================================================================
// Parse Claude output into sections
// ============================================================================

function parseOutput(output: string) {
    const sections: { component?: string; demo?: string; docs?: string } = {}

    // Match COMPONENT: ... DEMO: ... DOCS: ...
    const componentMatch = output.match(/COMPONENT:\s*\n([\s\S]*?)(?=\nDEMO:)/i)
    const demoMatch = output.match(/DEMO:\s*\n([\s\S]*?)(?=\nDOCS:)/i)
    const docsMatch = output.match(/DOCS:\s*\n([\s\S]*?)$/i)

    if (componentMatch) sections.component = componentMatch[1].trim()
    if (demoMatch) sections.demo = demoMatch[1].trim()
    if (docsMatch) sections.docs = docsMatch[1].trim()

    return sections
}

function ensureDir(filePath: string) {
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }
}

// ============================================================================
// Run Claude and write results to files
// ============================================================================

console.log(`\n🔧 ${isNew ? "Generating" : "Refactoring"} component: ${name}\n`)
console.log(`📂 Component: ${componentPath}`)
console.log(`📂 Demo:      ${demoPath}`)
console.log(`📂 Docs:      ${docsPath}`)
console.log(`${isNew ? "🆕 Component does not exist — will generate new" : "✅ Component found — will refactor"}\n`)

console.log("⏳ Running Claude CLI... (this may take a moment)\n")

const result = runClaudePrompt(prompt)
const sections = parseOutput(result)

let filesWritten = 0

if (sections.component) {
    ensureDir(componentPath)
    fs.writeFileSync(componentPath, sections.component, "utf-8")
    console.log(`✅ Component written → ${componentPath}`)
    filesWritten++
} else {
    console.warn("⚠️  Could not parse COMPONENT section from output")
}

if (sections.demo) {
    ensureDir(demoPath)
    fs.writeFileSync(demoPath, sections.demo, "utf-8")
    console.log(`✅ Demo written     → ${demoPath}`)
    filesWritten++
} else {
    console.warn("⚠️  Could not parse DEMO section from output")
}

if (sections.docs) {
    ensureDir(docsPath)
    fs.writeFileSync(docsPath, sections.docs, "utf-8")
    console.log(`✅ Docs written     → ${docsPath}`)
    filesWritten++
} else {
    console.warn("⚠️  Could not parse DOCS section from output")
}

if (filesWritten === 0) {
    console.error("\n❌ No sections could be parsed. Raw output:\n")
    console.log(result)
} else {
    console.log(`\n🎉 Done! ${filesWritten}/3 files written successfully.`)
}