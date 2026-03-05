"use client";

import { useState } from "react";
import { Affix } from "vayu-ui";

export default function AffixDemo() {
    const [affixed, setAffixed] = useState(false);

    return (
        <div className="not-prose flex flex-col gap-6 w-full max-w-lg">
            <p className="text-sm font-secondary text-ground-500 dark:text-ground-400">
                Scroll this page to see the affix in action. The bar below
                will stick to the top of the viewport once you scroll past
                it.
            </p>

            <Affix
                offset={64}
                onAffixed={setAffixed}
            >
                <div
                    className={`
                        flex items-center justify-between px-4 py-3 rounded-lg
                        font-secondary text-sm transition-colors duration-200
                        ${affixed
                            ? "bg-primary-600 text-white dark:bg-primary-500"
                            : "bg-ground-100 dark:bg-ground-800 text-ground-800 dark:text-ground-200"
                        }
                    `}
                >
                    <span className="font-semibold">
                        {affixed ? "📌 Affixed!" : "Scroll down to affix me"}
                    </span>
                    <span className="text-xs opacity-75">
                        offset: 64px &middot; position: top
                    </span>
                </div>
            </Affix>

            {/* Spacer to allow scrolling */}
            <div className="space-y-4">
                {Array.from({ length: 8 }, (_, i) => (
                    <div
                        key={i}
                        className="h-24 rounded-lg bg-ground-50 dark:bg-ground-900 border border-ground-200 dark:border-ground-800 flex items-center justify-center text-sm font-secondary text-ground-400"
                    >
                        Content block {i + 1}
                    </div>
                ))}
            </div>
        </div>
    );
}
