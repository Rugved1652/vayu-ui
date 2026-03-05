"use client";

import { RadioGroup } from "vayu-ui";
import { CreditCard, Landmark, Wallet } from "lucide-react";
import { useState } from "react";

export default function RadioGroupDemo() {
    const [plan, setPlan] = useState("pro");
    const [payment, setPayment] = useState("card");
    const [size, setSize] = useState("md");

    return (
        <div className="not-prose flex flex-col gap-10 w-full max-w-md">
            {/* Default Variant */}
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

            {/* Card Variant */}
            <RadioGroup
                label="Payment Method"
                variant="card"
                value={payment}
                onChange={setPayment}
                color="success"
            >
                <RadioGroup.Item
                    value="card"
                    label="Credit Card"
                    description="Pay with Visa, Mastercard, or AMEX."
                    icon={<CreditCard className="w-5 h-5" />}
                />
                <RadioGroup.Item
                    value="bank"
                    label="Bank Transfer"
                    description="Direct transfer from your bank account."
                    icon={<Landmark className="w-5 h-5" />}
                />
                <RadioGroup.Item
                    value="wallet"
                    label="Digital Wallet"
                    description="Apple Pay, Google Pay, or PayPal."
                    icon={<Wallet className="w-5 h-5" />}
                />
            </RadioGroup>

            {/* Button Variant */}
            <RadioGroup
                label="Size"
                variant="button"
                orientation="horizontal"
                value={size}
                onChange={setSize}
                color="secondary"
            >
                <RadioGroup.Item value="sm" label="Small" />
                <RadioGroup.Item value="md" label="Medium" />
                <RadioGroup.Item value="lg" label="Large" />
                <RadioGroup.Item value="xl" label="X-Large" />
            </RadioGroup>

            {/* Error State */}
            <RadioGroup
                label="Priority"
                error
                errorText="Please select a priority level."
                color="error"
            >
                <RadioGroup.Item value="low" label="Low" />
                <RadioGroup.Item value="medium" label="Medium" />
                <RadioGroup.Item value="high" label="High" disabled />
            </RadioGroup>
        </div>
    );
}
