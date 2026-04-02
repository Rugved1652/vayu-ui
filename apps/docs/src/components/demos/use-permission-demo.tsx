'use client';

import { usePermission, type PermissionName } from 'vayu-ui';
import { useState } from 'react';

const PERMISSIONS: { name: PermissionName; label: string; icon: string }[] = [
  { name: 'camera', label: 'Camera', icon: '📷' },
  { name: 'microphone', label: 'Microphone', icon: '🎤' },
  { name: 'geolocation', label: 'Geolocation', icon: '📍' },
  { name: 'notifications', label: 'Notifications', icon: '🔔' },
  { name: 'clipboard-read', label: 'Clipboard Read', icon: '📋' },
];

const stateColor: Record<string, string> = {
  granted: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  denied: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  prompt: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  unsupported: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
  loading: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
};

function PermissionRow({
  name,
  label,
  icon,
}: {
  name: PermissionName;
  label: string;
  icon: string;
}) {
  const { state, isGranted, request } = usePermission(name);

  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-md bg-muted/50 text-sm">
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <span className="font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${stateColor[state]}`}>
          {state}
        </span>
        {!isGranted && state !== 'unsupported' && (
          <button onClick={request} className="text-xs font-medium text-primary hover:underline">
            Request
          </button>
        )}
      </div>
    </div>
  );
}

export function UsePermissionDemo() {
  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full max-w-sm">
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold">Browser Permissions</h3>
        {PERMISSIONS.map((p) => (
          <PermissionRow key={p.name} {...p} />
        ))}
      </div>
    </div>
  );
}
