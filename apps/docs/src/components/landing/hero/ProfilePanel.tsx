'use client';

import { useState } from 'react';
import { User } from 'lucide-react';
import {
  Avatar,
  AvatarGroup,
  Badge,
  Card,
  Divider,
  Switch,
  TextArea,
} from 'vayu-ui';
import { teamUsers } from './constants';

export function ProfilePanel() {
  const [note, setNote] = useState('');
  const [emailNotifs, setEmailNotifs] = useState(true);

  return (
    <div className="hero-collage-panel hero-collage-panel-soft h-full flex flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-brand" />
          <span className="font-tertiary text-xs text-muted-content">Profile</span>
        </div>
        <Badge variant="success" size="sm">
          Active
        </Badge>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        <Card className="bg-canvas border border-border shadow-surface">
          <Card.Header>
            <div className="flex items-center gap-3">
              <Avatar size="large" username="Rugved Patel" status="online">
                <Avatar.Image
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&auto=format&fit=crop&q=60"
                  alt=""
                />
                <Avatar.Status status="online" />
              </Avatar>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-surface-content">Rugved Patel</p>
                  <Badge variant="brand" size="sm">
                    Admin
                  </Badge>
                </div>
                <p className="text-xs text-muted-content">Lead Engineer</p>
              </div>
            </div>
          </Card.Header>
          <Card.Content className="pt-0">
            <TextArea maxLength={120}>
              <TextArea.Label className="sr-only">Notes</TextArea.Label>
              <TextArea.Input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a quick note..."
                className="text-xs min-h-[48px]"
              />
              <TextArea.CharCount />
            </TextArea>
          </Card.Content>
        </Card>

        <Divider spacing="sm">
          <Divider.Line variant="dashed" />
          <Divider.Label>Team</Divider.Label>
          <Divider.Line variant="dashed" />
        </Divider>

        <AvatarGroup users={teamUsers} maxDisplay={4} />

        <Switch
          label="Email notifications"
          description="Get updates about team activity"
          checked={emailNotifs}
          onCheckedChange={setEmailNotifs}
        />
      </div>
    </div>
  );
}
