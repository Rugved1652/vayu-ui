"use client";

import { Switch } from "vayu-ui";
import { useState } from "react";

export default function SwitchDemo() {
  const [notifications, setNotifications] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  return (
    <div className="w-full max-w-md not-prose space-y-8">
      {/* Basic */}
      <div className="space-y-3">
        <h3 className="text-sm font-primary font-medium text-ground-700 dark:text-ground-300 uppercase tracking-wide">
          Basic
        </h3>
        <div className="flex items-center gap-6">
          <Switch defaultChecked aria-label="Enable feature" />
          <Switch aria-label="Disable feature" />
        </div>
      </div>

      {/* With Labels & Descriptions */}
      <div className="space-y-3">
        <h3 className="text-sm font-primary font-medium text-ground-700 dark:text-ground-300 uppercase tracking-wide">
          With Labels & Descriptions
        </h3>
        <div className="space-y-4">
          <Switch
            label="Auto-save"
            description="Automatically save changes as you work"
          />
          <Switch
            label="Email notifications"
            description="Receive updates about your account activity"
            defaultChecked
          />
        </div>
      </div>

      {/* States */}
      <div className="space-y-3">
        <h3 className="text-sm font-primary font-medium text-ground-700 dark:text-ground-300 uppercase tracking-wide">
          States
        </h3>
        <div className="space-y-4">
          <Switch
            disabled
            label="Disabled"
            description="This option is not available"
          />
          <Switch
            disabled
            defaultChecked
            label="Disabled & Checked"
          />
          <Switch
            error
            label="Error state"
            description="Failed to save preference"
          />
        </div>
      </div>

      {/* Controlled */}
      <div className="space-y-3">
        <h3 className="text-sm font-primary font-medium text-ground-700 dark:text-ground-300 uppercase tracking-wide">
          Controlled
        </h3>
        <div className="space-y-4">
          <Switch
            checked={notifications}
            onCheckedChange={setNotifications}
            label={`Notifications: ${notifications ? "On" : "Off"}`}
            description="Toggle push notifications"
          />
          <Switch
            checked={analytics}
            onCheckedChange={setAnalytics}
            label={`Analytics: ${analytics ? "On" : "Off"}`}
            description="Share anonymous usage data"
          />
        </div>
      </div>
    </div>
  );
}
