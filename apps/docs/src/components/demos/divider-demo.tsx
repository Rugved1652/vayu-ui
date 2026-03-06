"use client"
import { Divider } from "vayu-ui";

export default function DividerDemo() {
    return (
        <div className="w-full max-w-md not-prose">
            <h2 id="divider-demo-label" className="text-xl font-semibold mb-4 font-primary">
                Divider Example
            </h2>

            <div className="flex flex-col gap-6 p-6 bg-white border rounded shadow-outer dark:bg-ground-950 border-ground-200 dark:border-ground-800">
                {/* Simple Divider */}
                <div className="space-y-2">
                    <span className="text-sm font-medium text-ground-500 dark:text-ground-400">Default</span>
                    <Divider />
                </div>

                {/* Vertical Divider */}
                <div className="space-y-2">
                    <span className="text-sm font-medium text-ground-500 dark:text-ground-400">Vertical</span>
                    <div className="flex items-center h-5 space-x-2 text-sm font-secondary">
                        <div>Blog</div>
                        <Divider orientation="vertical" />
                        <div>Docs</div>
                        <Divider orientation="vertical" />
                        <div>Source</div>
                    </div>
                </div>

                {/* With Label */}
                <div className="space-y-2">
                    <span className="text-sm font-medium text-ground-500 dark:text-ground-400">With Label (Compound)</span>
                    <Divider>
                        <Divider.Line />
                        <Divider.Label>OR</Divider.Label>
                        <Divider.Line />
                    </Divider>
                </div>

                {/* Different Variants */}
                <div className="space-y-4">
                    <span className="text-sm font-medium text-ground-500 dark:text-ground-400">Variants & Colors</span>

                    <Divider>
                        <Divider.Line variant="dashed" />
                        <Divider.Label>Dashed</Divider.Label>
                    </Divider>

                    <Divider>
                        <Divider.Label>Dotted</Divider.Label>
                        <Divider.Line variant="dotted" />
                    </Divider>

                    <Divider>
                        <Divider.Line variant="solid" color="primary" />
                        <Divider.Label color="primary">Solid Primary</Divider.Label>
                        <Divider.Line variant="solid" color="primary" />
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
                </div>

                {/* Sizes */}
                <div className="space-y-4">
                    <span className="text-sm font-medium text-ground-500 dark:text-ground-400">Sizes</span>
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
                    <span className="text-sm font-medium text-ground-500 dark:text-ground-400">Spacing</span>
                    <Divider spacing="none" />
                    <Divider spacing="sm" />
                    <Divider spacing="md" />
                    <Divider spacing="lg" />
                    <Divider spacing="xl" />
                    <Divider spacing="2xl" />
                </div>
            </div>
        </div>
    );
}