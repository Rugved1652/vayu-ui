'use client';

import { useEffect, useState, useCallback } from 'react';
import { Palette, SwatchBook } from 'lucide-react';

interface BaseTheme {
  key: string;
  name: string;
  light: Record<string, string>;
  dark: Record<string, string>;
}

interface AccentPreset {
  key: string;
  name: string;
  light: { brand: string; 'brand-content': string; focus: string };
  dark: { brand: string; 'brand-content': string; focus: string };
}

const baseThemes: BaseTheme[] = [
  {
    key: 'default',
    name: 'Default',
    light: {
      '--canvas': '#f4f4f5',
      '--canvas-content': '#09090b',
      '--surface': '#ffffff',
      '--surface-content': '#09090b',
      '--sidebar': '#fafafa',
      '--sidebar-content': '#18181b',
      '--elevated': '#ffffff',
      '--elevated-content': '#09090b',
      '--border': '#d4d4d8',
      '--field': '#a1a1aa',
      '--muted': '#e4e4e7',
      '--muted-content': '#71717a',
    },
    dark: {
      '--canvas': '#000000',
      '--canvas-content': '#fafafa',
      '--surface': '#0a0a0a',
      '--surface-content': '#ffffff',
      '--sidebar': '#121212',
      '--sidebar-content': '#e4e4e7',
      '--elevated': '#1a1a1a',
      '--elevated-content': '#ffffff',
      '--border': '#27272a',
      '--field': '#3f3f46',
      '--muted': '#27272a',
      '--muted-content': '#a1a1aa',
    },
  },
  {
    key: 'white',
    name: 'White',
    light: {
      '--canvas': '#ffffff',
      '--canvas-content': '#09090b',
      '--surface': '#ffffff',
      '--surface-content': '#09090b',
      '--sidebar': '#fafafa',
      '--sidebar-content': '#18181b',
      '--elevated': '#ffffff',
      '--elevated-content': '#09090b',
      '--border': '#e4e4e7',
      '--field': '#a1a1aa',
      '--muted': '#f4f4f5',
      '--muted-content': '#71717a',
    },
    dark: {
      '--canvas': '#000000',
      '--canvas-content': '#fafafa',
      '--surface': '#0a0a0a',
      '--surface-content': '#ffffff',
      '--sidebar': '#111111',
      '--sidebar-content': '#e4e4e7',
      '--elevated': '#141414',
      '--elevated-content': '#ffffff',
      '--border': '#27272a',
      '--field': '#3f3f46',
      '--muted': '#1a1a1a',
      '--muted-content': '#a1a1aa',
    },
  },
  {
    key: 'warm',
    name: 'Warm',
    light: {
      '--canvas': '#fafaf9',
      '--canvas-content': '#1c1917',
      '--surface': '#ffffff',
      '--surface-content': '#1c1917',
      '--sidebar': '#f5f5f4',
      '--sidebar-content': '#292524',
      '--elevated': '#ffffff',
      '--elevated-content': '#1c1917',
      '--border': '#e7e5e4',
      '--field': '#a8a29e',
      '--muted': '#f5f5f4',
      '--muted-content': '#78716c',
    },
    dark: {
      '--canvas': '#0c0a09',
      '--canvas-content': '#fafaf9',
      '--surface': '#1c1917',
      '--surface-content': '#fafaf9',
      '--sidebar': '#1c1917',
      '--sidebar-content': '#e7e5e4',
      '--elevated': '#292524',
      '--elevated-content': '#fafaf9',
      '--border': '#44403c',
      '--field': '#57534e',
      '--muted': '#292524',
      '--muted-content': '#a8a29e',
    },
  },
  {
    key: 'cool',
    name: 'Cool',
    light: {
      '--canvas': '#f8fafc',
      '--canvas-content': '#0f172a',
      '--surface': '#ffffff',
      '--surface-content': '#0f172a',
      '--sidebar': '#f1f5f9',
      '--sidebar-content': '#1e293b',
      '--elevated': '#ffffff',
      '--elevated-content': '#0f172a',
      '--border': '#e2e8f0',
      '--field': '#94a3b8',
      '--muted': '#f1f5f9',
      '--muted-content': '#64748b',
    },
    dark: {
      '--canvas': '#020617',
      '--canvas-content': '#f8fafc',
      '--surface': '#0f172a',
      '--surface-content': '#f8fafc',
      '--sidebar': '#0f172a',
      '--sidebar-content': '#e2e8f0',
      '--elevated': '#1e293b',
      '--elevated-content': '#f8fafc',
      '--border': '#334155',
      '--field': '#475569',
      '--muted': '#1e293b',
      '--muted-content': '#94a3b8',
    },
  },
];

