'use client';

import { Button, Divider, Status, Typography } from 'vayu-ui';
import { Mail, Trash2, Send, Bell } from 'lucide-react';
import React, { useState } from 'react';

export default function ButtonDemo() {
  const [loading, setLoading] = useState(Status.IDLE);

  const handleLoadingClick = () => {
    setLoading(Status.PENDING);
    setTimeout(() => setLoading(Status.SUCCESS), 2000);
    setTimeout(() => setLoading(Status.IDLE), 4000);
  };

  return (
    <div className="w-full max-w-md not-prose">
      <div className="space-y-8">
        <Typography.H5>Button Examples</Typography.H5>

        {/* Section 1: Variants */}
        <section className="space-y-2">
          <Typography.H5>Variants</Typography.H5>
          <Typography.P variant="secondary" className="text-sm">
            Available button style variants for different use cases.
          </Typography.P>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </section>

        <Divider spacing="lg">
          <Divider.Line color="default" />
        </Divider>

        {/* Section 2: Sizes */}
        <section className="space-y-2">
          <Typography.H5>Sizes</Typography.H5>
          <Typography.P variant="secondary" className="text-sm">
            Three sizes: small, medium (default), and large.
          </Typography.P>
          <div className="flex flex-wrap gap-4 items-center">
            <Button size="small" variant="secondary">
              Small
            </Button>
            <Button size="medium" variant="secondary">
              Medium
            </Button>
            <Button size="large" variant="secondary">
              Large
            </Button>
          </div>
        </section>

        <Divider spacing="lg">
          <Divider.Line color="default" />
        </Divider>

        {/* Section 3: With Icon */}
        <section className="space-y-2">
          <Typography.H5>With Icons</Typography.H5>
          <Typography.P variant="secondary" className="text-sm">
            Buttons with leading or trailing icons using compound subcomponents.
          </Typography.P>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary">
              <Button.Icon>
                <Mail />
              </Button.Icon>
              <Button.Text>Email Login</Button.Text>
            </Button>
            <Button variant="destructive" size="small">
              <Button.Icon size="small">
                <Trash2 />
              </Button.Icon>
              <Button.Text>Delete</Button.Text>
            </Button>
            <Button variant="outline" size="large">
              <Button.Text>Send</Button.Text>
              <Button.Icon size="large">
                <Send />
              </Button.Icon>
            </Button>
          </div>
        </section>

        <Divider spacing="lg">
          <Divider.Line color="default" />
        </Divider>

        {/* Section 4: Loading State */}
        <section className="space-y-2">
          <Typography.H5>Loading State</Typography.H5>
          <Typography.P variant="secondary" className="text-sm">
            Click the button to see the loading, success, and idle states cycle.
          </Typography.P>
          <div className="flex flex-wrap gap-4 items-center">
            <Button
              variant="primary"
              loading={loading}
              onClick={handleLoadingClick}
              loadingText="Sending..."
            >
              Click to Load
            </Button>
          </div>
        </section>

        <Divider spacing="lg">
          <Divider.Line color="default" />
        </Divider>

        {/* Section 5: With Badge */}
        <section className="space-y-2">
          <Typography.H5>With Badges</Typography.H5>
          <Typography.P variant="secondary" className="text-sm">
            Buttons with badge indicators for notifications and counts.
          </Typography.P>
          <div className="flex flex-wrap gap-8 items-center">
            <Button variant="secondary">
              <Button.Icon>
                <Bell />
              </Button.Icon>
              <Button.Badge value={3} variant="danger" />
            </Button>

            <Button variant="outline">
              <Button.Text>Messages</Button.Text>
              <Button.Badge value={12} max={9} variant="primary" position="top-right" />
            </Button>

            <Button variant="ghost">
              <Button.Text>Updates</Button.Text>
              <Button.Badge value="New" variant="info" position="inline-right" />
            </Button>
          </div>
        </section>

        <Divider spacing="lg">
          <Divider.Line color="default" />
        </Divider>

        {/* Section 6: Disabled State */}
        <section className="space-y-2">
          <Typography.H5>Disabled</Typography.H5>
          <Typography.P variant="secondary" className="text-sm">
            Disabled buttons are non-interactive with reduced opacity.
          </Typography.P>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary" disabled>
              Disabled
            </Button>
            <Button variant="secondary" disabled>
              Disabled
            </Button>
            <Button variant="outline" disabled>
              Disabled
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
