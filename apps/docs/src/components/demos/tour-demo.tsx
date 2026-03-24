"use client";

import { useState } from "react";
import { Tour, type TourStep, Typography, Button, Divider } from "vayu-ui";

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
                    <Typography.H3
                        id="tour-title"
                        className="text-lg"
                    >
                        Tour Demo
                    </Typography.H3>

                    <div className="grid grid-cols-2 gap-3">
                        <div
                            id="tour-card-1"
                            className="p-4 rounded-surface border border-border bg-surface"
                        >
                            <Typography.P className="text-sm">
                                Feature A
                            </Typography.P>
                        </div>
                        <div
                            id="tour-card-2"
                            className="p-4 rounded-surface border border-border bg-surface"
                        >
                            <Typography.P className="text-sm">
                                Feature B
                            </Typography.P>
                        </div>
                    </div>

                    <Divider spacing="sm" decorative />

                    <Button
                        id="tour-cta"
                        onClick={() => setOpen(true)}
                        variant="primary"
                        size="medium"
                        className="w-fit"
                    >
                        <Button.Text>Start Tour</Button.Text>
                    </Button>
                </div>
            </Tour>
        </div>
    );
}
