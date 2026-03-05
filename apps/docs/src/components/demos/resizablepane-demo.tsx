"use client";

import { ResizablePane } from "vayu-ui";

export default function ResizablePaneDemo() {
    return (
        <div className="not-prose flex flex-col gap-8 w-full">
            {/* Horizontal */}
            <div>
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400 mb-3">
                    Horizontal
                </p>
                <div className="h-48 border-2 border-ground-200 dark:border-ground-800 rounded-lg overflow-hidden">
                    <ResizablePane direction="horizontal">
                        <ResizablePane.Panel
                            defaultSize={30}
                            minSize={15}
                        >
                            <div className="h-full p-4 bg-primary-50/50 dark:bg-primary-900/10">
                                <p className="text-sm font-secondary font-semibold text-ground-700 dark:text-ground-300">
                                    Sidebar
                                </p>
                                <p className="text-xs text-ground-500 mt-1">
                                    Drag the handle →
                                </p>
                            </div>
                        </ResizablePane.Panel>
                        <ResizablePane.Handle />
                        <ResizablePane.Panel
                            defaultSize={70}
                            minSize={30}
                        >
                            <div className="h-full p-4">
                                <p className="text-sm font-secondary font-semibold text-ground-700 dark:text-ground-300">
                                    Main Content
                                </p>
                                <p className="text-xs text-ground-500 mt-1">
                                    Resizable panel with min 30%
                                </p>
                            </div>
                        </ResizablePane.Panel>
                    </ResizablePane>
                </div>
            </div>

            {/* Vertical */}
            <div>
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400 mb-3">
                    Vertical
                </p>
                <div className="h-64 border-2 border-ground-200 dark:border-ground-800 rounded-lg overflow-hidden">
                    <ResizablePane direction="vertical">
                        <ResizablePane.Panel
                            defaultSize={40}
                            minSize={20}
                        >
                            <div className="h-full p-4 bg-primary-50/50 dark:bg-primary-900/10">
                                <p className="text-sm font-secondary font-semibold text-ground-700 dark:text-ground-300">
                                    Top Panel
                                </p>
                            </div>
                        </ResizablePane.Panel>
                        <ResizablePane.Handle />
                        <ResizablePane.Panel
                            defaultSize={60}
                            minSize={20}
                        >
                            <div className="h-full p-4">
                                <p className="text-sm font-secondary font-semibold text-ground-700 dark:text-ground-300">
                                    Bottom Panel
                                </p>
                            </div>
                        </ResizablePane.Panel>
                    </ResizablePane>
                </div>
            </div>

            {/* Three panels */}
            <div>
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400 mb-3">
                    Three panels
                </p>
                <div className="h-48 border-2 border-ground-200 dark:border-ground-800 rounded-lg overflow-hidden">
                    <ResizablePane direction="horizontal">
                        <ResizablePane.Panel
                            defaultSize={25}
                            minSize={15}
                        >
                            <div className="h-full p-4 bg-primary-50/50 dark:bg-primary-900/10">
                                <p className="text-sm font-secondary font-semibold text-ground-700 dark:text-ground-300">
                                    Nav
                                </p>
                            </div>
                        </ResizablePane.Panel>
                        <ResizablePane.Handle aria-label="Resize navigation and content" />
                        <ResizablePane.Panel
                            defaultSize={50}
                            minSize={25}
                        >
                            <div className="h-full p-4">
                                <p className="text-sm font-secondary font-semibold text-ground-700 dark:text-ground-300">
                                    Content
                                </p>
                            </div>
                        </ResizablePane.Panel>
                        <ResizablePane.Handle aria-label="Resize content and aside" />
                        <ResizablePane.Panel
                            defaultSize={25}
                            minSize={15}
                        >
                            <div className="h-full p-4 bg-primary-50/50 dark:bg-primary-900/10">
                                <p className="text-sm font-secondary font-semibold text-ground-700 dark:text-ground-300">
                                    Aside
                                </p>
                            </div>
                        </ResizablePane.Panel>
                    </ResizablePane>
                </div>
            </div>
        </div>
    );
}
