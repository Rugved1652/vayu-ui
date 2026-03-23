"use client";
import { Marquee, MarqueeItem } from "vayu-ui";

export default function MarqueeDemo() {
    return (
        <div className="space-y-12 w-full not-prose p-8 bg-ground-50 dark:bg-ground-900 min-h-screen">
            <div className="  space-y-12">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-ground-900 dark:text-ground-50">
                        Marquee Component
                    </h1>
                    <p className="text-ground-600 dark:text-ground-400">
                        WCAG 2.2 AA compliant scrolling content component with
                        pause controls
                    </p>
                </div>

                {/* Basic Example */}
                <section className="space-y-4">
                    <div className="space-y-1">
                        <h2 className="text-xl font-semibold text-ground-900 dark:text-ground-50">
                            Basic Marquee
                        </h2>
                        <p className="text-sm text-ground-600 dark:text-ground-400">
                            Default settings with pause control (WCAG 2.2.2)
                        </p>
                    </div>
                    <Marquee label="Featured technologies">
                        <MarqueeItem>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-ground-800 border border-ground-200 dark:border-ground-700">
                                <span className="text-ground-900 dark:text-ground-50 font-medium">
                                    React
                                </span>
                            </div>
                        </MarqueeItem>
                        <MarqueeItem>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-ground-800 border border-ground-200 dark:border-ground-700">
                                <span className="text-ground-900 dark:text-ground-50 font-medium">
                                    TypeScript
                                </span>
                            </div>
                        </MarqueeItem>
                        <MarqueeItem>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-ground-800 border border-ground-200 dark:border-ground-700">
                                <span className="text-ground-900 dark:text-ground-50 font-medium">
                                    Tailwind CSS v4
                                </span>
                            </div>
                        </MarqueeItem>
                        <MarqueeItem>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-ground-800 border border-ground-200 dark:border-ground-700">
                                <span className="text-ground-900 dark:text-ground-50 font-medium">
                                    Next.js
                                </span>
                            </div>
                        </MarqueeItem>
                        <MarqueeItem>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-ground-800 border border-ground-200 dark:border-ground-700">
                                <span className="text-ground-900 dark:text-ground-50 font-medium">
                                    Vite
                                </span>
                            </div>
                        </MarqueeItem>
                    </Marquee>
                </section>

                {/* Speed Variants */}
                <section className="space-y-4">
                    <div className="space-y-1">
                        <h2 className="text-xl font-semibold text-ground-900 dark:text-ground-50">
                            Speed Variants
                        </h2>
                        <p className="text-sm text-ground-600 dark:text-ground-400">
                            Slow (40s), Normal (20s), Fast (10s)
                        </p>
                    </div>
                    <div className="space-y-4">
                        <Marquee speed="slow" label="Slow scrolling content">
                            {[...Array(6)].map((_, i) => (
                                <MarqueeItem key={i}>
                                    <div className="px-6 py-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700">
                                        <span className="text-blue-900 dark:text-blue-100 font-medium">
                                            Slow {i + 1}
                                        </span>
                                    </div>
                                </MarqueeItem>
                            ))}
                        </Marquee>
                        <Marquee speed="fast" label="Fast scrolling content">
                            {[...Array(6)].map((_, i) => (
                                <MarqueeItem key={i}>
                                    <div className="px-6 py-3 rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700">
                                        <span className="text-red-900 dark:text-red-100 font-medium">
                                            Fast {i + 1}
                                        </span>
                                    </div>
                                </MarqueeItem>
                            ))}
                        </Marquee>
                    </div>
                </section>

                {/* Direction */}
                <section className="space-y-4">
                    <div className="space-y-1">
                        <h2 className="text-xl font-semibold text-ground-900 dark:text-ground-50">
                            Direction Control
                        </h2>
                        <p className="text-sm text-ground-600 dark:text-ground-400">
                            Left to right or right to left scrolling
                        </p>
                    </div>
                    <div className="space-y-4">
                        <Marquee
                            direction="left"
                            label="Left scrolling content"
                        >
                            {[...Array(6)].map((_, i) => (
                                <MarqueeItem key={i}>
                                    <div className="px-6 py-3 rounded-lg bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700">
                                        <span className="text-green-900 dark:text-green-100 font-medium">
                                            → Left {i + 1}
                                        </span>
                                    </div>
                                </MarqueeItem>
                            ))}
                        </Marquee>
                        <Marquee
                            direction="right"
                            label="Right scrolling content"
                        >
                            {[...Array(6)].map((_, i) => (
                                <MarqueeItem key={i}>
                                    <div className="px-6 py-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-700">
                                        <span className="text-purple-900 dark:text-purple-100 font-medium">
                                            ← Right {i + 1}
                                        </span>
                                    </div>
                                </MarqueeItem>
                            ))}
                        </Marquee>
                    </div>
                </section>

                {/* Loop Modes */}
                <section className="space-y-4">
                    <div className="space-y-1">
                        <h2 className="text-xl font-semibold text-ground-900 dark:text-ground-50">
                            Loop Modes
                        </h2>
                        <p className="text-sm text-ground-600 dark:text-ground-400">
                            Infinite, finite, single, or ping-pong patterns
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-ground-700 dark:text-ground-300">
                                Ping-pong (alternating direction)
                            </p>
                            <Marquee
                                loopMode="ping-pong"
                                label="Ping-pong scrolling content"
                            >
                                {[...Array(6)].map((_, i) => (
                                    <MarqueeItem key={i}>
                                        <div className="px-6 py-3 rounded-lg bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700">
                                            <span className="text-amber-900 dark:text-amber-100 font-medium">
                                                Ping-pong {i + 1}
                                            </span>
                                        </div>
                                    </MarqueeItem>
                                ))}
                            </Marquee>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-ground-700 dark:text-ground-300">
                                Finite (3 loops then stops)
                            </p>
                            <Marquee
                                loopMode="finite"
                                loopCount={3}
                                label="Finite scrolling content"
                            >
                                {[...Array(6)].map((_, i) => (
                                    <MarqueeItem key={i}>
                                        <div className="px-6 py-3 rounded-lg bg-teal-100 dark:bg-teal-900/30 border border-teal-300 dark:border-teal-700">
                                            <span className="text-teal-900 dark:text-teal-100 font-medium">
                                                Finite {i + 1}
                                            </span>
                                        </div>
                                    </MarqueeItem>
                                ))}
                            </Marquee>
                        </div>
                    </div>
                </section>

                {/* Without Controls */}
                <section className="space-y-4">
                    <div className="space-y-1">
                        <h2 className="text-xl font-semibold text-ground-900 dark:text-ground-50">
                            No Controls (Not Recommended)
                        </h2>
                        <p className="text-sm text-ground-600 dark:text-ground-400">
                            Without pause control - fails WCAG 2.2.2 Level A
                        </p>
                    </div>
                    <Marquee
                        showControls={false}
                        label="Uncontrollable scrolling content"
                    >
                        {[...Array(6)].map((_, i) => (
                            <MarqueeItem key={i}>
                                <div className="px-6 py-3 rounded-lg bg-ground-200 dark:bg-ground-700 border border-ground-300 dark:border-ground-600">
                                    <span className="text-ground-900 dark:text-ground-100 font-medium">
                                        No Control {i + 1}
                                    </span>
                                </div>
                            </MarqueeItem>
                        ))}
                    </Marquee>
                </section>

                {/* Without Gradient */}
                <section className="space-y-4">
                    <div className="space-y-1">
                        <h2 className="text-xl font-semibold text-ground-900 dark:text-ground-50">
                            No Edge Gradient
                        </h2>
                        <p className="text-sm text-ground-600 dark:text-ground-400">
                            Without gradient fade on edges
                        </p>
                    </div>
                    <Marquee gradient={false} label="Content without gradient">
                        {[...Array(6)].map((_, i) => (
                            <MarqueeItem key={i}>
                                <div className="px-6 py-3 rounded-lg bg-pink-100 dark:bg-pink-900/30 border border-pink-300 dark:border-pink-700">
                                    <span className="text-pink-900 dark:text-pink-100 font-medium">
                                        Item {i + 1}
                                    </span>
                                </div>
                            </MarqueeItem>
                        ))}
                    </Marquee>
                </section>

                {/* Logo Showcase Example */}
                <section className="space-y-4">
                    <div className="space-y-1">
                        <h2 className="text-xl font-semibold text-ground-900 dark:text-ground-50">
                            Logo Showcase Example
                        </h2>
                        <p className="text-sm text-ground-600 dark:text-ground-400">
                            Typical use case for partner logos or testimonials
                        </p>
                    </div>
                    <Marquee
                        speed="slow"
                        pauseOnHover={true}
                        label="Partner companies"
                    >
                        {[
                            "Acme Corp",
                            "TechVision",
                            "DataFlow Inc",
                            "CloudNine",
                            "DevTools Pro",
                            "AppMakers",
                        ].map((company, i) => (
                            <MarqueeItem key={i}>
                                <div className="px-8 py-4 rounded-xl bg-white dark:bg-ground-800 border border-ground-200 dark:border-ground-700 shadow-sm">
                                    <span className="text-lg font-semibold text-ground-900 dark:text-ground-50">
                                        {company}
                                    </span>
                                </div>
                            </MarqueeItem>
                        ))}
                    </Marquee>
                </section>

                {/* Accessibility Notes */}
                <section className="space-y-4 p-6 rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold text-primary-900 dark:text-primary-100">
                            WCAG 2.2 AA Compliance
                        </h2>
                        <div className="space-y-3 text-sm text-primary-800 dark:text-primary-200">
                            <div className="flex gap-2">
                                <span className="font-semibold shrink-0">
                                    2.2.2 (Level A):
                                </span>
                                <span>
                                    Pause control provided by default for all
                                    moving content
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <span className="font-semibold shrink-0">
                                    2.3.3:
                                </span>
                                <span>
                                    Respects prefers-reduced-motion setting -
                                    animations disabled for users who prefer
                                    reduced motion
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <span className="font-semibold shrink-0">
                                    2.4.7 (Level AA):
                                </span>
                                <span>
                                    Focus indicator visible on pause control
                                    button
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <span className="font-semibold shrink-0">
                                    4.1.2 (Level A):
                                </span>
                                <span>
                                    Proper ARIA labels (role="region",
                                    aria-roledescription, aria-label)
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}