// apps/docs/src/components/demos/rate-demo.tsx

"use client";
import React, { useState } from "react";
import { Rate } from "vayu-ui";
import { Heart } from "lucide-react";

export default function RateDemo() {
    const [value, setValue] = useState(3);

    return (
        <div className="w-full max-w-md not-prose space-y-8">
            <h2 id="rate-demo-label" className="text-xl font-semibold mb-4 font-primary">
                Rate Examples
            </h2>

            {/* Basic Usage */}
            <div className="space-y-2">
                <h3 className="text-lg font-medium font-primary">Basic Usage</h3>
                <Rate value={value} onChange={setValue} />
                <p className="text-sm text-ground-500 font-secondary">Current value: {value}</p>
            </div>

            {/* Read Only */}
            <div className="space-y-2">
                <h3 className="text-lg font-medium font-primary">Read Only</h3>
                <Rate defaultValue={3.5} readOnly />
            </div>

            {/* Disabled */}
            <div className="space-y-2">
                <h3 className="text-lg font-medium font-primary">Disabled</h3>
                <Rate defaultValue={2} disabled />
            </div>

            {/* Sizes */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium font-primary">Sizes</h3>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-ground-500 w-12 font-secondary">Small</span>
                        <Rate defaultValue={3} size="sm" />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-ground-500 w-12 font-secondary">Medium</span>
                        <Rate defaultValue={3} size="md" />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-ground-500 w-12 font-secondary">Large</span>
                        <Rate defaultValue={3} size="lg" />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-ground-500 w-12 font-secondary">XLarge</span>
                        <Rate defaultValue={3} size="xl" />
                    </div>
                </div>
            </div>

            {/* Colors */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium font-primary">Colors</h3>
                <div className="flex flex-col gap-2">
                    <Rate defaultValue={4} color="primary" />
                    <Rate defaultValue={4} color="secondary" />
                    <Rate defaultValue={4} color="warning" />
                    <Rate defaultValue={4} color="error" />
                    <Rate defaultValue={4} color="success" />
                    <Rate defaultValue={4} color="info" />
                </div>
            </div>

            {/* Variants */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium font-primary">Variants</h3>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-ground-500 w-20 font-secondary">Default</span>
                        <Rate defaultValue={3.5} variant="default" />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-ground-500 w-20 font-secondary">Outlined</span>
                        <Rate defaultValue={3.5} variant="outlined" />
                    </div>
                </div>
            </div>

            {/* With Labels */}
            <div className="space-y-2">
                <h3 className="text-lg font-medium font-primary">With Labels</h3>
                <Rate defaultValue={3} labels={['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']}>
                    <Rate.Container>
                        <Rate.Label>Product Rating</Rate.Label>
                        <Rate.Stars />
                        <Rate.TextLabel />
                    </Rate.Container>
                    <Rate.Description>Rate the product quality.</Rate.Description>
                </Rate>
            </div>

            {/* With Value Display */}
            <div className="space-y-2">
                <h3 className="text-lg font-medium font-primary">With Value Display</h3>
                <Rate defaultValue={3.5}>
                    <Rate.Container>
                        <Rate.Stars />
                        <Rate.Value />
                    </Rate.Container>
                </Rate>
            </div>

            {/* Custom Icon */}
            <div className="space-y-2">
                <h3 className="text-lg font-medium font-primary">Custom Icon</h3>
                <Rate defaultValue={3} icon={<Heart />} color="error" />
            </div>

            {/* Error State */}
            <div className="space-y-2">
                <h3 className="text-lg font-medium font-primary">Error State</h3>
                <Rate defaultValue={0} error>
                    <Rate.Label>Rating Required</Rate.Label>
                    <Rate.Stars />
                    <Rate.ErrorText>Please select a rating</Rate.ErrorText>
                </Rate>
            </div>

            {/* Half Star Support */}
            <div className="space-y-2">
                <h3 className="text-lg font-medium font-primary">Half Star Support</h3>
                <Rate defaultValue={3.5} allowHalf />
                <p className="text-xs text-ground-400 font-secondary">Hover on the left or right half of a star to select half values</p>
            </div>

            {/* No Half Star */}
            <div className="space-y-2">
                <h3 className="text-lg font-medium font-primary">Full Star Only</h3>
                <Rate defaultValue={3} allowHalf={false} />
            </div>
        </div>
    );
}