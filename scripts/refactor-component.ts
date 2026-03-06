import fs from "fs"
import { runClaudePrompt } from "./runClaude"

const name = process.argv[2]

const component = fs.readFileSync(`components/${name}/${name}.tsx`, "utf-8")
const demo = fs.readFileSync(`demos/${name}.demo.tsx`, "utf-8")
const docs = fs.readFileSync(`docs/${name}.mdx`, "utf-8")
const rules = fs.readFileSync(`architecture/design-system-rules.md`, "utf-8")

const prompt = `
Refactor this component.

Component:
${component}

Demo:
${demo}

Docs:
${docs}

Rules:
${rules}
`

const result = runClaudePrompt(prompt)

console.log(result)