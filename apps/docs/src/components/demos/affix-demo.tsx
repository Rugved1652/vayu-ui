"use client";

import { useState } from "react";
import { Affix } from "vayu-ui";

export default function AffixDemo() {
    const [topAffixed, setTopAffixed] = useState(false);
    const [bottomAffixed, setBottomAffixed] = useState(false);

    return (
        <div className="not-prose flex flex-col gap-6 w-full max-w-lg">
            <h2 id="affix-demo-label" className="text-h3 font-primary text-ground-800 dark:text-ground-100">
                Affix Example
            </h2>

            <p className="text-para font-secondary text-ground-500 dark:text-ground-400">
                Scroll this page to see the affix in action. The bars below
                will stick to the top or bottom of the viewport once you scroll past
                them.
            </p>

            {/* Top Affix */}
            <Affix
                offset={64}
                onAffixed={setTopAffixed}
                label="Sticky navigation bar"
            >
                <div
                    className={`
                        flex items-center justify-between px-4 py-3 rounded
                        font-secondary text-sm transition-colors duration-medium
                        ${topAffixed
                            ? "bg-primary-600 text-white dark:bg-primary-500"
                            : "bg-ground-100 dark:bg-ground-800 text-ground-800 dark:text-ground-200"
                        }
                    `}
                >
                    <span className="font-semibold">
                        {topAffixed ? "Affixed to top" : "Scroll down to affix me"}
                    </span>
                    <span className="text-xs opacity-75">
                        offset: 64px · position: top
                    </span>
                </div>
            </Affix>

            {/* Content blocks for scrolling */}
            <div className="space-y-4">
                {Array.from({ length: 8 }, (_, i) => (
                    <div
                        key={i}
                        className="h-24 rounded bg-ground-50 dark:bg-ground-900 border border-ground-200 dark:border-ground-700 flex items-center justify-center text-sm font-secondary text-ground-400"
                    >
                        Content block {i + 1}
                    </div>
                ))}
            </div>

            {/* Bottom Affix */}
            <Affix
                offset={16}
                position="bottom"
                onAffixed={setBottomAffixed}
                label="Sticky footer bar"
            >
                <div
                    className={`
                        flex items-center justify-between px-4 py-3 rounded
                        font-secondary text-sm transition-colors duration-medium
                        ${bottomAffixed
                            ? "bg-info-600 text-white dark:bg-info-500"
                            : "bg-ground-100 dark:bg-ground-800 text-ground-800 dark:text-ground-200"
                        }
                    `}
                >
                    <span className="font-semibold">
                        {bottomAffixed ? "Affixed to bottom" : "Scroll up to affix me"}
                    </span>
                    <span className="text-xs opacity-75">
                        offset: 16px · position: bottom
                    </span>
                </div>
            </Affix>
        </div>
    );
}