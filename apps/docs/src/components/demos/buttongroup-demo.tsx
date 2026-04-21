'use client';

import { Button, ButtonGroup, Divider, Typography } from 'vayu-ui';

export default function ButtonGroupDemo() {
  return (
    <div className="w-full flex flex-col items-center gap-2 not-prose">
      <Typography.H5>Button Group Example</Typography.H5>
      {/* ── Horizontal Outline ── */}
      <div className="flex flex-col gap-2">
        <Typography.H5>
          Horizontal (Outline)
        </Typography.H5>
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
      </div>

      <Divider />

      {/* ── Primary Variant ── */}
      <div className="flex flex-col gap-2">
        <Typography.H5>
          Primary
        </Typography.H5>
        <ButtonGroup aria-label="Save options">
          <Button variant="primary">
            <Button.Text>Save</Button.Text>
          </Button>
          <Button variant="primary">
            <Button.Text>Save &amp; Close</Button.Text>
          </Button>
        </ButtonGroup>
      </div>

      <Divider />

      {/* ── Vertical ── */}
      <div className="flex flex-col gap-2">
        <Typography.H5>
          Vertical
        </Typography.H5>
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
      </div>

      <Divider />

      {/* ── Full Width ── */}
      <div className="flex flex-col gap-2">
        <Typography.H5>
          Full Width
        </Typography.H5>
        <ButtonGroup fullWidth aria-label="Confirmation actions">
          <Button variant="secondary">
            <Button.Text>Cancel</Button.Text>
          </Button>
          <Button variant="primary">
            <Button.Text>Confirm</Button.Text>
          </Button>
        </ButtonGroup>
      </div>

      <Divider />

      {/* ── Mixed Variants ── */}
      <div className="flex flex-col gap-2">
        <Typography.H5>
          Mixed Variants
        </Typography.H5>
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
      </div>

      <Divider />

      {/* ── With Icons ── */}
      <div className="flex flex-col gap-2">
        <Typography.H5>
          With Icons
        </Typography.H5>
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
      </div>

      <Divider />

      {/* ── Radius Variants ── */}
      <div className="flex flex-col gap-2">
        <Typography.H5>
          Radius Variants
        </Typography.H5>
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
      </div>
    </div>
  );
}
