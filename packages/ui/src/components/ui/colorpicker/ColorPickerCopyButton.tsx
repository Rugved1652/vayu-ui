// copy-button.tsx
// UI: clipboard copy

'use client';

import React, { forwardRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '../utils';
import { useColorPicker } from './hooks';
import { formatColor } from './utils';
import type { ColorPickerCopyButtonProps } from './types';

export const ColorPickerCopyButton = forwardRef<HTMLButtonElement, ColorPickerCopyButtonProps>(
  ({ copiedText = 'Copied!', className, ...props }, ref) => {
    const { color, format, disabled } = useColorPicker();
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(formatColor(color, format));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy color:', err);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleCopy}
        disabled={disabled}
        aria-label={copied ? copiedText : 'Copy color to clipboard'}
        className={cn(
          'px-3 py-2 rounded-control border-2 border-field',
          'bg-surface text-surface-content',
          'hover:bg-muted transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'font-secondary',
          className,
        )}
        {...props}
      >
        {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
      </button>
    );
  },
);

ColorPickerCopyButton.displayName = 'ColorPicker.CopyButton';
