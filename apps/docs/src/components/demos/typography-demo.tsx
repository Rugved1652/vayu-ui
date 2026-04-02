import { Typography } from 'vayu-ui';

export default function TypographyDemo() {
  return (
    <div className="flex flex-col gap-10 w-full max-w-3xl">
      {/* Headings Section */}
      <section>
        <Typography.H2 className="mb-6">Headings</Typography.H2>
        <div className="bg-surface space-y-2 rounded-surface p-6 border border-border shadow-surface">
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
        <Typography.H2 className="mb-6">Paragraphs</Typography.H2>
        <div className="space-y-4">
          <div className="bg-surface rounded-surface p-5 border border-border shadow-surface">
            <Typography.P>
              This is a paragraph example. It has a relaxed line height and proper spacing for
              optimal readability. Typography is the art and technique of arranging type to make
              written language legible, readable, and appealing when displayed.
            </Typography.P>
          </div>
          <div className="bg-surface rounded-surface p-5 border border-border shadow-surface">
            <Typography.P variant="secondary">
              This is a secondary paragraph. It uses muted-content color to indicate less emphasis
              in the visual hierarchy.
            </Typography.P>
          </div>
        </div>
      </section>

      {/* Text Components Section */}
      <section>
        <Typography.H2 className="mb-6">Text Components</Typography.H2>
        <div className="space-y-4">
          {/* Label */}
          <div className="flex items-center gap-3 bg-surface rounded-control p-4 border border-border">
            <Typography.Label className="font-medium">Email Address</Typography.Label>
            <span className="text-sm text-muted-content">→</span>
            <Typography.P className="text-sm">user@example.com</Typography.P>
          </div>

          {/* Inline Code */}
          <div className="bg-surface rounded-control p-4 border border-border">
            <Typography.P>
              Inline code example: <Typography.Code>npm install vayu-ui</Typography.Code>
            </Typography.P>
            <Typography.P className="mt-2">
              With language hint:{' '}
              <Typography.Code codeLang="typescript">
                const x: string = &quot;hello&quot;
              </Typography.Code>
            </Typography.P>
          </div>

          {/* Links */}
          <div className="bg-surface rounded-control p-4 border border-border space-y-3">
            <div>
              <Typography.P className="text-sm text-muted-content mb-1">
                Internal link (Next.js Link):
              </Typography.P>
              <Typography.Link href="/components">Go to Components</Typography.Link>
            </div>
            <div>
              <Typography.P className="text-sm text-muted-content mb-1">
                External link (opens in new tab):
              </Typography.P>
              <Typography.Link href="https://example.com" target="_blank">
                External link with icon
              </Typography.Link>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-brand/10 rounded-control p-4 border border-brand/30">
            <Typography.CTA className="text-lg font-semibold text-brand">
              ✨ This is a Call to Action text
            </Typography.CTA>
          </div>
        </div>
      </section>

      {/* Variants Section */}
      <section>
        <Typography.H2 className="mb-6">Color Variants</Typography.H2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="bg-surface rounded-control p-4 border border-destructive/30 shadow-surface">
            <Typography.P variant="error">Error text variant</Typography.P>
            <Typography.P className="text-xs text-muted-content mt-1">
              destructive token
            </Typography.P>
          </div>
          <div className="bg-surface rounded-control p-4 border border-success/30 shadow-surface">
            <Typography.P variant="success">Success text variant</Typography.P>
            <Typography.P className="text-xs text-muted-content mt-1">success token</Typography.P>
          </div>
          <div className="bg-surface rounded-control p-4 border border-warning/30 shadow-surface">
            <Typography.P variant="warning">Warning text variant</Typography.P>
            <Typography.P className="text-xs text-muted-content mt-1">warning token</Typography.P>
          </div>
          <div className="bg-surface rounded-control p-4 border border-info/30 shadow-surface">
            <Typography.P variant="info">Info text variant</Typography.P>
            <Typography.P className="text-xs text-muted-content mt-1">info token</Typography.P>
          </div>
        </div>
        <div className="mt-4 bg-surface rounded-surface p-6 border border-border shadow-surface">
          <Typography.H3 variant="gradient">Gradient Heading Effect</Typography.H3>
          <Typography.P className="text-xs text-muted-content mt-2">brand gradient</Typography.P>
        </div>
      </section>

      {/* Font Variants Section */}
      <section>
        <Typography.H2 className="mb-6">Font Variants</Typography.H2>
        <div className="space-y-3 bg-surface rounded-surface p-6 border border-border shadow-surface">
          <Typography.P font="primary">Primary font (Oswald) - for headings</Typography.P>
          <Typography.P font="secondary">Secondary font (Mulish) - for body text</Typography.P>
        </div>
      </section>
    </div>
  );
}
