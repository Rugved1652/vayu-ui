"use client"

import { Drawer, Button } from "vayu-ui";

export default function DrawerDemo() {
    return (
        <div className="w-full not-prose">
            <h2 id="drawer-demo-label" className="text-xl font-semibold mb-4">
                Drawer Example
            </h2>

            <div className="flex flex-wrap gap-4">
                {/* Right Drawer (Default) */}
                <Drawer side="right">
                    <Drawer.Trigger asChild>
                        <Button variant="outline">Open Right</Button>
                    </Drawer.Trigger>
                    <Drawer.Overlay />
                    <Drawer.Content>
                        <Drawer.Header>
                            <Drawer.Title>Edit Profile</Drawer.Title>
                            <Drawer.Description>
                                Make changes to your profile here. Click save when you&apos;re done.
                            </Drawer.Description>
                        </Drawer.Header>
                        <div className="py-4 space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-ground-700 dark:text-ground-300">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    className="flex h-10 w-full rounded border border-ground-300 bg-transparent px-3 py-2 text-sm placeholder:text-ground-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-ground-600 dark:text-ground-100 dark:focus:ring-offset-ground-950"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="username" className="text-sm font-medium text-ground-700 dark:text-ground-300">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    className="flex h-10 w-full rounded border border-ground-300 bg-transparent px-3 py-2 text-sm placeholder:text-ground-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-ground-600 dark:text-ground-100 dark:focus:ring-offset-ground-950"
                                    placeholder="@johndoe"
                                />
                            </div>
                        </div>
                        <Drawer.Footer>
                            <Drawer.Close asChild>
                                <Button variant="outline">Cancel</Button>
                            </Drawer.Close>
                            <Button>Save changes</Button>
                        </Drawer.Footer>
                    </Drawer.Content>
                </Drawer>

                {/* Left Drawer */}
                <Drawer side="left">
                    <Drawer.Trigger asChild>
                        <Button variant="outline">Open Left</Button>
                    </Drawer.Trigger>
                    <Drawer.Overlay />
                    <Drawer.Content>
                        <Drawer.Header>
                            <Drawer.Title>Navigation</Drawer.Title>
                            <Drawer.Description>
                                Navigate through the application.
                            </Drawer.Description>
                        </Drawer.Header>
                        <div className="py-4">
                            <ul className="space-y-2">
                                <li>
                                    <Button variant="ghost" className="w-full justify-start">
                                        Home
                                    </Button>
                                </li>
                                <li>
                                    <Button variant="ghost" className="w-full justify-start">
                                        Settings
                                    </Button>
                                </li>
                                <li>
                                    <Button variant="ghost" className="w-full justify-start">
                                        Profile
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </Drawer.Content>
                </Drawer>

                {/* Top Drawer */}
                <Drawer side="top">
                    <Drawer.Trigger asChild>
                        <Button variant="outline">Open Top</Button>
                    </Drawer.Trigger>
                    <Drawer.Overlay />
                    <Drawer.Content>
                        <Drawer.Header>
                            <Drawer.Title>Notifications</Drawer.Title>
                            <Drawer.Description>
                                You have 3 unread messages.
                            </Drawer.Description>
                        </Drawer.Header>
                        <div className="py-4 space-y-2">
                            <div className="rounded bg-ground-100 p-4 dark:bg-ground-800">
                                <p className="text-sm font-medium">New comment on your post</p>
                                <p className="text-xs text-ground-500">2 minutes ago</p>
                            </div>
                            <div className="rounded bg-ground-100 p-4 dark:bg-ground-800">
                                <p className="text-sm font-medium">System update completed</p>
                                <p className="text-xs text-ground-500">1 hour ago</p>
                            </div>
                        </div>
                        <Drawer.Footer>
                            <Drawer.Close asChild>
                                <Button className="w-full">Mark all as read</Button>
                            </Drawer.Close>
                        </Drawer.Footer>
                    </Drawer.Content>
                </Drawer>

                {/* Bottom Drawer */}
                <Drawer side="bottom">
                    <Drawer.Trigger asChild>
                        <Button variant="outline">Open Bottom</Button>
                    </Drawer.Trigger>
                    <Drawer.Overlay />
                    <Drawer.Content>
                        <Drawer.Header>
                            <Drawer.Title>Share this page</Drawer.Title>
                            <Drawer.Description>
                                Anyone with the link can view this content.
                            </Drawer.Description>
                        </Drawer.Header>
                        <div className="py-4 flex items-center space-x-2">
                            <input
                                className="flex h-10 w-full rounded border border-ground-300 bg-transparent px-3 py-2 text-sm placeholder:text-ground-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-ground-600 dark:text-ground-100 dark:focus:ring-offset-ground-950"
                                readOnly
                                value="https://example.com/share/x8j92"
                            />
                            <Button variant="secondary">Copy</Button>
                        </div>
                        <Drawer.Footer>
                            <Drawer.Close asChild>
                                <Button variant="outline" className="w-full">
                                    Close
                                </Button>
                            </Drawer.Close>
                        </Drawer.Footer>
                    </Drawer.Content>
                </Drawer>
            </div>
        </div>
    );
}