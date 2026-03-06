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

            {/* Floating Variant */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    Floating
                </p>
                <div className="rounded bg-ground-50 dark:bg-ground-900 p-4">
                    <Navbar variant="floating">
                        <Navbar.Container>
                            <Navbar.Brand>
                                <span className="text-lg font-bold font-primary text-ground-900 dark:text-white">
                                    Studio
                                </span>
                            </Navbar.Brand>

                            <Navbar.Items>
                                <Navbar.Item active>Dashboard</Navbar.Item>
                                <Navbar.Item>Projects</Navbar.Item>
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
                            <Navbar.MobileItem>Projects</Navbar.MobileItem>
                            <Navbar.MobileItem>Settings</Navbar.MobileItem>
                        </Navbar.MobileMenu>
                    </Navbar>
                </div>
            </div>

            {/* Bordered Variant */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    Bordered
                </p>
                <div className="rounded overflow-hidden">
                    <Navbar variant="bordered">
                        <Navbar.Container>
                            <Navbar.Brand>
                                <span className="text-lg font-bold font-primary text-ground-900 dark:text-white">
                                    DevTools
                                </span>
                            </Navbar.Brand>

                            <Navbar.Items>
                                <Navbar.Item>Docs</Navbar.Item>
                                <Navbar.Item active>API</Navbar.Item>
                                <Navbar.Item>Blog</Navbar.Item>
                            </Navbar.Items>

                            <Navbar.Actions>
                                <Button variant="outline" size="small">
                                    <Button.Text>GitHub</Button.Text>
                                </Button>
                            </Navbar.Actions>

                            <Navbar.Toggle />
                        </Navbar.Container>

                        <Navbar.MobileMenu>
                            <Navbar.MobileItem>Docs</Navbar.MobileItem>
                            <Navbar.MobileItem active>API</Navbar.MobileItem>
                            <Navbar.MobileItem>Blog</Navbar.MobileItem>
                        </Navbar.MobileMenu>
                    </Navbar>
                </div>
            </div>

            {/* Sticky Example */}
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
                                <Navbar.Item active>Page 1</Navbar.Item>
                                <Navbar.Item>Page 2</Navbar.Item>
                            </Navbar.Items>

                            <Navbar.Actions>
                                <Button variant="primary" size="small">
                                    <Button.Text>Action</Button.Text>
                                </Button>
                            </Navbar.Actions>

                            <Navbar.Toggle />
                        </Navbar.Container>

                        <Navbar.MobileMenu>
                            <Navbar.MobileItem active>Page 1</Navbar.MobileItem>
                            <Navbar.MobileItem>Page 2</Navbar.MobileItem>
                        </Navbar.MobileMenu>
                    </Navbar>
                    <div className="p-4 text-sm text-ground-500 font-secondary">
                        Scroll to see sticky behavior...
                    </div>
                </div>
            </div>
        </div>
    );
}