'use client';

import { Card, Typography, Button, Divider } from 'vayu-ui';

export default function CardDemo() {
  return (
    <div className="not-prose flex flex-col gap-10 w-full max-w-lg">
      {/* Default Card */}
      <div>
        <Typography.H2 id="card-demo-label" variant="primary" className="mb-4">
          Card Example
        </Typography.H2>
        <Card>
          <Card.Media
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80"
            alt="Abstract gradient art"
          />
          <Card.Header
            title="Design Tokens"
            subtitle="A unified color palette for every surface."
          />
          <Card.Content>
            <Typography.P variant="secondary">
              Ground, primary, secondary, and semantic colors work seamlessly across light and dark
              mode.
            </Typography.P>
          </Card.Content>
          <Card.Footer>
            <Button variant="ghost" size="small">
              Read more →
            </Button>
          </Card.Footer>
        </Card>
      </div>

      <Divider spacing="lg" />

      {/* Interactive Card */}
      <div>
        <Typography.H6 variant="secondary" className="mb-3">
          Interactive
        </Typography.H6>
        <Card interactive onClick={() => alert('Clicked!')}>
          <Card.Header
            title="Click Me"
            subtitle="This card is focusable and keyboard-accessible."
          />
          <Card.Content>
            <Typography.P variant="secondary">
              Interactive cards get <Typography.Code>role=&quot;button&quot;</Typography.Code>,{' '}
              <Typography.Code>tabIndex=0</Typography.Code>, and Enter / Space key support.
            </Typography.P>
          </Card.Content>
        </Card>
      </div>

      <Divider spacing="lg" />

      {/* Linked Card */}
      <div>
        <Typography.H6 variant="secondary" className="mb-3">
          Linked
        </Typography.H6>
        <Card href="https://github.com" target="_blank">
          <Card.Header
            title="GitHub"
            subtitle='Opens in a new tab with rel="noopener noreferrer".'
          />
        </Card>
      </div>

      <Divider spacing="lg" />

      {/* Disabled Card */}
      <div>
        <Typography.H6 variant="secondary" className="mb-3">
          Disabled
        </Typography.H6>
        <Card disabled interactive>
          <Card.Header
            title="Disabled Card"
            subtitle="Pointer events are blocked and opacity is reduced."
          />
          <Card.Content>
            <Typography.P variant="secondary">This card cannot be interacted with.</Typography.P>
          </Card.Content>
        </Card>
      </div>

      <Divider spacing="lg" />

      {/* Card with Avatar */}
      <div>
        <Typography.H6 variant="secondary" className="mb-3">
          With Avatar &amp; Action
        </Typography.H6>
        <Card>
          <Card.Header
            avatar={
              <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-brand-content font-semibold">
                JD
              </div>
            }
            title="John Doe"
            subtitle="Software Engineer"
            action={
              <Button variant="ghost" size="small">
                Follow
              </Button>
            }
          />
          <Card.Content>
            <Typography.P variant="secondary">
              Building beautiful user interfaces with modern web technologies.
            </Typography.P>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
