"use client"
import { { ComponentName } } from "vayu-ui";

export default function { ComponentName } Demo() {
    return (
        <div className="w-full max-w-md not-prose">
            <h2 id="{componentname}-demo-label" className="text-xl font-semibold mb-4">
                {ComponentName} Example
            </h2>

            {/* Default usage */}
            <{ComponentName}>
                Default
            </{ComponentName}>

            {/* Variant examples (if applicable) */}
            <{ComponentName} variant="primary">
                Primary
            </{ComponentName}>

            {/* Disabled state (if applicable) */}
            <{ComponentName} disabled>
                Disabled
            </{ComponentName}>
        </div>
    );
}
