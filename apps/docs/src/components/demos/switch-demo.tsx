"use client";

import { Switch } from "vayu-ui";
import { useState } from "react";

export default function SwitchDemo() {
    const [emailAlerts, setEmailAlerts] = useState(true);

    return (
        <div className="w-full max-w-md not-prose space-y-10">
            {/* ── Sizes ── */}
            <div className="space-y-3">
                <h3 className="text-sm font-primary font-medium text-ground-700 dark:text-ground-300">
                    Sizes
                </h3>
                <div className="flex items-center gap-6">
                    <Switch size="sm" defaultChecked aria-label="Small switch" />
                    <Switch size="md" defaultChecked aria-label="Medium switch" />
                    <Switch size="lg" defaultChecked aria-label="Large switch" />
                </div>
            </div>

            {/* ── With Labels & Descriptions ── */}
            <div className="space-y-3">
                <h3 className="text-sm font-primary font-medium text-ground-700 dark:text-ground-300">
                    With Labels & Descriptions
                </h3>
                <div className="space-y-4">
                    <Switch size="sm" label="Compact Mode" />
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
            <div className="space-y-3">
                <h3 className="text-sm font-primary font-medium text-ground-700 dark:text-ground-300">
                    States
                </h3>
                <div className="space-y-4">
                    <Switch disabled label="Disabled" description="Cannot toggle this option" />
                    <Switch disabled defaultChecked label="Disabled & Checked" />
                    <Switch
                        error
                        defaultChecked
                        label="Error State"
                        description="Something went wrong saving this setting."
                    />
                </div>
            </div>

            {/* ── Controlled ── */}
            <div className="space-y-3">
                <h3 className="text-sm font-primary font-medium text-ground-700 dark:text-ground-300">
                    Controlled Example
                </h3>
                <Switch
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    label={`Email alerts: ${emailAlerts ? "On" : "Off"}`}
                    description="Toggle to enable or disable email notifications."
                />
            </div>
        </div>
    );
}
