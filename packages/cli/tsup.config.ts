import {defineConfig} from 'tsup'

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/**/*.ts', '!src/templates/**'],
  external: ['vayu-ui-registry'],
  format: ['esm'],
  outDir: 'dist',
  sourcemap: true,
})
