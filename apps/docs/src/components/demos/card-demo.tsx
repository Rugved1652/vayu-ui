"use client";

import {
    Card,
    CardBadge,
    CardContent,
    CardFooter,
    CardHeader,
    CardMedia,
} from "vayu-ui";

export default function CardDemo() {
    return (
        <div className="not-prose flex flex-col gap-10 w-full max-w-lg">
            {/* Elevated (default) */}
            <div>
                <h3 className="text-sm font-medium font-primary text-neutral-500 dark:text-neutral-400 mb-3">
                    Elevated
                </h3>
                <Card>
                    <CardMedia
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80"
                        alt="Abstract gradient art"
                    />
                    <CardHeader
                        title="Design Tokens"
                        subtitle="A unified color palette for every surface."
                        action={<CardBadge color="primary">New</CardBadge>}
                    />
                    <CardContent>
                        Ground, primary, secondary, and semantic colors work
                        seamlessly across light and dark mode.
                    </CardContent>
                    <CardFooter align="between">
                        <span className="text-xs font-secondary text-ground-400">
                            Feb 2026
                        </span>
                        <button className="text-sm font-secondary font-semibold text-primary-600 dark:text-primary-400 hover:underline">
                            Read more →
                        </button>
                    </CardFooter>
                </Card>
            </div>

            {/* Outlined */}
            <div>
                <h3 className="text-sm font-medium font-primary text-neutral-500 dark:text-neutral-400 mb-3">
                    Outlined &amp; Interactive
                </h3>
                <Card
                    variant="outlined"
                    interactive
                    onClick={() => alert("Clicked!")}
                >
                    <CardHeader
                        title="Click Me"
                        subtitle="This card is focusable and keyboard-accessible."
                    />
                    <CardContent>
                        Interactive cards get <code>role=&quot;button&quot;</code>,{" "}
                        <code>tabIndex=0</code>, and Enter / Space key support.
                    </CardContent>
                </Card>
            </div>

            {/* Filled + linked */}
            <div>
                <h3 className="text-sm font-medium font-primary text-neutral-500 dark:text-neutral-400 mb-3">
                    Filled &amp; Linked
                </h3>
                <Card
                    variant="filled"
                    href="https://github.com"
                    target="_blank"
                    size="sm"
                >
                    <CardHeader
                        title="GitHub"
                        subtitle="Opens in a new tab with rel=&quot;noopener noreferrer&quot;."
                    />
                </Card>
            </div>

            {/* Ghost + disabled */}
            <div>
                <h3 className="text-sm font-medium font-primary text-neutral-500 dark:text-neutral-400 mb-3">
                    Ghost &amp; Disabled
                </h3>
                <Card variant="ghost" disabled interactive>
                    <CardHeader
                        title="Disabled Card"
                        subtitle="Pointer events are blocked and opacity is reduced."
                    />
                    <CardContent>This card cannot be interacted with.</CardContent>
                </Card>
            </div>
        </div>
    );
}
