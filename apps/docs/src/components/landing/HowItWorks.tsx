"use client";

import { Terminal, Plus, Layers, ArrowRight, Sparkles, Check, Copy } from "lucide-react";
import Link from "next/link";

const steps = [
    {
        number: "01",
        title: "Install CLI",
        description: "One command to set up Vayu UI in your project.",
        icon: Terminal,
        code: "npx vayu-ui init",
        gradient: "from-lime-500 to-emerald-500",
    },
    {
        number: "02",
        title: "Add Components",
        description: "Pick only what you need. Each component lives in your codebase.",
        icon: Plus,
        code: "npx vayu-ui add button",
        gradient: "from-cyan-500 to-teal-500",
    },
    {
        number: "03",
        title: "Scale With Structure",
        description:
            "Predictable patterns that grow with your product — and your AI tools.",
        icon: Layers,
        code: null,
        gradient: "from-purple-500 to-pink-500",
    },
];

// Pre-generated static particles to avoid hydration mismatch with Math.random()
const particles = [
    { top: 32, left: 18, duration: 12.4, delay: 0.8 },
    { top: 58, left: 72, duration: 10.2, delay: 1.5 },
    { top: 24, left: 45, duration: 14.8, delay: 0.3 },
    { top: 71, left: 28, duration: 9.6, delay: 2.1 },
    { top: 45, left: 85, duration: 11.3, delay: 0.6 },
    { top: 19, left: 62, duration: 13.5, delay: 1.8 },
    { top: 63, left: 15, duration: 10.9, delay: 2.4 },
    { top: 38, left: 55, duration: 12.7, delay: 0.2 },
    { top: 82, left: 35, duration: 11.8, delay: 1.2 },
    { top: 27, left: 78, duration: 14.1, delay: 0.9 },
    { top: 55, left: 22, duration: 10.5, delay: 2.6 },
    { top: 41, left: 68, duration: 13.2, delay: 0.5 },
    { top: 74, left: 48, duration: 9.8, delay: 1.9 },
    { top: 33, left: 12, duration: 12.1, delay: 2.2 },
    { top: 66, left: 88, duration: 11.6, delay: 0.4 },
];

