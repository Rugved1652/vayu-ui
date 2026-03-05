export function ProblemSection() {
    return (
        <section className="bg-neutral-50 dark:bg-neutral-900/50 px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
                <h2 className="font-primary text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight">
                    AI Can Generate Code.{" "}
                    <br className="hidden sm:block" />
                    <span className="text-neutral-400 dark:text-neutral-500">
                        But Can It Ship It?
                    </span>
                </h2>

                <div className="mt-8 space-y-4 text-base sm:text-lg font-secondary text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto">
                    <p>
                        Modern AI tools generate components fast — but without structure,
                        consistency, and system thinking, the output becomes messy,
                        duplicated, and hard to scale.
                    </p>
                    <p className="text-neutral-700 dark:text-neutral-300 font-medium">
                        Vayu UI provides predictable architecture that makes AI-generated code
                        usable in real products.
                    </p>
                </div>
            </div>
        </section>
    );
}
