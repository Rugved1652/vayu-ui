"use client";

import { Card } from "vayu-ui";

export default function CardDemo() {
    return (
        <div className="not-prose flex flex-col gap-10 w-full max-w-lg">
            {/* Default Card */}
            <div>
                <h2
                    id="card-demo-label"
                    className="text-xl font-primary font-semibold text-ground-900 dark:text-ground-50 mb-4"
                >
                    Card Example
                </h2>
                <Card>
                    <Card.Media
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80"
                        alt="Abstract gradient art"
                    />
                    <Card.Header
                        title="Design Tokens"
                        subtitle="A unified color palette for every surface."
                    />
                    <Card.Content>
                        Ground, primary, secondary, and semantic colors work
                        seamlessly across light and dark mode.
                    </Card.Content>
                    <Card.Footer>
                        <button className="text-sm font-secondary font-semibold text-primary-600 dark:text-primary-400 hover:underline">
                            Read more →
                        </button>
                    </Card.Footer>
                </Card>
            </div>

            {/* Interactive Card */}
            <div>
                <h3 className="text-sm font-medium font-primary text-ground-500 dark:text-ground-400 mb-3">
                    Interactive
                </h3>
                <Card interactive onClick={() => alert("Clicked!")}>
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

            {/* Linked Card */}
            <div>
                <h3 className="text-sm font-medium font-primary text-ground-500 dark:text-ground-400 mb-3">
                    Linked
                </h3>
                <Card
                    href="https://github.com"
                    target="_blank"
                >
                    <Card.Header
                        title="GitHub"
                        subtitle="Opens in a new tab with rel=&quot;noopener noreferrer&quot;."
                    />
                </Card>
            </div>

            {/* Disabled Card */}
            <div>
                <h3 className="text-sm font-medium font-primary text-ground-500 dark:text-ground-400 mb-3">
                    Disabled
                </h3>
                <Card disabled interactive>
                    <Card.Header
                        title="Disabled Card"
                        subtitle="Pointer events are blocked and opacity is reduced."
                    />
                    <Card.Content>
                        This card cannot be interacted with.
                    </Card.Content>
                </Card>
            </div>

            {/* Card with Avatar */}
            <div>
                <h3 className="text-sm font-medium font-primary text-ground-500 dark:text-ground-400 mb-3">
                    With Avatar &amp; Action
                </h3>
                <Card>
                    <Card.Header
                        avatar={
                            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold">
                                JD
                            </div>
                        }
                        title="John Doe"
                        subtitle="Software Engineer"
                        action={
                            <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                                Follow
                            </button>
                        }
                    />
                    <Card.Content>
                        Building beautiful user interfaces with modern web technologies.
                    </Card.Content>
                </Card>
            </div>
        </div>
    );
}
