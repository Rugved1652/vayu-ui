'use client';

import { useEffect, useState, useCallback } from 'react';
import { Palette, RotateCcw } from 'lucide-react';
import { Modal, Button } from 'vayu-ui';

interface Theme {
  key: string;
  name: string;
  lightBg: string;
  lightPrimary: string;
  darkBg: string;
  darkPrimary: string;
}

const themes: Theme[] = [
  {
    key: 'lime',
    name: 'Lime',
    lightBg: '#f4f4f5',
    lightPrimary: '#84cc16',
    darkBg: '#000000',
    darkPrimary: '#bef264',
  },
  {
    key: 'ocean',
    name: 'Ocean',
    lightBg: '#f0f7ff',
    lightPrimary: '#0ea5e9',
    darkBg: '#0c1624',
    darkPrimary: '#38bdf8',
  },
  {
    key: 'berry',
    name: 'Berry',
    lightBg: '#fff1f2',
    lightPrimary: '#e11d48',
    darkBg: '#2a0a12',
    darkPrimary: '#fb7185',
  },
  {
    key: 'grape',
    name: 'Grape',
    lightBg: '#faf5ff',
    lightPrimary: '#8b5cf6',
    darkBg: '#1a0e2e',
    darkPrimary: '#a78bfa',
  },
  {
    key: 'sunset',
    name: 'Sunset',
    lightBg: '#fffbeb',
    lightPrimary: '#f59e0b',
    darkBg: '#2a1805',
    darkPrimary: '#fbbf24',
  },
  {
    key: 'forest',
    name: 'Forest',
    lightBg: '#f0fdf4',
    lightPrimary: '#10b981',
    darkBg: '#052e16',
    darkPrimary: '#34d399',
  },
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
  if (themeKey && themes.some((t) => t.key === themeKey)) {
    root.setAttribute('data-theme', themeKey);
    localStorage.setItem(STORAGE_KEY, themeKey);
    console.log('Theme applied:', themeKey, 'Attribute:', root.getAttribute('data-theme'));
    console.log('Brand color:', getComputedStyle(root).getPropertyValue('--brand'));
  } else {
    root.removeAttribute('data-theme');
    localStorage.removeItem(STORAGE_KEY);
    console.log('Theme reset');
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

        <Modal.Body style={{ backgroundColor: 'var(--canvas)' }}>
          <div className="grid grid-cols-2 gap-3">
            {themes.map((theme) => {
              const isActive = activeTheme === theme.key;
              const bgColor = isDark ? theme.darkBg : theme.lightBg;
              const primaryColor = isDark ? theme.darkPrimary : theme.lightPrimary;

              return (
                <button
                  key={theme.key}
                  type="button"
                  onClick={() => handlePresetClick(theme.key)}
                  className={`
                    relative flex flex-col items-center gap-2 rounded-surface border p-3 transition-all
                    hover:shadow-surface hover:scale-[1.02]
                    ${isActive ? 'border-brand ring-2 ring-focus' : 'border-border'}
                  `}
                  title={`Apply ${theme.name} theme`}
                >
                  {/* Preview card */}
                  <div
                    className="w-full h-16 rounded-control border border-border/50 overflow-hidden relative"
                    style={{ backgroundColor: bgColor }}
                  >
                    {/* Primary color accent bar */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-2"
                      style={{ backgroundColor: primaryColor }}
                    />
                    {/* Primary color dot */}
                    <div
                      className="absolute top-2 right-2 w-6 h-6 rounded-full border-2 border-white/80 shadow-sm"
                      style={{ backgroundColor: primaryColor }}
                    />
                    {/* Sample text */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <div className="w-12 h-1.5 rounded-full bg-current opacity-20" />
                      <div className="w-8 h-1.5 rounded-full bg-current opacity-15" />
                    </div>
                  </div>

                  <span className="text-sm font-medium text-surface-content">
                    {theme.name}
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
