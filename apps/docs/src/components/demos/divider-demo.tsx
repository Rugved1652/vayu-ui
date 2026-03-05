import { Divider } from "vayu-ui";

export default function DividerDemo() {
    return (
        <div className="flex flex-col w-full max-w-md gap-6 p-6 bg-white border rounded-lg dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800">
            {/* Simple Divider */}
            <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">Default</span>
                <Divider />
            </div>

            {/* Vertical Divider */}
            <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">Vertical</span>
                <div className="flex items-center h-5 space-x-2 text-sm">
                    <div>Blog</div>
                    <Divider orientation="vertical" />
                    <div>Docs</div>
                    <Divider orientation="vertical" />
                    <div>Source</div>
                </div>
            </div>

            {/* With Label */}
            <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">With Label (Compound)</span>
                <Divider>
                    <Divider.Line />
                    <Divider.Label>OR</Divider.Label>
                    <Divider.Line />
                </Divider>
            </div>

            {/* Different Variants */}
            <div className="space-y-4">
                <span className="text-sm font-medium text-muted-foreground">Variants & Colors</span>

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
            </div>

            {/* Sizes */}
            <div className="space-y-4">
                <span className="text-sm font-medium text-muted-foreground">Sizes</span>
                <Divider spacing="sm">
                    <Divider.Line size="thin" />
                    <Divider.Label>Thin</Divider.Label>
                    <Divider.Line size="thin" />
                </Divider>
                <Divider spacing="sm">
                    <Divider.Line size="thick" />
                    <Divider.Label>Thick</Divider.Label>
                    <Divider.Line size="thick" />
                </Divider>
            </div>
        </div>
    );
}
