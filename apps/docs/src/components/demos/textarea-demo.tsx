"use client";
import { TextArea } from "vayu-ui";
import { Button, Typography, Divider } from "vayu-ui";
import { useState } from "react";

export default function TextAreaDemo() {
    const [bio, setBio] = useState("");
    const [feedback, setFeedback] = useState("");
    const [message, setMessage] = useState("");

    return (
        <div className="w-full max-w-md not-prose space-y-8">
            <Typography.H2 id="textarea-demo-label">
                TextArea Example
            </Typography.H2>

            {/* Default usage */}
            <TextArea.Root>
                <TextArea.Label>Description</TextArea.Label>
                <TextArea.Input placeholder="Enter a description..." />
            </TextArea.Root>

            {/* With Character Count in Label */}
            <TextArea.Root maxLength={200}>
                <TextArea.Label showCharCount>Bio</TextArea.Label>
                <TextArea.Input
                    placeholder="Tell us about yourself"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
            </TextArea.Root>

            {/* Required field with support text */}
            <TextArea.Root>
                <TextArea.Label>Comments</TextArea.Label>
                <TextArea.Input
                    placeholder="Share your thoughts..."
                    required
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />
                <TextArea.SupportText>
                    Your feedback helps us improve our services.
                </TextArea.SupportText>
            </TextArea.Root>

            <Divider spacing="lg" />

            {/* Variants */}
            <div className="space-y-4">
                <Typography.H4>Variants</Typography.H4>
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

            <Divider spacing="lg" />

            {/* Sizes */}
            <div className="space-y-4">
                <Typography.H4>Sizes</Typography.H4>
                <div className="space-y-4">
                    <TextArea.Root size="sm">
                        <TextArea.Label>Small</TextArea.Label>
                        <TextArea.Input placeholder="Small size" rows={3} />
                    </TextArea.Root>

                    <TextArea.Root size="md">
                        <TextArea.Label>Medium</TextArea.Label>
                        <TextArea.Input placeholder="Medium size" rows={4} />
                    </TextArea.Root>

                    <TextArea.Root size="lg">
                        <TextArea.Label>Large</TextArea.Label>
                        <TextArea.Input placeholder="Large size" rows={5} />
                    </TextArea.Root>
                </div>
            </div>

            <Divider spacing="lg" />

            {/* States */}
            <div className="space-y-4">
                <Typography.H4>States</Typography.H4>
                <div className="space-y-4">
                    {/* Error with support text and error text */}
                    <TextArea.Root error>
                        <TextArea.Label>Error State</TextArea.Label>
                        <TextArea.Input
                            placeholder="Invalid input"
                            defaultValue="Bad"
                        />
                        <TextArea.SupportText>
                            Description must be at least 10 characters.
                        </TextArea.SupportText>
                        <TextArea.ErrorText>
                            Please enter a valid description.
                        </TextArea.ErrorText>
                    </TextArea.Root>

                    <TextArea.Root disabled>
                        <TextArea.Label>Disabled State</TextArea.Label>
                        <TextArea.Input placeholder="Cannot type here" />
                    </TextArea.Root>
                </div>
            </div>

            <Divider spacing="lg" />

            {/* Resize Options */}
            <div className="space-y-4">
                <Typography.H4>Resize Options</Typography.H4>
                <div className="space-y-4">
                    <TextArea.Root>
                        <TextArea.Label>No Resize</TextArea.Label>
                        <TextArea.Input resize="none" placeholder="Fixed size" />
                    </TextArea.Root>
                    <TextArea.Root>
                        <TextArea.Label>Vertical Resize (default)</TextArea.Label>
                        <TextArea.Input resize="vertical" placeholder="Resizes vertically" />
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

            <Divider spacing="lg" />

            {/* Standalone Character Count */}
            <div className="space-y-4">
                <Typography.H4>Character Count</Typography.H4>
                <TextArea.Root maxLength={100}>
                    <TextArea.Label>Message</TextArea.Label>
                    <TextArea.Input
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <TextArea.CharCount />
                </TextArea.Root>
            </div>

            <Divider spacing="lg" />

            {/* Multiple support/error texts as arrays */}
            <div className="space-y-4">
                <Typography.H4>Validation Guidelines</Typography.H4>
                <TextArea.Root error>
                    <TextArea.Label>Feedback Guidelines</TextArea.Label>
                    <TextArea.Input placeholder="Enter your feedback" />
                    <TextArea.SupportText>
                        {[
                            "Be specific and constructive",
                            "Include examples when possible",
                            "Keep it respectful",
                        ]}
                    </TextArea.SupportText>
                    <TextArea.ErrorText>
                        {[
                            "Minimum 20 characters required",
                            "Must include specific details",
                        ]}
                    </TextArea.ErrorText>
                </TextArea.Root>
            </div>

            <Divider spacing="lg" />

            {/* With Form Actions */}
            <div className="space-y-4">
                <Typography.H4>Form Actions</Typography.H4>
                <TextArea.Root>
                    <TextArea.Label>Your Message</TextArea.Label>
                    <TextArea.Input
                        placeholder="Write something..."
                        rows={4}
                    />
                    <TextArea.SupportText>
                        Press submit when you&apos;re done.
                    </TextArea.SupportText>
                </TextArea.Root>
                <div className="flex gap-3">
                    <Button variant="primary">Submit</Button>
                    <Button variant="outline">Cancel</Button>
                </div>
            </div>
        </div>
    );
}
