'use client';

import { useEffect, useState, useCallback } from 'react';
import { Palette, RotateCcw } from 'lucide-react';
import { Modal, Button, Divider } from 'vayu-ui';

interface Preset {
  key: string;
  label: string;
  lightColor: string;
  darkColor: string;
}

const presets: Preset[] = [
  { key: 'lime', label: 'Lime', lightColor: '#84cc16', darkColor: '#bef264' },
  { key: 'blue', label: 'Blue', lightColor: '#3b82f6', darkColor: '#60a5fa' },
  { key: 'rose', label: 'Rose', lightColor: '#f43f5e', darkColor: '#fb7185' },
  { key: 'violet', label: 'Violet', lightColor: '#8b5cf6', darkColor: '#a78bfa' },
  { key: 'amber', label: 'Amber', lightColor: '#f59e0b', darkColor: '#fbbf24' },
  { key: 'emerald', label: 'Emerald', lightColor: '#10b981', darkColor: '#34d399' },
];

const STORAGE_KEY = 'vayu-theme';

function getSavedTheme(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function applyTheme(themeKey: string | null) {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;
  if (themeKey && presets.some((p) => p.key === themeKey)) {
    root.setAttribute('data-theme', themeKey);
    localStorage.setItem(STORAGE_KEY, themeKey);
  } else {
    root.removeAttribute('data-theme');
    localStorage.removeItem(STORAGE_KEY);
  }
}

function detectDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
}

export function ColorThemePanel() {
  const [activeTheme, setActiveTheme] = useState<string | null>(getSavedTheme);
  const [isDark, setIsDark] = useState(false);
  const [open, setOpen] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const check = () => setIsDark(detectDarkMode());
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Apply saved theme on mount
  useEffect(() => {
    const saved = getSavedTheme();
    if (saved) {
      applyTheme(saved);
    }
  }, []);

  const handlePresetClick = useCallback((key: string) => {
    setActiveTheme(key);
    applyTheme(key);
  }, []);

  const handleReset = useCallback(() => {
    setActiveTheme(null);
    applyTheme(null);
  }, []);

  return (
    <Modal open={open} onOpenChange={setOpen} size="sm">
      <Modal.Trigger
        asChild
        className="inline-flex items-center justify-center rounded-control w-9 h-9 p-0 bg-transparent hover:bg-muted transition-colors"
      >
        <button type="button" aria-label="Open theme settings">
          <Palette className="h-4 w-4 text-surface-content" />
        </button>
      </Modal.Trigger>

      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Choose Theme</Modal.Title>
          <Modal.Description>
            Select a color preset for your documentation.
          </Modal.Description>
        </Modal.Header>

        <Modal.Body>
          <div className="grid grid-cols-3 gap-3">
            {presets.map((preset) => {
              const isActive = activeTheme === preset.key;
              const color = isDark ? preset.darkColor : preset.lightColor;

              return (
                <button
                  key={preset.key}
                  type="button"
                  onClick={() => handlePresetClick(preset.key)}
                  className={`
                    flex flex-col items-center gap-2 rounded-surface border p-3 transition-all
                    hover:shadow-surface hover:scale-[1.02]
                    ${isActive ? 'border-brand ring-2 ring-focus' : 'border-border'}
                  `}
                  title={`Apply ${preset.label} theme`}
                >
                  <span
                    className="w-10 h-10 rounded-full border-2 border-border shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs font-medium text-surface-content">
                    {preset.label}
                  </span>
                </button>
              );
            })}
          </div>
        </Modal.Body>

        <Modal.Footer className="flex justify-between items-center">
          <Button
            variant="outline"
            size="small"
            onClick={handleReset}
            className="gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </Button>
          <Modal.Close asChild>
            <Button variant="primary" size="small">Done</Button>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
