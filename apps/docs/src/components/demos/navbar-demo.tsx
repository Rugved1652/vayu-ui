"use client";
import { Navbar, Button, Typography, Divider } from "vayu-ui";

export default function NavbarDemo() {
    return (
        <div className="flex flex-col not-prose gap-10 w-full">
            {/* Default Variant */}
            <div className="flex flex-col gap-3">
                <Typography.P variant="secondary" className="text-xs">
                    Default
                </Typography.P>
                <div className="rounded-surface overflow-hidden border border-border">
                    <Navbar>
                        <Navbar.Container>
                            <Navbar.Brand>
                                <Typography.H5 variant="primary" font="primary" className="text-lg font-bold">
                                    Acme
                                </Typography.H5>
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
                            <Divider spacing="sm" decorative />
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
                <Typography.P variant="secondary" className="text-xs">
                    Sticky
                </Typography.P>
                <div className="rounded-surface overflow-hidden border border-border h-48 relative">
                    <Navbar sticky>
                        <Navbar.Container>
                            <Navbar.Brand>
                                <Typography.H5 variant="primary" font="primary" className="text-lg font-bold">
                                    Sticky Nav
                                </Typography.H5>
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
                            <Divider spacing="sm" decorative />
                            <div className="px-4">
                                <Button variant="primary" size="small" fullWidth>
                                    <Button.Text>New Project</Button.Text>
                                </Button>
                            </div>
                        </Navbar.MobileMenu>
                    </Navbar>
                    <div className="p-4">
                        <Typography.P variant="secondary" className="text-sm">
                            Scroll this container to see the sticky behavior...
                        </Typography.P>
                        <Typography.P variant="secondary" className="text-sm mt-2">
                            The navbar will stick to the top of its container.
                        </Typography.P>
                    </div>
                </div>
            </div>
        </div>
    );
}