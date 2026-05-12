'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Github, Sparkles } from 'lucide-react';
import { Animation, Badge, Button } from 'vayu-ui';
import { DocsPreview } from './DocsPreview';
import { InstallCommand } from './InstallCommand';
import { highlights } from './constants';

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
              AI Native UI Toolkit <span className="text-brand">for React Apps</span>
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
