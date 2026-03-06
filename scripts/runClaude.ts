import { execSync } from "child_process"

export function runClaudePrompt(prompt: string) {

  const output = execSync(`claude "${prompt}"`, {
    encoding: "utf-8",
    maxBuffer: 1024 * 1024 * 10
  })

  return output
}