const accentPresets: AccentPreset[] = [
  {
    key: 'lime',
    name: 'Lime',
    light: { brand: '#84cc16', 'brand-content': '#052e16', focus: '#84cc16' },
    dark: { brand: '#bef264', 'brand-content': '#000', focus: '#bef264' },
  },
  {
    key: 'ocean',
    name: 'Ocean',
    light: { brand: '#0ea5e9', 'brand-content': '#fff', focus: '#0ea5e9' },
    dark: { brand: '#38bdf8', 'brand-content': '#000', focus: '#38bdf8' },
  },
  {
    key: 'berry',
    name: 'Berry',
    light: { brand: '#e11d48', 'brand-content': '#fff', focus: '#e11d48' },
    dark: { brand: '#fb7185', 'brand-content': '#000', focus: '#fb7185' },
  },
  {
    key: 'grape',
    name: 'Grape',
    light: { brand: '#8b5cf6', 'brand-content': '#fff', focus: '#8b5cf6' },
    dark: { brand: '#a78bfa', 'brand-content': '#000', focus: '#a78bfa' },
  },
  {
    key: 'sunset',
    name: 'Sunset',
    light: { brand: '#f59e0b', 'brand-content': '#fff', focus: '#f59e0b' },
    dark: { brand: '#fbbf24', 'brand-content': '#000', focus: '#fbbf24' },
  },
  {
    key: 'forest',
    name: 'Forest',
    light: { brand: '#10b981', 'brand-content': '#fff', focus: '#10b981' },
    dark: { brand: '#34d399', 'brand-content': '#000', focus: '#34d399' },
  },
  {
    key: 'coral',
    name: 'Coral',
    light: { brand: '#f97316', 'brand-content': '#fff', focus: '#f97316' },
    dark: { brand: '#fdba74', 'brand-content': '#000', focus: '#fdba74' },
  },
  {
    key: 'indigo',
    name: 'Indigo',
    light: { brand: '#6366f1', 'brand-content': '#fff', focus: '#6366f1' },
    dark: { brand: '#a5b4fc', 'brand-content': '#000', focus: '#a5b4fc' },
  },
  {
    key: 'teal',
    name: 'Teal',
    light: { brand: '#14b8a6', 'brand-content': '#fff', focus: '#14b8a6' },
    dark: { brand: '#5eead4', 'brand-content': '#000', focus: '#5eead4' },
  },
  {
    key: 'rose',
    name: 'Rose',
    light: { brand: '#f43f5e', 'brand-content': '#fff', focus: '#f43f5e' },
    dark: { brand: '#fda4af', 'brand-content': '#000', focus: '#fda4af' },
  },
  {
    key: 'amber',
    name: 'Amber',
    light: { brand: '#d97706', 'brand-content': '#fff', focus: '#d97706' },
    dark: { brand: '#fcd34d', 'brand-content': '#000', focus: '#fcd34d' },
  },
  {
    key: 'slate',
    name: 'Slate',
    light: { brand: '#475569', 'brand-content': '#fff', focus: '#475569' },
    dark: { brand: '#94a3b8', 'brand-content': '#000', focus: '#94a3b8' },
  },
];

const STORAGE_KEY_BASE = 'vayu-theme-base';
const STORAGE_KEY_ACCENT = 'vayu-theme-accent';

function getSavedBaseTheme(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(STORAGE_KEY_BASE);
  } catch {
    return null;
  }
}

function getSavedAccentTheme(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(STORAGE_KEY_ACCENT);
  } catch {
    return null;
  }
}

function detectDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
}

function applyBaseTheme(themeKey: string | null) {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;
  const isDark = detectDarkMode();

  if (themeKey && themeKey !== 'default') {
    const theme = baseThemes.find((t) => t.key === themeKey);
    if (theme) {
      const colors = isDark ? theme.dark : theme.light;
      Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
      localStorage.setItem(STORAGE_KEY_BASE, themeKey);
      return;
    }
  }

  // Reset base colors (remove inline overrides so CSS file defaults apply)
  const defaultTheme = baseThemes[0];
  Object.keys(defaultTheme.light).forEach((key) => {
    root.style.removeProperty(key);
  });
  if (themeKey === 'default') {
    localStorage.setItem(STORAGE_KEY_BASE, 'default');
  } else {
    localStorage.removeItem(STORAGE_KEY_BASE);
  }
}

