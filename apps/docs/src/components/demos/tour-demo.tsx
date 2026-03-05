"use client";

import { useState } from "react";
import { Tour, type TourStep } from "vayu-ui";

const steps: TourStep[] = [
    {
        target: "#tour-title",
        title: "Welcome!",
        content:
            "This is the Tour component. It highlights elements on the page and guides the user step-by-step.",
        placement: "bottom",
    },
    {
        target: "#tour-card-1",
        title: "Feature Cards",
        content:
            "Each card represents a feature. The spotlight draws attention to the relevant area.",
        placement: "right",
    },
    {
        target: "#tour-card-2",
        title: "Second Card",
        content: "Navigate with arrow keys, or use the Previous / Next buttons.",
        placement: "left",
    },
    {
        target: "#tour-cta",
        title: "Call to Action",
        content:
            "Click Finish to complete the tour. You can also press Escape or click Skip at any time.",
        placement: "top",
    },
];

export default function TourDemo() {
    const [open, setOpen] = useState(false);

    return (
        <div className="not-prose flex flex-col gap-6 w-full max-w-lg">
            <Tour
                steps={steps}
                isOpen={open}
                onClose={() => setOpen(false)}
                onComplete={() => setOpen(false)}
                onSkip={() => setOpen(false)}
            >
                <div className="flex flex-col gap-4">
                    <h3
                        id="tour-title"
                        className="text-lg font-primary font-bold text-ground-900 dark:text-ground-50"
                    >
                        Tour Demo
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                        <div
                            id="tour-card-1"
                            className="p-4 rounded-lg border border-ground-200 dark:border-ground-800 bg-ground-50 dark:bg-ground-900"
                        >
                            <p className="text-sm font-secondary text-ground-700 dark:text-ground-300">
                                Feature A
                            </p>
                        </div>
                        <div
                            id="tour-card-2"
                            className="p-4 rounded-lg border border-ground-200 dark:border-ground-800 bg-ground-50 dark:bg-ground-900"
                        >
                            <p className="text-sm font-secondary text-ground-700 dark:text-ground-300">
                                Feature B
                            </p>
                        </div>
                    </div>

                    <button
                        id="tour-cta"
                        onClick={() => setOpen(true)}
                        className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 font-secondary font-medium transition-colors w-fit"
                    >
                        Start Tour
                    </button>
                </div>
            </Tour>
        </div>
    );
}
