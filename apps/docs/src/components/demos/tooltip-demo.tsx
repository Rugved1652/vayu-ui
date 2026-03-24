"use client";

import { Tooltip, Button, Typography, Divider } from "vayu-ui";
import { Info, AlertTriangle, CheckCircle, XCircle, Accessibility } from "lucide-react";

export default function TooltipDemo() {
    return (
        <div className="not-prose flex flex-col gap-8 w-full max-w-lg">
            {/* Positions */}
            <div>
                <Typography.Label variant="secondary" className="text-xs mb-3 block">
                    Positions
                </Typography.Label>
                <div className="flex flex-wrap items-center gap-4">
                    {(["top", "bottom", "left", "right"] as const).map(
                        (pos) => (
                            <Tooltip
                                key={pos}
                                content={`Tooltip on ${pos}`}
                                position={pos}
                            >
                                <Button variant="outline" size="small" className="capitalize">
                                    {pos}
                                </Button>
                            </Tooltip>
                        )
                    )}
                </div>
            </div>

            <Divider spacing="sm" />

            {/* Variants */}
            <div>
                <Typography.Label variant="secondary" className="text-xs mb-3 block">
                    Variants
                </Typography.Label>
                <div className="flex flex-wrap items-center gap-4">
                    <Tooltip content="Default tooltip" variant="default">
                        <Button variant="ghost" size="small">
                            <Button.Icon>
                                <Info className="w-4 h-4" aria-hidden="true" />
                            </Button.Icon>
                            <span className="sr-only">Info</span>
                        </Button>
                    </Tooltip>
                    <Tooltip content="Success!" variant="success">
                        <Button variant="ghost" size="small">
                            <Button.Icon>
                                <CheckCircle className="w-4 h-4 text-success" aria-hidden="true" />
                            </Button.Icon>
                            <span className="sr-only">Success</span>
                        </Button>
                    </Tooltip>
                    <Tooltip content="Warning — check this" variant="warning">
                        <Button variant="ghost" size="small">
                            <Button.Icon>
                                <AlertTriangle className="w-4 h-4 text-warning" aria-hidden="true" />
                            </Button.Icon>
                            <span className="sr-only">Warning</span>
                        </Button>
                    </Tooltip>
                    <Tooltip content="Error occurred" variant="destructive">
                        <Button variant="ghost" size="small">
                            <Button.Icon>
                                <XCircle className="w-4 h-4 text-destructive" aria-hidden="true" />
                            </Button.Icon>
                            <span className="sr-only">Error</span>
                        </Button>
                    </Tooltip>
                    <Tooltip content="Primary action" variant="primary">
                        <Button variant="primary" size="small">
                            Primary
                        </Button>
                    </Tooltip>
                </div>
            </div>

            <Divider spacing="sm" />

            {/* Options */}
            <div>
                <Typography.Label variant="secondary" className="text-xs mb-3 block">
                    Options
                </Typography.Label>
                <div className="flex flex-wrap items-center gap-4">
                    <Tooltip content="This won't show" disabled>
                        <Button variant="secondary" size="small" disabled>
                            Disabled
                        </Button>
                    </Tooltip>
                    <Tooltip content="No arrow" showArrow={false}>
                        <Button variant="outline" size="small">
                            No Arrow
                        </Button>
                    </Tooltip>
                    <Tooltip content="Slow delay" delay={800}>
                        <Button variant="outline" size="small">
                            800ms Delay
                        </Button>
                    </Tooltip>
                </div>
            </div>

            <Divider spacing="sm" />

            {/* Accessibility (WCAG 2.2) */}
            <div>
                <Typography.Label variant="secondary" className="text-xs mb-3 block">
                    Accessibility (WCAG 2.2)
                </Typography.Label>
                <div className="flex flex-wrap items-center gap-4">
                    <Tooltip
                        content="You can hover over this tooltip without it disappearing (WCAG 2.5.7)"
                        hideDelay={300}
                    >
                        <Button variant="outline" size="small">
                            <Button.Icon>
                                <Accessibility className="w-4 h-4" aria-hidden="true" />
                            </Button.Icon>
                            Hoverable
                        </Button>
                    </Tooltip>
                    <Tooltip
                        content="No minimum touch target enforced (useful for inline text)"
                        ensureTouchTarget={false}
                    >
                        <Typography.Link className="cursor-help">
                            Inline text
                        </Typography.Link>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}
