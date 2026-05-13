#!/usr/bin/env node
import {execute} from '@oclif/core'

const args = process.argv.slice(2)

// Intercept -v/--version before oclif, which would treat "-v" as a command name
if (args.length === 1 && (args[0] === '-v' || args[0] === '--version')) {
  args[0] = 'version'
  process.argv = [process.argv[0], process.argv[1], ...args]
}

await execute({dir: import.meta.url})
