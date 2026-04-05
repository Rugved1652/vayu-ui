'use client';

import Link from 'next/link';
import { ArrowRight, Github } from 'lucide-react';
import { Badge, Button, Animation, Status } from 'vayu-ui';

export function Hero() {
  return (
    <section className="bg-canvas px-6 pt-32 pb-24 sm:pt-40 sm:pb-32 lg:px-8">
      <Animation.Fade duration="slow">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="brand" size="sm">
            AI-Native Design System
          </Badge>

          <h1 className="mt-8 font-primary text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] text-canvas-content">
            UI Toolkit for AI
            <br />
            tools.
          </h1>

          <p className="mt-6 text-lg sm:text-xl font-secondary text-surface-content max-w-2xl mx-auto leading-relaxed">
            50+ accessible React components, a CLI scaffold, and an MCP server.
            Designed so AI agents generate consistent, production-ready code.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/docs">
              <Button variant="primary" size="large">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="https://github.com" target="_blank">
              <Button variant="outline" size="large">
                <Github className="w-4 h-4" />
                View on GitHub
              </Button>
            </Link>
          </div>

          <div className="mt-10 mx-auto max-w-md rounded-surface bg-canvas border border-border p-4">
            <code className="font-tertiary text-sm text-surface-content">
              $ npx vayu-ui add button
            </code>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6 text-muted-content">
            <span className="text-sm font-secondary">50+ Components</span>
            <div className="w-px h-4 bg-border" />
            <span className="text-sm font-secondary">35+ Hooks</span>
            <div className="w-px h-4 bg-border" />
            <span className="text-sm font-secondary">WCAG 2.2 AA</span>
            <div className="w-px h-4 bg-border" />
            <span className="text-sm font-secondary">Tailwind v4</span>
          </div>
        </div>
      </Animation.Fade>
    </section>
  );
}
