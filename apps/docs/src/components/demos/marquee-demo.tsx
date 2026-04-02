'use client';
import { Marquee, MarqueeItem, Typography, Divider } from 'vayu-ui';

export default function MarqueeDemo() {
  return (
    <div className="space-y-12 w-full not-prose p-8 bg-canvas min-h-screen">
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-2">
          <Typography.H1 variant="primary">Marquee Component</Typography.H1>
          <Typography.P variant="secondary">
            WCAG 2.2 AA compliant scrolling content component with pause controls
          </Typography.P>
        </div>

        <Divider spacing="lg" decorative />

        {/* Basic Example */}
        <section className="space-y-4">
          <div className="space-y-1">
            <Typography.H2 variant="primary">Basic Marquee</Typography.H2>
            <Typography.P variant="secondary">
              Default settings with pause control (WCAG 2.2.2)
            </Typography.P>
          </div>
          <Marquee pauseOnHover label="Featured technologies">
            <MarqueeItem>
              <div className="flex items-center gap-2 px-4 py-2 rounded-surface bg-surface border border-border">
                <span className="text-surface-content font-medium">React</span>
              </div>
            </MarqueeItem>
            <MarqueeItem>
              <div className="flex items-center gap-2 px-4 py-2 rounded-surface bg-surface border border-border">
                <span className="text-surface-content font-medium">TypeScript</span>
              </div>
            </MarqueeItem>
            <MarqueeItem>
              <div className="flex items-center gap-2 px-4 py-2 rounded-surface bg-surface border border-border">
                <span className="text-surface-content font-medium">Tailwind CSS v4</span>
              </div>
            </MarqueeItem>
            <MarqueeItem>
              <div className="flex items-center gap-2 px-4 py-2 rounded-surface bg-surface border border-border">
                <span className="text-surface-content font-medium">Next.js</span>
              </div>
            </MarqueeItem>
            <MarqueeItem>
              <div className="flex items-center gap-2 px-4 py-2 rounded-surface bg-surface border border-border">
                <span className="text-surface-content font-medium">Vite</span>
              </div>
            </MarqueeItem>
          </Marquee>
        </section>

        <Divider spacing="lg" decorative />

        {/* Speed Variants */}
        <section className="space-y-4">
          <div className="space-y-1">
            <Typography.H2 variant="primary">Speed Variants</Typography.H2>
            <Typography.P variant="secondary">Slow (40s), Normal (20s), Fast (10s)</Typography.P>
          </div>
          <div className="space-y-4">
            <Marquee speed="slow" label="Slow scrolling content">
              {[...Array(6)].map((_, i) => (
                <MarqueeItem key={i}>
                  <div className="px-6 py-3 rounded-surface bg-info/10 border border-info/30">
                    <span className="text-info font-medium">Slow {i + 1}</span>
                  </div>
                </MarqueeItem>
              ))}
            </Marquee>
            <Marquee speed="fast" label="Fast scrolling content">
              {[...Array(6)].map((_, i) => (
                <MarqueeItem key={i}>
                  <div className="px-6 py-3 rounded-surface bg-destructive/10 border border-destructive/30">
                    <span className="text-destructive font-medium">Fast {i + 1}</span>
                  </div>
                </MarqueeItem>
              ))}
            </Marquee>
          </div>
        </section>

        <Divider spacing="lg" decorative />

        {/* Direction */}
        <section className="space-y-4">
          <div className="space-y-1">
            <Typography.H2 variant="primary">Direction Control</Typography.H2>
            <Typography.P variant="secondary">
              Left to right or right to left scrolling
            </Typography.P>
          </div>
          <div className="space-y-4">
            <Marquee direction="left" label="Left scrolling content">
              {[...Array(6)].map((_, i) => (
                <MarqueeItem key={i}>
                  <div className="px-6 py-3 rounded-surface bg-success/10 border border-success/30">
                    <span className="text-success font-medium">→ Left {i + 1}</span>
                  </div>
                </MarqueeItem>
              ))}
            </Marquee>
            <Marquee direction="right" label="Right scrolling content">
              {[...Array(6)].map((_, i) => (
                <MarqueeItem key={i}>
                  <div className="px-6 py-3 rounded-surface bg-brand/10 border border-brand/30">
                    <span className="text-brand font-medium">← Right {i + 1}</span>
                  </div>
                </MarqueeItem>
              ))}
            </Marquee>
          </div>
        </section>

        <Divider spacing="lg" decorative />

        {/* Loop Modes */}
        <section className="space-y-4">
          <div className="space-y-1">
            <Typography.H2 variant="primary">Loop Modes</Typography.H2>
            <Typography.P variant="secondary">
              Infinite, finite, single, or ping-pong patterns
            </Typography.P>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Typography.P variant="secondary" className="font-medium text-surface-content">
                Ping-pong (alternating direction)
              </Typography.P>
              <Marquee loopMode="ping-pong" label="Ping-pong scrolling content">
                {[...Array(6)].map((_, i) => (
                  <MarqueeItem key={i}>
                    <div className="px-6 py-3 rounded-surface bg-warning/10 border border-warning/30">
                      <span className="text-warning font-medium">Ping-pong {i + 1}</span>
                    </div>
                  </MarqueeItem>
                ))}
              </Marquee>
            </div>
            <div className="space-y-2">
              <Typography.P variant="secondary" className="font-medium text-surface-content">
                Finite (3 loops then stops)
              </Typography.P>
              <Marquee loopMode="finite" loopCount={3} label="Finite scrolling content">
                {[...Array(6)].map((_, i) => (
                  <MarqueeItem key={i}>
                    <div className="px-6 py-3 rounded-surface bg-info/10 border border-info/30">
                      <span className="text-info font-medium">Finite {i + 1}</span>
                    </div>
                  </MarqueeItem>
                ))}
              </Marquee>
            </div>
          </div>
        </section>

        <Divider spacing="lg" decorative />

        {/* Without Controls */}
        <section className="space-y-4">
          <div className="space-y-1">
            <Typography.H2 variant="primary">No Controls (Not Recommended)</Typography.H2>
            <Typography.P variant="secondary">
              Without pause control - fails WCAG 2.2.2 Level A
            </Typography.P>
          </div>
          <Marquee showControls={false} label="Uncontrollable scrolling content">
            {[...Array(6)].map((_, i) => (
              <MarqueeItem key={i}>
                <div className="px-6 py-3 rounded-surface bg-muted border border-border">
                  <span className="text-surface-content font-medium">No Control {i + 1}</span>
                </div>
              </MarqueeItem>
            ))}
          </Marquee>
        </section>

        <Divider spacing="lg" decorative />

        {/* Without Gradient */}
        <section className="space-y-4">
          <div className="space-y-1">
            <Typography.H2 variant="primary">No Edge Gradient</Typography.H2>
            <Typography.P variant="secondary">Without gradient fade on edges</Typography.P>
          </div>
          <Marquee gradient={false} label="Content without gradient">
            {[...Array(6)].map((_, i) => (
              <MarqueeItem key={i}>
                <div className="px-6 py-3 rounded-surface bg-brand/10 border border-brand/30">
                  <span className="text-brand font-medium">Item {i + 1}</span>
                </div>
              </MarqueeItem>
            ))}
          </Marquee>
        </section>

        <Divider spacing="lg" decorative />

        {/* Logo Showcase Example */}
        <section className="space-y-4">
          <div className="space-y-1">
            <Typography.H2 variant="primary">Logo Showcase Example</Typography.H2>
            <Typography.P variant="secondary">
              Typical use case for partner logos or testimonials
            </Typography.P>
          </div>
          <Marquee speed="slow" pauseOnHover={true} label="Partner companies">
            {[
              'Acme Corp',
              'TechVision',
              'DataFlow Inc',
              'CloudNine',
              'DevTools Pro',
              'AppMakers',
            ].map((company, i) => (
              <MarqueeItem key={i}>
                <div className="px-8 py-4 rounded-overlay bg-surface border border-border shadow-surface">
                  <span className="text-lg font-semibold text-surface-content">{company}</span>
                </div>
              </MarqueeItem>
            ))}
          </Marquee>
        </section>

        <Divider spacing="lg" decorative />

        {/* Accessibility Notes */}
        <section className="space-y-4 p-6 rounded-surface bg-muted border border-border">
          <div className="space-y-2">
            <Typography.H3 variant="info">WCAG 2.2 AA Compliance</Typography.H3>
            <div className="space-y-3">
              <Typography.P variant="secondary">
                <span className="font-semibold text-surface-content">2.2.2 (Level A):</span> Pause
                control provided by default for all moving content
              </Typography.P>
              <Typography.P variant="secondary">
                <span className="font-semibold text-surface-content">2.3.3:</span> Respects
                prefers-reduced-motion setting - animations disabled for users who prefer reduced
                motion
              </Typography.P>
              <Typography.P variant="secondary">
                <span className="font-semibold text-surface-content">2.4.7 (Level AA):</span> Focus
                indicator visible on pause control button
              </Typography.P>
              <Typography.P variant="secondary">
                <span className="font-semibold text-surface-content">4.1.2 (Level A):</span> Proper
                ARIA labels (role="region", aria-roledescription, aria-label)
              </Typography.P>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
