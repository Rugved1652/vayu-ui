"use client";
import { Tabs } from "vayu-ui";

export default function TabDemo() {
    return (
        <Tabs defaultValue="account" className="w-full max-w-[400px]">
            <Tabs.List className="grid w-full grid-cols-2">
                <Tabs.Trigger value="account">Account</Tabs.Trigger>
                <Tabs.Trigger value="password">Password</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="account">
                <div className="p-4 mt-2 border rounded-md border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                    <h3 className="mb-2 text-lg font-medium">Account</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        Make changes to your account here. Click save when you're done.
                    </p>
                </div>
            </Tabs.Content>
            <Tabs.Content value="password">
                <div className="p-4 mt-2 border rounded-md border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                    <h3 className="mb-2 text-lg font-medium">Password</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        Change your password here. After saving, you'll be logged out.
                    </p>
                </div>
            </Tabs.Content>
        </Tabs>
    );
}
