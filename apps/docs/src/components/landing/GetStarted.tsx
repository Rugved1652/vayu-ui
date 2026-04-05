'use client';

import Link from 'next/link';
import { Github } from 'lucide-react';
import { Button, Marquee, Animation, Badge } from 'vayu-ui';
import { VayuUILogo } from '@/components/Logo';

const componentNames = [
  'Button',
  'Card',
  'Input',
  'Badge',
  'Tabs',
  'Switch',
  'Tooltip',
  'Modal',
  'Table',
  'Select',
  'Avatar',
  'Skeleton',
  'Drawer',
  'Alert',
  'Carousel',
  'Slider',
  'Accordion',
  'ContextMenu',
  'Popover',
  'Tree',
];

export function GetStarted() {
  return (
    <>
      <section className="bg-surface px-6 py-24 sm:py-32 lg:px-8">
        <Animation.Fade duration="slow">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-primary text-3xl sm:text-4xl font-bold text-canvas-content">
              Start building in minutes
            </h2>
            <p className="mt-4 text-lg font-secondary text-surface-content">
              Install the CLI, add components, and ship.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-surface bg-canvas border border-border p-6 text-left">
                <p className="text-sm font-secondary text-muted-content mb-3">Install</p>
                <pre className="font-tertiary text-sm text-canvas-content space-y-1">
                  <code>npx vayu-ui init</code>
                  <br />
                  <code>npx vayu-ui add button card input</code>
                </pre>
              </div>
              <div className="flex flex-col gap-4 justify-center">
                <Link href="/docs">
                  <Button variant="primary" size="large" fullWidth>
                    Read the Docs
                  </Button>
                </Link>
                <Link href="https://github.com" target="_blank">
                  <Button variant="outline" size="large" fullWidth>
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Animation.Fade>

        <div className="mx-auto max-w-4xl mt-20">
          <p className="text-center text-sm font-secondary text-muted-content mb-6">
            And many more components
          </p>
          <Marquee speed="slow" showControls={false} label="Component names" className="opacity-60">
            {componentNames.map((name) => (
              <span
                key={name}
                className="shrink-0 text-sm font-tertiary text-surface-content"
              >
                {name}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      <footer className="bg-canvas border-t border-border px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <VayuUILogo size={32} />
          <p className="text-sm font-secondary text-muted-content">
            &copy; {new Date().getFullYear()} Vayu UI. Open source.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-secondary text-muted-content hover:text-canvas-content transition-colors"
          >
            GitHub
          </a>
        </div>
      </footer>
    </>
  );
}
