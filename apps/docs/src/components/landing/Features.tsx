import {
    Brain,
    Copy,
    Component,
    Repeat,
    Unlink,
    FileCode2,
} from "lucide-react";

const features = [
    {
        title: "AI-Readable Architecture",
        description:
            "Predictable structure that improves AI-generated output quality.",
        icon: Brain,
    },
    {
        title: "Copy-Paste Ownership",
        description: "All components live in your codebase. Modify freely.",
        icon: Copy,
    },
    {
        title: "Production-Ready Components",
        description: "60+ real-world components built for SaaS applications.",
        icon: Component,
    },
    {
        title: "System-Level Hooks",
        description: "Reusable logic patterns that reduce duplication.",
        icon: Repeat,
    },
    {
        title: "No Vendor Lock-In",
        description: "No dependency traps. No forced upgrades.",
        icon: Unlink,
    },
    {
        title: "MCP & Context Friendly",
        description: "Designed to work with structured AI context systems.",
        icon: FileCode2,
    },
];

export function Features() {
    return (
        <section className="bg-white dark:bg-neutral-950 px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <div className="text-center mb-16">
                    <h2 className="font-primary text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                        What makes Vayu UI different
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="group rounded-xl border border-neutral-100 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-900/30 p-6 transition-colors duration-200 hover:border-neutral-200 dark:hover:border-neutral-700"
                        >
                            <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 transition-colors duration-200 group-hover:bg-lime-50 dark:group-hover:bg-lime-900/20 group-hover:text-lime-600 dark:group-hover:text-lime-400">
                                <feature.icon className="h-4.5 w-4.5" />
                            </div>
                            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-1.5">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
