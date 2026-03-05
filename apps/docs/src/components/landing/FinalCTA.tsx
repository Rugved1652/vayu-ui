import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
    return (
        <section className="bg-white dark:bg-neutral-950 px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-primary text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    Stop Fighting Your AI.
                </h2>

                <p className="mt-5 text-base sm:text-lg font-secondary text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Give it better structure. Build real products.
                </p>

                <div className="mt-10">
                    <Link
                        href="/docs"
                        className="group inline-flex items-center gap-2 rounded-lg bg-neutral-900 dark:bg-white px-8 py-3.5 text-sm font-semibold text-white dark:text-neutral-900 transition-all duration-200 hover:bg-neutral-800 dark:hover:bg-neutral-100 active:scale-[0.98]"
                    >
                        Start Building With Vayu UI
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
