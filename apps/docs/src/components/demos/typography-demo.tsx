import { Typography } from "vayu-ui";

export default function TypographyDemo() {
    return (
        <div className="flex flex-col gap-10 w-full max-w-3xl">
            {/* Headings Section */}
            <section>
                <Typography.H2 className="mb-6 text-neutral-900 dark:text-neutral-50">
                    Headings
                </Typography.H2>
                <div className="space-y-5 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950 rounded-xl p-6 border border-neutral-200 dark:border-neutral-800">
                    <Typography.H1>Heading 1 - Main Title</Typography.H1>
                    <Typography.H2>Heading 2 - Section Title</Typography.H2>
                    <Typography.H3>Heading 3 - Subsection</Typography.H3>
                    <Typography.H4>Heading 4 - Component</Typography.H4>
                    <Typography.H5>Heading 5 - Subcomponent</Typography.H5>
                    <Typography.H6>Heading 6 - Minor Heading</Typography.H6>
                </div>
            </section>

            {/* Paragraph Section */}
            <section>
                <Typography.H2 className="mb-6 text-neutral-900 dark:text-neutral-50">
                    Paragraphs
                </Typography.H2>
                <div className="space-y-4">
                    <div className="bg-white dark:bg-neutral-900 rounded-xl p-5 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                        <Typography.P>
                            This is a paragraph example. It has a relaxed line height and proper
                            spacing for optimal readability. Typography is the art and technique
                            of arranging type to make written language legible, readable, and
                            appealing when displayed.
                        </Typography.P>
                    </div>
                    <div className="bg-white dark:bg-neutral-900 rounded-xl p-5 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                        <Typography.P variant="secondary">
                            This is a secondary paragraph. It uses a lighter text color to
                            indicate less emphasis in the visual hierarchy.
                        </Typography.P>
                    </div>
                </div>
            </section>

            {/* Text Components Section */}
            <section>
                <Typography.H2 className="mb-6 text-neutral-900 dark:text-neutral-50">
                    Text Components
                </Typography.H2>
                <div className="space-y-4">
                    {/* Label */}
                    <div className="flex items-center gap-3 bg-white dark:bg-neutral-900 rounded-lg p-4 border border-neutral-200 dark:border-neutral-800">
                        <Typography.Label className="font-medium">Email Address</Typography.Label>
                        <span className="text-sm text-neutral-400 dark:text-neutral-500">→</span>
                        <Typography.P className="text-sm">user@example.com</Typography.P>
                    </div>

                    {/* Inline Code */}
                    <div className="bg-white dark:bg-neutral-900 rounded-lg p-4 border border-neutral-200 dark:border-neutral-800">
                        <Typography.P>
                            Inline code example: <Typography.Code>npm install vayu-ui</Typography.Code>
                        </Typography.P>
                    </div>

                    {/* Links */}
                    <div className="bg-white dark:bg-neutral-900 rounded-lg p-4 border border-neutral-200 dark:border-neutral-800 space-y-3">
                        <Typography.Link href="#">Internal link example</Typography.Link>
                        <Typography.Link href="https://example.com" target="_blank">
                            External link with icon
                        </Typography.Link>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg p-4 border border-primary-200 dark:border-primary-800">
                        <Typography.CTA className="text-lg font-semibold">
                            ✨ This is a Call to Action text
                        </Typography.CTA>
                    </div>
                </div>
            </section>

            {/* Variants Section */}
            <section>
                <Typography.H2 className="mb-6 text-neutral-900 dark:text-neutral-50">
                    Color Variants
                </Typography.H2>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="bg-white dark:bg-neutral-900 rounded-lg p-4 border border-red-200 dark:border-red-900 shadow-sm">
                        <Typography.P variant="error">Error text variant</Typography.P>
                    </div>
                    <div className="bg-white dark:bg-neutral-900 rounded-lg p-4 border border-green-200 dark:border-green-900 shadow-sm">
                        <Typography.P variant="success">Success text variant</Typography.P>
                    </div>
                    <div className="bg-white dark:bg-neutral-900 rounded-lg p-4 border border-yellow-200 dark:border-yellow-900 shadow-sm">
                        <Typography.P variant="warning">Warning text variant</Typography.P>
                    </div>
                    <div className="bg-white dark:bg-neutral-900 rounded-lg p-4 border border-blue-200 dark:border-blue-900 shadow-sm">
                        <Typography.P variant="info">Info text variant</Typography.P>
                    </div>
                </div>
                <div className="mt-4 bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-800">
                    <Typography.H3 variant="gradient">
                        Gradient Heading Effect
                    </Typography.H3>
                </div>
            </section>

            {/* Accessibility Features Section */}
            <section>
                <Typography.H2 className="mb-6 text-neutral-900 dark:text-neutral-50">
                    Accessibility Features
                </Typography.H2>
                <div className="space-y-3 bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-start gap-3">
                        <span className="text-green-500 dark:text-green-400 mt-1">✓</span>
                        <Typography.P className="text-sm">
                            WCAG 2.2 AA compliant color contrast ratios
                        </Typography.P>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-green-500 dark:text-green-400 mt-1">✓</span>
                        <Typography.P className="text-sm">
                            Proper ARIA labels and descriptions
                        </Typography.P>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-green-500 dark:text-green-400 mt-1">✓</span>
                        <Typography.P className="text-sm">
                            Semantic HTML with proper heading hierarchy
                        </Typography.P>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-green-500 dark:text-green-400 mt-1">✓</span>
                        <Typography.P className="text-sm">
                            External link indicators with `aria-hidden` icons
                        </Typography.P>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-green-500 dark:text-green-400 mt-1">✓</span>
                        <Typography.P className="text-sm">
                            Clear focus indicators on all interactive elements
                        </Typography.P>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-green-500 dark:text-green-400 mt-1">✓</span>
                        <Typography.P className="text-sm">
                            Language support with `lang` attribute
                        </Typography.P>
                    </div>
                </div>
            </section>
        </div>
    );
}
