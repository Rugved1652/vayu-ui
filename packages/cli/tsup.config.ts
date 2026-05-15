import {defineConfig} from 'tsup'

export default defineConfig({
  entry: ['src/**/*.ts', '!src/templates/**'],
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  outDir: 'dist',
  external: ['vayu-ui-registry'],
})
