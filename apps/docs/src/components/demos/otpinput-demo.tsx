'use client';

import { useState } from 'react';
import { OTPInput, Typography, Divider, Button } from 'vayu-ui';

export default function OTPInputDemo() {
  const [value, setValue] = useState('');

  return (
    <div className="w-full max-w-md not-prose space-y-8">
      {/* Default usage */}
      <div className="space-y-3">
        <Typography.H5 id="otpinput-demo-label">OTP Input Example</Typography.H5>

        <Typography.P variant="secondary">Default (6-digit)</Typography.P>

        <OTPInput.Root
          value={value}
          onChange={setValue}
          maxLength={6}
          onComplete={(code) => console.log('Complete:', code)}
        >
          <OTPInput.Group>
            <OTPInput.Slot index={0} />
            <OTPInput.Slot index={1} />
            <OTPInput.Slot index={2} />
            <OTPInput.Slot index={3} />
            <OTPInput.Slot index={4} />
            <OTPInput.Slot index={5} />
          </OTPInput.Group>
        </OTPInput.Root>

        <Typography.P variant="tertiary">Value: {value || '—'}</Typography.P>

        <Button variant="ghost" size="small" onClick={() => setValue('')} disabled={!value}>
          Reset
        </Button>
      </div>

      <Divider />

      {/* Grouped with Separator */}
      <div className="space-y-3">
        <Typography.P variant="secondary">Grouped with Separator</Typography.P>

        <OTPInput.Root maxLength={6}>
          <OTPInput.Group>
            <OTPInput.Slot index={0} />
            <OTPInput.Slot index={1} />
            <OTPInput.Slot index={2} />
          </OTPInput.Group>
          <OTPInput.Separator />
          <OTPInput.Group>
            <OTPInput.Slot index={3} />
            <OTPInput.Slot index={4} />
            <OTPInput.Slot index={5} />
          </OTPInput.Group>
        </OTPInput.Root>
      </div>

      <Divider />

      {/* With Error */}
      <div className="space-y-3">
        <Typography.P variant="secondary">With Error State</Typography.P>

        <OTPInput.Root maxLength={6} hasError>
          <OTPInput.Group>
            <OTPInput.Slot index={0} />
            <OTPInput.Slot index={1} />
            <OTPInput.Slot index={2} />
            <OTPInput.Slot index={3} />
            <OTPInput.Slot index={4} />
            <OTPInput.Slot index={5} />
          </OTPInput.Group>
        </OTPInput.Root>

        <Typography.P variant="error">Invalid code. Please try again.</Typography.P>
      </div>

      <Divider />

      {/* Disabled state */}
      <div className="space-y-3">
        <Typography.P variant="secondary">Disabled</Typography.P>

        <OTPInput.Root maxLength={6} disabled>
          <OTPInput.Group>
            <OTPInput.Slot index={0} />
            <OTPInput.Slot index={1} />
            <OTPInput.Slot index={2} />
            <OTPInput.Slot index={3} />
            <OTPInput.Slot index={4} />
            <OTPInput.Slot index={5} />
          </OTPInput.Group>
        </OTPInput.Root>
      </div>
    </div>
  );
}
