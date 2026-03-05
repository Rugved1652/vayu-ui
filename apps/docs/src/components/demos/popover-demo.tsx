"use client"
import { Popover } from "vayu-ui";
import { Button } from "vayu-ui";
import React from "react";

export default function PopoverDemo() {
    return (
        <div className="flex flex-col gap-10 items-center justify-center p-8 bg-neutral-100 dark:bg-neutral-900 rounded-lg w-full min-h-[400px]">

            {/* Basic Usage */}
            <Popover>
                <Popover.Trigger>
                    Open Popover
                </Popover.Trigger>
                <Popover.Content>
                    <div className="p-2">
                        <h4 className="font-medium mb-1 text-white">Dimensions</h4>
                        <p className="text-sm text-neutral-400">Set the dimensions for the layer.</p>
                    </div>
                </Popover.Content>
            </Popover>

            {/* Variants & Features */}
            <div className="flex gap-4">
                <Popover>
                    <Popover.Trigger>
                        With Arrow
                    </Popover.Trigger>
                    <Popover.Content showArrow side="top">
                        <div className="p-2 text-sm">
                            This popover has an arrow and is positioned on top.
                        </div>
                    </Popover.Content>
                </Popover>

                <Popover>
                    <Popover.Trigger>
                        With Close Button
                    </Popover.Trigger>
                    <Popover.Content closeButton variant="bordered" side="bottom">
                        <div className="p-4 text-sm w-48">
                            This popover has a close button and the bordered variant.
                        </div>
                    </Popover.Content>
                </Popover>
            </div>

            {/* Positions */}
            <div className="flex gap-4">
                <Popover>
                    <Popover.Trigger>Left</Popover.Trigger>
                    <Popover.Content side="left" align="start">
                        <div className="p-2 text-sm">Left Position</div>
                    </Popover.Content>
                </Popover>

                <Popover>
                    <Popover.Trigger>Right</Popover.Trigger>
                    <Popover.Content side="right" align="start">
                        <div className="p-2 text-sm">Right Position</div>
                    </Popover.Content>
                </Popover>
            </div>

        </div>
    );
}
