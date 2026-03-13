"use client"
import { Tabs } from "vayu-ui";

export default function TabsDemo() {
    return (
        <div className="w-full max-w-md not-prose">
            <h2 id="tabs-demo-label" className="text-xl font-semibold mb-4">
                Tabs Example
            </h2>

            {/* Default usage - Horizontal with aria-labelledby */}
            <Tabs defaultValue="account" className="mb-8">
                <Tabs.List aria-labelledby="tabs-demo-label" className="grid w-full grid-cols-2">
                    <Tabs.Trigger value="account">Account</Tabs.Trigger>
                    <Tabs.Trigger value="password">Password</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="account">
                    <div className="p-4 mt-2 border rounded border-ground-200 dark:border-ground-700 bg-ground-50 dark:bg-ground-900">
                        <h3 className="mb-2 text-lg font-medium">Account</h3>
                        <p className="text-sm text-ground-600 dark:text-ground-400">
                            Make changes to your account here. Click save when you're done.
                        </p>
                    </div>
                </Tabs.Content>
                <Tabs.Content value="password">
                    <div className="p-4 mt-2 border rounded border-ground-200 dark:border-ground-700 bg-ground-50 dark:bg-ground-900">
                        <h3 className="mb-2 text-lg font-medium">Password</h3>
                        <p className="text-sm text-ground-600 dark:text-ground-400">
                            Change your password here. After saving, you'll be logged out.
                        </p>
                    </div>
                </Tabs.Content>
            </Tabs>

            {/* Vertical orientation with aria-label */}
            <h3 className="text-lg font-medium mb-4">Vertical Tabs</h3>
            <Tabs defaultValue="profile" orientation="vertical" className="mb-8">
                <Tabs.List aria-label="Settings navigation" className="min-w-50">
                    <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
                    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
                    <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="profile" className="pl-4">
                    <div className="p-4 border rounded border-ground-200 dark:border-ground-700 bg-ground-50 dark:bg-ground-900">
                        <h4 className="mb-2 text-md font-medium">Profile Settings</h4>
                        <p className="text-sm text-ground-600 dark:text-ground-400">
                            Manage your personal information and preferences.
                        </p>
                    </div>
                </Tabs.Content>
                <Tabs.Content value="settings" className="pl-4">
                    <div className="p-4 border rounded border-ground-200 dark:border-ground-700 bg-ground-50 dark:bg-ground-900">
                        <h4 className="mb-2 text-md font-medium">Application Settings</h4>
                        <p className="text-sm text-ground-600 dark:text-ground-400">
                            Configure your application preferences and options.
                        </p>
                    </div>
                </Tabs.Content>
                <Tabs.Content value="notifications" className="pl-4">
                    <div className="p-4 border rounded border-ground-200 dark:border-ground-700 bg-ground-50 dark:bg-ground-900">
                        <h4 className="mb-2 text-md font-medium">Notification Settings</h4>
                        <p className="text-sm text-ground-600 dark:text-ground-400">
                            Choose which notifications you want to receive.
                        </p>
                    </div>
                </Tabs.Content>
            </Tabs>

            {/* With disabled tab and aria-label */}
            <h3 className="text-lg font-medium mb-4">Disabled Tab</h3>
            <Tabs defaultValue="enabled">
                <Tabs.List aria-label="Tab options" className="grid w-full grid-cols-2">
                    <Tabs.Trigger value="enabled">Enabled Tab</Tabs.Trigger>
                    <Tabs.Trigger value="disabled" disabled>Disabled Tab</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="enabled">
                    <div className="p-4 mt-2 border rounded border-ground-200 dark:border-ground-700 bg-ground-50 dark:bg-ground-900">
                        <p className="text-sm text-ground-600 dark:text-ground-400">
                            This tab is active and can be selected.
                        </p>
                    </div>
                </Tabs.Content>
            </Tabs>
        </div>
    );
}