"use client";

import { AlertTriangle, Code2, Layers, Puzzle, Zap, ArrowRight, CheckCircle2, XCircle, Sparkles, GitBranch, Bug, Clock } from "lucide-react";
import Link from "next/link";

// Pre-generated static dots to avoid hydration mismatch with Math.random()
const dots = [
    { top: 45, left: 12, duration: 3.2, delay: 0.5 },
    { top: 78, left: 88, duration: 4.1, delay: 1.2 },
    { top: 23, left: 35, duration: 2.8, delay: 0.8 },
    { top: 67, left: 62, duration: 3.5, delay: 1.5 },
    { top: 34, left: 18, duration: 4.3, delay: 0.3 },
    { top: 89, left: 45, duration: 2.5, delay: 1.8 },
    { top: 15, left: 72, duration: 3.9, delay: 0.6 },
    { top: 56, left: 28, duration: 2.2, delay: 1.1 },
    { top: 72, left: 55, duration: 4.6, delay: 0.9 },
    { top: 41, left: 82, duration: 3.1, delay: 1.4 },
    { top: 28, left: 48, duration: 2.7, delay: 0.4 },
    { top: 63, left: 15, duration: 3.8, delay: 1.7 },
    { top: 19, left: 65, duration: 4.4, delay: 0.2 },
    { top: 84, left: 32, duration: 2.9, delay: 1.0 },
    { top: 52, left: 78, duration: 3.6, delay: 0.7 },
    { top: 37, left: 22, duration: 4.0, delay: 1.3 },
    { top: 76, left: 58, duration: 2.4, delay: 1.6 },
    { top: 12, left: 42, duration: 3.3, delay: 0.1 },
    { top: 68, left: 85, duration: 4.2, delay: 1.9 },
    { top: 45, left: 52, duration: 2.6, delay: 0.8 },
];

