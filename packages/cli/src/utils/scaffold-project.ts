import {mkdirSync, writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'

export interface ProjectOptions {
  appRouter: boolean
  eslint: boolean
  framework: 'next' | 'vite'
  packageManager: string
  skipInit: boolean
  srcDir: boolean
  tailwind: boolean
  turbo: boolean
  typescript: boolean
}
export const writeJson = (file: string, value: unknown) => {
  mkdirSync(dirname(file), {recursive: true})
  writeFileSync(file, JSON.stringify(value, null, 2) + '\n')
}

export function scaffoldProject(
  root: string,
  name: string,
  options: ProjectOptions,
): {appRoot: string; cssPath: string; uiRoot: string} {
  const {framework, skipInit, srcDir, turbo, typescript: ts} = options
  const appRoot = turbo ? join(root, 'apps/web') : root
  const uiRoot = turbo ? join(root, 'packages/ui') : root
  const base = srcDir ? 'src/' : ''
  const ext = ts ? 'tsx' : 'jsx'
  const write = (path: string, text: string) => {
    mkdirSync(dirname(join(appRoot, path)), {recursive: true})
    writeFileSync(join(appRoot, path), text)
  }

  const needsTypes = ts || !skipInit
  const pkg = {
    dependencies: {
      react: '^19.2.4',
      'react-dom': '^19.2.4',
      ...(framework === 'next' ? {next: '^16.1.6'} : {}),
      ...(turbo && !skipInit
        ? {'@repo/ui': ['bun', 'pnpm'].includes(options.packageManager) ? 'workspace:*' : '*'}
        : {}),
    },
    devDependencies: {
      ...(framework === 'vite' ? {'@vitejs/plugin-react': '^4.7.0', vite: '^7.0.0'} : {}),
      ...(needsTypes
        ? {'@types/node': '^22.0.0', '@types/react': '^19.2.0', '@types/react-dom': '^19.2.0', typescript: '^5.9.3'}
        : {}),
      ...(options.tailwind ? {'@tailwindcss/postcss': '^4.2.1', postcss: '^8.5.0', tailwindcss: '^4.2.1'} : {}),
      ...(options.eslint
        ? {
            eslint: '^9.39.0',
            ...(framework === 'next'
              ? {'eslint-config-next': '^16.1.6'}
              : {'@eslint/js': '^9.39.0', globals: '^16.0.0', 'typescript-eslint': '^8.0.0'}),
          }
        : {}),
    },
    engines: {node: '>=20.19.0'},
    name: turbo ? '@repo/web' : name,
    private: true,
    scripts:
      framework === 'vite'
        ? {build: `${ts ? 'tsc --noEmit && ' : ''}vite build`, dev: 'vite', preview: 'vite preview'}
        : {build: 'next build', dev: 'next dev', start: 'next start'},
    type: 'module',
    version: '0.0.0',
  }
  if (options.eslint) {
    Object.assign(pkg.scripts, {lint: 'eslint .'})
    write(
      'eslint.config.mjs',
      framework === 'next'
        ? "import next from 'eslint-config-next/core-web-vitals';\nexport default [...next, {ignores: ['.next/**', 'src/ui/**', 'ui/**']}];\n"
        : "import js from '@eslint/js';\nimport ts from 'typescript-eslint';\nimport globals from 'globals';\nexport default ts.config({ignores: ['dist/**', 'src/ui/**', 'ui/**']}, js.configs.recommended, ...ts.configs.recommended, {languageOptions: {globals: {...globals.browser, ...globals.node}, parserOptions: {ecmaFeatures: {jsx: true}}}});\n",
    )
  }

  writeJson(join(appRoot, 'package.json'), pkg)
  write('.gitignore', 'node_modules\ndist\n.next\n.turbo\n.env*.local\n*.tsbuildinfo\n')
  if (options.tailwind) write('postcss.config.mjs', "export default {plugins: {'@tailwindcss/postcss': {}}};\n")
  if (needsTypes) {
    writeJson(join(appRoot, 'tsconfig.json'), {
      compilerOptions: {
        allowJs: !ts,
        esModuleInterop: true,
        jsx: framework === 'next' ? 'preserve' : 'react-jsx',
        lib: ['DOM', 'DOM.Iterable', 'ESNext'],
        module: 'ESNext',
        moduleResolution: 'Bundler',
        noEmit: true,
        resolveJsonModule: true,
        skipLibCheck: true,
        strict: true,
        target: 'ES2020',
        ...(framework === 'next' ? {incremental: true, plugins: [{name: 'next'}]} : {}),
      },
      exclude: ['node_modules'],
      include: ['**/*.ts', '**/*.tsx', '**/*.jsx', '.next/types/**/*.ts'],
    })
  }

  const imports = skipInit
    ? ''
    : turbo
      ? "import { Typography } from '@repo/ui/components/Typography';\nimport { Button } from '@repo/ui/components/Button';\n"
      : `import { Typography } from '${framework === 'next' ? '../' : './'}ui/components/Typography';\nimport { Button } from '${framework === 'next' ? '../' : './'}ui/components/Button';\n`
  const content = skipInit
    ? `<main><h1>${name}</h1><p>Your project is ready.</p></main>`
    : `<main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center gap-5 p-6"><Typography.H1>${name}</Typography.H1><Typography.P>Your Vayu UI project is ready.</Typography.P><Button><Button.Text>Get started</Button.Text></Button></main>`
  const page = `${framework === 'next' && !skipInit ? "'use client';\n\n" : ''}${imports}\nexport default function Home() {\n  return (${content});\n}\n`
  let cssPath: string
  if (framework === 'vite') {
    cssPath = `${base}index.css`
    write(
      `vite.config.${ts ? 'ts' : 'js'}`,
      "import {defineConfig} from 'vite';\nimport react from '@vitejs/plugin-react';\nexport default defineConfig({plugins: [react()]});\n",
    )
    write(
      'index.html',
      `<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>${name}</title></head><body><div id="root"></div><script type="module" src="/${base}main.${ext}"></script></body></html>\n`,
    )
    write(
      `${base}main.${ext}`,
      `import {StrictMode} from 'react';\nimport {createRoot} from 'react-dom/client';\nimport './index.css';\nimport App from './App';\nconst root = document.getElementById('root');\nif (root) createRoot(root).render(<StrictMode><App /></StrictMode>);\n`,
    )
    write(`${base}App.${ext}`, page)
    if (needsTypes) write(`${base}vite-env.d.ts`, '/// <reference types="vite/client" />\n')
  } else {
    write('next.config.mjs', `export default {${turbo && !skipInit ? "transpilePackages: ['@repo/ui']" : ''}};\n`)
    if (options.appRouter) {
      cssPath = `${base}app/globals.css`
      write(`${base}app/page.${ext}`, page)
      write(
        `${base}app/layout.${ext}`,
        `import './globals.css';\n${ts ? "import type {ReactNode} from 'react';\n" : ''}export default function RootLayout({children}${ts ? ': {children: ReactNode}' : ''}) {return <html lang="en"><body>{children}</body></html>;}\n`,
      )
    } else {
      cssPath = `${base}styles/globals.css`
      write(`${base}pages/index.${ext}`, page)
      write(
        `${base}pages/_app.${ext}`,
        `import '../styles/globals.css';\n${ts ? "import type {AppProps} from 'next/app';\n" : ''}export default function App({Component, pageProps}${ts ? ': AppProps' : ''}) {return <Component {...pageProps} />;}\n`,
      )
    }
  }

  write(
    cssPath,
    options.tailwind ? "@import 'tailwindcss';\n" : 'body { margin: 0; font-family: system-ui, sans-serif; }\n',
  )
  if (turbo) {
    const pmVersions: Record<string, string> = {bun: '1.2.0', npm: '10.9.2', pnpm: '10.0.0', yarn: '1.22.22'}
    writeJson(join(root, 'package.json'), {
      devDependencies: {turbo: '^2.0.0'},
      name,
      packageManager: `${options.packageManager}@${pmVersions[options.packageManager]}`,
      private: true,
      scripts: {build: 'turbo run build', dev: 'turbo run dev', lint: 'turbo run lint'},
      version: '0.0.0',
      workspaces: ['apps/*', 'packages/*'],
    })
    writeJson(join(root, 'turbo.json'), {
      $schema: 'https://turbo.build/schema.json',
      tasks: {
        '@repo/ui#build': {outputs: []},
        build: {dependsOn: ['^build'], outputs: ['dist/**', '.next/**', '!.next/cache/**']},
        dev: {cache: false, persistent: true},
        lint: {dependsOn: ['^lint']},
      },
    })
    if (options.packageManager === 'pnpm')
      writeFileSync(join(root, 'pnpm-workspace.yaml'), "packages:\n  - 'apps/*'\n  - 'packages/*'\n")
    writeFileSync(join(root, '.gitignore'), 'node_modules\n.next\ndist\n.turbo\n.env*.local\n')
    writeJson(join(uiRoot, 'package.json'), {
      dependencies: options.tailwind ? {tailwindcss: '^4.2.1'} : {},
      devDependencies: {'@types/react': '^19.2.0', '@types/react-dom': '^19.2.0', typescript: '^5.9.3'},
      exports: {
        './components/*': './src/components/*/index.ts',
        './hooks/*': './src/hooks/*.ts',
        './styles.css': './src/styles.css',
      },
      name: '@repo/ui',
      peerDependencies: {react: '^19.0.0', 'react-dom': '^19.0.0'},
      private: true,
      scripts: {build: 'tsc --noEmit'},
      type: 'module',
      version: '0.0.0',
    })
    writeJson(join(uiRoot, 'tsconfig.json'), {
      compilerOptions: {
        esModuleInterop: true,
        jsx: 'react-jsx',
        lib: ['DOM', 'DOM.Iterable', 'ESNext'],
        module: 'ESNext',
        moduleResolution: 'Bundler',
        noEmit: true,
        skipLibCheck: true,
        strict: true,
        target: 'ES2020',
      },
      include: ['src'],
    })
    mkdirSync(join(uiRoot, 'src'), {recursive: true})
    writeFileSync(join(uiRoot, 'src/index.ts'), 'export {};\n')
  }

  return {appRoot, cssPath, uiRoot}
}
