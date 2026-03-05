export function CodePreview() {
    return (
        <section className="bg-neutral-50 dark:bg-neutral-900/50 px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="font-primary text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                        Clean by default
                    </h2>
                    <p className="mt-4 text-base font-secondary text-neutral-500 dark:text-neutral-400">
                        Components that read well — for you and your AI.
                    </p>
                </div>

                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
                    {/* Editor chrome */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-neutral-100 dark:bg-neutral-800/80 border-b border-neutral-200 dark:border-neutral-700/50">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                            <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                            <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                        </div>
                        <span className="ml-2 text-xs font-tertiary text-neutral-400 dark:text-neutral-500">
                            app/dashboard/page.tsx
                        </span>
                    </div>

                    {/* Code content */}
                    <div className="bg-neutral-950 dark:bg-neutral-900 p-6 overflow-x-auto">
                        <pre className="text-sm leading-7 font-tertiary">
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
                </div>
            </div>
        </section>
    );
}
