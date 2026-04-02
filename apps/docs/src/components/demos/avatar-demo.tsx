'use client';
import { useState } from 'react';
import { Avatar } from 'vayu-ui';
import { Typography } from 'vayu-ui';
import { Divider } from 'vayu-ui';
import { Button } from 'vayu-ui';

export default function AvatarDemo() {
  const [clickedAvatar, setClickedAvatar] = useState<string | null>(null);

  return (
    <div className="w-full max-w-2xl not-prose space-y-8">
      <Typography.H2 variant="primary">Avatar Examples</Typography.H2>
      <Typography.P variant="secondary">
        Avatars display user profile images, initials, or fallback placeholders with optional status
        indicators.
      </Typography.P>

      {/* 1. Sizes */}
      <div className="flex flex-col gap-4">
        <Typography.H4 variant="primary">Sizes</Typography.H4>
        <div className="flex items-end gap-6 flex-wrap">
          <div className="flex flex-col items-center gap-2">
            <Avatar size="small" username="Small User">
              <Avatar.Initials username="Small User" />
            </Avatar>
            <Typography.P variant="secondary" className="text-xs!">
              Small
            </Typography.P>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size="medium" username="Medium User">
              <Avatar.Initials username="Medium User" />
            </Avatar>
            <Typography.P variant="secondary" className="text-xs!">
              Medium
            </Typography.P>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size="large" username="Large User">
              <Avatar.Initials username="Large User" />
            </Avatar>
            <Typography.P variant="secondary" className="text-xs!">
              Large
            </Typography.P>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size="xlarge" username="XL User">
              <Avatar.Initials username="XL User" />
            </Avatar>
            <Typography.P variant="secondary" className="text-xs!">
              Extra Large
            </Typography.P>
          </div>
        </div>
      </div>

      <Divider spacing="lg" decorative />

      {/* 2. Variants (Image, Initials, Fallback) */}
      <div className="flex flex-col gap-4">
        <Typography.H4 variant="primary">Variants</Typography.H4>
        <div className="flex flex-wrap gap-8">
          {/* Image Avatar */}
          <div className="flex flex-col items-center gap-2">
            <Avatar size="large" username="John Doe">
              <Avatar.Image
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60"
                alt=""
              />
            </Avatar>
            <Typography.P variant="secondary" className="text-xs! font-medium!">
              Image
            </Typography.P>
          </div>

          {/* Initials Avatar */}
          <div className="flex flex-col items-center gap-2">
            <Avatar size="large" username="Rugved Patel">
              <Avatar.Initials username="Rugved Patel" />
            </Avatar>
            <Typography.P variant="secondary" className="text-xs! font-medium!">
              Initials
            </Typography.P>
          </div>

          {/* Fallback Avatar (Broken Image Source) */}
          <div className="flex flex-col items-center gap-2">
            <Avatar size="large" username="Fallback User">
              <Avatar.Image src="https://broken-image-link.com/image.jpg" alt="" />
              <Avatar.Fallback />
            </Avatar>
            <Typography.P variant="secondary" className="text-xs! font-medium!">
              Fallback
            </Typography.P>
          </div>
        </div>
      </div>

      <Divider spacing="lg" decorative />

      {/* 3. Status States */}
      <div className="flex flex-col gap-4">
        <Typography.H4 variant="primary">Status States</Typography.H4>
        <div className="flex flex-wrap gap-8">
          <div className="flex flex-col items-center gap-2">
            <Avatar size="large" username="Online" status="online">
              <Avatar.Initials username="Online" />
              <Avatar.Status status="online" />
            </Avatar>
            <Typography.P variant="secondary" className="text-xs!">
              Online
            </Typography.P>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size="large" username="Away" status="away">
              <Avatar.Initials username="Away" />
              <Avatar.Status status="away" />
            </Avatar>
            <Typography.P variant="secondary" className="text-xs!">
              Away
            </Typography.P>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size="large" username="Busy" status="busy">
              <Avatar.Initials username="Busy" />
              <Avatar.Status status="busy" />
            </Avatar>
            <Typography.P variant="secondary" className="text-xs!">
              Busy
            </Typography.P>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size="large" username="Offline" status="offline">
              <Avatar.Initials username="Offline" />
              <Avatar.Status status="offline" />
            </Avatar>
            <Typography.P variant="secondary" className="text-xs!">
              Offline
            </Typography.P>
          </div>
        </div>
      </div>

      <Divider spacing="lg" decorative />

      {/* 4. Interactive */}
      <div className="flex flex-col gap-4">
        <Typography.H4 variant="primary">Interactive</Typography.H4>
        <Typography.P variant="tertiary" className="text-xs!">
          Click or focus these avatars to see WCAG-compliant interactions.
        </Typography.P>
        <div className="flex flex-wrap gap-8 items-center">
          <div className="flex flex-col items-center gap-2">
            <Avatar size="large" username="Click Me" onClick={() => setClickedAvatar('Click Me')}>
              <Avatar.Initials username="Click Me" />
            </Avatar>
            <Typography.P variant="secondary" className="text-xs!">
              Button
            </Typography.P>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Avatar
              size="large"
              username="Profile"
              onClick={() => setClickedAvatar('Profile')}
              status="online"
            >
              <Avatar.Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60"
                alt=""
              />
              <Avatar.Status status="online" />
            </Avatar>
            <Typography.P variant="secondary" className="text-xs!">
              With Status
            </Typography.P>
          </div>
        </div>
      </div>

      <Divider spacing="lg" decorative />

      {/* 5. With Button Component */}
      <div className="flex flex-col gap-4">
        <Typography.H4 variant="primary">With Button Component</Typography.H4>
        <Typography.P variant="tertiary" className="text-xs!">
          Avatars can be used inside buttons for profile actions.
        </Typography.P>
        <div className="flex flex-wrap gap-4 items-center">
          <Button
            variant="secondary"
            size="medium"
            onClick={() => setClickedAvatar('Button Avatar')}
          >
            <Avatar size="small" username="John Doe">
              <Avatar.Image
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60"
                alt=""
              />
            </Avatar>
            <Button.Text>John Doe</Button.Text>
          </Button>

          <Button variant="outline" size="medium" onClick={() => setClickedAvatar('Team')}>
            <Avatar size="small" username="Team">
              <Avatar.Initials username="Team" />
            </Avatar>
            <Button.Text>Team Chat</Button.Text>
          </Button>

          <Button variant="ghost" size="medium" onClick={() => setClickedAvatar('Account')}>
            <Avatar size="small" username="Account">
              <Avatar.Initials username="Account" />
            </Avatar>
            <Button.Text>Account</Button.Text>
          </Button>
        </div>
      </div>

      {/* Click feedback */}
      {clickedAvatar && (
        <div className="mt-4 p-3 bg-muted rounded-surface">
          <Typography.P variant="secondary" className="text-sm!">
            Clicked: <Typography.Code variant="primary">{clickedAvatar}</Typography.Code>
          </Typography.P>
        </div>
      )}
    </div>
  );
}
