'use client';

import React, { useState } from 'react';
import { AvatarGroup, Typography, Divider, Button } from 'vayu-ui';

export default function AvatarGroupDemo() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showHiddenUsers, setShowHiddenUsers] = useState(false);

  const users = [
    {
      id: 1,
      username: 'John Doe',
      src: 'https://github.com/shadcn.png',
      alt: 'John Doe',
      status: 'online' as const,
    },
    {
      id: 2,
      username: 'Jane Smith',
      fallback: 'JS',
      status: 'offline' as const,
    },
    {
      id: 3,
      username: 'Bob Wilson',
      src: 'https://github.com/vercel.png',
      alt: 'Bob Wilson',
      status: 'online' as const,
    },
    {
      id: 4,
      username: 'Alice Johnson',
      fallback: 'AJ',
      status: 'away' as const,
    },
    {
      id: 5,
      username: 'Charlie Brown',
      src: 'https://github.com/octocat.png',
      status: 'busy' as const,
    },
    {
      id: 6,
      username: 'David Lee',
      fallback: 'DL',
      status: 'offline' as const,
    },
  ];

  const handleAvatarClick = (
    user: { username?: string; id?: number | string | null },
    index: number,
  ) => {
    setSelectedUser(user.username || `User ${index + 1}`);
  };

  const handleOverflowClick = (hiddenUsers: any[]) => {
    setShowHiddenUsers(!showHiddenUsers);
    console.log('Hidden users:', hiddenUsers);
  };

  return (
    <div className="flex flex-col not-prose gap-10 w-full max-w-2xl bg-surface p-6 rounded-surface border border-border shadow-surface">
      {/* ── Basic Stack ── */}
      <div className="flex flex-col gap-3">
        <Typography.H6 variant="secondary" className="text-xs">
          Basic Stack
        </Typography.H6>
        <AvatarGroup users={users} maxDisplay={4} />
      </div>

      <Divider spacing="lg" decorative />

      {/* ── Grid Layout ── */}
      <div className="flex flex-col gap-3">
        <Typography.H6 variant="secondary" className="text-xs">
          Grid Layout (All Visible)
        </Typography.H6>
        <div className="max-w-50">
          <AvatarGroup users={users} layout="grid" maxDisplay={10} />
        </div>
      </div>

      <Divider spacing="lg" decorative />

      {/* ── Sizing ── */}
      <div className="flex flex-col gap-3">
        <Typography.H6 variant="secondary" className="text-xs">
          Sizes
        </Typography.H6>
        <div className="flex flex-col gap-4">
          <AvatarGroup users={users.slice(0, 3)} size="small" spacing="tight" />
          <AvatarGroup users={users.slice(0, 3)} size="medium" />
          <AvatarGroup users={users.slice(0, 3)} size="large" spacing="loose" />
          <AvatarGroup users={users.slice(0, 3)} size="xlarge" />
        </div>
      </div>

      <Divider spacing="lg" decorative />

      {/* ── Interactive Demo ── */}
      <div className="flex flex-col gap-3">
        <Typography.H6 variant="secondary" className="text-xs">
          Interactive (Click avatars to select)
        </Typography.H6>
        <div>
          <AvatarGroup
            users={users}
            maxDisplay={5}
            onAvatarClick={handleAvatarClick}
            onOverflowClick={handleOverflowClick}
          />
          {selectedUser && (
            <div className="mt-3 flex items-center gap-3">
              <Typography.P variant="info" className="text-sm">
                Selected: {selectedUser}
              </Typography.P>
              <Button variant="ghost" size="small" onClick={() => setSelectedUser(null)}>
                Clear
              </Button>
            </div>
          )}
          {showHiddenUsers && (
            <Typography.P variant="secondary" className="mt-2 text-sm">
              Hidden users menu would appear here
            </Typography.P>
          )}
        </div>
      </div>

      <Divider spacing="lg" decorative />

      {/* ── With Overflow ── */}
      <div className="flex flex-col gap-3">
        <Typography.H6 variant="secondary" className="text-xs">
          With Overflow
        </Typography.H6>
        <AvatarGroup
          users={users}
          maxDisplay={3}
          onOverflowClick={(hiddenUsers) => console.log('Hidden users:', hiddenUsers)}
        />
      </div>

      <Divider spacing="lg" decorative />

      {/* ── Status Indicators ── */}
      <div className="flex flex-col gap-3">
        <Typography.H6 variant="secondary" className="text-xs">
          Status Indicators
        </Typography.H6>
        <AvatarGroup users={users.slice(0, 4)} maxDisplay={4} />
      </div>
    </div>
  );
}
