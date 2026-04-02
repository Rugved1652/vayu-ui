'use client';

import { CommandBox, type CommandItem } from 'vayu-ui';
import { FileText, Home, Palette, Search, Settings, User, Zap } from 'lucide-react';
import { useState } from 'react';

const commands: CommandItem[] = [
  {
    id: 'home',
    title: 'Go to Home',
    description: 'Navigate to the home page.',
    icon: <Home className="w-5 h-5" />,
    shortcut: ['⌘', 'H'],
    group: 'Navigation',
  },
  {
    id: 'docs',
    title: 'Documentation',
    description: 'Browse the component docs.',
    icon: <FileText className="w-5 h-5" />,
    shortcut: ['⌘', 'D'],
    group: 'Navigation',
  },
  {
    id: 'search',
    title: 'Search',
    description: 'Search across all pages.',
    icon: <Search className="w-5 h-5" />,
    shortcut: ['⌘', 'K'],
    group: 'Actions',
  },
  {
    id: 'theme',
    title: 'Toggle Theme',
    description: 'Switch between light and dark mode.',
    icon: <Palette className="w-5 h-5" />,
    shortcut: ['⌘', 'T'],
    group: 'Actions',
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Open application settings.',
    icon: <Settings className="w-5 h-5" />,
    group: 'Actions',
  },
  {
    id: 'profile',
    title: 'Profile',
    description: 'View your profile.',
    icon: <User className="w-5 h-5" />,
    group: 'Account',
  },
  {
    id: 'shortcuts',
    title: 'Keyboard Shortcuts',
    description: 'View all keyboard shortcuts.',
    icon: <Zap className="w-5 h-5" />,
    shortcut: ['⌘', '/'],
    group: 'Help',
    disabled: true,
  },
];

export default function CommandBoxDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="not-prose flex flex-col gap-8 w-full max-w-lg">
      {/* Default */}
      <CommandBox
        items={commands}
        open={isOpen}
        onOpenChange={setIsOpen}
        onSelect={(item) => console.log('Selected:', item.title)}
      />

      {/* Bordered variant, small */}
      <CommandBox
        items={commands.slice(0, 4)}
        variant="bordered"
        size="small"
        placeholder="Quick actions..."
      />

      {/* Disabled */}
      <CommandBox items={commands} disabled placeholder="Command palette (disabled)" />
    </div>
  );
}
