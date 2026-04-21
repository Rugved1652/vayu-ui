'use client';
import { useState } from 'react';
import { Affix, Typography } from 'vayu-ui';

const ScrollPlaceHolder = ({ height = 400 }: { height?: number }) => (
  <div
    className="w-full flex items-center justify-center border border-dashed border-border rounded-surface my-4 bg-muted"
    style={{ height }}
  >
    <Typography.P variant="secondary" className="font-tertiary">
      Scroll Area ({height}px)
    </Typography.P>
  </div>
);

// ============================================================================
// Demo Component
// ============================================================================

export default function AffixDemo() {
  // State for the "Custom Target" example
  // We need to store the DOM element to pass it to the Affix `target` prop
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);

  // State to demonstrate the onAffixed callback
  const [isTopAffixed, setIsTopAffixed] = useState(false);
  const [isBottomAffixed, setIsBottomAffixed] = useState(false);

  return (
    <div className="min-h-screen text-canvas-content pb-20">
      <main className="max-w-4xl mx-auto p-6 space-y-12">
        <Typography.H5>Affix Example</Typography.H5>
        <section>
          <Typography.H5>1. Top Affix (with Offset)</Typography.H5>
          <Typography.P variant="secondary" className="mb-4">
            This bar sticks to the top of the viewport with a{' '}
            <Typography.Code>20px</Typography.Code> offset. It uses{' '}
            <Typography.Code>zIndex: 50</Typography.Code>.
          </Typography.P>

          <div className="p-4 border border-border rounded-surface bg-surface shadow-surface">
            <Affix
              offset={20}
              zIndex={50}
              role="navigation"
              aria-label="Sticky Top Navigation"
              onAffixed={(affixed) => setIsTopAffixed(affixed)}
            >
              <div className="bg-brand text-brand-content p-4 rounded-control shadow-elevated flex justify-between items-center">
                <Typography.Label className="font-bold">Top Sticky Bar</Typography.Label>
                <span className="text-xs bg-brand/80 px-2 py-1 rounded-control">
                  Status: {isTopAffixed ? 'Affixed' : 'Static'}
                </span>
              </div>
            </Affix>

            <ScrollPlaceHolder height={300} />
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. Bottom Affix */}
        {/* ============================================================ */}
        <section>
          <Typography.H5>2. Bottom Affix</Typography.H5>
          <Typography.P variant="secondary" className="mb-4">
            This bar sticks to the bottom of the viewport. Useful for cookie consents or action
            bars.
          </Typography.P>

          <div className="p-4 border border-border rounded-surface bg-surface shadow-surface">
            <ScrollPlaceHolder height={300} />

            <Affix
              position="bottom"
              offset={0}
              zIndex={40}
              onAffixed={(affixed) => setIsBottomAffixed(affixed)}
            >
              <div className="bg-elevated text-elevated-content p-4 rounded-control shadow-elevated flex justify-between items-center">
                <div>
                  <Typography.Label className="font-bold">Bottom Action Bar</Typography.Label>
                  <Typography.P variant="secondary" className="text-xs">
                    Sticks to the bottom edge. {isBottomAffixed ? '(Affixed)' : ''}
                  </Typography.P>
                </div>
                <button className="bg-success text-success-content hover:bg-success/90 px-4 py-2 rounded-control text-sm font-medium transition">
                  Save Changes
                </button>
              </div>
            </Affix>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. CustomTarget Container */}
        {/* ============================================================ */}
        <section>
          <Typography.H5>3. Custom Target Container</Typography.H5>
          <Typography.P variant="secondary" className="mb-4">
            The Affix can be scoped to a specific scrollable element, not just the window. Scroll
            inside the box below.
          </Typography.P>

          <div
            ref={(node) => setScrollContainer(node)}
            className="h-100 overflow-auto border-2 border-border rounded-surface relative bg-muted"
          >
            <div className="p-4">
              <div className="text-center text-muted-content mb-4">
                <Typography.P variant="secondary">
                  Start scrolling down inside this box...
                </Typography.P>
              </div>

              <ScrollPlaceHolder height={200} />
              <ScrollPlaceHolder height={200} />

              <Affix target={scrollContainer} position="bottom" offset={10}>
                <div className="bg-warning text-warning-content p-3 rounded-control shadow-elevated text-center font-medium border border-warning/50">
                  <Typography.P>I am stuck to the bottom of the custom container!</Typography.P>
                </div>
              </Affix>

              <ScrollPlaceHolder height={300} />
              <ScrollPlaceHolder height={200} />
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. Accessibility & Styles */}
        {/* ============================================================ */}
        <section>
          <Typography.H5>4. Accessibility & Custom Styles</Typography.H5>
          <Typography.P variant="secondary" className="mb-4">
            This example passes a custom <Typography.Code>className</Typography.Code> and{' '}
            <Typography.Code>style</Typography.Code>. It also uses standard{' '}
            <Typography.Code>aria-label</Typography.Code> for screen readers.
          </Typography.P>

          <div className="p-4 border border-border rounded-surface bg-surface shadow-surface">
            <Affix
              offset={80}
              className="bg-linear-to-r from-brand to-info"
              style={{ borderRadius: '9999px' }}
              role="region"
              aria-label="Special Offer Banner"
            >
              <div className="p-4 text-brand-content text-center font-bold shadow-elevated">
                <Typography.P>Custom Styled Banner (Rounded via style prop!)</Typography.P>
              </div>
            </Affix>
            <ScrollPlaceHolder height={300} />
          </div>
        </section>
      </main>
    </div>
  );
}
