"use client";

import { Check, Sparkles, Brain, Cpu, Bot, Workflow, FileCode2, ArrowRight } from "lucide-react";
import Link from "next/link";

const capabilities = [
    {
        title: "MCP Compatible",
        description: "Works with Model Context Protocol for seamless AI integration",
        icon: Cpu,
    },
    {
        title: "Structured Documentation",
        description: "AI-friendly docs that improve context understanding",
        icon: FileCode2,
    },
    {
        title: "skill.md Ready",
        description: "Pre-built architecture for AI skill definitions",
        icon: Brain,
    },
    {
        title: "AI Refactoring",
        description: "Optimized patterns for AI-assisted code improvements",
        icon: Workflow,
    },
];

// Pre-generated static particles to avoid hydration mismatch with Math.random()
const particles = [
    { top: 42, left: 15, duration: 3.1, delay: 0.4 },
    { top: 75, left: 82, duration: 4.2, delay: 1.3 },
    { top: 28, left: 38, duration: 2.9, delay: 0.7 },
    { top: 63, left: 58, duration: 3.6, delay: 1.6 },
    { top: 35, left: 22, duration: 4.4, delay: 0.2 },
    { top: 88, left: 48, duration: 2.3, delay: 1.9 },
    { top: 18, left: 72, duration: 3.8, delay: 0.5 },
    { top: 52, left: 28, duration: 2.1, delay: 1.2 },
    { top: 78, left: 55, duration: 4.7, delay: 0.8 },
    { top: 45, left: 85, duration: 3.3, delay: 1.5 },
    { top: 32, left: 45, duration: 2.6, delay: 0.3 },
    { top: 68, left: 12, duration: 3.9, delay: 1.8 },
    { top: 22, left: 68, duration: 4.1, delay: 0.1 },
    { top: 82, left: 35, duration: 2.8, delay: 1.1 },
    { top: 58, left: 78, duration: 3.4, delay: 0.6 },
    { top: 38, left: 18, duration: 4.3, delay: 1.4 },
    { top: 72, left: 62, duration: 2.5, delay: 1.7 },
    { top: 15, left: 42, duration: 3.7, delay: 0.9 },
    { top: 65, left: 88, duration: 4.5, delay: 2.0 },
    { top: 48, left: 52, duration: 2.4, delay: 0.8 },
];

