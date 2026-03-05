#!/usr/bin/env -S node --loader ts-node/esm --disable-warning=ExperimentalWarning

import { execute } from '@oclif/core'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

await execute({ development: true, dir: __dirname })
