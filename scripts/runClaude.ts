import { execSync } from "child_process"
import fs from "fs"
import path from "path"
import os from "os"

export function runClaudePrompt(prompt: string) {
  // Write prompt to a temp file to avoid shell escaping issues
  const tmpFile = path.join(os.tmpdir(), `claude-prompt-${Date.now()}.txt`)
  fs.writeFileSync(tmpFile, prompt, "utf-8")

  try {
    const output = execSync(`cat "${tmpFile}" | claude`, {
      encoding: "utf-8",
      maxBuffer: 1024 * 1024 * 10,
    })

    return output
  } finally {
    // Clean up temp file
    if (fs.existsSync(tmpFile)) {
      fs.unlinkSync(tmpFile)
    }
  }
}