export function ProblemSection() {

    return (
        <section className="relative isolate overflow-hidden bg-linear-to-b from-neutral-50 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 px-6 py-24 sm:py-32 lg:px-8">
            {/* Animated background elements */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                {/* Morphing gradient blobs */}
                <div
                    className="absolute top-1/4 -left-20 w-125 h-125 rounded-full bg-linear-to-br from-red-400/15 via-orange-400/10 to-transparent dark:from-red-500/10 dark:via-orange-500/5 blur-[100px] animate-morph-blob"
                    style={{ animationDuration: '25s' }}
                />
                <div
                    className="absolute bottom-1/4 -right-20 w-100 h-100 rounded-full bg-linear-to-bl from-amber-400/15 via-yellow-400/10 to-transparent dark:from-amber-500/10 dark:via-yellow-500/5 blur-[80px] animate-morph-blob"
                    style={{ animationDuration: '30s', animationDelay: '5s' }}
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 rounded-full bg-linear-to-r from-lime-400/10 via-emerald-400/5 to-transparent dark:from-lime-500/5 dark:via-emerald-500/3 blur-[120px] animate-morph-blob"
                    style={{ animationDuration: '35s', animationDelay: '10s' }}
                />

                {/* Warning pattern grid */}
                <svg className="absolute inset-0 w-full h-full opacity-10 dark:opacity-5" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="warning-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M60 0 L0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-orange-500" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#warning-grid)" />
                </svg>

                {/* Floating warning icons */}
                <div className="absolute top-1/6 left-[10%] animate-float" style={{ animationDuration: '8s' }}>
                    <div className="relative group">
                        <div className="absolute inset-0 blur-xl bg-red-500/30" />
                        <AlertTriangle className="w-8 h-8 text-red-500/60 dark:text-red-400/40 relative z-10" />
                    </div>
                </div>

                <div className="absolute top-1/3 right-[8%] animate-float" style={{ animationDuration: '10s', animationDelay: '2s' }}>
                    <div className="relative group">
                        <div className="absolute inset-0 blur-xl bg-orange-500/30" />
                        <Bug className="w-7 h-7 text-orange-500/60 dark:text-orange-400/40 relative z-10" />
                    </div>
                </div>

                <div className="absolute bottom-1/3 left-[5%] animate-float" style={{ animationDuration: '12s', animationDelay: '1s' }}>
                    <div className="relative group">
                        <div className="absolute inset-0 blur-xl bg-amber-500/30" />
                        <GitBranch className="w-6 h-6 text-amber-500/60 dark:text-amber-400/40 relative z-10" />
                    </div>
                </div>

                <div className="absolute top-[60%] right-[12%] animate-float" style={{ animationDuration: '9s', animationDelay: '3s' }}>
                    <div className="relative group">
                        <div className="absolute inset-0 blur-xl bg-yellow-500/30" />
                        <Clock className="w-8 h-8 text-yellow-500/60 dark:text-yellow-400/40 relative z-10" />
                    </div>
                </div>

                {/* Glowing orbs */}
                <div className="absolute top-1/4 right-[25%] animate-pulse" style={{ animationDuration: '4s' }}>
                    <div className="w-24 h-24 rounded-full bg-linear-to-br from-red-500/10 to-orange-500/5 blur-2xl" />
                </div>

                <div className="absolute bottom-1/4 left-[25%] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}>
                    <div className="w-32 h-32 rounded-full bg-linear-to-br from-amber-500/10 to-yellow-500/5 blur-2xl" />
                </div>

                {/* Scattered dots */}
                {dots.map((dot, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-orange-500/30 dark:bg-orange-400/20 animate-pulse"
                        style={{
                            top: `${dot.top}%`,
                            left: `${dot.left}%`,
                            animationDuration: `${dot.duration}s`,
                            animationDelay: `${dot.delay}s`,
                        }}
                    />
                ))}
            </div>

            <div className="mx-auto max-w-6xl">
                {/* Main headline section */}
                <div className="text-center mb-16">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 dark:bg-orange-500/5 border border-orange-500/20 dark:border-orange-500/10 mb-8 animate-fade-in">
                        <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        <span className="text-sm font-medium text-orange-700 dark:text-orange-300">The Problem</span>
                    </div>

                    {/* Headline */}
                    <h2 className="font-primary text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                        <span className="text-neutral-900 dark:text-white">AI Can Generate Code.</span>
                        <br className="hidden sm:block" />
                        <span className="relative inline-block mt-2">
                            <span className="relative z-10 bg-linear-to-r from-red-600 via-orange-500 to-amber-500 bg-clip-text text-transparent dark:from-red-400 dark:via-orange-400 dark:to-amber-400">
                                But Can It Ship It?
                            </span>
                            <span className="absolute inset-0 blur-2xl bg-linear-to-r from-red-600/20 via-orange-500/20 to-amber-500/20 dark:from-red-400/10 dark:via-orange-400/10 dark:to-amber-400/10" />
                        </span>
                    </h2>

                    {/* Subtext */}
                    <p className="mt-6 text-lg sm:text-xl font-secondary text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        Modern AI tools generate components fast — but without structure,
                        consistency, and system thinking, the output becomes{" "}
                        <span className="text-red-600 dark:text-red-400 font-semibold">messy</span>,{" "}
                        <span className="text-orange-600 dark:text-orange-400 font-semibold">duplicated</span>, and{" "}
                        <span className="text-amber-600 dark:text-amber-400 font-semibold">hard to scale</span>.
                    </p>
                </div>

                {/* Problem cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {/* Card 1 - Inconsistent */}
                    <div className="group relative">
                        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-red-500/20 to-orange-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative h-full rounded-2xl border border-red-200/50 dark:border-red-900/30 bg-white/80 dark:bg-neutral-900/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-red-300 dark:hover:border-red-800/50 hover:shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 dark:bg-red-500/10">
                                    <Puzzle className="h-6 w-6 text-red-600 dark:text-red-400" />
                                </div>
                                <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <h3 className="font-primary text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                                Inconsistent Output
                            </h3>
                            <p className="font-secondary text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                                Every AI response follows different patterns, naming conventions, and styling approaches.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 - Duplicated */}
                    <div className="group relative">
                        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-orange-500/20 to-amber-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative h-full rounded-2xl border border-orange-200/50 dark:border-orange-900/30 bg-white/80 dark:bg-neutral-900/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-orange-300 dark:hover:border-orange-800/50 hover:shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-500/10">
                                    <Layers className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                                </div>
                                <XCircle className="w-5 h-5 text-orange-500" />
                            </div>
                            <h3 className="font-primary text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                                Duplicated Code
                            </h3>
                            <p className="font-secondary text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                                AI regenerates similar components instead of reusing existing ones, creating technical debt.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 - Hard to Scale */}
                    <div className="group relative">
                        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-amber-500/20 to-yellow-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative h-full rounded-2xl border border-amber-200/50 dark:border-amber-900/30 bg-white/80 dark:bg-neutral-900/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-amber-300 dark:hover:border-amber-800/50 hover:shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-500/10">
                                    <Code2 className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                                </div>
                                <XCircle className="w-5 h-5 text-amber-500" />
                            </div>
                            <h3 className="font-primary text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                                Hard to Scale
                            </h3>
                            <p className="font-secondary text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                                Without architectural patterns, the codebase becomes unmaintainable as it grows.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Solution section */}
                <div className="relative">
                    {/* Divider with animation */}
                    <div className="absolute inset-x-0 top-0 flex items-center justify-center">
                        <div className="flex items-center gap-4">
                            <div className="h-px w-16 sm:w-32 bg-linear-to-r from-transparent via-red-500/30 to-transparent" />
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-100 dark:bg-lime-500/10 border border-lime-200 dark:border-lime-500/20 animate-bounce-in">
                                <Sparkles className="h-5 w-5 text-lime-600 dark:text-lime-400" />
                            </div>
                            <div className="h-px w-16 sm:w-32 bg-linear-to-r from-transparent via-lime-500/30 to-transparent" />
                        </div>
                    </div>

                    {/* Solution card */}
                    <div className="mt-16 relative">
                        <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-lime-500/10 via-emerald-500/5 to-cyan-500/10 blur-3xl" />
                        <div className="relative rounded-3xl border border-lime-200/50 dark:border-lime-900/30 bg-linear-to-br from-lime-50/50 via-white/80 to-emerald-50/50 dark:from-lime-950/30 dark:via-neutral-900/80 dark:to-emerald-950/30 backdrop-blur-sm p-8 sm:p-12">
                            {/* Decorative elements */}
                            <div className="absolute top-4 right-4 animate-float" style={{ animationDuration: '6s' }}>
                                <CheckCircle2 className="w-6 h-6 text-lime-500/50" />
                            </div>
                            <div className="absolute bottom-4 left-4 animate-float" style={{ animationDuration: '8s', animationDelay: '1s' }}>
                                <CheckCircle2 className="w-5 h-5 text-emerald-500/50" />
                            </div>

                            <div className="max-w-3xl mx-auto text-center">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-500/10 dark:bg-lime-500/5 border border-lime-500/20 dark:border-lime-500/10 mb-6">
                                    <Zap className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                                    <span className="text-sm font-medium text-lime-700 dark:text-lime-300">The Solution</span>
                                </div>

                                <h3 className="font-primary text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                                    <span className="bg-linear-to-r from-lime-600 via-emerald-500 to-cyan-500 bg-clip-text text-transparent dark:from-lime-400 dark:via-emerald-400 dark:to-cyan-400">
                                        Vayu UI
                                    </span>{" "}
                                    Provides the Missing Structure
                                </h3>

                                <p className="text-base sm:text-lg font-secondary text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                                    Predictable architecture, consistent patterns, and reusable components that make
                                    AI-generated code actually usable in real products.
                                </p>

                                {/* Feature pills */}
                                <div className="flex flex-wrap justify-center gap-3 mb-8">
                                    {[
                                        "Consistent Design Tokens",
                                        "Reusable Components",
                                        "Type-Safe APIs",
                                        "Accessibility Built-in",
                                        "Tailwind CSS v4",
                                    ].map((feature) => (
                                        <span
                                            key={feature}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-lime-100/50 dark:bg-lime-500/10 border border-lime-200/50 dark:border-lime-500/20 text-sm font-secondary text-lime-700 dark:text-lime-300"
                                        >
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                {/* CTA */}
                                <Link
                                    href="/docs"
                                    className="group relative inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-lime-600 to-emerald-600 dark:from-lime-500 dark:to-emerald-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-[0.98] overflow-hidden"
                                >
                                    <span className="absolute inset-0 bg-linear-to-r from-lime-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                    <span className="relative z-10 flex items-center gap-2">
                                        Get Started
                                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                                    </span>
                                    <span className="absolute inset-0 blur-xl bg-lime-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
