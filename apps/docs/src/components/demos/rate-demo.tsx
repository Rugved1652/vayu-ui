"use client";
import React, { useState } from "react";
import { Rate } from "vayu-ui";
import { Heart } from "lucide-react";

export default function RateDemo() {
    const [value, setValue] = useState(3);

    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl">
            {/* Basic Usage */}
            <div className="space-y-2">
                <h3 className="text-lg font-medium">Basic Usage</h3>
                <Rate value={value} onChange={setValue} />
                <p className="text-sm text-neutral-500">Current value: {value}</p>
            </div>

            {/* Read Only */}
            <div className="space-y-2">
                <h3 className="text-lg font-medium">Read Only</h3>
                <Rate defaultValue={3.5} readOnly />
            </div>

            {/* Sizes */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Sizes</h3>
                <div className="flex flex-col gap-2">
                    <Rate defaultValue={3} size="sm" />
                    <Rate defaultValue={3} size="md" />
                    <Rate defaultValue={3} size="lg" />
                    <Rate defaultValue={3} size="xl" />
                </div>
            </div>

            {/* Colors & Variants */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Colors & Variants</h3>
                <div className="flex flex-col gap-2">
                    <Rate defaultValue={4} color="primary" />
                    <Rate defaultValue={4} color="error" />
                    <Rate defaultValue={4} color="success" />
                    <Rate defaultValue={4} color="info" />
                    <Rate defaultValue={4} variant="outlined" color="primary" />
                </div>
            </div>

            {/* With Text & Description */}
            <div className="space-y-2">
                <h3 className="text-lg font-medium">With Labels</h3>
                <Rate defaultValue={2} labels={['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']}>
                    <Rate.Container>
                        <Rate.Label>Product Rating</Rate.Label>
                        <Rate.Stars />
                        <Rate.TextLabel />
                    </Rate.Container>
                    <Rate.Description>Rate the product quality.</Rate.Description>
                </Rate>
            </div>

            {/* Custom Icon */}
            <div className="space-y-2">
                <h3 className="text-lg font-medium">Custom Icon</h3>
                <Rate defaultValue={3} icon={<Heart />} color="error" />
            </div>
        </div>
    );
}
