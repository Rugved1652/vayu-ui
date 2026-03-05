"use client";

import { Badge } from "vayu-ui";
import { X } from "lucide-react";

export default function BadgeDemo() {
    return (
        <div className="flex flex-col gap-10">
            {/* ── Variants ── */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    Variants
                </p>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="neutral">Neutral</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="info">Info</Badge>
                </div>
            </div>

            {/* ── Sizes ── */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    Sizes
                </p>
                <div className="flex flex-wrap items-center gap-2">
                    <Badge size="sm">Small</Badge>
                    <Badge size="md">Medium</Badge>
                    <Badge size="lg">Large</Badge>
                </div>
            </div>

            {/* ── Interactive ── */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    Interactive (Clickable)
                </p>
                <div className="flex flex-wrap gap-2">
                    <Badge interactive onClick={() => alert("Clicked!")}>
                        Click me
                    </Badge>
                    <Badge variant="outline" interactive size="lg" className="pr-1.5">
                        Removable
                        <div className="ml-1 rounded-full p-0.5 hover:bg-ground-200 dark:hover:bg-ground-800 transition-colors">
                            <X className="w-3 h-3" />
                        </div>
                    </Badge>
                </div>
            </div>

            {/* ── With Icons ── */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    With Icons
                </p>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="success" className="gap-1.5 pl-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Online
                    </Badge>
                    <Badge variant="neutral" className="tabular-nums">
                        +12
                    </Badge>
                </div>
            </div>
        </div>
    );
}
