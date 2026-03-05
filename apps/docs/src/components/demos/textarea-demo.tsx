"use client"
import { TextArea } from "vayu-ui";
import React, { useState } from "react";

export default function TextAreaDemo() {
    const [value, setValue] = useState("");

    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl p-8 bg-neutral-100 dark:bg-neutral-900 rounded-lg">

            {/* Basic Usage */}
            <TextArea.Root>
                <TextArea.Label>Description</TextArea.Label>
                <TextArea.Input placeholder="Enter a description..." />
            </TextArea.Root>

            {/* With Character Count */}
            <TextArea.Root maxLength={200}>
                <TextArea.Label showCharCount>Bio</TextArea.Label>
                <TextArea.Input
                    placeholder="Tell us about yourself"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </TextArea.Root>

            {/* Variants */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextArea.Root variant="outline">
                    <TextArea.Label>Outline Variant</TextArea.Label>
                    <TextArea.Input placeholder="Outline style" />
                </TextArea.Root>

                {/* Filled variant removed from source, defaulting to default or outline if not present, but checking source again... Source only has default and outline. */}
                <TextArea.Root>
                    <TextArea.Label>Default Variant</TextArea.Label>
                    <TextArea.Input placeholder="Default style" />
                </TextArea.Root>
            </div>

            {/* States */}
            <div className="flex flex-col gap-4">
                <TextArea.Root error>
                    <TextArea.Label>Error State</TextArea.Label>
                    <TextArea.Input placeholder="Invalid input" defaultValue="Invalid content" />
                    <TextArea.ErrorText>Please enter a valid description.</TextArea.ErrorText>
                </TextArea.Root>

                <TextArea.Root disabled>
                    <TextArea.Label>Disabled State</TextArea.Label>
                    <TextArea.Input placeholder="Cannot type here" />
                </TextArea.Root>
            </div>

            {/* Resize Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextArea.Root>
                    <TextArea.Label>No Resize</TextArea.Label>
                    <TextArea.Input resize="none" placeholder="Fixed size" />
                </TextArea.Root>
                <TextArea.Root>
                    <TextArea.Label>Horizontal Resize</TextArea.Label>
                    <TextArea.Input resize="horizontal" placeholder="Resizes horizontally" />
                </TextArea.Root>
            </div>

            {/* Support Text */}
            <TextArea.Root>
                <TextArea.Label>Feedback</TextArea.Label>
                <TextArea.Input placeholder="Share your thoughts..." />
                <TextArea.SupportText>
                    {["We value your opinion.", "Please be specific."]}
                </TextArea.SupportText>
            </TextArea.Root>

        </div>
    );
}
