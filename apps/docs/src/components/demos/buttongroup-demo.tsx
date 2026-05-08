'use client';

import { Button, ButtonGroup, Divider, Typography } from 'vayu-ui';

export default function ButtonGroupDemo() {
  return (
    <div className="w-full max-w-md not-prose">
      <div className="space-y-8">
        <Typography.H5>Button Group Examples</Typography.H5>

        {/* Section 1: Horizontal (Outline) */}
        <section className="space-y-2">
          <Typography.H5>Horizontal (Outline)</Typography.H5>
          <Typography.P variant="secondary" className="text-sm">
            Default horizontal layout with outline variant buttons.
          </Typography.P>
          <ButtonGroup aria-label="Text alignment options">
            <Button variant="outline">
              <Button.Text>Left</Button.Text>
            </Button>
            <Button variant="outline">
              <Button.Text>Center</Button.Text>
            </Button>
            <Button variant="outline">
              <Button.Text>Right</Button.Text>
            </Button>
          </ButtonGroup>
        </section>

        <Divider spacing="lg">
          <Divider.Line color="default" />
        </Divider>

        {/* Section 2: Primary */}
        <section className="space-y-2">
          <Typography.H5>Primary</Typography.H5>
          <Typography.P variant="secondary" className="text-sm">
            Grouped primary buttons for related actions.
          </Typography.P>
          <ButtonGroup aria-label="Save options">
            <Button variant="primary">
              <Button.Text>Save</Button.Text>
            </Button>
            <Button variant="primary">
              <Button.Text>Save &amp; Close</Button.Text>
            </Button>
          </ButtonGroup>
        </section>

        <Divider spacing="lg">
          <Divider.Line color="default" />
        </Divider>

        {/* Section 3: Vertical */}
        <section className="space-y-2">
          <Typography.H5>Vertical</Typography.H5>
          <Typography.P variant="secondary" className="text-sm">
            Stack buttons vertically using the orientation prop.
          </Typography.P>
          <ButtonGroup orientation="vertical" aria-label="Vertical actions" className="w-fit">
            <Button variant="outline">
              <Button.Text>Top</Button.Text>
            </Button>
            <Button variant="outline">
              <Button.Text>Middle</Button.Text>
            </Button>
            <Button variant="outline">
              <Button.Text>Bottom</Button.Text>
            </Button>
          </ButtonGroup>
        </section>

        <Divider spacing="lg">
          <Divider.Line color="default" />
        </Divider>

        {/* Section 4: Full Width */}
        <section className="space-y-2">
          <Typography.H5>Full Width</Typography.H5>
          <Typography.P variant="secondary" className="text-sm">
            Buttons stretch to fill the full container width.
          </Typography.P>
          <ButtonGroup fullWidth aria-label="Confirmation actions">
            <Button variant="secondary">
              <Button.Text>Cancel</Button.Text>
            </Button>
            <Button variant="primary">
              <Button.Text>Confirm</Button.Text>
            </Button>
          </ButtonGroup>
        </section>

        <Divider spacing="lg">
          <Divider.Line color="default" />
        </Divider>

        {/* Section 5: Mixed Variants */}
        <section className="space-y-2">
          <Typography.H5>Mixed Variants</Typography.H5>
          <Typography.P variant="secondary" className="text-sm">
            Combine different button variants in a single group.
          </Typography.P>
          <ButtonGroup aria-label="Mixed action buttons">
            <Button variant="outline">
              <Button.Text>Back</Button.Text>
            </Button>
            <Button variant="secondary">
              <Button.Text>Save Draft</Button.Text>
            </Button>
            <Button variant="primary">
              <Button.Text>Submit</Button.Text>
            </Button>
          </ButtonGroup>
        </section>

        <Divider spacing="lg">
          <Divider.Line color="default" />
        </Divider>

        {/* Section 6: With Icons */}
        <section className="space-y-2">
          <Typography.H5>With Icons</Typography.H5>
          <Typography.P variant="secondary" className="text-sm">
            Icon-only buttons grouped together as a toolbar.
          </Typography.P>
          <ButtonGroup aria-label="Formatting options">
            <Button variant="outline">
              <Button.Icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
                  <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
                </svg>
              </Button.Icon>
            </Button>
            <Button variant="outline">
              <Button.Icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="19" x2="10" y1="4" y2="4" />
                  <line x1="14" x2="15" y1="20" y2="4" />
                  <line x1="5" x2="19" y1="20" y2="20" />
                </svg>
              </Button.Icon>
            </Button>
            <Button variant="outline">
              <Button.Icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-8" />
                  <path d="M14 12H6" />
                  <path d="M10 8l-4 4 4 4" />
                </svg>
              </Button.Icon>
            </Button>
          </ButtonGroup>
        </section>

        <Divider spacing="lg">
          <Divider.Line color="default" />
        </Divider>

        {/* Section 7: Radius Variants */}
        <section className="space-y-2">
          <Typography.H5>Radius Variants</Typography.H5>
          <Typography.P variant="secondary" className="text-sm">
            Control the border radius using design token scales.
          </Typography.P>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Typography.P variant="tertiary" className="text-xs w-20">
                Control
              </Typography.P>
              <ButtonGroup radius="control" aria-label="Control radius">
                <Button variant="outline">
                  <Button.Text>A</Button.Text>
                </Button>
                <Button variant="outline">
                  <Button.Text>B</Button.Text>
                </Button>
              </ButtonGroup>
            </div>
            <div className="flex items-center gap-3">
              <Typography.P variant="tertiary" className="text-xs w-20">
                Surface
              </Typography.P>
              <ButtonGroup radius="surface" aria-label="Surface radius">
                <Button variant="outline">
                  <Button.Text>A</Button.Text>
                </Button>
                <Button variant="outline">
                  <Button.Text>B</Button.Text>
                </Button>
              </ButtonGroup>
            </div>
            <div className="flex items-center gap-3">
              <Typography.P variant="tertiary" className="text-xs w-20">
                Overlay
              </Typography.P>
              <ButtonGroup radius="overlay" aria-label="Overlay radius">
                <Button variant="outline">
                  <Button.Text>A</Button.Text>
                </Button>
                <Button variant="outline">
                  <Button.Text>B</Button.Text>
                </Button>
              </ButtonGroup>
            </div>
            <div className="flex items-center gap-3">
              <Typography.P variant="tertiary" className="text-xs w-20">
                Full
              </Typography.P>
              <ButtonGroup radius="full" aria-label="Full radius">
                <Button variant="outline">
                  <Button.Text>A</Button.Text>
                </Button>
                <Button variant="outline">
                  <Button.Text>B</Button.Text>
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
