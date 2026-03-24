"use client"

import { Drawer, Button, Typography, Divider, TextInput } from "vayu-ui";

export default function DrawerDemo() {
    return (
        <div className="w-full not-prose">
            <Typography.H2 id="drawer-demo-label" variant="primary" className="mb-4">
                Drawer Example
            </Typography.H2>

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
                        <Divider spacing="md" />
                        <div className="py-4 space-y-4">
                            <TextInput.Root>
                                <TextInput.Label>Name</TextInput.Label>
                                <TextInput.Field>
                                    <TextInput.Input placeholder="John Doe" />
                                </TextInput.Field>
                            </TextInput.Root>
                            <TextInput.Root>
                                <TextInput.Label>Username</TextInput.Label>
                                <TextInput.Field>
                                    <TextInput.Input placeholder="@johndoe" />
                                </TextInput.Field>
                            </TextInput.Root>
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
                        <Divider spacing="md" />
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
                        <Divider spacing="md" />
                        <div className="py-4 space-y-2">
                            <div className="rounded-surface bg-muted p-4">
                                <Typography.P variant="primary" className="text-sm font-medium">
                                    New comment on your post
                                </Typography.P>
                                <Typography.P variant="secondary" className="text-xs">
                                    2 minutes ago
                                </Typography.P>
                            </div>
                            <div className="rounded-surface bg-muted p-4">
                                <Typography.P variant="primary" className="text-sm font-medium">
                                    System update completed
                                </Typography.P>
                                <Typography.P variant="secondary" className="text-xs">
                                    1 hour ago
                                </Typography.P>
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
                        <Divider spacing="md" />
                        <div className="py-4 flex items-center space-x-2">
                            <TextInput.Root className="flex-1">
                                <TextInput.Field>
                                    <TextInput.Input readOnly value="https://example.com/share/x8j92" />
                                </TextInput.Field>
                            </TextInput.Root>
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
