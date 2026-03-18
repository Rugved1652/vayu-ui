"use client";

import { RadioGroup } from "vayu-ui";
import { useState } from "react";

export default function RadioGroupDemo() {
    const [plan, setPlan] = useState("pro");
    const [priority, setPriority] = useState("");

    return (
        <div className="not-prose flex flex-col gap-10 w-full max-w-md">
            {/* Basic RadioGroup */}
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

            {/* Horizontal Orientation */}
            <RadioGroup
                label="Size"
                description="Select your preferred size."
                orientation="horizontal"
                value={priority}
                onChange={setPriority}
            >
                <RadioGroup.Item value="sm" label="Small" />
                <RadioGroup.Item value="md" label="Medium" />
                <RadioGroup.Item value="lg" label="Large" />
                <RadioGroup.Item value="xl" label="X-Large" />
            </RadioGroup>

            {/* Error State */}
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
    );
}
