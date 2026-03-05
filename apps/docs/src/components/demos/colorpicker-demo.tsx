"use client";

import { ColorPicker } from "vayu-ui";
import { useState } from "react";

export default function ColorPickerDemo() {
    const [color, setColor] = useState("#3b82f6");
    const [swatchColor, setSwatchColor] = useState("#ef4444");

    return (
        <div className="not-prose flex flex-col gap-8 w-full max-w-md">
            {/* Default */}
            <ColorPicker
                label="Brand Color"
                description="Choose a primary color for your brand."
                value={color}
                onChange={setColor}
            />

            {/* RGB Format */}
            <ColorPicker
                label="Background"
                format="rgb"
                defaultValue="#22c55e"
                showAlpha
            />

            {/* Swatches Only */}
            <ColorPicker.Swatches
                label="Quick Pick"
                colors={[
                    "#ef4444",
                    "#f97316",
                    "#eab308",
                    "#22c55e",
                    "#3b82f6",
                    "#8b5cf6",
                    "#ec4899",
                    "#171717",
                ]}
                value={swatchColor}
                onChange={setSwatchColor}
                size="lg"
            />

            {/* Disabled */}
            <ColorPicker
                label="Locked Color"
                defaultValue="#6366f1"
                disabled
            />

            {/* Error State */}
            <ColorPicker
                label="Theme Color"
                defaultValue="#ff0000"
                error
                errorText="This color does not meet contrast requirements."
            />
        </div>
    );
}
