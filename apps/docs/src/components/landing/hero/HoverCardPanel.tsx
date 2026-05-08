'use client';

import { Check, MessageSquare } from 'lucide-react';
import {
  Alert,
  Avatar,
  Badge,
  Divider,
  HoverCard,
  Tooltip,
} from 'vayu-ui';

export function HoverCardPanel() {
  return (
    <div className="hero-collage-panel hero-collage-panel-soft h-full flex flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-brand" />
          <span className="font-tertiary text-xs text-muted-content">HoverCard</span>
        </div>
        <Badge variant="info" size="sm">
          Tooltip
        </Badge>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <HoverCard
          side="bottom"
          content={
            <div className="w-56 space-y-2">
              <div className="flex items-center gap-3">
                <Avatar size="small" username="Vayu UI">
                  <Avatar.Initials username="Vayu UI" />
                </Avatar>
                <div>
                  <p className="font-semibold text-sm text-surface-content">Vayu UI</p>
                  <p className="text-xs text-muted-content">@vayuui</p>
                </div>
              </div>
              <p className="text-xs text-muted-content">
                A modern React component library with WCAG 2.2 AA compliance and compound patterns.
              </p>
            </div>
          }
        >
          <button className="text-sm font-medium text-brand underline underline-offset-2 hover:text-brand/80 transition-colors">
            @vayuui
          </button>
        </HoverCard>

        <Divider spacing="sm">
          <Divider.Line variant="dashed" />
          <Divider.Label>Try hovering</Divider.Label>
          <Divider.Line variant="dashed" />
        </Divider>

        <div className="flex flex-wrap gap-2">
          <Tooltip content="HoverCard appears on hover" position="top">
            <Badge variant="muted" size="md" className="cursor-pointer">
              Hover for info
            </Badge>
          </Tooltip>
          <Tooltip content="Tooltips are lightweight popups" position="right">
            <Badge variant="brand" size="md" className="cursor-pointer">
              Another tip
            </Badge>
          </Tooltip>
        </div>

        <Divider spacing="sm">
          <Divider.Line variant="dashed" />
          <Divider.Label>Details</Divider.Label>
          <Divider.Line variant="dashed" />
        </Divider>

        <Alert variant="success">
          <Alert.Icon variant="success">
            <Check className="w-4 h-4" />
          </Alert.Icon>
          <Alert.Content>
            <Alert.Title>Accessible by default</Alert.Title>
            <Alert.Description>All overlays support keyboard navigation and screen readers.</Alert.Description>
          </Alert.Content>
        </Alert>
      </div>
    </div>
  );
}
