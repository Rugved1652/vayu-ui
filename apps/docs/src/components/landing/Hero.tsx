import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";

export function Hero() {
    return (
        <section className="relative isolate flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-neutral-950 px-6 pt-32 pb-20 sm:pt-40 sm:pb-28 lg:px-8 min-h-[90vh]">
            {/* Background */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-lime-500/8 dark:bg-lime-500/5 blur-[120px]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
            </div>

            <div className="relative z-10 mx-auto max-w-3xl text-center">
                {/* Headline */}
                <h1 className="font-primary text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] text-neutral-900 dark:text-white">
                    Give Your AI{" "}
                    <br className="hidden sm:block" />
                    Better{" "}
                    <span className="text-lime-600 dark:text-lime-400">
                        Building Blocks.
                    </span>
                </h1>

                {/* Subheading */}
                <p className="mt-6 text-lg sm:text-xl font-secondary font-medium text-neutral-500 dark:text-neutral-400 tracking-wide">
                    Structured for AI. Built for Scale.
                </p>

                {/* Supporting text */}
                <p className="mt-4 text-base sm:text-lg font-secondary text-neutral-400 dark:text-neutral-500 max-w-2xl mx-auto leading-relaxed">
                    Vayu UI is an AI-optimized React component system designed for modern
                    development workflows. Clean architecture, predictable structure, and
                    production-ready components your AI tools can actually understand.
                </p>

                {/* CTAs */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/docs"
                        className="group inline-flex items-center gap-2 rounded-lg bg-neutral-900 dark:bg-white px-6 py-3 text-sm font-semibold text-white dark:text-neutral-900 transition-all duration-200 hover:bg-neutral-800 dark:hover:bg-neutral-100 active:scale-[0.98]"
                    >
                        Explore Components
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>

                    <Link
                        href="https://github.com"
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 px-6 py-3 text-sm font-semibold text-neutral-600 dark:text-neutral-300 transition-all duration-200 hover:border-neutral-300 dark:hover:border-neutral-700 hover:text-neutral-900 dark:hover:text-white active:scale-[0.98]"
                    >
                        <Github className="w-4 h-4" />
                        View on GitHub
                    </Link>
                </div>

                {/* Trust signal */}
                <p className="mt-8 text-sm font-secondary text-neutral-400 dark:text-neutral-600">
                    Your AI tools will love Vayu UI.
                </p>
            </div>
        </section>
    );
}