export function AIEraSection() {

    return (
        <section className="relative isolate overflow-hidden bg-linear-to-b from-neutral-50 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 px-6 py-24 sm:py-32 lg:px-8">
            {/* Animated background elements */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                {/* Morphing gradient blobs */}
                <div
                    className="absolute top-1/4 left-1/3 w-125 h-125 rounded-full bg-linear-to-br from-violet-400/15 via-purple-400/10 to-transparent dark:from-violet-500/8 dark:via-purple-500/5 blur-[100px] animate-morph-blob"
                    style={{ animationDuration: '25s' }}
                />
                <div
                    className="absolute bottom-1/4 right-1/4 w-100 h-100 rounded-full bg-linear-to-bl from-lime-400/15 via-emerald-400/10 to-transparent dark:from-lime-500/8 dark:via-emerald-500/5 blur-[80px] animate-morph-blob"
                    style={{ animationDuration: '30s', animationDelay: '5s' }}
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 rounded-full bg-linear-to-r from-cyan-400/10 via-teal-400/5 to-transparent dark:from-cyan-500/5 dark:via-teal-500/3 blur-[120px] animate-morph-blob"
                    style={{ animationDuration: '35s', animationDelay: '10s' }}
                />

                {/* Neural network visualization */}
                <svg className="absolute inset-0 w-full h-full opacity-20 dark:opacity-10" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="currentColor" className="text-lime-500" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="currentColor" className="text-lime-500" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    {/* Connection lines */}
                    <g className="text-lime-500/30">
                        <line x1="20%" y1="30%" x2="40%" y2="50%" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="40%" y1="50%" x2="60%" y2="40%" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="60%" y1="40%" x2="80%" y2="60%" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="40%" y1="50%" x2="50%" y2="70%" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="50%" y1="70%" x2="70%" y2="80%" stroke="currentColor" strokeWidth="0.5" />
                    </g>
                    {/* Nodes */}
                    <g>
                        <circle cx="20%" cy="30%" r="4" fill="url(#node-glow)" className="text-lime-500" />
                        <circle cx="40%" cy="50%" r="4" fill="url(#node-glow)" className="text-purple-500" />
                        <circle cx="60%" cy="40%" r="4" fill="url(#node-glow)" className="text-cyan-500" />
                        <circle cx="80%" cy="60%" r="4" fill="url(#node-glow)" className="text-lime-500" />
                        <circle cx="50%" cy="70%" r="4" fill="url(#node-glow)" className="text-purple-500" />
                        <circle cx="70%" cy="80%" r="4" fill="url(#node-glow)" className="text-cyan-500" />
                    </g>
                </svg>

                {/* Floating AI-themed icons */}
                <div className="absolute top-1/6 left-[10%] animate-float" style={{ animationDuration: '8s' }}>
                    <div className="relative group">
                        <div className="absolute inset-0 blur-xl bg-purple-500/30" />
                        <Brain className="w-8 h-8 text-purple-500/50 dark:text-purple-400/30 relative z-10" />
                    </div>
                </div>

                <div className="absolute top-1/3 right-[8%] animate-float" style={{ animationDuration: '10s', animationDelay: '2s' }}>
                    <div className="relative group">
                        <div className="absolute inset-0 blur-xl bg-lime-500/30" />
                        <Cpu className="w-7 h-7 text-lime-500/50 dark:text-lime-400/30 relative z-10" />
                    </div>
                </div>

                <div className="absolute bottom-1/3 left-[5%] animate-float" style={{ animationDuration: '12s', animationDelay: '1s' }}>
                    <div className="relative group">
                        <div className="absolute inset-0 blur-xl bg-cyan-500/30" />
                        <Bot className="w-6 h-6 text-cyan-500/50 dark:text-cyan-400/30 relative z-10" />
                    </div>
                </div>

                {/* Glowing orbs */}
                <div className="absolute top-1/4 right-[20%] animate-pulse" style={{ animationDuration: '4s' }}>
                    <div className="w-28 h-28 rounded-full bg-linear-to-br from-purple-500/10 to-violet-500/5 blur-2xl" />
                </div>

                <div className="absolute bottom-1/4 left-[20%] animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }}>
                    <div className="w-36 h-36 rounded-full bg-linear-to-br from-lime-500/10 to-emerald-500/5 blur-2xl" />
                </div>

                {/* Animated particles */}
                {particles.map((p, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full animate-pulse"
                        style={{
                            top: `${p.top}%`,
                            left: `${p.left}%`,
                            backgroundColor: ['#84cc16', '#a855f7', '#06b6d4'][i % 3],
                            opacity: 0.4,
                            animationDuration: `${p.duration}s`,
                            animationDelay: `${p.delay}s`,
                        }}
                    />
                ))}
            </div>

            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 dark:bg-purple-500/5 border border-purple-500/20 dark:border-purple-500/10 mb-8 animate-fade-in">
                        <Brain className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span className="text-sm font-medium text-purple-700 dark:text-purple-300">AI-First Design</span>
                    </div>

                    <h2 className="font-primary text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                        <span className="text-neutral-900 dark:text-white">Built for the</span>
                        <br className="hidden sm:block" />
                        <span className="relative inline-block">
                            <span className="relative z-10 bg-linear-to-r from-violet-600 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent dark:from-violet-400 dark:via-purple-400 dark:to-fuchsia-400">
                                AI Development Era
                            </span>
                            <span className="absolute inset-0 blur-2xl bg-linear-to-r from-violet-600/20 via-purple-500/20 to-fuchsia-500/20 dark:from-violet-400/10 dark:via-purple-400/10 dark:to-fuchsia-400/10" />
                        </span>
                    </h2>

                    <p className="mt-6 text-lg sm:text-xl font-secondary text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        Vayu UI aligns with modern AI workflows — structured, predictable, and
                        designed to integrate with the tools you already use.
                    </p>
                </div>

                {/* Capabilities grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
                    {capabilities.map((item, index) => (
                        <div
                            key={item.title}
                            className="group relative"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-purple-500/10 to-lime-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative flex items-start gap-4 p-6 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50 bg-white/80 dark:bg-neutral-900/50 backdrop-blur-sm transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-lg hover:-translate-y-1">
                                {/* Icon */}
                                <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-purple-500/10 to-lime-500/5 dark:from-purple-500/5 dark:to-lime-500/3">
                                    <item.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-primary text-lg font-semibold text-neutral-900 dark:text-white mb-1">
                                        {item.title}
                                    </h3>
                                    <p className="font-secondary text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Check mark */}
                                <div className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-lime-100 dark:bg-lime-500/10">
                                    <Check className="h-3.5 w-3.5 text-lime-600 dark:text-lime-400" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* AI workflow visualization */}
                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-purple-500/5 via-transparent to-lime-500/5 blur-3xl" />

                    <div className="relative rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 bg-white/50 dark:bg-neutral-900/30 backdrop-blur-sm p-8 sm:p-12">
                        {/* Workflow header */}
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 dark:bg-purple-500/5">
                                <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">AI Agent</span>
                            </div>
                            <ArrowRight className="w-5 h-5 text-neutral-400" />
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-lime-500/10 dark:bg-lime-500/5">
                                <FileCode2 className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                                <span className="text-sm font-medium text-lime-700 dark:text-lime-300">Vayu UI</span>
                            </div>
                            <ArrowRight className="w-5 h-5 text-neutral-400" />
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 dark:bg-cyan-500/5">
                                <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                                <span className="text-sm font-medium text-cyan-700 dark:text-cyan-300">Production</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-center font-secondary text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto">
                            AI agents read the structured documentation, understand component patterns,
                            and generate consistent, production-ready code that integrates seamlessly
                            with your existing Vayu UI codebase.
                        </p>

                        {/* CTA */}
                        <div className="mt-8 text-center">
                            <Link
                                href="/docs"
                                className="group relative inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-violet-600 to-purple-600 dark:from-violet-500 dark:to-purple-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-[0.98] overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-linear-to-r from-violet-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                <span className="relative z-10 flex items-center gap-2">
                                    Explore AI Integration
                                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                                </span>
                                <span className="absolute inset-0 blur-xl bg-violet-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
