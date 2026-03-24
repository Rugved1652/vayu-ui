"use client";

import { RadioGroup, Typography, Divider } from "vayu-ui";
import { useState } from "react";

export default function RadioGroupDemo() {
    const [plan, setPlan] = useState("pro");
    const [size, setSize] = useState("");

    return (
        <div className="not-prose flex flex-col gap-8 w-full max-w-md">
            {/* Basic RadioGroup */}
            <div className="flex flex-col gap-4">
                <div>
                    <Typography.H6>Basic Usage</Typography.H6>
                    <Typography.P variant="secondary">
                        Select a subscription plan with descriptions.
                    </Typography.P>
                </div>
                <RadioGroup
                    label="Subscription Plan"
                    description="Choose the plan that fits your needs."
                    value={plan}
                    onChange={setPlan}
                    required
                >
                    <RadioGroup.Item
                        value="free"
                        label="Free"
                        description="Basic features, limited storage."
                    />
                    <RadioGroup.Item
                        value="pro"
                        label="Pro"
                        description="All features, 100GB storage."
                    />
                    <RadioGroup.Item
                        value="enterprise"
                        label="Enterprise"
                        description="Unlimited everything, priority support."
                    />
                </RadioGroup>
            </div>

            <Divider />

            {/* Horizontal Orientation */}
            <div className="flex flex-col gap-4">
                <div>
                    <Typography.H6>Horizontal Layout</Typography.H6>
                    <Typography.P variant="secondary">
                        Radio buttons arranged horizontally.
                    </Typography.P>
                </div>
                <RadioGroup
                    label="Size"
                    description="Select your preferred size."
                    orientation="horizontal"
                    value={size}
                    onChange={setSize}
                >
                    <RadioGroup.Item value="sm" label="Small" />
                    <RadioGroup.Item value="md" label="Medium" />
                    <RadioGroup.Item value="lg" label="Large" />
                    <RadioGroup.Item value="xl" label="X-Large" />
                </RadioGroup>
            </div>

            <Divider />

            {/* Error State */}
            <div className="flex flex-col gap-4">
                <div>
                    <Typography.H6>Error State</Typography.H6>
                    <Typography.P variant="secondary">
                        Validation error with disabled option.
                    </Typography.P>
                </div>
                <RadioGroup
                    label="Priority"
                    description="Select a priority level for your ticket."
                    error
                    errorText="Please select a priority level."
                >
                    <RadioGroup.Item value="low" label="Low" />
                    <RadioGroup.Item value="medium" label="Medium" />
                    <RadioGroup.Item value="high" label="High" disabled />
                </RadioGroup>
            </div>
        </div>
    );
}
