'use client';

import {
  Brain,
  Copy,
  Component,
  Repeat,
  Unlink,
  FileCode2,
  Sparkles,
  Zap,
  Shield,
  Palette,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    title: 'AI-Readable Architecture',
    description: 'Predictable structure that improves AI-generated output quality.',
    icon: Brain,
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-500/20 to-pink-500/10',
  },
  {
    title: 'Copy-Paste Ownership',
    description: 'All components live in your codebase. Modify freely.',
    icon: Copy,
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-500/20 to-cyan-500/10',
  },
  {
    title: 'Production-Ready Components',
    description: '60+ real-world components built for SaaS applications.',
    icon: Component,
    gradient: 'from-lime-500 to-emerald-500',
    bgGradient: 'from-lime-500/20 to-emerald-500/10',
  },
  {
    title: 'System-Level Hooks',
    description: 'Reusable logic patterns that reduce duplication.',
    icon: Repeat,
    gradient: 'from-orange-500 to-amber-500',
    bgGradient: 'from-orange-500/20 to-amber-500/10',
  },
  {
    title: 'No Vendor Lock-In',
    description: 'No dependency traps. No forced upgrades.',
    icon: Unlink,
    gradient: 'from-teal-500 to-cyan-500',
    bgGradient: 'from-teal-500/20 to-cyan-500/10',
  },
  {
    title: 'MCP & Context Friendly',
    description: 'Designed to work with structured AI context systems.',
    icon: FileCode2,
    gradient: 'from-violet-500 to-purple-500',
    bgGradient: 'from-violet-500/20 to-purple-500/10',
  },
];

export function Features() {
  return (
    <section className="relative isolate overflow-hidden bg-canvas px-6 py-24 sm:py-32 lg:px-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Morphing gradient blobs */}
        <div
          className="absolute top-0 right-1/4 w-100 h-100 rounded-full bg-linear-to-br from-lime-400/15 via-emerald-400/10 to-transparent dark:from-lime-500/8 dark:via-emerald-500/5 blur-[100px] animate-morph-blob"
          style={{ animationDuration: '22s' }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-87.5 h-87.5 rounded-full bg-linear-to-bl from-purple-400/15 via-pink-400/10 to-transparent dark:from-purple-500/8 dark:via-pink-500/5 blur-[80px] animate-morph-blob"
          style={{ animationDuration: '28s', animationDelay: '7s' }}
        />
        <div
          className="absolute top-1/2 right-0 w-125 h-75 rounded-full bg-linear-to-l from-cyan-400/10 via-teal-400/5 to-transparent dark:from-cyan-500/5 dark:via-teal-500/3 blur-[120px] animate-morph-blob"
          style={{ animationDuration: '35s', animationDelay: '3s' }}
        />

        {/* Floating orbs */}
        <div
          className="absolute top-1/3 left-[5%] animate-pulse"
          style={{ animationDuration: '4s' }}
        >
          <div className="w-28 h-28 rounded-full bg-linear-to-br from-lime-500/10 to-emerald-500/5 blur-2xl" />
        </div>

        <div
          className="absolute bottom-1/4 right-[8%] animate-pulse"
          style={{ animationDuration: '5s', animationDelay: '2s' }}
        >
          <div className="w-36 h-36 rounded-full bg-linear-to-br from-purple-500/10 to-pink-500/5 blur-2xl" />
        </div>

        {/* Floating icons */}
        <div
          className="absolute top-1/4 left-[8%] animate-float"
          style={{ animationDuration: '7s' }}
        >
          <div className="relative group">
            <div className="absolute inset-0 blur-xl bg-lime-500/30" />
            <Sparkles className="w-6 h-6 text-lime-500/50 dark:text-lime-400/30 relative z-10" />
          </div>
        </div>

        <div
          className="absolute top-[60%] right-[6%] animate-float"
          style={{ animationDuration: '9s', animationDelay: '2s' }}
        >
          <div className="relative group">
            <div className="absolute inset-0 blur-xl bg-purple-500/30" />
            <Zap className="w-7 h-7 text-purple-500/50 dark:text-purple-400/30 relative z-10" />
          </div>
        </div>

        <div
          className="absolute bottom-1/3 left-[12%] animate-float"
          style={{ animationDuration: '11s', animationDelay: '1s' }}
        >
          <div className="relative group">
            <div className="absolute inset-0 blur-xl bg-cyan-500/30" />
            <Shield className="w-5 h-5 text-cyan-500/50 dark:text-cyan-400/30 relative z-10" />
          </div>
        </div>

        {/* Decorative dots pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20 dark:opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="dots-pattern"
              x="0"
              y="0"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="currentColor" className="text-lime-500" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-pattern)" />
        </svg>
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-500/10 dark:bg-lime-500/5 border border-lime-500/20 dark:border-lime-500/10 mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-lime-600 dark:text-lime-400" />
            <span className="text-sm font-medium text-lime-700 dark:text-lime-300">Features</span>
          </div>

          <h2 className="font-primary text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-canvas-content leading-[1.1]">
            What Makes{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-linear-to-r from-lime-600 via-emerald-500 to-cyan-500 bg-clip-text text-transparent dark:from-lime-400 dark:via-emerald-400 dark:to-cyan-400">
                Vayu UI
              </span>
              <span className="absolute inset-0 blur-2xl bg-linear-to-r from-lime-600/20 via-emerald-500/20 to-cyan-500/20 dark:from-lime-400/10 dark:via-emerald-400/10 dark:to-cyan-400/10" />
            </span>
            <br className="hidden sm:block" />
            Different
          </h2>

          <p className="mt-6 text-lg sm:text-xl font-secondary text-surface-content max-w-2xl mx-auto leading-relaxed">
            Built from the ground up for the AI-assisted development workflow.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glow effect on hover */}
              <div
                className={`absolute inset-0 rounded-2xl bg-linear-to-br ${feature.bgGradient} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-slow`}
              />

              <div className="relative h-full rounded-2xl border border-border/50 bg-elevated/80 dark:bg-surface/50 backdrop-blur-surface p-6 transition-all duration-medium hover:border-border hover:shadow-elevated hover:-translate-y-1">
                {/* Icon */}
                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-overlay bg-linear-to-br ${feature.gradient} p-0.5`}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white dark:bg-neutral-900">
                    <feature.icon
                      className={`h-5 w-5 bg-linear-to-br ${feature.gradient} bg-clip-text`}
                      style={{
                        color: 'transparent',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-primary text-lg font-semibold text-canvas-content mb-2">
                  {feature.title}
                </h3>
                <p className="font-secondary text-sm text-surface-content leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover arrow */}
                <div className="mt-4 flex items-center text-sm font-medium text-lime-600 dark:text-lime-400 opacity-0 group-hover:opacity-100 transition-opacity duration-medium">
                  Learn more
                  <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform duration-fast group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/docs"
            className="group relative inline-flex items-center gap-2 rounded-control bg-linear-to-r from-lime-600 to-emerald-600 dark:from-lime-500 dark:to-emerald-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-fast hover:scale-105 active:scale-[0.98] overflow-hidden"
          >
            <span className="absolute inset-0 bg-linear-to-r from-lime-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-fast" />
            <span className="relative z-10 flex items-center gap-2">
              Explore All Components
              <ArrowRight className="w-4 h-4 transition-transform duration-fast group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 blur-xl bg-lime-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-fast" />
          </Link>
        </div>
      </div>
    </section>
  );
}
