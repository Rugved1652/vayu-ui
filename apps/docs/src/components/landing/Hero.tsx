"use client";

import Link from "next/link";
import { ArrowRight, Github, Sparkles, Zap, Code2, Layers, Box, Palette, Cpu, Blocks, Terminal, Rocket, Wand2, Bolt, CloudLightning, Lightbulb } from "lucide-react";

export function Hero() {
    return (
        <section className="relative isolate flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-neutral-950 px-6 pt-32 pb-20 sm:pt-40 sm:pb-28 lg:px-8 min-h-[90vh]">
            {/* Background */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                {/* Morphing gradient blobs */}
                <div
                    className="absolute top-0 left-1/4 w-150 h-150 rounded-full bg-linear-to-br from-lime-400/20 via-emerald-400/15 to-transparent dark:from-lime-500/10 dark:via-emerald-500/5 blur-[100px] animate-morph-blob"
                    style={{ animationDuration: '20s' }}
                />
                <div
                    className="absolute top-1/3 right-1/4 w-125 h-125 rounded-full bg-linear-to-bl from-cyan-400/20 via-teal-400/15 to-transparent dark:from-cyan-500/10 dark:via-teal-500/5 blur-[80px] animate-morph-blob"
                    style={{ animationDuration: '25s', animationDelay: '5s' }}
                />
                <div
                    className="absolute bottom-0 left-1/2 w-175 h-100 rounded-full bg-linear-to-t from-purple-400/15 via-pink-400/10 to-transparent dark:from-purple-500/8 dark:via-pink-500/5 blur-[120px] animate-morph-blob"
                    style={{ animationDuration: '30s', animationDelay: '10s' }}
                />

                {/* Neural network pattern */}
                <svg className="absolute inset-0 w-full h-full opacity-20 dark:opacity-10" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="neural" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <circle cx="50" cy="50" r="1" fill="currentColor" className="text-lime-500" />
                            <circle cx="25" cy="25" r="0.5" fill="currentColor" className="text-emerald-500" />
                            <circle cx="75" cy="75" r="0.5" fill="currentColor" className="text-cyan-500" />
                            <line x1="50" y1="50" x2="25" y2="25" stroke="currentColor" strokeWidth="0.3" className="text-lime-500/50" />
                            <line x1="50" y1="50" x2="75" y2="75" stroke="currentColor" strokeWidth="0.3" className="text-emerald-500/50" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#neural)" />
                </svg>

                {/* Floating orbs with trails */}
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-orbit"
                        style={{
                            left: '50%',
                            top: '50%',
                            width: `${200 + i * 50}px`,
                            height: `${200 + i * 50}px`,
                            marginLeft: `-${100 + i * 25}px`,
                            marginTop: `-${100 + i * 25}px`,
                            animationDuration: `${15 + i * 5}s`,
                            animationDelay: `${i * 2}s`,
                        }}
                    >
                        <div
                            className="absolute top-0 left-1/2 w-2 h-2 rounded-full animate-pulse"
                            style={{
                                background: `radial-gradient(circle, ${['#84cc16', '#10b981', '#06b6d4', '#8b5cf6', '#ec4899'][i % 5]}, transparent)`,
                                boxShadow: `0 0 20px ${['#84cc16', '#10b981', '#06b6d4', '#8b5cf6', '#ec4899'][i % 5]}`,
                            }}
                        />
                    </div>
                ))}

                {/* Geometric hexagon pattern */}
                <div className="absolute top-1/4 left-[5%] animate-float" style={{ animationDuration: '8s' }}>
                    <svg width="80" height="92" viewBox="0 0 80 92" className="text-lime-500/20 dark:text-lime-400/10">
                        <polygon points="40,0 80,23 80,69 40,92 0,69 0,23" fill="currentColor" />
                    </svg>
                </div>

                <div className="absolute bottom-1/4 right-[8%] animate-float" style={{ animationDuration: '10s', animationDelay: '2s' }}>
                    <svg width="60" height="69" viewBox="0 0 60 69" className="text-emerald-500/20 dark:text-emerald-400/10">
                        <polygon points="30,0 60,17 60,52 30,69 0,52 0,17" fill="currentColor" />
                    </svg>
                </div>

                <div className="absolute top-1/2 left-[15%] animate-float" style={{ animationDuration: '12s', animationDelay: '1s' }}>
                    <svg width="50" height="58" viewBox="0 0 50 58" className="text-cyan-500/20 dark:text-cyan-400/10">
                        <polygon points="25,0 50,14 50,44 25,58 0,44 0,14" fill="currentColor" />
                    </svg>
                </div>

                {/* DNA helix effect */}
                <div className="absolute top-1/3 right-[5%] space-y-2 animate-float" style={{ animationDuration: '15s' }}>
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div
                                className="w-1.5 h-1.5 rounded-full bg-lime-500/40 dark:bg-lime-400/30"
                                style={{
                                    marginLeft: `${Math.sin(i * 0.8) * 10}px`,
                                    animationDelay: `${i * 0.2}s`
                                }}
                            />
                            <div className="w-8 h-px bg-linear-to-r from-lime-500/20 to-transparent dark:from-lime-400/10" />
                        </div>
                    ))}
                </div>

                {/* Floating code snippets */}
                <div className="absolute top-1/4 left-[8%] animate-float opacity-30 dark:opacity-20" style={{ animationDuration: '14s', animationDelay: '3s' }}>
                    <div className="font-mono text-xs text-lime-600 dark:text-lime-400 space-y-1">
                        <div className="flex items-center gap-1">
                            <span className="text-purple-500">&lt;</span>
                            <span className="text-lime-600 dark:text-lime-400">Button</span>
                            <span className="text-purple-500">/&gt;</span>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-1/3 right-[12%] animate-float opacity-30 dark:opacity-20" style={{ animationDuration: '16s', animationDelay: '5s' }}>
                    <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400 space-y-1">
                        <div className="flex items-center gap-1">
                            <span className="text-cyan-500">const</span>
                            <span className="text-emerald-600 dark:text-emerald-400">=</span>
                            <span className="text-orange-500">use</span>
                        </div>
                    </div>
                </div>

                {/* Glowing orbs */}
                <div className="absolute top-1/4 right-[20%] animate-pulse" style={{ animationDuration: '3s' }}>
                    <div className="w-32 h-32 rounded-full bg-linear-to-br from-lime-500/10 to-emerald-500/5 blur-2xl" />
                </div>

                <div className="absolute bottom-1/4 left-[20%] animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                    <div className="w-40 h-40 rounded-full bg-linear-to-br from-cyan-500/10 to-purple-500/5 blur-2xl" />
                </div>

                {/* Circuit lines */}
                <svg className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-5" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0,200 Q100,150 200,200 T300,150 400,200"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        fill="none"
                        className="text-lime-500"
                    />
                    <path
                        d="M100%,300 Q90%,250 80%,300 T70%,250 60%,300"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        fill="none"
                        className="text-emerald-500"
                    />
                    <path
                        d="M0,400 Q150,350 300,400 T450,350 600,400"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        fill="none"
                        className="text-cyan-500"
                    />
                </svg>

                {/* Floating icons with glow */}
                <div className="absolute top-1/8 left-[25%] animate-float" style={{ animationDuration: '6s' }}>
                    <div className="relative group">
                        <div className="absolute inset-0 blur-xl bg-lime-500/40 group-hover:bg-lime-500/60 transition-colors duration-300" />
                        <Lightbulb className="w-12 h-12 text-lime-600 dark:text-lime-400 relative z-10" />
                    </div>
                </div>

                <div className="absolute top-1/3 right-[15%] animate-float" style={{ animationDuration: '8s', animationDelay: '2s' }}>
                    <div className="relative group">
                        <div className="absolute inset-0 blur-xl bg-emerald-500/40 group-hover:bg-emerald-500/60 transition-colors duration-300" />
                        <Terminal className="w-10 h-10 text-emerald-600 dark:text-emerald-400 relative z-10" />
                    </div>
                </div>

                <div className="absolute bottom-1/3 left-[15%] animate-float" style={{ animationDuration: '7s', animationDelay: '1s' }}>
                    <div className="relative group">
                        <div className="absolute inset-0 blur-xl bg-cyan-500/40 group-hover:bg-cyan-500/60 transition-colors duration-300" />
                        <Code2 className="w-11 h-11 text-cyan-600 dark:text-cyan-400 relative z-10" />
                    </div>
                </div>

                <div className="absolute top-[60%] right-[8%] animate-float" style={{ animationDuration: '9s', animationDelay: '3s' }}>
                    <div className="relative group">
                        <div className="absolute inset-0 blur-xl bg-purple-500/40 group-hover:bg-purple-500/60 transition-colors duration-300" />
                        <Layers className="w-9 h-9 text-purple-600 dark:text-purple-400 relative z-10" />
                    </div>
                </div>

                <div className="absolute bottom-[20%] right-[20%] animate-float" style={{ animationDuration: '11s', animationDelay: '0.5s' }}>
                    <div className="relative group">
                        <div className="absolute inset-0 blur-xl bg-pink-500/40 group-hover:bg-pink-500/60 transition-colors duration-300" />
                        <Rocket className="w-10 h-10 text-pink-600 dark:text-pink-400 relative z-10" />
                    </div>
                </div>

                <div className="absolute top-[15%] right-[25%] animate-float" style={{ animationDuration: '12s', animationDelay: '1.5s' }}>
                    <div className="relative group">
                        <div className="absolute inset-0 blur-xl bg-orange-500/40 group-hover:bg-orange-500/60 transition-colors duration-300" />
                        <Wand2 className="w-8 h-8 text-orange-600 dark:text-orange-400 relative z-10" />
                    </div>
                </div>

                <div className="absolute bottom-[40%] left-[5%] animate-float" style={{ animationDuration: '10s', animationDelay: '2.5s' }}>
                    <div className="relative group">
                        <div className="absolute inset-0 blur-xl bg-teal-500/40 group-hover:bg-teal-500/60 transition-colors duration-300" />
                        <Cpu className="w-10 h-10 text-teal-600 dark:text-teal-400 relative z-10" />
                    </div>
                </div>

                {/* Radial gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-white/50 dark:to-neutral-950/50" />

                {/* Decorative SVG wave */}
                <svg className="absolute bottom-0 left-0 right-0 h-32 text-neutral-100 dark:text-neutral-900" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path
                        fill="currentColor"
                        d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,69.3C960,85,1056,107,1152,101.3C1248,96,1344,64,1392,48L1440,32V120H1392C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120H0V64Z"
                        opacity="0.3"
                    />
                </svg>
            </div>

            <div className="relative z-10 mx-auto max-w-4xl text-center">
                {/* Glowing badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-500/10 dark:bg-lime-500/5 border border-lime-500/20 dark:border-lime-500/10 mb-8 animate-fade-in">
                    <Sparkles className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                    <span className="text-sm font-medium text-lime-700 dark:text-lime-300">AI-Native Design System</span>
                </div>

                {/* Headline with gradient */}
                <h1 className="font-primary text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] text-neutral-900 dark:text-white">
                    Build{" "}
                    <span className="relative inline-block">
                        <span className="relative z-10 bg-linear-to-r from-lime-600 via-emerald-500 to-cyan-500 bg-clip-text text-transparent dark:from-lime-400 dark:via-emerald-400 dark:to-cyan-400">
                            Beautiful
                        </span>
                        <span className="absolute inset-0 blur-2xl bg-linear-to-r from-lime-600/30 via-emerald-500/30 to-cyan-500/30 dark:from-lime-400/20 dark:via-emerald-400/20 dark:to-cyan-400/20" />
                    </span>
                    <br className="hidden sm:block" />
                    UI with{" "}
                    <span className="relative inline-block">
                        <span className="relative z-10 text-lime-600 dark:text-lime-400">
                            Vayu UI
                        </span>
                    </span>
                </h1>

                {/* Subheading */}
                <p className="mt-6 text-lg sm:text-xl font-secondary font-medium text-neutral-600 dark:text-neutral-300 tracking-wide">
                    MCP Server, Knowledge Base for NotebookLM & LLM txt files.
                </p>

                {/* Supporting text */}
                <p className="mt-4 text-base sm:text-lg font-secondary text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                    Production-ready components designed for AI coding agents. Accessible, performant, and fully customizable.
                </p>

                {/* CTAs with glow effect */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/docs"
                        className="group relative inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-lime-600 to-emerald-600 dark:from-lime-500 dark:to-emerald-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-[0.98] overflow-hidden"
                    >
                        <span className="absolute inset-0 bg-linear-to-r from-lime-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        <span className="relative z-10 flex items-center gap-2">
                            Explore Components
                            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </span>
                        <span className="absolute inset-0 blur-xl bg-lime-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </Link>

                    <Link
                        href="https://github.com"
                        target="_blank"
                        className="group relative inline-flex items-center gap-2 rounded-lg border-2 border-neutral-200 dark:border-neutral-800 px-6 py-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300 transition-all duration-200 hover:border-neutral-300 dark:hover:border-neutral-700 hover:text-neutral-900 dark:hover:text-white hover:scale-105 active:scale-[0.98] overflow-hidden"
                    >
                        <span className="absolute inset-0 bg-neutral-100 dark:bg-neutral-900 opacity-0 group-hover:opacity-50 transition-opacity duration-200" />
                        <Github className="w-4 h-4 relative z-10" />
                        <span className="relative z-10">View on GitHub</span>
                    </Link>
                </div>

                {/* Trust signal with icons */}
                <div className="mt-12 flex flex-col items-center gap-3">
                    <div className="flex items-center gap-6 text-neutral-400 dark:text-neutral-600">
                        <div className="flex items-center gap-2">
                            <Blocks className="w-5 h-5" />
                            <span className="text-sm font-medium">50+ Components</span>
                        </div>
                        <div className="w-px h-4 bg-neutral-300 dark:bg-neutral-700" />
                        <div className="flex items-center gap-2">
                            <Code2 className="w-5 h-5" />
                            <span className="text-sm font-medium">TypeScript</span>
                        </div>
                        <div className="w-px h-4 bg-neutral-300 dark:bg-neutral-700" />
                        <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5" />
                            <span className="text-sm font-medium">Tailwind CSS v4</span>
                        </div>
                    </div>
                    <p className="text-sm font-secondary text-neutral-400 dark:text-neutral-600">
                        Your AI tools will love Vayu UI.
                    </p>
                </div>
            </div>
        </section>
    );
}
