'use client';

import { useDeviceOS } from 'vayu-ui';

const osEmoji: Record<string, string> = {
  Windows: '🪟',
  macOS: '🍎',
  Linux: '🐧',
  Android: '🤖',
  iOS: '📱',
  ChromeOS: '💻',
  Unknown: '❓',
};

const deviceEmoji: Record<string, string> = {
  mobile: '📱',
  tablet: '📋',
  desktop: '🖥️',
};

export function UseDeviceOSDemo() {
  const { os, browser, deviceType, isTouchDevice, isReady } = useDeviceOS();

  if (!isReady) return null;

  const rows = [
    { label: 'Operating System', value: `${osEmoji[os] || ''} ${os}` },
    { label: 'Browser', value: browser },
    { label: 'Device Type', value: `${deviceEmoji[deviceType] || ''} ${deviceType}` },
    { label: 'Touch Screen', value: isTouchDevice ? 'Yes ✅' : 'No ❌' },
  ];

  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full max-w-sm">
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold">Device Info</h3>
        <div className="flex flex-col gap-2">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between py-2 px-3 rounded-md bg-muted/50 text-sm"
            >
              <span className="text-muted-foreground">{row.label}</span>
              <span className="font-medium">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
