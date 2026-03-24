"use client"
import { Tabs, Typography, Divider, Button } from "vayu-ui";

export default function TabsDemo() {
    return (
        <div className="w-full max-w-md not-prose">
            <Typography.H2 id="tabs-demo-label" className="mb-4">
                Tabs Example
            </Typography.H2>

            {/* Default usage - Horizontal with aria-labelledby */}
            <Tabs defaultValue="account" className="mb-8">
                <Tabs.List aria-labelledby="tabs-demo-label" className="grid w-full grid-cols-2">
                    <Tabs.Trigger value="account">Account</Tabs.Trigger>
                    <Tabs.Trigger value="password">Password</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="account">
                    <div className="p-4 mt-2 rounded border border-border bg-surface">
                        <Typography.H3 className="mb-2">Account</Typography.H3>
                        <Typography.P variant="secondary">
                            Make changes to your account here. Click save when you&apos;re done.
                        </Typography.P>
                        <Divider className="my-4" />
                        <Button variant="primary" size="small">
                            Save Changes
                        </Button>
                    </div>
                </Tabs.Content>
                <Tabs.Content value="password">
                    <div className="p-4 mt-2 rounded border border-border bg-surface">
                        <Typography.H3 className="mb-2">Password</Typography.H3>
                        <Typography.P variant="secondary">
                            Change your password here. After saving, you&apos;ll be logged out.
                        </Typography.P>
                        <Divider className="my-4" />
                        <Button variant="primary" size="small">
                            Update Password
                        </Button>
                    </div>
                </Tabs.Content>
            </Tabs>

            {/* Vertical orientation with aria-label */}
            <Typography.H3 className="mb-4">Vertical Tabs</Typography.H3>
            <Tabs defaultValue="profile" orientation="vertical" className="mb-8">
                <Tabs.List aria-label="Settings navigation" className="min-w-50">
                    <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
                    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
                    <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="profile" className="pl-4">
                    <div className="p-4 rounded border border-border bg-surface">
                        <Typography.H4 className="mb-2">Profile Settings</Typography.H4>
                        <Typography.P variant="secondary">
                            Manage your personal information and preferences.
                        </Typography.P>
                    </div>
                </Tabs.Content>
                <Tabs.Content value="settings" className="pl-4">
                    <div className="p-4 rounded border border-border bg-surface">
                        <Typography.H4 className="mb-2">Application Settings</Typography.H4>
                        <Typography.P variant="secondary">
                            Configure your application preferences and options.
                        </Typography.P>
                    </div>
                </Tabs.Content>
                <Tabs.Content value="notifications" className="pl-4">
                    <div className="p-4 rounded border border-border bg-surface">
                        <Typography.H4 className="mb-2">Notification Settings</Typography.H4>
                        <Typography.P variant="secondary">
                            Choose which notifications you want to receive.
                        </Typography.P>
                    </div>
                </Tabs.Content>
            </Tabs>

            {/* With disabled tab and aria-label */}
            <Typography.H3 className="mb-4">Disabled Tab</Typography.H3>
            <Tabs defaultValue="enabled">
                <Tabs.List aria-label="Tab options" className="grid w-full grid-cols-2">
                    <Tabs.Trigger value="enabled">Enabled Tab</Tabs.Trigger>
                    <Tabs.Trigger value="disabled" disabled>Disabled Tab</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="enabled">
                    <div className="p-4 mt-2 rounded border border-border bg-surface">
                        <Typography.P variant="secondary">
                            This tab is active and can be selected.
                        </Typography.P>
                    </div>
                </Tabs.Content>
            </Tabs>

            {/* Tabs with Button Integration */}
            <Divider className="my-8" />
            <Typography.H3 className="mb-4">Tabs with Actions</Typography.H3>
            <Tabs defaultValue="overview">
                <Tabs.List aria-label="Content sections" className="grid w-full grid-cols-3">
                    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
                    <Tabs.Trigger value="details">Details</Tabs.Trigger>
                    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="overview">
                    <div className="p-4 mt-2 rounded border border-border bg-surface">
                        <Typography.H4 className="mb-2">Overview Section</Typography.H4>
                        <Typography.P variant="secondary" className="mb-4">
                            Get a quick summary of your content and recent activity.
                        </Typography.P>
                        <div className="flex gap-2">
                            <Button variant="primary" size="small">
                                View Report
                            </Button>
                            <Button variant="outline" size="small">
                                Export
                            </Button>
                        </div>
                    </div>
                </Tabs.Content>
                <Tabs.Content value="details">
                    <div className="p-4 mt-2 rounded border border-border bg-surface">
                        <Typography.H4 className="mb-2">Details Section</Typography.H4>
                        <Typography.P variant="secondary" className="mb-4">
                            Dive deeper into your data with detailed analytics and insights.
                        </Typography.P>
                        <div className="flex gap-2">
                            <Button variant="secondary" size="small">
                                Analyze
                            </Button>
                            <Button variant="ghost" size="small">
                                Download CSV
                            </Button>
                        </div>
                    </div>
                </Tabs.Content>
                <Tabs.Content value="settings">
                    <div className="p-4 mt-2 rounded border border-border bg-surface">
                        <Typography.H4 className="mb-2">Settings Section</Typography.H4>
                        <Typography.P variant="secondary" className="mb-4">
                            Configure your preferences and customize your experience.
                        </Typography.P>
                        <div className="flex gap-2">
                            <Button variant="primary" size="small">
                                Save Settings
                            </Button>
                            <Button variant="destructive" size="small">
                                Reset
                            </Button>
                        </div>
                    </div>
                </Tabs.Content>
            </Tabs>
        </div>
    );
}
