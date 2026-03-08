"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Rocket, Github, Star, Heart } from "lucide-react";

export function FinalCTA() {
    return (
        <section className="relative isolate overflow-hidden bg-gradient-to-b from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 px-6 py-24 sm:py-32 lg:px-8">
            {/* Animated background elements */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                {/* Morphing gradient blobs */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-gradient-to-r from-lime-400/20 via-emerald-400/15 to-cyan-400/10 dark:from-lime-500/10 dark:via-emerald-500/8 dark:to-cyan-500/5 blur-[150px] animate-morph-blob"
                    style={{ animationDuration: '20s' }}
                />
                <div
                    className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-purple-400/15 via-pink-400/10 to-transparent dark:from-purple-500/8 dark:via-pink-500/5 blur-[100px] animate-morph-blob"
                    style={{ animationDuration: '28s', animationDelay: '5s' }}
                />
                <div
                    className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-gradient-to-bl from-cyan-400/15 via-teal-400/10 to-transparent dark:from-cyan-500/8 dark:via-teal-500/5 blur-[80px] animate-morph-blob"
                    style={{ animationDuration: '32s', animationDelay: '10s' }}
                />

                {/* Radiating circles */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full border border-lime-500/10 dark:border-lime-400/5 animate-ping"
                            style={{
                                width: `${200 + i * 150}px`,
                                height: `${200 + i * 150}px`,
                                left: `-${100 + i * 75}px`,
                                top: `-${100 + i * 75}px`,
                                animationDuration: `${3 + i * 0.5}s`,
                                animationDelay: `${i * 0.3}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Floating icons */}
                <div className="absolute top-1/6 left-[15%] animate-float" style={{ animationDuration: '6s' }}>
                    <div className="relative group">
                        <div className="absolute inset-0 blur-xl bg-lime-500/40" />
                        <Rocket className="w-8 h-8 text-lime-500/60 dark:text-lime-400/40 relative z-10" />
                    </div>
                </div>

                <div className="absolute top-1/3 right-[12%] animate-float" style={{ animationDuration: '8s', animationDelay: '2s' }}>
                    <div className="relative group">
                        <div className="absolute inset-0 blur-xl bg-purple-500/40" />
                        <Sparkles className="w-7 h-7 text-purple-500/60 dark:text-purple-400/40 relative z-10" />
                    </div>
                </div>

                <div className="absolute bottom-1/3 left-[8%] animate-float" style={{ animationDuration: '10s', animationDelay: '1s' }}>
                    <div className="relative group">
                        <div className="absolute inset-0 blur-xl bg-cyan-500/40" />
                        <Zap className="w-6 h-6 text-cyan-500/60 dark:text-cyan-400/40 relative z-10" />
                    </div>
                </div>

                <div className="absolute bottom-1/6 right-[15%] animate-float" style={{ animationDuration: '7s', animationDelay: '3s' }}>
                    <div className="relative group">
                        <div className="absolute inset-0 blur-xl bg-pink-500/40" />
                        <Star className="w-7 h-7 text-pink-500/60 dark:text-pink-400/40 relative z-10" />
                    </div>
                </div>

                {/* Glowing orbs */}
                <div className="absolute top-1/4 right-[25%] animate-pulse" style={{ animationDuration: '3s' }}>
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-lime-500/15 to-emerald-500/10 blur-3xl" />
                </div>

                <div className="absolute bottom-1/4 left-[20%] animate-pulse" style={{ animationDuration: '4s', animationDelay: '1.5s' }}>
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-purple-500/15 to-pink-500/10 blur-3xl" />
                </div>

                {/* Animated particles */}
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full animate-float"
                        style={{
                            width: `${2 + Math.random() * 4}px`,
                            height: `${2 + Math.random() * 4}px`,
                            top: `${10 + Math.random() * 80}%`,
                            left: `${5 + Math.random() * 90}%`,
                            backgroundColor: ['#84cc16', '#a855f7', '#06b6d4', '#ec4899'][i % 4],
                            opacity: 0.3 + Math.random() * 0.3,
                            animationDuration: `${8 + Math.random() * 8}s`,
                            animationDelay: `${Math.random() * 3}s`,
                        }}
                    />
                ))}

                {/* Decorative grid */}
                <svg className="absolute inset-0 w-full h-full opacity-5 dark:opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="cta-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                            <circle cx="30" cy="30" r="1" fill="currentColor" className="text-lime-500" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#cta-grid)" />
                </svg>
            </div>

            <div className="mx-auto max-w-4xl">
                {/* Main content card */}
                <div className="relative">
                    {/* Outer glow */}
                    <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-lime-500/20 via-emerald-500/10 to-cyan-500/20 blur-3xl opacity-60" />

                    <div className="relative rounded-3xl border border-lime-200/50 dark:border-lime-900/30 bg-gradient-to-br from-lime-50/80 via-white/90 to-emerald-50/80 dark:from-lime-950/40 dark:via-neutral-900/90 dark:to-emerald-950/40 backdrop-blur-sm p-12 sm:p-16 text-center overflow-hidden">
                        {/* Inner decorative elements */}
                        <div className="absolute top-6 left-6 animate-float" style={{ animationDuration: '5s' }}>
                            <Sparkles className="w-5 h-5 text-lime-500/40" />
                        </div>
                        <div className="absolute top-6 right-6 animate-float" style={{ animationDuration: '6s', animationDelay: '1s' }}>
                            <Sparkles className="w-4 h-4 text-emerald-500/40" />
                        </div>
                        <div className="absolute bottom-6 left-6 animate-float" style={{ animationDuration: '7s', animationDelay: '0.5s' }}>
                            <Sparkles className="w-4 h-4 text-cyan-500/40" />
                        </div>
                        <div className="absolute bottom-6 right-6 animate-float" style={{ animationDuration: '8s', animationDelay: '1.5s' }}>
                            <Sparkles className="w-5 h-5 text-purple-500/40" />
                        </div>

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-500/10 dark:bg-lime-500/5 border border-lime-500/20 dark:border-lime-500/10 mb-8">
                            <Rocket className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                            <span className="text-sm font-medium text-lime-700 dark:text-lime-300">Start Building Today</span>
                        </div>

                        {/* Headline */}
                        <h2 className="font-primary text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-neutral-900 dark:text-white">
                            Stop Fighting
                            <br className="hidden sm:block" />
                            <span className="relative inline-block">
                                <span className="relative z-10 bg-gradient-to-r from-lime-600 via-emerald-500 to-cyan-500 bg-clip-text text-transparent dark:from-lime-400 dark:via-emerald-400 dark:to-cyan-400">
                                    Your AI
                                </span>
                                <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-lime-600/30 via-emerald-500/20 to-cyan-500/20 dark:from-lime-400/15 dark:via-emerald-400/10 dark:to-cyan-400/10" />
                            </span>
                        </h2>

                        {/* Subtext */}
                        <p className="mt-6 text-lg sm:text-xl font-secondary text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
                            Give it better structure. Build real products.
                        </p>

                        {/* CTAs */}
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/docs"
                                className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-lime-600 to-emerald-600 dark:from-lime-500 dark:to-emerald-500 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-[0.98] overflow-hidden shadow-lg shadow-lime-500/25"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-lime-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                <span className="relative z-10 flex items-center gap-2">
                                    <Zap className="w-5 h-5" />
                                    Start Building With Vayu UI
                                    <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                                </span>
                                <span className="absolute inset-0 blur-xl bg-lime-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            </Link>

                            <Link
                                href="https://github.com"
                                target="_blank"
                                className="group relative inline-flex items-center gap-2 rounded-xl border-2 border-neutral-200 dark:border-neutral-800 px-8 py-4 text-base font-semibold text-neutral-700 dark:text-neutral-300 transition-all duration-200 hover:border-neutral-300 dark:hover:border-neutral-700 hover:text-neutral-900 dark:hover:text-white hover:scale-105 active:scale-[0.98]"
                            >
                                <span className="absolute inset-0 bg-neutral-100 dark:bg-neutral-900 opacity-0 group-hover:opacity-50 transition-opacity duration-200 rounded-lg" />
                                <Github className="w-5 h-5 relative z-10" />
                                <span className="relative z-10">View on GitHub</span>
                            </Link>
                        </div>

                        {/* Trust signals */}
                        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-neutral-500 dark:text-neutral-500">
                            <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-amber-500" />
                                <span className="text-sm font-medium">Open Source</span>
                            </div>
                            <div className="w-px h-4 bg-neutral-300 dark:bg-neutral-700" />
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-lime-500" />
                                <span className="text-sm font-medium">50+ Components</span>
                            </div>
                            <div className="w-px h-4 bg-neutral-300 dark:bg-neutral-700" />
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-purple-500" />
                                <span className="text-sm font-medium">AI-Ready</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom tagline */}
                <p className="mt-8 text-center font-secondary text-sm text-neutral-500 dark:text-neutral-500">
                    Your AI tools will love Vayu UI.{" "}
                    <span className="text-lime-600 dark:text-lime-400">Give them the structure they deserve.</span>
                </p>
            </div>

            {/* Footer / Copyright */}
            <footer className="relative mt-16 pt-8 border-t border-neutral-200/50 dark:border-neutral-800/50">
                <div className="mx-auto max-w-4xl">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        {/* Logo / Brand */}
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-lime-500 to-emerald-500">
                                <span className="text-white font-bold text-sm">V</span>
                            </div>
                            <span className="font-primary text-lg font-semibold text-neutral-900 dark:text-white">Vayu UI</span>
                        </div>

                        {/* Copyright */}
                        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-sm text-neutral-500 dark:text-neutral-500">
                            <div className="flex items-center gap-1.5">
                                <span>Made with</span>
                                <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" style={{ animationDuration: '1.5s' }} />
                                <span>in India</span>
                                <span className="ml-1">🇮🇳</span>
                            </div>
                            <div className="hidden sm:block w-px h-4 bg-neutral-300 dark:bg-neutral-700" />
                            <span>© {new Date().getFullYear()} Vayu UI. All rights reserved.</span>
                        </div>

                        {/* Links */}
                        <div className="flex items-center gap-4">
                            <Link
                                href="https://github.com"
                                target="_blank"
                                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                            >
                                <Github className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/docs"
                                className="text-neutral-400 hover:text-lime-600 dark:hover:text-lime-400 transition-colors"
                            >
                                <span className="text-sm font-medium">Docs</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </section>
    );
}
