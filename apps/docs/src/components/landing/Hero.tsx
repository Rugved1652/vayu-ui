'use client';

import Link from 'next/link';
import { ArrowRight, Github, Terminal, Sparkles } from 'lucide-react';
import { Badge, Button, Animation } from 'vayu-ui';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-canvas px-6 pt-24 pb-32 sm:pt-36 sm:pb-40 lg:px-8">
      {/* Background grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(var(--canvas-content) 1px, transparent 1px), linear-gradient(90deg, var(--canvas-content) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-brand/10 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[400px] rounded-full bg-brand/5 blur-[80px]" />

      <div className="relative mx-auto max-w-5xl">
        <Animation.Fade duration="slow">
          <div className="flex flex-col items-center text-center">
            {/* Announcement badge */}
            <Animation.Slide direction="down" duration="slow">
              <Link href="/docs" className="group inline-flex">
                <Badge variant="brand" size="sm" className="gap-1.5 cursor-pointer transition-shadow hover:shadow-sm">
                  <Sparkles className="w-3 h-3" />
                  Introducing Vayu UI — AI-Native Design System
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </Badge>
              </Link>
            </Animation.Slide>

            {/* Main heading */}
            <h1 className="mt-10 font-primary text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] text-canvas-content">
              Build beautiful UIs
              <br />
              <span className="text-brand">with AI in the loop.</span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg sm:text-xl font-secondary text-muted-content max-w-2xl leading-relaxed">
              50+ accessible React components, a CLI scaffold, and an MCP server.
              Designed so AI agents generate consistent, production-ready code.
            </p>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/docs">
                <Button variant="primary" size="large" className="min-w-[180px]">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="https://github.com" target="_blank">
                <Button variant="outline" size="large" className="min-w-[180px]">
                  <Github className="w-4 h-4" />
                  GitHub
                </Button>
              </Link>
            </div>

            {/* Terminal install command */}
            <div className="mt-14 w-full max-w-lg">
              <div className="relative rounded-surface border border-border bg-surface overflow-hidden">
                {/* Terminal header bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-surface">
                  <span className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-warning/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-success/60" />
                  <span className="ml-2 font-tertiary text-xs text-muted-content">terminal</span>
                </div>
                {/* Command */}
                <div className="flex items-center gap-3 px-4 py-3">
                  <Terminal className="w-4 h-4 text-muted-content shrink-0" />
                  <code className="font-tertiary text-sm text-surface-content">
                    npx vayu-ui add button
                  </code>
                </div>
              </div>
            </div>

            {/* Stats bar */}
            <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-secondary">
              <div className="flex items-center gap-2 text-muted-content">
                <span className="inline-block w-2 h-2 rounded-full bg-brand" />
                <strong className="text-surface-content font-semibold">50+</strong> Components
              </div>
              <Separator />
              <div className="flex items-center gap-2 text-muted-content">
                <span className="inline-block w-2 h-2 rounded-full bg-info" />
                <strong className="text-surface-content font-semibold">35+</strong> Hooks
              </div>
              <Separator />
              <div className="flex items-center gap-2 text-muted-content">
                <span className="inline-block w-2 h-2 rounded-full bg-success" />
                WCAG <strong className="text-surface-content font-semibold">2.2 AA</strong>
              </div>
              <Separator />
              <div className="flex items-center gap-2 text-muted-content">
                <span className="inline-block w-2 h-2 rounded-full bg-warning" />
                Tailwind <strong className="text-surface-content font-semibold">v4</strong>
              </div>
            </div>

            {/* Floating component pills preview */}
            <div className="mt-14 flex flex-wrap items-center justify-center gap-2">
              {['Button', 'Badge', 'Card', 'Modal', 'Tabs', 'Tooltip', 'Avatar', 'Input'].map(
                (name, i) => (
                  <span
                    key={name}
                    className="font-tertiary text-xs px-3 py-1.5 rounded-full border border-border bg-surface text-surface-content animate-float"
                    style={{ animationDelay: `${i * 0.4}s` }}
                  >
                    {name}
                  </span>
                )
              )}
            </div>
          </div>
        </Animation.Fade>
      </div>
    </section>
  );
}

function Separator() {
  return <div className="w-px h-4 bg-border hidden sm:block" />;
}
