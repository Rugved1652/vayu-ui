"use client"
import { Popover, Button, Typography, Divider } from "vayu-ui";
import React from "react";

export default function PopoverDemo() {
    return (
        <div className="w-full max-w-2xl not-prose">
            <Typography.H2 variant="primary" className="mb-4">
                Popover Example
            </Typography.H2>

            <div className="flex flex-col gap-10 items-center justify-center p-8 rounded-surface w-full min-h-[400px]">

                {/* Basic Usage */}
                <Popover>
                    <Popover.Trigger>
                        Open Popover
                    </Popover.Trigger>
                    <Popover.Content>
                        <div className="p-2">
                            <Typography.H4 variant="primary" className="mb-1">
                                Dimensions
                            </Typography.H4>
                            <Typography.P variant="secondary">
                                Set the dimensions for the layer.
                            </Typography.P>
                        </div>
                    </Popover.Content>
                </Popover>

                <Divider spacing="lg">
                    <Divider.Label color="brand">Features</Divider.Label>
                </Divider>

                {/* Features */}
                <div className="flex gap-4 flex-wrap justify-center">
                    <Popover>
                        <Popover.Trigger>
                            With Arrow
                        </Popover.Trigger>
                        <Popover.Content showArrow side="top">
                            <div className="p-2">
                                <Typography.P variant="secondary">
                                    This popover has an arrow pointing to the trigger.
                                </Typography.P>
                            </div>
                        </Popover.Content>
                    </Popover>
                </div>

                <Divider spacing="lg">
                    <Divider.Label color="brand">Alignment</Divider.Label>
                </Divider>

                {/* Alignment */}
                <div className="flex gap-4 flex-wrap justify-center">
                    <Popover>
                        <Popover.Trigger>Start</Popover.Trigger>
                        <Popover.Content side="bottom" align="start" >
                            <div className="p-2">
                                <Typography.P variant="secondary">align="start"</Typography.P>
                            </div>
                        </Popover.Content>
                    </Popover>

                    <Popover>
                        <Popover.Trigger>Center</Popover.Trigger>
                        <Popover.Content side="bottom" align="center" >
                            <div className="p-2">
                                <Typography.P variant="secondary">align="center" (default)</Typography.P>
                            </div>
                        </Popover.Content>
                    </Popover>

                    <Popover>
                        <Popover.Trigger>End</Popover.Trigger>
                        <Popover.Content side="bottom" align="end" >
                            <div className="p-2">
                                <Typography.P variant="secondary">align="end"</Typography.P>
                            </div>
                        </Popover.Content>
                    </Popover>
                </div>

                <Divider spacing="lg">
                    <Divider.Label color="brand">Positions</Divider.Label>
                </Divider>

                {/* Positions */}
                <div className="flex gap-4 flex-wrap justify-center">
                    <Popover>
                        <Popover.Trigger>Top</Popover.Trigger>
                        <Popover.Content side="top" align="center" showArrow>
                            <div className="p-2">
                                <Typography.P variant="secondary">Top Position</Typography.P>
                            </div>
                        </Popover.Content>
                    </Popover>

                    <Popover>
                        <Popover.Trigger>Bottom</Popover.Trigger>
                        <Popover.Content side="bottom" align="center" showArrow>
                            <div className="p-2">
                                <Typography.P variant="secondary">Bottom Position</Typography.P>
                            </div>
                        </Popover.Content>
                    </Popover>

                    <Popover>
                        <Popover.Trigger>Left</Popover.Trigger>
                        <Popover.Content side="left" align="center" showArrow>
                            <div className="p-2">
                                <Typography.P variant="secondary">Left Position</Typography.P>
                            </div>
                        </Popover.Content>
                    </Popover>

                    <Popover>
                        <Popover.Trigger>Right</Popover.Trigger>
                        <Popover.Content side="right" align="center" showArrow>
                            <div className="p-2">
                                <Typography.P variant="secondary">Right Position</Typography.P>
                            </div>
                        </Popover.Content>
                    </Popover>
                </div>

                <Divider spacing="lg">
                    <Divider.Label color="brand">Custom Trigger</Divider.Label>
                </Divider>

                {/* As Child Pattern */}
                <div className="flex gap-4">
                    <Popover>
                        <Popover.Trigger asChild>
                            <Button variant="primary">
                                Custom Trigger
                            </Button>
                        </Popover.Trigger>
                        <Popover.Content showArrow>
                            <div className="p-2">
                                <Typography.P variant="secondary">
                                    Using asChild pattern with custom trigger element
                                </Typography.P>
                            </div>
                        </Popover.Content>
                    </Popover>
                </div>
            </div>
        </div>
    );
}
