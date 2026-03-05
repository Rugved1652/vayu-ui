import { Terminal, Plus, Layers } from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Install CLI",
        description: "One command to set up Vayu UI in your project.",
        icon: Terminal,
        code: "npx vayu-ui init",
    },
    {
        number: "02",
        title: "Add Components",
        description: "Pick only what you need. Each component lives in your codebase.",
        icon: Plus,
        code: "npx vayu-ui add button",
    },
    {
        number: "03",
        title: "Scale With Structure",
        description:
            "Predictable patterns that grow with your product — and your AI tools.",
        icon: Layers,
        code: null,
    },
];

export function HowItWorks() {
    return (
        <section className="bg-neutral-50 dark:bg-neutral-900/50 px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <div className="text-center mb-16">
                    <h2 className="font-primary text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                        How it works
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
                    {steps.map((step, index) => (
                        <div key={step.number} className="relative">
                            {/* Connector line (desktop only) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-[22px] left-[calc(50%+28px)] w-[calc(100%-56px)] h-px bg-neutral-200 dark:bg-neutral-800 translate-x-[28px]" />
                            )}

                            <div className="flex flex-col items-center text-center">
                                <div className="relative mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300">
                                    <step.icon className="w-4.5 h-4.5" />
                                </div>

                                <span className="text-xs font-tertiary font-medium text-lime-600 dark:text-lime-400 tracking-widest uppercase mb-2">
                                    Step {step.number}
                                </span>

                                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                                    {step.title}
                                </h3>

                                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xs">
                                    {step.description}
                                </p>

                                {step.code && (
                                    <code className="mt-4 inline-block px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-800 text-lime-400 dark:text-lime-300 text-xs font-tertiary">
                                        {step.code}
                                    </code>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
