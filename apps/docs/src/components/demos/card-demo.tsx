"use client";

import { Card } from "vayu-ui";

export default function CardDemo() {
    return (
        <div className="not-prose flex flex-col gap-10 w-full max-w-lg">
            {/* Elevated (default) */}
            <div>
                <h2
                    id="card-demo-label"
                    className="text-xl font-primary font-semibold text-ground-900 dark:text-ground-50 mb-4"
                >
                    Card Example
                </h2>
                <h3 className="text-sm font-medium font-primary text-ground-500 dark:text-ground-400 mb-3">
                    Elevated
                </h3>
                <Card>
                    <Card.Media
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80"
                        alt="Abstract gradient art"
                    />
                    <Card.Header
                        title="Design Tokens"
                        subtitle="A unified color palette for every surface."
                        action={<Card.Badge color="primary">New</Card.Badge>}
                    />
                    <Card.Content>
                        Ground, primary, secondary, and semantic colors work
                        seamlessly across light and dark mode.
                    </Card.Content>
                    <Card.Footer align="between">
                        <span className="text-xs font-secondary text-ground-400">
                            Feb 2026
                        </span>
                        <button className="text-sm font-secondary font-semibold text-primary-600 dark:text-primary-400 hover:underline">
                            Read more →
                        </button>
                    </Card.Footer>
                </Card>
            </div>

            {/* Outlined */}
            <div>
                <h3 className="text-sm font-medium font-primary text-ground-500 dark:text-ground-400 mb-3">
                    Outlined &amp; Interactive
                </h3>
                <Card
                    variant="outlined"
                    interactive
                    onClick={() => alert("Clicked!")}
                >
                    <Card.Header
                        title="Click Me"
                        subtitle="This card is focusable and keyboard-accessible."
                    />
                    <Card.Content>
                        Interactive cards get <code>role=&quot;button&quot;</code>,{" "}
                        <code>tabIndex=0</code>, and Enter / Space key support.
                    </Card.Content>
                </Card>
            </div>

            {/* Filled + linked */}
            <div>
                <h3 className="text-sm font-medium font-primary text-ground-500 dark:text-ground-400 mb-3">
                    Filled &amp; Linked
                </h3>
                <Card
                    variant="filled"
                    href="https://github.com"
                    target="_blank"
                    size="sm"
                >
                    <Card.Header
                        title="GitHub"
                        subtitle="Opens in a new tab with rel=&quot;noopener noreferrer&quot;."
                    />
                </Card>
            </div>

            {/* Ghost + disabled */}
            <div>
                <h3 className="text-sm font-medium font-primary text-ground-500 dark:text-ground-400 mb-3">
                    Ghost &amp; Disabled
                </h3>
                <Card variant="ghost" disabled interactive>
                    <Card.Header
                        title="Disabled Card"
                        subtitle="Pointer events are blocked and opacity is reduced."
                    />
                    <Card.Content>
                        This card cannot be interacted with.
                    </Card.Content>
                </Card>
            </div>

            {/* Size variants */}
            <div>
                <h3 className="text-sm font-medium font-primary text-ground-500 dark:text-ground-400 mb-3">
                    Size Variants
                </h3>
                <div className="flex flex-col gap-4">
                    <Card size="sm" variant="outlined">
                        <Card.Header title="Small Card" subtitle="size=&quot;sm&quot;" />
                    </Card>
                    <Card size="md" variant="outlined">
                        <Card.Header title="Medium Card" subtitle="size=&quot;md&quot; (default)" />
                    </Card>
                    <Card size="lg" variant="outlined">
                        <Card.Header title="Large Card" subtitle="size=&quot;lg&quot;" />
                    </Card>
                </div>
            </div>

            {/* Badge colors */}
            <div>
                <h3 className="text-sm font-medium font-primary text-ground-500 dark:text-ground-400 mb-3">
                    Badge Colors
                </h3>
                <div className="flex flex-wrap gap-2">
                    <Card.Badge color="primary">Primary</Card.Badge>
                    <Card.Badge color="secondary">Secondary</Card.Badge>
                    <Card.Badge color="success">Success</Card.Badge>
                    <Card.Badge color="warning">Warning</Card.Badge>
                    <Card.Badge color="error">Error</Card.Badge>
                    <Card.Badge color="info">Info</Card.Badge>
                </div>
            </div>
        </div>
    );
}