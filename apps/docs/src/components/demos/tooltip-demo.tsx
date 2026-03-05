"use client";

import { Tooltip } from "vayu-ui";
import { Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default function TooltipDemo() {
    return (
        <div className="not-prose flex flex-col gap-8 w-full max-w-lg">
            {/* Positions */}
            <div>
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400 mb-3">
                    Positions
                </p>
                <div className="flex flex-wrap items-center gap-4">
                    {(["top", "bottom", "left", "right"] as const).map(
                        (pos) => (
                            <Tooltip
                                key={pos}
                                content={`Tooltip on ${pos}`}
                                position={pos}
                            >
                                <button className="px-3 py-1.5 text-sm font-secondary bg-ground-100 dark:bg-ground-800 text-ground-800 dark:text-ground-200 rounded-md hover:bg-ground-200 dark:hover:bg-ground-700 transition-colors capitalize">
                                    {pos}
                                </button>
                            </Tooltip>
                        )
                    )}
                </div>
            </div>

            {/* Variants */}
            <div>
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400 mb-3">
                    Variants
                </p>
                <div className="flex flex-wrap items-center gap-4">
                    <Tooltip content="Default tooltip" variant="default">
                        <button className="p-2 rounded-md bg-ground-100 dark:bg-ground-800 hover:bg-ground-200 dark:hover:bg-ground-700 transition-colors">
                            <Info className="w-4 h-4 text-ground-600 dark:text-ground-400" aria-hidden="true" />
                            <span className="sr-only">Info</span>
                        </button>
                    </Tooltip>
                    <Tooltip content="Success!" variant="success">
                        <button className="p-2 rounded-md bg-ground-100 dark:bg-ground-800 hover:bg-ground-200 dark:hover:bg-ground-700 transition-colors">
                            <CheckCircle className="w-4 h-4 text-green-600" aria-hidden="true" />
                            <span className="sr-only">Success</span>
                        </button>
                    </Tooltip>
                    <Tooltip content="Warning — check this" variant="warning">
                        <button className="p-2 rounded-md bg-ground-100 dark:bg-ground-800 hover:bg-ground-200 dark:hover:bg-ground-700 transition-colors">
                            <AlertTriangle className="w-4 h-4 text-yellow-600" aria-hidden="true" />
                            <span className="sr-only">Warning</span>
                        </button>
                    </Tooltip>
                    <Tooltip content="Error occurred" variant="error">
                        <button className="p-2 rounded-md bg-ground-100 dark:bg-ground-800 hover:bg-ground-200 dark:hover:bg-ground-700 transition-colors">
                            <XCircle className="w-4 h-4 text-red-600" aria-hidden="true" />
                            <span className="sr-only">Error</span>
                        </button>
                    </Tooltip>
                    <Tooltip content="Primary action" variant="primary">
                        <button className="px-3 py-1.5 text-sm font-secondary bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                            Primary
                        </button>
                    </Tooltip>
                </div>
            </div>

            {/* Disabled & no arrow */}
            <div>
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400 mb-3">
                    Options
                </p>
                <div className="flex flex-wrap items-center gap-4">
                    <Tooltip content="This won't show" disabled>
                        <button className="px-3 py-1.5 text-sm font-secondary bg-ground-100 dark:bg-ground-800 text-ground-400 rounded-md cursor-not-allowed">
                            Disabled
                        </button>
                    </Tooltip>
                    <Tooltip content="No arrow" showArrow={false}>
                        <button className="px-3 py-1.5 text-sm font-secondary bg-ground-100 dark:bg-ground-800 text-ground-800 dark:text-ground-200 rounded-md hover:bg-ground-200 dark:hover:bg-ground-700 transition-colors">
                            No Arrow
                        </button>
                    </Tooltip>
                    <Tooltip content="Slow delay" delay={800}>
                        <button className="px-3 py-1.5 text-sm font-secondary bg-ground-100 dark:bg-ground-800 text-ground-800 dark:text-ground-200 rounded-md hover:bg-ground-200 dark:hover:bg-ground-700 transition-colors">
                            800ms Delay
                        </button>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}
