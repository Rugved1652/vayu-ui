"use client";

import { ResizablePane, Typography } from "vayu-ui";

export default function ResizablePaneDemo() {
    return (
        <div className="not-prose flex flex-col gap-8 w-full">
            {/* Horizontal */}
            <div>
                <Typography.P variant="secondary" className="text-xs mb-3">
                    Horizontal
                </Typography.P>
                <div className="h-48 border-2 border-border rounded-surface overflow-hidden">
                    <ResizablePane direction="horizontal">
                        <ResizablePane.Panel
                            defaultSize={30}
                            minSize={15}
                        >
                            <div className="h-full p-4 bg-brand/10 dark:bg-brand/5">
                                <Typography.P className="text-sm font-semibold text-surface-content">
                                    Sidebar
                                </Typography.P>
                                <Typography.P variant="secondary" className="text-xs mt-1">
                                    Drag the handle →
                                </Typography.P>
                            </div>
                        </ResizablePane.Panel>
                        <ResizablePane.Handle />
                        <ResizablePane.Panel
                            defaultSize={70}
                            minSize={30}
                        >
                            <div className="h-full p-4">
                                <Typography.P className="text-sm font-semibold text-surface-content">
                                    Main Content
                                </Typography.P>
                                <Typography.P variant="secondary" className="text-xs mt-1">
                                    Resizable panel with min 30%
                                </Typography.P>
                            </div>
                        </ResizablePane.Panel>
                    </ResizablePane>
                </div>
            </div>

            {/* Vertical */}
            <div>
                <Typography.P variant="secondary" className="text-xs mb-3">
                    Vertical
                </Typography.P>
                <div className="h-64 border-2 border-border rounded-surface overflow-hidden">
                    <ResizablePane direction="vertical">
                        <ResizablePane.Panel
                            defaultSize={40}
                            minSize={20}
                        >
                            <div className="h-full p-4 bg-brand/10 dark:bg-brand/5">
                                <Typography.P className="text-sm font-semibold text-surface-content">
                                    Top Panel
                                </Typography.P>
                            </div>
                        </ResizablePane.Panel>
                        <ResizablePane.Handle />
                        <ResizablePane.Panel
                            defaultSize={60}
                            minSize={20}
                        >
                            <div className="h-full p-4">
                                <Typography.P className="text-sm font-semibold text-surface-content">
                                    Bottom Panel
                                </Typography.P>
                            </div>
                        </ResizablePane.Panel>
                    </ResizablePane>
                </div>
            </div>

            {/* Three panels */}
            <div>
                <Typography.P variant="secondary" className="text-xs mb-3">
                    Three panels
                </Typography.P>
                <div className="h-48 border-2 border-border rounded-surface overflow-hidden">
                    <ResizablePane direction="horizontal">
                        <ResizablePane.Panel
                            defaultSize={25}
                            minSize={15}
                        >
                            <div className="h-full p-4 bg-brand/10 dark:bg-brand/5">
                                <Typography.P className="text-sm font-semibold text-surface-content">
                                    Nav
                                </Typography.P>
                            </div>
                        </ResizablePane.Panel>
                        <ResizablePane.Handle aria-label="Resize navigation and content" />
                        <ResizablePane.Panel
                            defaultSize={50}
                            minSize={25}
                        >
                            <div className="h-full p-4">
                                <Typography.P className="text-sm font-semibold text-surface-content">
                                    Content
                                </Typography.P>
                            </div>
                        </ResizablePane.Panel>
                        <ResizablePane.Handle aria-label="Resize content and aside" />
                        <ResizablePane.Panel
                            defaultSize={25}
                            minSize={15}
                        >
                            <div className="h-full p-4 bg-brand/10 dark:bg-brand/5">
                                <Typography.P className="text-sm font-semibold text-surface-content">
                                    Aside
                                </Typography.P>
                            </div>
                        </ResizablePane.Panel>
                    </ResizablePane>
                </div>
            </div>
        </div>
    );
}
