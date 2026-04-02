'use client';

import { useState, useEffect } from 'react';
import { CommandBox, Button, Card, CardContent, CardHeader, Badge } from 'vayu-ui';
import {
  Home,
  Search,
  Settings,
  User,
  FileText,
  Folder,
  Mail,
  Calendar,
  Star,
  Trash2,
  Download,
  Upload,
  Plus,
  Moon,
  Sun,
  Keyboard,
  Code,
  Layers,
  Zap,
} from 'lucide-react';

export default function CommandBoxDemo() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Custom keyboard shortcut (Ctrl+Shift+P) — avoids Cmd+K conflict with Fumadocs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelect = (item: { id: string; title: string }) => {
    console.log('Selected:', item);
    if (item.id === 'toggle-theme') {
      setDarkMode((prev) => !prev);
    }
  };

  return (
    <div className="space-y-8">
      {/* Command Palette — overlay mode */}
      <Card>
        <CardHeader
          title="Command Palette"
          subtitle="Press Ctrl+Shift+P or click the button"
          action={<Badge variant="brand">Interactive</Badge>}
        />
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <Button onClick={() => setOpen(true)} variant="outline" className="gap-2">
              <Search className="w-4 h-4" />
              Open Command Box
              <kbd className="ml-2 px-1.5 py-0.5 text-xs bg-muted/50 rounded">
                Ctrl+Shift+P
              </kbd>
            </Button>

            <p className="text-sm text-muted-content text-center">
              Use arrow keys to navigate, Enter to select, Escape to close
            </p>
          </div>

          <CommandBox open={open} onOpenChange={setOpen} onSelect={handleSelect}>
            <CommandBox.Overlay>
              <CommandBox.Input placeholder="Type a command or search..." />
              <CommandBox.List>
                <CommandBox.Group label="Navigation">
                  <CommandBox.Item
                    id="home"
                    shortcut={['G', 'H']}
                    icon={<Home className="w-4 h-4" />}
                  >
                    Go to Home
                  </CommandBox.Item>
                  <CommandBox.Item
                    id="search"
                    shortcut={['G', 'S']}
                    icon={<Search className="w-4 h-4" />}
                  >
                    Search
                  </CommandBox.Item>
                  <CommandBox.Item
                    id="files"
                    shortcut={['G', 'F']}
                    icon={<Folder className="w-4 h-4" />}
                  >
                    Browse Files
                  </CommandBox.Item>
                </CommandBox.Group>

                <CommandBox.Separator />

                <CommandBox.Group label="Actions">
                  <CommandBox.Item
                    id="new-file"
                    shortcut={['⌘', 'N']}
                    icon={<Plus className="w-4 h-4" />}
                  >
                    New File
                  </CommandBox.Item>
                  <CommandBox.Item
                    id="upload"
                    shortcut={['⌘', 'U']}
                    icon={<Upload className="w-4 h-4" />}
                  >
                    Upload File
                  </CommandBox.Item>
                  <CommandBox.Item
                    id="download"
                    shortcut={['⌘', 'D']}
                    icon={<Download className="w-4 h-4" />}
                  >
                    Download
                  </CommandBox.Item>
                </CommandBox.Group>

                <CommandBox.Separator />

                <CommandBox.Group label="Settings">
                  <CommandBox.Item
                    id="toggle-theme"
                    shortcut={['⌘', 'T']}
                    icon={darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  >
                    Toggle Theme
                  </CommandBox.Item>
                  <CommandBox.Item
                    id="settings"
                    shortcut={['⌘', ',']}
                    icon={<Settings className="w-4 h-4" />}
                  >
                    Open Settings
                  </CommandBox.Item>
                  <CommandBox.Item
                    id="keyboard"
                    shortcut={['⌘', 'K']}
                    icon={<Keyboard className="w-4 h-4" />}
                  >
                    Keyboard Shortcuts
                  </CommandBox.Item>
                </CommandBox.Group>

                <CommandBox.Empty>No commands found. Try a different search.</CommandBox.Empty>
              </CommandBox.List>
            </CommandBox.Overlay>
          </CommandBox>
        </CardContent>
      </Card>

      {/* Inline CommandBox — no overlay */}
      <Card>
        <CardHeader
          title="Inline CommandBox"
          subtitle="Without overlay backdrop"
          action={<Badge variant="muted">Embedded</Badge>}
        />
        <CardContent>
          <div className="border border-border rounded-overlay overflow-hidden">
            <CommandBox>
              <CommandBox.Input placeholder="Search commands..." />
              <CommandBox.List maxHeight="240px">
                <CommandBox.Item
                  id="profile"
                  icon={<User className="w-4 h-4" />}
                  description="View and edit your profile"
                >
                  View Profile
                </CommandBox.Item>
                <CommandBox.Item
                  id="email"
                  icon={<Mail className="w-4 h-4" />}
                  description="Open email inbox"
                >
                  Email Inbox
                </CommandBox.Item>
                <CommandBox.Item
                  id="calendar"
                  icon={<Calendar className="w-4 h-4" />}
                  description="View your calendar"
                >
                  Calendar
                </CommandBox.Item>
                <CommandBox.Item
                  id="starred"
                  icon={<Star className="w-4 h-4" />}
                  description="View starred items"
                >
                  Starred Items
                </CommandBox.Item>
                <CommandBox.Item
                  id="trash"
                  icon={<Trash2 className="w-4 h-4" />}
                  description="View deleted items"
                  disabled
                >
                  Trash (Disabled)
                </CommandBox.Item>
                <CommandBox.Empty>No results</CommandBox.Empty>
              </CommandBox.List>
            </CommandBox>
          </div>
        </CardContent>
      </Card>

      {/* With Descriptions */}
      <Card>
        <CardHeader title="With Descriptions" subtitle="Items with additional context" />
        <CardContent>
          <div className="border border-border rounded-overlay overflow-hidden">
            <CommandBox showShortcuts={false}>
              <CommandBox.Input placeholder="Search documentation..." />
              <CommandBox.List maxHeight="280px">
                <CommandBox.Group label="Getting Started">
                  <CommandBox.Item
                    id="intro"
                    icon={<FileText className="w-4 h-4" />}
                    description="Learn the basics of the component library"
                  >
                    Introduction
                  </CommandBox.Item>
                  <CommandBox.Item
                    id="installation"
                    icon={<Download className="w-4 h-4" />}
                    description="Install and configure VedUI in your project"
                  >
                    Installation Guide
                  </CommandBox.Item>
                </CommandBox.Group>

                <CommandBox.Separator />

                <CommandBox.Group label="Core Concepts">
                  <CommandBox.Item
                    id="components"
                    icon={<Layers className="w-4 h-4" />}
                    description="Understanding the compound component pattern"
                  >
                    Components
                  </CommandBox.Item>
                  <CommandBox.Item
                    id="theming"
                    icon={<Code className="w-4 h-4" />}
                    description="Customize the look and feel with design tokens"
                  >
                    Theming
                  </CommandBox.Item>
                  <CommandBox.Item
                    id="hooks"
                    icon={<Zap className="w-4 h-4" />}
                    description="Reusable hooks for common patterns"
                  >
                    Hooks
                  </CommandBox.Item>
                </CommandBox.Group>

                <CommandBox.Empty>No documentation found for your search.</CommandBox.Empty>
              </CommandBox.List>
            </CommandBox>
          </div>
        </CardContent>
      </Card>

      {/* Simple List */}
      <Card>
        <CardHeader title="Simple List" subtitle="Without groups or shortcuts" />
        <CardContent>
          <div className="border border-border rounded-overlay overflow-hidden">
            <CommandBox showShortcuts={false}>
              <CommandBox.Input placeholder="Quick search..." />
              <CommandBox.List maxHeight="200px">
                <CommandBox.Item id="opt1">Option One</CommandBox.Item>
                <CommandBox.Item id="opt2">Option Two</CommandBox.Item>
                <CommandBox.Item id="opt3">Option Three</CommandBox.Item>
                <CommandBox.Item id="opt4">Option Four</CommandBox.Item>
                <CommandBox.Item id="opt5">Option Five</CommandBox.Item>
                <CommandBox.Item id="opt6" disabled>
                  Option Six (Disabled)
                </CommandBox.Item>
                <CommandBox.Empty>No options found</CommandBox.Empty>
              </CommandBox.List>
            </CommandBox>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      <Card>
        <CardHeader title="Loading State" subtitle="Async command loading" />
        <CardContent>
          <div className="border border-border rounded-overlay overflow-hidden">
            <CommandBox showShortcuts={false} loading={true}>
              <CommandBox.Input placeholder="Loading commands..." disabled />
              <CommandBox.List>
                <div
                  role="status"
                  aria-live="polite"
                  aria-busy="true"
                  className="py-8 text-center text-muted-content text-sm"
                >
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                    Loading commands...
                  </div>
                </div>
              </CommandBox.List>
            </CommandBox>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
