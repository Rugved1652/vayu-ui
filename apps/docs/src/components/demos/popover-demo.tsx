"use client"
import { Popover } from "vayu-ui";
import { Button } from "vayu-ui";
import React from "react";

export default function PopoverDemo() {
    return (
        <div className="w-full max-w-2xl not-prose">
            <h2 id="popover-demo-label" className="text-xl font-semibold mb-4">
                Popover Example
            </h2>

            <div className="flex flex-col gap-10 items-center justify-center p-8 bg-ground-100 dark:bg-ground-900 rounded w-full min-h-[400px]">
                
                {/* Basic Usage */}
                <Popover>
                    <Popover.Trigger>
                        Open Popover
                    </Popover.Trigger>
                    <Popover.Content>
                        <div className="p-2">
                            <h4 className="font-medium mb-1 text-ground-800 dark:text-ground-200">Dimensions</h4>
                            <p className="text-sm text-ground-500 dark:text-ground-400">Set the dimensions for the layer.</p>
                        </div>
                    </Popover.Content>
                </Popover>

                {/* Variants */}
                <div className="flex gap-4 flex-wrap justify-center">
                    <Popover>
                        <Popover.Trigger>
                            Default
                        </Popover.Trigger>
                        <Popover.Content variant="default">
                            <div className="p-2 text-sm">
                                Default variant with subtle border
                            </div>
                        </Popover.Content>
                    </Popover>

                    <Popover>
                        <Popover.Trigger>
                            Bordered
                        </Popover.Trigger>
                        <Popover.Content variant="bordered">
                            <div className="p-2 text-sm">
                                Bordered variant with primary accent
                            </div>
                        </Popover.Content>
                    </Popover>

                    <Popover>
                        <Popover.Trigger>
                            Elevated
                        </Popover.Trigger>
                        <Popover.Content variant="elevated">
                            <div className="p-2 text-sm">
                                Elevated variant with stronger shadow
                            </div>
                        </Popover.Content>
                    </Popover>
                </div>

                {/* Features */}
                <div className="flex gap-4 flex-wrap justify-center">
                    <Popover>
                        <Popover.Trigger>
                            With Arrow
                        </Popover.Trigger>
                        <Popover.Content showArrow side="top">
                            <div className="p-2 text-sm">
                                This popover has an arrow pointing to the trigger.
                            </div>
                        </Popover.Content>
                    </Popover>

                    <Popover>
                        <Popover.Trigger>
                            With Close Button
                        </Popover.Trigger>
                        <Popover.Content closeButton variant="bordered">
                            <div className="p-4 text-sm w-48">
                                This popover has a close button and the bordered variant.
                            </div>
                        </Popover.Content>
                    </Popover>
                </div>

                {/* Positions */}
                <div className="flex gap-4 flex-wrap justify-center">
                    <Popover>
                        <Popover.Trigger>Top</Popover.Trigger>
                        <Popover.Content side="top" align="center">
                            <div className="p-2 text-sm">Top Position</div>
                        </Popover.Content>
                    </Popover>

                    <Popover>
                        <Popover.Trigger>Bottom</Popover.Trigger>
                        <Popover.Content side="bottom" align="center">
                            <div className="p-2 text-sm">Bottom Position</div>
                        </Popover.Content>
                    </Popover>

                    <Popover>
                        <Popover.Trigger>Left</Popover.Trigger>
                        <Popover.Content side="left" align="center">
                            <div className="p-2 text-sm">Left Position</div>
                        </Popover.Content>
                    </Popover>

                    <Popover>
                        <Popover.Trigger>Right</Popover.Trigger>
                        <Popover.Content side="right" align="center">
                            <div className="p-2 text-sm">Right Position</div>
                        </Popover.Content>
                    </Popover>
                </div>

                {/* As Child Pattern */}
                <div className="flex gap-4">
                    <Popover>
                        <Popover.Trigger asChild>
                            <Button variant="primary">
                                Custom Trigger
                            </Button>
                        </Popover.Trigger>
                        <Popover.Content showArrow>
                            <div className="p-2 text-sm">
                                Using asChild pattern with custom trigger element
                            </div>
                        </Popover.Content>
                    </Popover>
                </div>
            </div>
        </div>
    );
}