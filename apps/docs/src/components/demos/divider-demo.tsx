"use client"
import { Divider, Typography, Button } from "vayu-ui";

export default function DividerDemo() {
    return (
        <div className="w-full max-w-md not-prose">
            <Typography.H3 id="divider-demo-label" className="mb-4">
                Divider Example
            </Typography.H3>

            <div className="flex flex-col gap-6 p-6 bg-surface border border-border rounded-surface shadow-surface">
                {/* Simple Divider */}
                <div className="space-y-2">
                    <Typography.Label variant="secondary">Default</Typography.Label>
                    <Divider />
                </div>

                {/* Vertical Divider */}
                <div className="space-y-2">
                    <Typography.Label variant="secondary">Vertical</Typography.Label>
                    <div className="flex items-center h-5 gap-2">
                        <Typography.P variant="secondary" className="text-sm">Blog</Typography.P>
                        <Divider orientation="vertical" />
                        <Typography.P variant="secondary" className="text-sm">Docs</Typography.P>
                        <Divider orientation="vertical" />
                        <Typography.P variant="secondary" className="text-sm">Source</Typography.P>
                    </div>
                </div>

                {/* With Label */}
                <div className="space-y-2">
                    <Typography.Label variant="secondary">With Label (Compound)</Typography.Label>
                    <Divider>
                        <Divider.Line />
                        <Divider.Label>OR</Divider.Label>
                        <Divider.Line />
                    </Divider>
                </div>

                {/* Different Variants */}
                <div className="space-y-4">
                    <Typography.Label variant="secondary">Variants & Colors</Typography.Label>

                    <Divider>
                        <Divider.Line variant="dashed" />
                        <Divider.Label>Dashed</Divider.Label>
                    </Divider>

                    <Divider>
                        <Divider.Label>Dotted</Divider.Label>
                        <Divider.Line variant="dotted" />
                    </Divider>

                    <Divider>
                        <Divider.Line variant="solid" color="brand" />
                        <Divider.Label color="brand">Solid Brand</Divider.Label>
                        <Divider.Line variant="solid" color="brand" />
                    </Divider>

                    <Divider>
                        <Divider.Line variant="solid" color="success" />
                        <Divider.Label color="success">Success</Divider.Label>
                        <Divider.Line variant="solid" color="success" />
                    </Divider>

                    <Divider>
                        <Divider.Line variant="solid" color="warning" />
                        <Divider.Label color="warning">Warning</Divider.Label>
                        <Divider.Line variant="solid" color="warning" />
                    </Divider>

                    <Divider>
                        <Divider.Line variant="solid" color="destructive" />
                        <Divider.Label color="destructive">Destructive</Divider.Label>
                        <Divider.Line variant="solid" color="destructive" />
                    </Divider>

                    <Divider>
                        <Divider.Line variant="solid" color="info" />
                        <Divider.Label color="info">Info</Divider.Label>
                        <Divider.Line variant="solid" color="info" />
                    </Divider>
                </div>

                {/* Sizes */}
                <div className="space-y-4">
                    <Typography.Label variant="secondary">Sizes</Typography.Label>
                    <Divider spacing="sm">
                        <Divider.Line size="thin" />
                        <Divider.Label>Thin</Divider.Label>
                        <Divider.Line size="thin" />
                    </Divider>
                    <Divider spacing="sm">
                        <Divider.Line size="normal" />
                        <Divider.Label>Normal</Divider.Label>
                        <Divider.Line size="normal" />
                    </Divider>
                    <Divider spacing="sm">
                        <Divider.Line size="thick" />
                        <Divider.Label>Thick</Divider.Label>
                        <Divider.Line size="thick" />
                    </Divider>
                    <Divider spacing="sm">
                        <Divider.Line size="bold" />
                        <Divider.Label>Bold</Divider.Label>
                        <Divider.Line size="bold" />
                    </Divider>
                </div>

                {/* Spacing */}
                <div className="space-y-4">
                    <Typography.Label variant="secondary">Spacing</Typography.Label>
                    <Divider spacing="none" />
                    <Divider spacing="sm" />
                    <Divider spacing="md" />
                    <Divider spacing="lg" />
                    <Divider spacing="xl" />
                    <Divider spacing="2xl" />
                </div>

                {/* Button Divider Example */}
                <div className="space-y-4">
                    <Typography.Label variant="secondary">With Buttons</Typography.Label>
                    <div className="flex items-center gap-4">
                        <Button variant="primary" size="small">Sign In</Button>
                        <Divider orientation="vertical" spacing="none" />
                        <Button variant="outline" size="small">Register</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
