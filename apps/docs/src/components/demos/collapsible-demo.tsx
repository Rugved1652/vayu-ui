"use client";

import { Collapsible } from "vayu-ui";

export default function CollapsibleDemo() {
    return (
        <div className="not-prose flex flex-col gap-8 w-full max-w-lg">
            {/* Default */}
            <Collapsible trigger="What is VED UI?">
                VED UI is a premium React component library built with
                accessibility, dark mode, and modern design principles at its
                core.
            </Collapsible>

            {/* Bordered */}
            <Collapsible
                trigger="How do I install it?"
                variant="bordered"
                defaultOpen
            >
                Run <code>npm install vayu-ui</code> or copy individual
                component files directly into your project.
            </Collapsible>

            {/* Filled with left icon */}
            <Collapsible
                trigger="Is dark mode supported?"
                variant="filled"
                iconPosition="left"
            >
                Yes! All components support dark mode out of the box using
                Tailwind&apos;s dark mode classes.
            </Collapsible>

            {/* Group — accordion behavior */}
            <div>
                <h3 className="text-sm font-medium font-primary text-neutral-500 dark:text-neutral-400 mb-2">
                    Accordion Group (single open)
                </h3>
                <Collapsible.Group defaultOpenItems={[0]}>
                    <Collapsible trigger="Section One" variant="bordered">
                        Content for section one. Only one section can be open at
                        a time in this group.
                    </Collapsible>
                    <Collapsible trigger="Section Two" variant="bordered">
                        Content for section two.
                    </Collapsible>
                    <Collapsible
                        trigger="Section Three (disabled)"
                        variant="bordered"
                        disabled
                    >
                        This section is disabled.
                    </Collapsible>
                </Collapsible.Group>
            </div>
        </div>
    );
}
