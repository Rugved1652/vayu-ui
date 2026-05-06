'use client';

import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Code2,
  Copy,
  Github,
  Layers3,
  PackagePlus,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { Badge, Button, Animation, useCopyToClipboard } from 'vayu-ui';

const installCommand = 'npx vayu-ui-cli init';

const highlights = [
  { label: 'Components', value: '50+', tone: 'bg-brand' },
  { label: 'Hooks', value: '35+', tone: 'bg-info' },
  { label: 'WCAG 2.2 AA', value: 'A11y', tone: 'bg-success' },
  { label: 'Tailwind v4', value: 'Tokens', tone: 'bg-warning' },
];

const componentLinks = [
  'Accordion',
  'Button',
  'Card',
  'Combobox',
  'Data Table',
  'Dialog',
  'Input',
  'Tabs',
];

const tokenRows = [
  { name: '--brand', value: '#84cc16', className: 'bg-brand' },
  { name: '--surface', value: 'surface', className: 'bg-surface border border-border' },
  { name: '--focus', value: 'focus ring', className: 'bg-brand' },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-canvas px-6 pt-24 pb-20 sm:pt-32 sm:pb-24 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(var(--canvas-content) 1px, transparent 1px), linear-gradient(90deg, var(--canvas-content) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-border" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-border" />

      <div className="relative mx-auto max-w-7xl">
        <Animation.Fade duration="slow">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <Animation.Slide direction="down" duration="slow">
              <Link href="/docs" className="group inline-flex">
                <Badge
                  variant="brand"
                  size="sm"
                  className="gap-1.5 cursor-pointer shadow-control transition-transform group-hover:-translate-y-0.5"
                >
                  <Sparkles className="h-3 w-3" />
                  Beta Version
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </Badge>
              </Link>
            </Animation.Slide>

            <h1 className="mt-7 max-w-4xl font-primary text-5xl font-bold leading-[1.04] tracking-normal text-canvas-content sm:text-6xl lg:text-7xl">
              Vayu UI documentation for <span className="text-brand">AI-native React apps</span>
            </h1>

            <p className="mt-6 max-w-2xl font-secondary text-lg leading-8 text-muted-content sm:text-xl">
              Copy accessible components into your Next.js codebase with design tokens, CLI
              workflows, and MCP-ready docs that agents can follow.
            </p>

            <div className="mt-9 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Link href="/docs" className="w-full sm:w-auto">
                <Button variant="primary" size="large" className="w-full min-w-[170px] sm:w-auto">
                  Browse Docs
                  <BookOpen className="h-4 w-4" />
                </Button>
              </Link>
              <Link
                href="https://github.com/Rugved1652/vayu-ui"
                target="_blank"
                className="w-full sm:w-auto"
              >
                <Button variant="outline" size="large" className="w-full min-w-[170px] sm:w-auto">
                  <Github className="h-4 w-4" />
                  GitHub
                </Button>
              </Link>
            </div>

            <InstallCommand />

            <div className="mt-8 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-surface border border-border bg-surface px-4 py-3 text-left shadow-surface"
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${item.tone}`} />
                    <span className="font-tertiary text-xs text-muted-content">{item.label}</span>
                  </div>
                  <p className="mt-2 font-primary text-2xl font-bold leading-none text-surface-content">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <DocsPreview />
        </Animation.Fade>
      </div>
    </section>
  );
}

function InstallCommand() {
  const { copy, copied } = useCopyToClipboard();

  return (
    <div className="mt-8 flex w-full max-w-xl items-center gap-2 rounded-surface border border-border bg-surface p-2 text-left shadow-elevated">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-canvas text-muted-content">
        <Terminal className="h-4 w-4" />
      </div>
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap px-1 font-tertiary text-sm text-surface-content">
        {installCommand}
      </code>
      <button
        type="button"
        onClick={() => copy(installCommand)}
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-control text-muted-content transition-colors hover:bg-canvas hover:text-surface-content focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        aria-label="Copy install command"
      >
        {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

function DocsPreview() {
  return (
    <div className="mx-auto mt-16 max-w-6xl rounded-surface border border-border bg-surface shadow-elevated">
      <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-control bg-brand text-brand-content">
            <Layers3 className="h-4 w-4" />
          </div>
          <div className="min-w-0 text-left">
            <p className="font-primary text-sm font-semibold text-surface-content">
              Component Docs
            </p>
            <p className="truncate font-secondary text-xs text-muted-content">
              Installation, usage, tokens, and accessible patterns
            </p>
          </div>
        </div>
        <Badge variant="muted" size="sm" className="hidden shrink-0 sm:inline-flex">
          Next.js
        </Badge>
      </div>

      <div className="grid min-h-[360px] grid-cols-1 lg:grid-cols-[220px_1fr_300px]">
        <aside className="hidden border-r border-border bg-canvas/40 p-4 lg:block">
          <div className="mb-4 flex items-center gap-2 font-tertiary text-xs text-muted-content">
            <PackagePlus className="h-3.5 w-3.5" />
            Components
          </div>
          <nav className="space-y-1">
            {componentLinks.map((name) => (
              <Link
                key={name}
                href="/docs"
                className={`flex items-center justify-between rounded-control px-3 py-2 font-secondary text-sm transition-colors ${
                  name === 'Button'
                    ? 'bg-brand text-brand-content'
                    : 'text-muted-content hover:bg-surface hover:text-surface-content'
                }`}
              >
                {name}
                {name === 'Button' && <ChevronRight className="h-4 w-4" />}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="p-4 sm:p-6">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <Badge variant="brand" size="sm">
              Button
            </Badge>
            <Badge variant="muted" size="sm">
              Accessible
            </Badge>
            <Badge variant="muted" size="sm">
              Copy source
            </Badge>
          </div>

          <div className="rounded-surface border border-border bg-canvas p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" size="medium">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="medium">
                Secondary
              </Button>
              <Button variant="outline" size="medium">
                Outline
              </Button>
            </div>

            <div className="mt-5 rounded-surface border border-border bg-surface p-4">
              <div className="mb-3 flex items-center gap-2">
                <Code2 className="h-4 w-4 text-brand" />
                <p className="font-tertiary text-xs text-muted-content">app/page.tsx</p>
              </div>
              <pre className="overflow-x-auto font-tertiary text-xs leading-6 text-surface-content">
                <code>{`import { Button } from 'vayu-ui';

export default function Page() {
  return <Button>Ship UI</Button>;
}`}</code>
              </pre>
            </div>
          </div>
        </div>

        <aside className="border-t border-border bg-canvas/40 p-4 sm:p-6 lg:border-l lg:border-t-0">
          <div className="flex items-center justify-between">
            <p className="font-primary text-sm font-semibold text-canvas-content">Design Tokens</p>
            <Badge variant="success" size="sm">
              Synced
            </Badge>
          </div>

          <div className="mt-4 space-y-3">
            {tokenRows.map((token) => (
              <div
                key={token.name}
                className="flex items-center gap-3 rounded-surface border border-border bg-surface p-3"
              >
                <span className={`h-8 w-8 shrink-0 rounded-control ${token.className}`} />
                <div className="min-w-0">
                  <p className="font-tertiary text-xs text-surface-content">{token.name}</p>
                  <p className="font-secondary text-xs text-muted-content">{token.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-surface border border-border bg-surface p-3">
            <p className="font-tertiary text-xs leading-5 text-muted-content">
              MCP docs keep component APIs, examples, and token names available to AI agents.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
