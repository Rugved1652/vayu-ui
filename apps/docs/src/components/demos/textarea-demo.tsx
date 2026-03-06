"use client"
import { TextArea } from "vayu-ui";
import React, { useState } from "react";

export default function TextAreaDemo() {
    const [value, setValue] = useState("");

    return (
        <div className="w-full max-w-md not-prose space-y-6">
            <h2 id="textarea-demo-label" className="text-xl font-semibold">
                TextArea Example
            </h2>

            {/* Default usage */}
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
            <div className="space-y-2">
                <p className="text-sm font-medium text-ground-600">Variants</p>
                <div className="space-y-4">
                    <TextArea.Root variant="default">
                        <TextArea.Label>Default Variant</TextArea.Label>
                        <TextArea.Input placeholder="Default style" />
                    </TextArea.Root>

                    <TextArea.Root variant="outline">
                        <TextArea.Label>Outline Variant</TextArea.Label>
                        <TextArea.Input placeholder="Outline style" />
                    </TextArea.Root>
                </div>
            </div>

            {/* Sizes */}
            <div className="space-y-2">
                <p className="text-sm font-medium text-ground-600">Sizes</p>
                <div className="space-y-4">
                    <TextArea.Root size="sm">
                        <TextArea.Label>Small</TextArea.Label>
                        <TextArea.Input placeholder="Small size" />
                    </TextArea.Root>

                    <TextArea.Root size="md">
                        <TextArea.Label>Medium</TextArea.Label>
                        <TextArea.Input placeholder="Medium size" />
                    </TextArea.Root>

                    <TextArea.Root size="lg">
                        <TextArea.Label>Large</TextArea.Label>
                        <TextArea.Input placeholder="Large size" />
                    </TextArea.Root>
                </div>
            </div>

            {/* States */}
            <div className="space-y-2">
                <p className="text-sm font-medium text-ground-600">States</p>
                <div className="space-y-4">
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
            </div>

            {/* Resize Options */}
            <div className="space-y-2">
                <p className="text-sm font-medium text-ground-600">Resize Options</p>
                <div className="space-y-4">
                    <TextArea.Root>
                        <TextArea.Label>No Resize</TextArea.Label>
                        <TextArea.Input resize="none" placeholder="Fixed size" />
                    </TextArea.Root>
                    <TextArea.Root>
                        <TextArea.Label>Horizontal Resize</TextArea.Label>
                        <TextArea.Input resize="horizontal" placeholder="Resizes horizontally" />
                    </TextArea.Root>
                    <TextArea.Root>
                        <TextArea.Label>Both Resize</TextArea.Label>
                        <TextArea.Input resize="both" placeholder="Resizes both directions" />
                    </TextArea.Root>
                </div>
            </div>

            {/* With Support Text */}
            <TextArea.Root>
                <TextArea.Label>Feedback</TextArea.Label>
                <TextArea.Input placeholder="Share your thoughts..." />
                <TextArea.SupportText>
                    We value your opinion. Please be specific.
                </TextArea.SupportText>
            </TextArea.Root>
        </div>
    );
}