'use client';
import React, { useState } from 'react';
import { Menubar, Typography, Divider, Button } from 'vayu-ui';
import {
  File,
  FolderOpen,
  Save,
  Printer,
  Scissors,
  Copy,
  Clipboard,
  Undo,
  Redo,
  Share2,
  Trash2,
  Bold,
  Italic,
  Underline,
} from 'lucide-react';

export default function MenubarDemo() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [zoomLevel, setZoomLevel] = useState('100%');

  return (
    <div className="w-full max-w-4xl not-prose">
      <Typography.H4 id="menubar-demo-label" className="mb-4">
        Menubar Example
      </Typography.H4>

      <div className="flex justify-center items-start p-6 bg-surface dark:bg-surface rounded-surface border border-border dark:border-border">
        <Menubar>
          <Menubar.Menu trigger="File">
            <Menubar.Item icon={<File size={14} />} shortcut="⌘N">
              New Tab
            </Menubar.Item>
            <Menubar.Item icon={<FolderOpen size={14} />} shortcut="⌘O">
              Open File...
            </Menubar.Item>
            <Menubar.Item icon={<Save size={14} />} shortcut="⌘S" disabled>
              Save
            </Menubar.Item>
            <Menubar.Separator />
            <Menubar.SubMenu trigger="Share">
              <Menubar.Item icon={<Share2 size={14} />}>Email Link</Menubar.Item>
              <Menubar.Item>Messages</Menubar.Item>
              <Menubar.SubMenu trigger="Social Media">
                <Menubar.Item>Twitter</Menubar.Item>
                <Menubar.Item>Facebook</Menubar.Item>
                <Menubar.Item>LinkedIn</Menubar.Item>
              </Menubar.SubMenu>
              <Menubar.Item>Notes</Menubar.Item>
            </Menubar.SubMenu>
            <Menubar.Separator />
            <Menubar.Item icon={<Printer size={14} />} shortcut="⌘P">
              Print...
            </Menubar.Item>
          </Menubar.Menu>

          <Menubar.Menu trigger="Edit">
            <Menubar.Item icon={<Undo size={14} />} shortcut="⌘Z">
              Undo
            </Menubar.Item>
            <Menubar.Item icon={<Redo size={14} />} shortcut="⇧⌘Z">
              Redo
            </Menubar.Item>
            <Menubar.Separator />
            <Menubar.Item icon={<Scissors size={14} />} shortcut="⌘X">
              Cut
            </Menubar.Item>
            <Menubar.Item icon={<Copy size={14} />} shortcut="⌘C">
              Copy
            </Menubar.Item>
            <Menubar.Item icon={<Clipboard size={14} />} shortcut="⌘V">
              Paste
            </Menubar.Item>
            <Menubar.Separator />
            <Menubar.SubMenu trigger="Find">
              <Menubar.Item>Find...</Menubar.Item>
              <Menubar.Item>Find Next</Menubar.Item>
              <Menubar.Item>Find Previous</Menubar.Item>
              <Menubar.Item>Replace...</Menubar.Item>
            </Menubar.SubMenu>
          </Menubar.Menu>

          <Menubar.Menu trigger="View">
            <Menubar.CheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
              shortcut="⌘/"
            >
              Show Status Bar
            </Menubar.CheckboxItem>
            <Menubar.CheckboxItem
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
              disabled
            >
              Show Activity Bar
            </Menubar.CheckboxItem>
            <Menubar.CheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
              Show Panel
            </Menubar.CheckboxItem>
            <Menubar.Separator />
            <Menubar.Label>Zoom</Menubar.Label>
            <Menubar.RadioGroup value={zoomLevel} onValueChange={setZoomLevel}>
              <Menubar.RadioItem value="50%">50%</Menubar.RadioItem>
              <Menubar.RadioItem value="100%">100%</Menubar.RadioItem>
              <Menubar.RadioItem value="200%">200%</Menubar.RadioItem>
            </Menubar.RadioGroup>
          </Menubar.Menu>

          <Menubar.Menu trigger="Format">
            <Menubar.Item icon={<Bold size={14} />} shortcut="⌘B">
              Bold
            </Menubar.Item>
            <Menubar.Item icon={<Italic size={14} />} shortcut="⌘I">
              Italic
            </Menubar.Item>
            <Menubar.Item icon={<Underline size={14} />} shortcut="⌘U">
              Underline
            </Menubar.Item>
            <Menubar.Separator />
            <Menubar.Item danger icon={<Trash2 size={14} />}>
              Clear Formatting
            </Menubar.Item>
          </Menubar.Menu>

          <Menubar.Menu trigger="Help">
            <Menubar.Item>Documentation</Menubar.Item>
            <Menubar.Item>Feedback</Menubar.Item>
            <Menubar.Separator />
            <Menubar.Item>About Vayu UI</Menubar.Item>
          </Menubar.Menu>
        </Menubar>
      </div>

      <Divider spacing="lg" />

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="p-3 bg-muted/30 dark:bg-muted/30 rounded-surface">
          <Typography.Label className="font-medium mb-1">Status Bar</Typography.Label>
          <Typography.P variant={showStatusBar ? 'success' : 'error'} className="text-sm mt-1">
            {showStatusBar ? 'Visible' : 'Hidden'}
          </Typography.P>
        </div>
        <div className="p-3 bg-muted/30 dark:bg-muted/30 rounded-surface">
          <Typography.Label className="font-medium mb-1">Activity Bar</Typography.Label>
          <Typography.P variant="secondary" className="text-sm mt-1">
            {showActivityBar ? 'Visible' : 'Hidden'} (Disabled)
          </Typography.P>
        </div>
        <div className="p-3 bg-muted/30 dark:bg-muted/30 rounded-surface">
          <Typography.Label className="font-medium mb-1">Panel</Typography.Label>
          <Typography.P variant={showPanel ? 'success' : 'error'} className="text-sm mt-1">
            {showPanel ? 'Visible' : 'Hidden'}
          </Typography.P>
        </div>
        <div className="p-3 bg-muted/30 dark:bg-muted/30 rounded-surface">
          <Typography.Label className="font-medium mb-1">Zoom Level</Typography.Label>
          <Typography.P variant="info" className="text-sm mt-1">
            {zoomLevel}
          </Typography.P>
        </div>
      </div>
    </div>
  );
}