function applyAccentColor(themeKey: string | null) {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;
  const isDark = detectDarkMode();

  if (themeKey) {
    const preset = accentPresets.find((p) => p.key === themeKey);
    if (preset) {
      const colors = isDark ? preset.dark : preset.light;
      root.style.setProperty('--brand', colors.brand);
      root.style.setProperty('--brand-content', colors['brand-content']);
      root.style.setProperty('--focus', colors.focus);
      localStorage.setItem(STORAGE_KEY_ACCENT, themeKey);
      return;
    }
  }

  // Reset to default (CSS file values)
  root.style.removeProperty('--brand');
  root.style.removeProperty('--brand-content');
  root.style.removeProperty('--focus');
  localStorage.removeItem(STORAGE_KEY_ACCENT);
}

export function ColorThemePanel() {
  const [activeBase, setActiveBase] = useState<string | null>(getSavedBaseTheme);
  const [activeAccent, setActiveAccent] = useState<string | null>(getSavedAccentTheme);
  const [isDark, setIsDark] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const check = () => {
      const dark = detectDarkMode();
      setIsDark(dark);
      // Re-apply themes when dark mode changes
      const savedBase = getSavedBaseTheme();
      const savedAccent = getSavedAccentTheme();
      applyBaseTheme(savedBase);
      applyAccentColor(savedAccent);
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Apply saved themes on mount
  useEffect(() => {
    const savedBase = getSavedBaseTheme();
    const savedAccent = getSavedAccentTheme();
    if (savedBase) applyBaseTheme(savedBase);
    if (savedAccent) applyAccentColor(savedAccent);
  }, []);

  const handleBaseClick = useCallback(
    (key: string) => {
      if (activeBase === key) {
        setActiveBase(null);
        applyBaseTheme(null);
      } else {
        setActiveBase(key);
        applyBaseTheme(key);
      }
    },
    [activeBase],
  );

  const handleAccentClick = useCallback(
    (key: string) => {
      if (activeAccent === key) {
        setActiveAccent(null);
        applyAccentColor(null);
      } else {
        setActiveAccent(key);
        applyAccentColor(key);
      }
    },
    [activeAccent],
  );

  return (
    <div className="flex flex-col items-center gap-5 mb-6">
      {/* Base Theme */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-muted-content">
          <SwatchBook className="h-4 w-4" />
          <span className="font-tertiary text-xs uppercase tracking-wider">Base Theme</span>
        </div>
        <div className="flex items-center gap-2">
          {baseThemes.map((theme) => {
            const isActive = activeBase === theme.key || (theme.key === 'default' && !activeBase);
            const isDefault = theme.key === 'default';

            // Color swatch for base theme
            let swatchColor: string;
            if (isDark) {
              swatchColor = theme.dark['--canvas'] || '#000';
            } else {
              swatchColor = theme.light['--canvas'] || '#fff';
            }

            return (
              <button
                key={theme.key}
                type="button"
                onClick={() => handleBaseClick(theme.key)}
                className={`
                  relative flex items-center justify-center rounded-full transition-all duration-200
                  hover:scale-110 hover:shadow-elevated
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2
                  ${isActive ? 'ring-2 ring-focus ring-offset-2' : ''}
                `}
                style={{
                  width: '2rem',
                  height: '2rem',
                  backgroundColor: swatchColor,
                  border: isDefault ? '2px solid var(--border)' : '1px solid var(--border)',
                }}
                title={`${theme.name} ${isActive ? '(active)' : ''}`}
                aria-label={`Apply ${theme.name} base theme`}
                aria-pressed={isActive}
              >
                {isActive && (
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                    style={{
                      color: isDark ? '#fff' : '#000',
                      filter: isDark ? 'none' : 'drop-shadow(0 1px 1px rgba(0,0,0,0.3))',
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accent Color */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-muted-content">
          <Palette className="h-4 w-4" />
          <span className="font-tertiary text-xs uppercase tracking-wider">Accent Color</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-center max-w-[280px]">
          {accentPresets.map((preset) => {
            const isActive = activeAccent === preset.key;
            const color = isDark ? preset.dark.brand : preset.light.brand;

            return (
              <button
                key={preset.key}
                type="button"
                onClick={() => handleAccentClick(preset.key)}
                className={`
                  relative flex items-center justify-center rounded-full transition-all duration-200
                  hover:scale-110 hover:shadow-elevated
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2
                  ${isActive ? 'ring-2 ring-focus ring-offset-2' : ''}
                `}
                style={{
                  width: '2rem',
                  height: '2rem',
                  backgroundColor: color,
                }}
                title={`${preset.name} ${isActive ? '(active)' : ''}`}
                aria-label={`Apply ${preset.name} accent color`}
                aria-pressed={isActive}
              >
                {isActive && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
