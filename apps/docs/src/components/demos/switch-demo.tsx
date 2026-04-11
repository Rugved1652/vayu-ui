'use client';

import { Switch, Typography, Divider, Button } from 'vayu-ui';
import { useState } from 'react';

export default function SwitchDemo() {
  const [notifications, setNotifications] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="w-full max-w-md not-prose space-y-8">
      {/* Basic */}
      <div className="space-y-3">
        <Typography.H6 variant="secondary">Basic</Typography.H6>
        <div className="flex items-center gap-6">
          <Switch defaultChecked aria-label="Enable feature" />
          <Switch aria-label="Disable feature" />
        </div>
      </div>

      <Divider />

      {/* With Labels & Descriptions */}
      <div className="space-y-3">
        <Typography.H6 variant="secondary">With Labels & Descriptions</Typography.H6>
        <div className="space-y-4">
          <Switch label="Auto-save" description="Automatically save changes as you work" />
          <Switch
            label="Email notifications"
            description="Receive updates about your account activity"
            defaultChecked
          />
        </div>
      </div>

      <Divider />

      {/* States */}
      <div className="space-y-3">
        <Typography.H6 variant="secondary">States</Typography.H6>
        <div className="space-y-4">
          <Switch disabled label="Disabled" description="This option is not available" />
          <Switch disabled defaultChecked label="Disabled & Checked" />
          <Switch error label="Error state" description="Failed to save preference" />
        </div>
      </div>

      <Divider />

      {/* Controlled */}
      <div className="space-y-3">
        <Typography.H6 variant="secondary">Controlled</Typography.H6>
        <div className="space-y-4">
          <Switch
            checked={notifications}
            onCheckedChange={setNotifications}
            label={`Notifications: ${notifications ? 'On' : 'Off'}`}
            description="Toggle push notifications"
          />
          <Switch
            checked={analytics}
            onCheckedChange={setAnalytics}
            label={`Analytics: ${analytics ? 'On' : 'Off'}`}
            description="Share anonymous usage data"
          />
        </div>
      </div>

      <Divider />

      {/* Interactive */}
      <div className="space-y-3">
        <Typography.H6 variant="secondary">Interactive</Typography.H6>
        <div className="space-y-4">
          <Switch
            checked={darkMode}
            onCheckedChange={setDarkMode}
            label={`Dark Mode: ${darkMode ? 'On' : 'Off'}`}
            description="Toggle dark mode theme"
          />
          <div className="flex items-center gap-3">
            <Button variant="outline" size="small" onClick={() => setDarkMode(!darkMode)}>
              <Button.Icon>
                {darkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                )}
              </Button.Icon>
              <Button.Text>Toggle Theme</Button.Text>
            </Button>
            <Button
              variant="ghost"
              size="small"
              onClick={() => {
                setDarkMode(false);
                setNotifications(true);
                setAnalytics(false);
              }}
            >
              Reset All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
