import { Check } from "lucide-react";

const capabilities = [
    "MCP compatible",
    "Structured documentation friendly",
    "skill.md ready architecture",
    "Optimized for AI-assisted refactoring",
];

export function AIEraSection() {
    return (
        <section className="bg-white dark:bg-neutral-950 px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <div className="text-center">
                    <h2 className="font-primary text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight">
                        Built for the{" "}
                        <span className="text-lime-600 dark:text-lime-400">
                            AI Development Era.
                        </span>
                    </h2>

                    <p className="mt-6 text-base sm:text-lg font-secondary text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xl mx-auto">
                        Vayu UI aligns with modern AI workflows — structured, predictable, and
                        designed to integrate with the tools you already use.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                    {capabilities.map((item) => (
                        <div
                            key={item}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800/60"
                        >
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center">
                                <Check className="h-3 w-3 text-lime-600 dark:text-lime-400" />
                            </div>
                            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                {item}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
