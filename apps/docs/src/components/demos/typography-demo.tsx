import { Typography } from "vayu-ui";

export default function TypographyDemo() {
    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl">
            <div className="flex flex-col gap-4 pb-8 border-b border-neutral-200 dark:border-neutral-800">
                <Typography.H1>Heading 1</Typography.H1>
                <Typography.H2>Heading 2</Typography.H2>
                <Typography.H3>Heading 3</Typography.H3>
                <Typography.H4>Heading 4</Typography.H4>
                <Typography.H5>Heading 5</Typography.H5>
                <Typography.H6>Heading 6</Typography.H6>
            </div>

            <div className="flex flex-col gap-4 pb-8 border-b border-neutral-200 dark:border-neutral-800">
                <Typography.P>
                    This is a paragraph example. It has a relaxed line height and proper
                    spacing for optimal readability. Typography is the art and technique
                    of arranging type to make written language legible, readable, and
                    appealing when displayed.
                </Typography.P>
                <Typography.P variant="secondary">
                    This is a secondary paragraph. It uses a lighter text color to
                    indicate less emphasis.
                </Typography.P>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <Typography.Label>Label:</Typography.Label>
                    <Typography.P className="text-sm">Input label example</Typography.P>
                </div>

                <div>
                    <Typography.P>
                        Inline code example: <Typography.Code>npm install vayu-ui</Typography.Code>
                    </Typography.P>
                </div>

                <div>
                    <Typography.Link href="#">This is a link example</Typography.Link>
                </div>

                <Typography.CTA>This is a Call to Action text</Typography.CTA>
            </div>

            <div className="flex flex-col gap-2">
                <Typography.H4>Variants</Typography.H4>
                <Typography.P variant="error">Error text variant</Typography.P>
                <Typography.P variant="success">Success text variant</Typography.P>
                <Typography.P variant="warning">Warning text variant</Typography.P>
                <Typography.P variant="info">Info text variant</Typography.P>
                <Typography.H3 variant="gradient">Gradient Heading</Typography.H3>
            </div>
        </div>
    );
}
