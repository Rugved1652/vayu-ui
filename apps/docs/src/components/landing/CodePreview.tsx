"use client";

import { Copy, Check, Terminal, Code2, Sparkles, FileCode2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function CodePreview() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`import { Button, Card, Input } from "@/components/ui";
import { useDisclosure } from "@/hooks/useDisclosure";

export default function Dashboard() {
  const modal = useDisclosure();

  return (
    <Card>
      <Input placeholder="Search..." />
      <Button onClick={modal.onOpen}>
        Create Project
      </Button>
    </Card>
  );
}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="relative isolate overflow-hidden bg-white dark:bg-neutral-950 px-6 py-24 sm:py-32 lg:px-8">
            {/* Animated background elements */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                {/* Morphing gradient blobs */}
                <div
                    className="absolute top-0 right-0 w-125 h-125 rounded-full bg-linear-to-bl from-lime-400/10 via-emerald-400/5 to-transparent dark:from-lime-500/5 dark:via-emerald-500/3 blur-[100px] animate-morph-blob"
                    style={{ animationDuration: '25s' }}
                />
                <div
                    className="absolute bottom-0 left-0 w-100 h-100 rounded-full bg-linear-to-tr from-cyan-400/10 via-teal-400/5 to-transparent dark:from-cyan-500/5 dark:via-teal-500/3 blur-[80px] animate-morph-blob"
                    style={{ animationDuration: '30s', animationDelay: '8s' }}
                />

                {/* Code-themed floating elements */}
                <div className="absolute top-1/4 left-[5%] animate-float" style={{ animationDuration: '10s' }}>
                    <div className="font-mono text-xs text-lime-500/30 dark:text-lime-400/20 opacity-60">
                        {"{ }"}
                    </div>
                </div>

                <div className="absolute top-1/3 right-[5%] animate-float" style={{ animationDuration: '12s', animationDelay: '2s' }}>
                    <div className="font-mono text-xs text-cyan-500/30 dark:text-cyan-400/20 opacity-60">
                        {"< />"}
                    </div>
                </div>

                <div className="absolute bottom-1/4 left-[8%] animate-float" style={{ animationDuration: '8s', animationDelay: '1s' }}>
                    <div className="font-mono text-xs text-purple-500/30 dark:text-purple-400/20 opacity-60">
                        const
                    </div>
                </div>

                <div className="absolute top-[60%] right-[10%] animate-float" style={{ animationDuration: '14s', animationDelay: '3s' }}>
                    <div className="font-mono text-xs text-amber-500/30 dark:text-amber-400/20 opacity-60">
                        function
                    </div>
                </div>

                {/* Floating icons */}
                <div className="absolute top-1/6 right-[15%] animate-float" style={{ animationDuration: '7s' }}>
                    <div className="relative">
                        <div className="absolute inset-0 blur-xl bg-lime-500/30" />
                        <Code2 className="w-6 h-6 text-lime-500/40 dark:text-lime-400/20 relative z-10" />
                    </div>
                </div>

                <div className="absolute bottom-1/3 left-[12%] animate-float" style={{ animationDuration: '9s', animationDelay: '2s' }}>
                    <div className="relative">
                        <div className="absolute inset-0 blur-xl bg-cyan-500/30" />
                        <Terminal className="w-5 h-5 text-cyan-500/40 dark:text-cyan-400/20 relative z-10" />
                    </div>
                </div>

                {/* Glowing orbs */}
                <div className="absolute top-1/3 left-[30%] animate-pulse" style={{ animationDuration: '4s' }}>
                    <div className="w-24 h-24 rounded-full bg-linear-to-br from-lime-500/10 to-emerald-500/5 blur-2xl" />
                </div>

                <div className="absolute bottom-1/3 right-[25%] animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }}>
                    <div className="w-32 h-32 rounded-full bg-linear-to-br from-cyan-500/10 to-teal-500/5 blur-2xl" />
                </div>

                {/* Grid pattern */}
                <svg className="absolute inset-0 w-full h-full opacity-5 dark:opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="code-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M40 0 L0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-lime-500" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#code-grid)" />
                </svg>
            </div>

            <div className="mx-auto max-w-5xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-500/10 dark:bg-lime-500/5 border border-lime-500/20 dark:border-lime-500/10 mb-6 animate-fade-in">
                        <FileCode2 className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                        <span className="text-sm font-medium text-lime-700 dark:text-lime-300">Developer Experience</span>
                    </div>

                    <h2 className="font-primary text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
                        Clean by{" "}
                        <span className="relative inline-block">
                            <span className="relative z-10 bg-linear-to-r from-lime-600 via-emerald-500 to-cyan-500 bg-clip-text text-transparent dark:from-lime-400 dark:via-emerald-400 dark:to-cyan-400">
                                Default
                            </span>
                            <span className="absolute inset-0 blur-2xl bg-linear-to-r from-lime-600/20 via-emerald-500/20 to-cyan-500/20 dark:from-lime-400/10 dark:via-emerald-400/10 dark:to-cyan-400/10" />
                        </span>
                    </h2>

                    <p className="mt-6 text-lg sm:text-xl font-secondary text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        Components that read well — for you and your AI.
                    </p>
                </div>

                {/* Code editor */}
                <div className="relative group">
                    {/* Glow effect */}
                    <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-lime-500/20 via-emerald-500/10 to-cyan-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-2xl bg-neutral-950">
                        {/* Editor chrome */}
                        <div className="flex items-center justify-between px-4 py-3 bg-neutral-900 border-b border-neutral-800">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <span className="text-xs font-tertiary text-neutral-500">
                                    app/dashboard/page.tsx
                                </span>
                            </div>

                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all duration-200"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-3.5 h-3.5 text-lime-400" />
                                        <span className="text-lime-400">Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-3.5 h-3.5" />
                                        <span>Copy</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Code content */}
                        <div className="p-6 overflow-x-auto">
                            <pre className="text-sm leading-8 font-tertiary">
                                <code>
                                    <span className="text-purple-400">import</span>
                                    <span className="text-neutral-300">{" { "}</span>
                                    <span className="text-lime-300">Button</span>
                                    <span className="text-neutral-300">{", "}</span>
                                    <span className="text-lime-300">Card</span>
                                    <span className="text-neutral-300">{", "}</span>
                                    <span className="text-lime-300">Input</span>
                                    <span className="text-neutral-300">{" } "}</span>
                                    <span className="text-purple-400">from</span>
                                    <span className="text-amber-300">{" \"@/components/ui\""}</span>
                                    <span className="text-neutral-500">;</span>
                                    {"\n"}
                                    <span className="text-purple-400">import</span>
                                    <span className="text-neutral-300">{" { "}</span>
                                    <span className="text-lime-300">useDisclosure</span>
                                    <span className="text-neutral-300">{" } "}</span>
                                    <span className="text-purple-400">from</span>
                                    <span className="text-amber-300">{" \"@/hooks/useDisclosure\""}</span>
                                    <span className="text-neutral-500">;</span>
                                    {"\n\n"}
                                    <span className="text-purple-400">export default</span>
                                    <span className="text-blue-300">{" function "}</span>
                                    <span className="text-lime-300">Dashboard</span>
                                    <span className="text-neutral-300">{"() {"}</span>
                                    {"\n"}
                                    <span className="text-neutral-300">{"  "}</span>
                                    <span className="text-purple-400">const</span>
                                    <span className="text-neutral-300">{" modal = "}</span>
                                    <span className="text-blue-300">useDisclosure</span>
                                    <span className="text-neutral-300">{"();"}</span>
                                    {"\n\n"}
                                    <span className="text-neutral-300">{"  "}</span>
                                    <span className="text-purple-400">return</span>
                                    <span className="text-neutral-300">{" ("}</span>
                                    {"\n"}
                                    <span className="text-neutral-300">{"    "}</span>
                                    <span className="text-blue-300">{"<"}</span>
                                    <span className="text-lime-300">Card</span>
                                    <span className="text-blue-300">{">"}</span>
                                    {"\n"}
                                    <span className="text-neutral-300">{"      "}</span>
                                    <span className="text-blue-300">{"<"}</span>
                                    <span className="text-lime-300">Input</span>
                                    <span className="text-neutral-300">{" "}</span>
                                    <span className="text-purple-300">placeholder</span>
                                    <span className="text-neutral-500">{"="}</span>
                                    <span className="text-amber-300">{'"Search..."'}</span>
                                    <span className="text-blue-300">{" />"}</span>
                                    {"\n"}
                                    <span className="text-neutral-300">{"      "}</span>
                                    <span className="text-blue-300">{"<"}</span>
                                    <span className="text-lime-300">Button</span>
                                    <span className="text-neutral-300">{" "}</span>
                                    <span className="text-purple-300">onClick</span>
                                    <span className="text-neutral-500">{"="}</span>
                                    <span className="text-neutral-300">{"{modal.onOpen}"}</span>
                                    <span className="text-blue-300">{">"}</span>
                                    {"\n"}
                                    <span className="text-neutral-300">{"        Create Project"}</span>
                                    {"\n"}
                                    <span className="text-neutral-300">{"      "}</span>
                                    <span className="text-blue-300">{"</"}</span>
                                    <span className="text-lime-300">Button</span>
                                    <span className="text-blue-300">{">"}</span>
                                    {"\n"}
                                    <span className="text-neutral-300">{"    "}</span>
                                    <span className="text-blue-300">{"</"}</span>
                                    <span className="text-lime-300">Card</span>
                                    <span className="text-blue-300">{">"}</span>
                                    {"\n"}
                                    <span className="text-neutral-300">{"  );"}</span>
                                    {"\n"}
                                    <span className="text-neutral-300">{"}"}</span>
                                </code>
                            </pre>
                        </div>

                        {/* Editor footer */}
                        <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 border-t border-neutral-800 text-xs text-neutral-500">
                            <div className="flex items-center gap-4">
                                <span>TypeScript React</span>
                                <span>UTF-8</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-3.5 h-3.5 text-lime-500" />
                                <span>AI-Ready Code</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                        { title: "Predictable Imports", description: "Consistent import paths across all components" },
                        { title: "Type-Safe APIs", description: "Full TypeScript support with intelligent autocomplete" },
                        { title: "Self-Documenting", description: "Code that explains itself to humans and AI" },
                    ].map((feature) => (
                        <div key={feature.title} className="text-center p-4">
                            <h3 className="font-primary text-base font-semibold text-neutral-900 dark:text-white mb-1">
                                {feature.title}
                            </h3>
                            <p className="font-secondary text-sm text-neutral-600 dark:text-neutral-400">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <Link
                        href="/docs"
                        className="group relative inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-lime-600 to-emerald-600 dark:from-lime-500 dark:to-emerald-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-[0.98] overflow-hidden"
                    >
                        <span className="absolute inset-0 bg-linear-to-r from-lime-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        <span className="relative z-10 flex items-center gap-2">
                            View All Components
                            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </span>
                        <span className="absolute inset-0 blur-xl bg-lime-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