export function HowItWorks() {

    return (
        <section className="relative isolate overflow-hidden bg-linear-to-b from-neutral-50 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 px-6 py-24 sm:py-32 lg:px-8">
            {/* Animated background elements */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                {/* Morphing gradient blobs */}
                <div
                    className="absolute top-1/4 left-1/4 w-112.5 h-112.5 rounded-full bg-linear-to-br from-lime-400/15 via-emerald-400/10 to-transparent dark:from-lime-500/8 dark:via-emerald-500/5 blur-[100px] animate-morph-blob"
                    style={{ animationDuration: '24s' }}
                />
                <div
                    className="absolute bottom-1/4 right-1/4 w-87.5 h-87.5 rounded-full bg-linear-to-bl from-cyan-400/15 via-teal-400/10 to-transparent dark:from-cyan-500/8 dark:via-teal-500/5 blur-[80px] animate-morph-blob"
                    style={{ animationDuration: '30s', animationDelay: '8s' }}
                />

                {/* Floating orbs */}
                <div className="absolute top-1/3 right-[10%] animate-pulse" style={{ animationDuration: '4s' }}>
                    <div className="w-32 h-32 rounded-full bg-linear-to-br from-lime-500/10 to-emerald-500/5 blur-2xl" />
                </div>

                <div className="absolute bottom-1/3 left-[8%] animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }}>
                    <div className="w-40 h-40 rounded-full bg-linear-to-br from-cyan-500/10 to-teal-500/5 blur-2xl" />
                </div>

                {/* Animated connecting lines */}
                <svg className="absolute inset-0 w-full h-full opacity-20 dark:opacity-10" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="currentColor" className="text-lime-500" stopOpacity="0" />
                            <stop offset="50%" stopColor="currentColor" className="text-lime-500" stopOpacity="1" />
                            <stop offset="100%" stopColor="currentColor" className="text-cyan-500" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M-100,200 Q200,100 400,200 T800,150 T1200,200"
                        stroke="url(#line-gradient)"
                        strokeWidth="1"
                        fill="none"
                        className="animate-float"
                        style={{ animationDuration: '20s' }}
                    />
                </svg>

                {/* Floating particles */}
                {particles.map((p, i) => (
                    <div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-lime-500/40 dark:bg-lime-400/20 animate-float"
                        style={{
                            top: `${p.top}%`,
                            left: `${p.left}%`,
                            animationDuration: `${p.duration}s`,
                            animationDelay: `${p.delay}s`,
                        }}
                    />
                ))}
            </div>

            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-500/10 dark:bg-lime-500/5 border border-lime-500/20 dark:border-lime-500/10 mb-6 animate-fade-in">
                        <Sparkles className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                        <span className="text-sm font-medium text-lime-700 dark:text-lime-300">Quick Start</span>
                    </div>

                    <h2 className="font-primary text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
                        How It{" "}
                        <span className="relative inline-block">
                            <span className="relative z-10 bg-linear-to-r from-lime-600 via-emerald-500 to-cyan-500 bg-clip-text text-transparent dark:from-lime-400 dark:via-emerald-400 dark:to-cyan-400">
                                Works
                            </span>
                            <span className="absolute inset-0 blur-2xl bg-linear-to-r from-lime-600/20 via-emerald-500/20 to-cyan-500/20 dark:from-lime-400/10 dark:via-emerald-400/10 dark:to-cyan-400/10" />
                        </span>
                    </h2>

                    <p className="mt-6 text-lg sm:text-xl font-secondary text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        Get started in minutes. Three simple steps to a better component workflow.
                    </p>
                </div>

                {/* Steps */}
                <div className="relative">
                    {/* Connection line */}
                    <div className="hidden lg:block absolute top-24 left-[16.67%] right-[16.67%] h-0.5">
                        <div className="h-full bg-linear-to-r from-lime-500/0 via-lime-500/50 to-cyan-500/0" />
                        <div className="absolute inset-0 bg-linear-to-r from-lime-500/0 via-lime-500/50 to-cyan-500/0 blur-sm" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
                        {steps.map((step, index) => (
                            <div key={step.number} className="relative group">
                                {/* Card glow */}
                                <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-lime-500/10 to-cyan-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative flex flex-col items-center text-center p-8 rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 bg-white/80 dark:bg-neutral-900/50 backdrop-blur-sm transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-xl hover:-translate-y-2">
                                    {/* Step number badge */}
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-r ${step.gradient} text-white text-xs font-bold shadow-lg`}>
                                            {step.number}
                                        </div>
                                    </div>

                                    {/* Icon */}
                                    <div className={`mt-4 mb-6 relative`}>
                                        <div className={`absolute inset-0 blur-2xl bg-linear-to-r ${step.gradient} opacity-30 group-hover:opacity-50 transition-opacity duration-300`} />
                                        <div className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br ${step.gradient} p-0.5`}>
                                            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-white dark:bg-neutral-900">
                                                <step.icon className={`h-7 w-7`} style={{ color: step.gradient.includes('lime') ? '#84cc16' : step.gradient.includes('cyan') ? '#06b6d4' : '#a855f7' }} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="font-primary text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                                        {step.title}
                                    </h3>

                                    <p className="font-secondary text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xs">
                                        {step.description}
                                    </p>

                                    {/* Code snippet */}
                                    {step.code && (
                                        <div className="mt-6 w-full">
                                            <div className="relative group/code">
                                                <div className="absolute inset-0 rounded-xl bg-linear-to-r from-neutral-900 to-neutral-800 blur-xl opacity-20" />
                                                <code className="relative flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-neutral-900 dark:bg-neutral-800 text-lime-400 dark:text-lime-300 text-sm font-tertiary border border-neutral-800 dark:border-neutral-700">
                                                    <span>{step.code}</span>
                                                    <button className="opacity-0 group-hover/code:opacity-100 transition-opacity duration-200 p-1 hover:bg-neutral-700 rounded">
                                                        <Copy className="w-4 h-4" />
                                                    </button>
                                                </code>
                                            </div>
                                        </div>
                                    )}

                                    {/* Final step checkmark */}
                                    {!step.code && (
                                        <div className="mt-6 flex items-center gap-2 text-lime-600 dark:text-lime-400">
                                            <Check className="w-5 h-5" />
                                            <span className="text-sm font-medium">Ready to scale!</span>
                                        </div>
                                    )}
                                </div>

                                {/* Arrow connector (desktop) */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:flex absolute top-1/2 -right-4 z-10 h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                                        <ArrowRight className="w-4 h-4 text-neutral-400" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 text-center">
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4">
                        <Link
                            href="/docs"
                            className="group relative inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-lime-600 to-emerald-600 dark:from-lime-500 dark:to-emerald-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-[0.98] overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-linear-to-r from-lime-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            <span className="relative z-10 flex items-center gap-2">
                                Get Started Now
                                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                            </span>
                            <span className="absolute inset-0 blur-xl bg-lime-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </Link>

                        <Link
                            href="/docs/installation"
                            className="group inline-flex items-center gap-2 rounded-lg border-2 border-neutral-200 dark:border-neutral-800 px-6 py-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300 transition-all duration-200 hover:border-neutral-300 dark:hover:border-neutral-700 hover:text-neutral-900 dark:hover:text-white"
                        >
                            View Installation Guide
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
