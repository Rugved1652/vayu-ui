"use client";
import { Navbar } from "vayu-ui";
import { Button } from "vayu-ui";

export default function NavbarDemo() {
    return (
        <div className="flex flex-col not-prose gap-10 w-full">
            {/* Default Variant */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    Default
                </p>
                <div className="rounded overflow-hidden border border-ground-200 dark:border-ground-800">
                    <Navbar>
                        <Navbar.Container>
                            <Navbar.Brand>
                                <span className="text-lg font-bold font-primary text-ground-900 dark:text-white">
                                    Acme
                                </span>
                            </Navbar.Brand>

                            <Navbar.Items>
                                <Navbar.Item active>Home</Navbar.Item>
                                <Navbar.Item>Products</Navbar.Item>
                                <Navbar.Item>About</Navbar.Item>
                                <Navbar.Item>Contact</Navbar.Item>
                            </Navbar.Items>

                            <Navbar.Actions>
                                <Button variant="ghost" size="small">
                                    <Button.Text>Sign in</Button.Text>
                                </Button>
                                <Button variant="primary" size="small">
                                    <Button.Text>Get started</Button.Text>
                                </Button>
                            </Navbar.Actions>

                            <Navbar.Toggle />
                        </Navbar.Container>

                        <Navbar.MobileMenu>
                            <Navbar.MobileItem active>Home</Navbar.MobileItem>
                            <Navbar.MobileItem>Products</Navbar.MobileItem>
                            <Navbar.MobileItem>About</Navbar.MobileItem>
                            <Navbar.MobileItem>Contact</Navbar.MobileItem>
                            <Navbar.Separator />
                            <div className="flex flex-col gap-2 px-4">
                                <Button variant="ghost" size="small" fullWidth>
                                    <Button.Text>Sign in</Button.Text>
                                </Button>
                                <Button variant="primary" size="small" fullWidth>
                                    <Button.Text>Get started</Button.Text>
                                </Button>
                            </div>
                        </Navbar.MobileMenu>
                    </Navbar>
                </div>
            </div>

            {/* Sticky Variant */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    Sticky
                </p>
                <div className="rounded overflow-hidden border border-ground-200 dark:border-ground-800 h-48 relative">
                    <Navbar sticky>
                        <Navbar.Container>
                            <Navbar.Brand>
                                <span className="text-lg font-bold font-primary text-ground-900 dark:text-white">
                                    Sticky Nav
                                </span>
                            </Navbar.Brand>

                            <Navbar.Items>
                                <Navbar.Item active>Dashboard</Navbar.Item>
                                <Navbar.Item>Analytics</Navbar.Item>
                                <Navbar.Item>Settings</Navbar.Item>
                            </Navbar.Items>

                            <Navbar.Actions>
                                <Button variant="primary" size="small">
                                    <Button.Text>New Project</Button.Text>
                                </Button>
                            </Navbar.Actions>

                            <Navbar.Toggle />
                        </Navbar.Container>

                        <Navbar.MobileMenu>
                            <Navbar.MobileItem active>Dashboard</Navbar.MobileItem>
                            <Navbar.MobileItem>Analytics</Navbar.MobileItem>
                            <Navbar.MobileItem>Settings</Navbar.MobileItem>
                            <Navbar.Separator />
                            <div className="px-4">
                                <Button variant="primary" size="small" fullWidth>
                                    <Button.Text>New Project</Button.Text>
                                </Button>
                            </div>
                        </Navbar.MobileMenu>
                    </Navbar>
                    <div className="p-4 text-sm text-ground-500 dark:text-ground-400 font-secondary">
                        <p>Scroll this container to see the sticky behavior...</p>
                        <p className="mt-2">The navbar will stick to the top of its container.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}