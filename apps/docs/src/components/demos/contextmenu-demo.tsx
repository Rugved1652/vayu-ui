'use client';

import { useState } from 'react';
import { ContextMenu, Typography } from 'vayu-ui';
import {
  Copy,
  Scissors,
  ClipboardPaste,
  Trash2,
  RotateCcw,
  Share,
  FileText,
  Image,
  Video,
  Music,
  ChevronRight,
  Download,
  Mail,
} from 'lucide-react';

export default function ContextMenuDemo() {
  const [showBookmarks, setShowBookmarks] = useState(true);
  const [showUrls, setShowUrls] = useState(false);
  const [person, setPerson] = useState('andy');

  return (
    <div className="not-prose flex flex-col gap-4 w-full max-w-md mx-auto">
      <div className="space-y-2">
        <Typography.P variant="secondary">
          Right-click the area below to open the context menu.
        </Typography.P>
        <Typography.P variant="secondary" className="text-xs">
          <span className="font-medium">Keyboard shortcuts:</span> ↑/↓ navigate, → open submenu, ← close submenu, type to search, Home/End to jump
        </Typography.P>
      </div>

      <ContextMenu>
        <ContextMenu.Trigger>
          <div className="flex items-center justify-center h-40 rounded-lg border-2 border-dashed border-ground-300 dark:border-ground-700 bg-ground-50 dark:bg-ground-900 select-none">
            <span className="text-sm font-secondary text-ground-500 dark:text-ground-400">
              Right-click here
            </span>
          </div>
        </ContextMenu.Trigger>

        <ContextMenu.Content>
          <ContextMenu.Item
            icon={<RotateCcw className="w-4 h-4" />}
            shortcut="⌘Z"
            onSelect={() => console.log('Undo')}
          >
            Undo
          </ContextMenu.Item>
          <ContextMenu.Item
            icon={<RotateCcw className="w-4 h-4 -scale-x-100" />}
            shortcut="⌘⇧Z"
            onSelect={() => console.log('Redo')}
          >
            Redo
          </ContextMenu.Item>

          <ContextMenu.Separator />

          <ContextMenu.Item
            icon={<Scissors className="w-4 h-4" />}
            shortcut="⌘X"
            onSelect={() => console.log('Cut')}
          >
            Cut
          </ContextMenu.Item>
          <ContextMenu.Item
            icon={<Copy className="w-4 h-4" />}
            shortcut="⌘C"
            onSelect={() => console.log('Copy')}
          >
            Copy
          </ContextMenu.Item>
          <ContextMenu.Item
            icon={<ClipboardPaste className="w-4 h-4" />}
            shortcut="⌘V"
            onSelect={() => console.log('Paste')}
          >
            Paste
          </ContextMenu.Item>

          <ContextMenu.Separator />

          {/* Submenu Example */}
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger icon={<FileText className="w-4 h-4" />}>
              New File
            </ContextMenu.SubTrigger>
            <ContextMenu.SubContent>
              <ContextMenu.Item
                icon={<FileText className="w-4 h-4" />}
                onSelect={() => console.log('New Text Document')}
              >
                Text Document
              </ContextMenu.Item>
              <ContextMenu.Item
                icon={<Image className="w-4 h-4" />}
                onSelect={() => console.log('New Image')}
              >
                Image
              </ContextMenu.Item>
              <ContextMenu.Item
                icon={<Video className="w-4 h-4" />}
                onSelect={() => console.log('New Video')}
              >
                Video
              </ContextMenu.Item>
              <ContextMenu.Item
                icon={<Music className="w-4 h-4" />}
                onSelect={() => console.log('New Audio')}
              >
                Audio
              </ContextMenu.Item>
            </ContextMenu.SubContent>
          </ContextMenu.Sub>

          <ContextMenu.Sub>
            <ContextMenu.SubTrigger icon={<Download className="w-4 h-4" />}>
              Export As
            </ContextMenu.SubTrigger>
            <ContextMenu.SubContent>
              <ContextMenu.Item onSelect={() => console.log('Export PDF')}>
                PDF Document
              </ContextMenu.Item>
              <ContextMenu.Item onSelect={() => console.log('Export PNG')}>
                PNG Image
              </ContextMenu.Item>
              <ContextMenu.Item onSelect={() => console.log('Export SVG')}>
                SVG Vector
              </ContextMenu.Item>
              <ContextMenu.Item onSelect={() => console.log('Export JSON')}>
                JSON Data
              </ContextMenu.Item>
            </ContextMenu.SubContent>
          </ContextMenu.Sub>

          <ContextMenu.Separator />

          <ContextMenu.Label>View Options</ContextMenu.Label>
          <ContextMenu.CheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
            Show Bookmarks Bar
          </ContextMenu.CheckboxItem>
          <ContextMenu.CheckboxItem checked={showUrls} onCheckedChange={setShowUrls}>
            Show Full URLs
          </ContextMenu.CheckboxItem>

          <ContextMenu.Separator />

          <ContextMenu.Label>Assignee</ContextMenu.Label>
          <ContextMenu.RadioGroup value={person} onValueChange={setPerson}>
            <ContextMenu.RadioItem value="andy">Andy</ContextMenu.RadioItem>
            <ContextMenu.RadioItem value="pedro">Pedro</ContextMenu.RadioItem>
            <ContextMenu.RadioItem value="colm">Colm</ContextMenu.RadioItem>
          </ContextMenu.RadioGroup>

          <ContextMenu.Separator />

          <ContextMenu.Item
            icon={<Mail className="w-4 h-4" />}
            onSelect={() => console.log('Send via Email')}
          >
            Send via Email
          </ContextMenu.Item>
          <ContextMenu.Item
            icon={<Share className="w-4 h-4" />}
            onSelect={() => console.log('Share')}
          >
            Share&hellip;
          </ContextMenu.Item>
          <ContextMenu.Item
            icon={<Trash2 className="w-4 h-4" />}
            destructive
            onSelect={() => console.log('Delete')}
          >
            Delete
          </ContextMenu.Item>
          <ContextMenu.Item disabled>Disabled Item</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu>

      {/* State Display */}
      <div className="p-4 bg-muted rounded-surface border border-border space-y-1">
        <Typography.P className="font-medium mb-2">Current State:</Typography.P>
        <Typography.P variant="secondary" className="text-xs">
          Show Bookmarks: <Typography.Code>{showBookmarks ? 'true' : 'false'}</Typography.Code>
        </Typography.P>
        <Typography.P variant="secondary" className="text-xs">
          Show URLs: <Typography.Code>{showUrls ? 'true' : 'false'}</Typography.Code>
        </Typography.P>
        <Typography.P variant="secondary" className="text-xs">
          Assignee: <Typography.Code>{person}</Typography.Code>
        </Typography.P>
      </div>
    </div>
  );
}
