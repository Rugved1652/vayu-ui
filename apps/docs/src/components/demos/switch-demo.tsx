"use client";

import { Switch } from "vayu-ui";
import { useState } from "react";

export default function SwitchDemo() {
    const [emailAlerts, setEmailAlerts] = useState(true);

    return (
        <div className="flex flex-col gap-10">
            {/* ── Sizes ── */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    Sizes
                </p>
                <div className="flex items-center gap-6">
                    <Switch size="sm" defaultChecked aria-label="Small switch" />
                    <Switch size="md" defaultChecked aria-label="Medium switch" />
                    <Switch size="lg" defaultChecked aria-label="Large switch" />
                </div>
            </div>

            {/* ── With Labels ── */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    With Labels & Descriptions
                </p>
                <div className="flex flex-col gap-4 max-w-sm">
                    <Switch
                        size="sm"
                        label="Compact Mode"
                    />
                    <Switch
                        checked={emailAlerts}
                        onChange={(e) => setEmailAlerts(e.target.checked)}
                        label="Email Notifications"
                        description="Receive digests every morning at 8am."
                    />
                    <Switch
                        size="lg"
                        label="High Performance"
                        description="Enable hardware acceleration."
                        defaultChecked
                    />
                </div>
            </div>

            {/* ── States ── */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    States
                </p>
                <div className="flex flex-col gap-4">
                    <Switch
                        disabled
                        label="Disabled"
                        description="Cannot check this."
                    />
                    <Switch
                        disabled
                        defaultChecked
                        label="Disabled & Checked"
                    />
                    <Switch
                        error
                        defaultChecked
                        label="Error State"
                        description="Something went wrong saving this setting."
                    />
                </div>
            </div>
        </div>
    );
}
