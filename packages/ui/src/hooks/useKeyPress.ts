'use client';

import { useEffect, useRef } from 'react';

// ============================================================================
// Types
// ============================================================================

/** A key target: single key string or combo like ['⌘', 'N'] */
export type KeyTarget = string | string[];

/** A key binding with callback */
export interface KeyBinding {
  keys: KeyTarget;
  callback: (event: KeyboardEvent) => void;
}

// ============================================================================
// Key Combo Matching
// ============================================================================

/**
 * Checks if a KeyboardEvent matches a key target.
 *
 * - `string`: exact key match (e.g. `'Escape'`)
 * - `string[]` with modifier (`['Ctrl','N']`, `['⌘','K']`): checks modifier + key
 * - `string[]` without modifier (`['G','H']`): matches first key only
 */
export function matchesKeyCombo(event: KeyboardEvent, target: KeyTarget): boolean {
  if (typeof target === 'string') {
    return event.key === target;
  }

  const keys = target;
  if (keys.length === 0) return false;

  const modifierNames = ['Ctrl', 'Control', 'Alt', 'Meta', 'Shift', '⌘'];
  const hasModifier = keys.some((k) => modifierNames.includes(k));

  if (hasModifier) {
    const actionKey = keys[keys.length - 1];
    const modifiers = keys.slice(0, -1);

    const allModifiersActive = modifiers.every((mod) => {
      if (mod === 'Ctrl' || mod === 'Control') return event.ctrlKey;
      if (mod === 'Alt') return event.altKey;
      if (mod === 'Meta' || mod === '⌘') return event.metaKey;
      if (mod === 'Shift') return event.shiftKey;
      return false;
    });

    return allModifiersActive && event.key.toLowerCase() === actionKey.toLowerCase();
  }

  // No modifier — match first key
  return event.key.toLowerCase() === keys[0].toLowerCase();
}

// ============================================================================
// Overloads
// ============================================================================

// Single key + callback (backward compatible)
export function useKeyPress(
  target: KeyTarget,
  callback: (event: KeyboardEvent) => void,
  options?: { enabled?: boolean },
): void;

// Multiple dynamic bindings
export function useKeyPress(bindings: KeyBinding[], options?: { enabled?: boolean }): void;

// ============================================================================
// Implementation
// ============================================================================

export function useKeyPress(
  targetOrBindings: KeyTarget | KeyBinding[],
  callbackOrOptions?: ((event: KeyboardEvent) => void) | { enabled?: boolean },
  maybeOptions?: { enabled?: boolean },
): void {
  // Normalize arguments into bindings array + enabled flag
  let bindings: KeyBinding[];
  let enabled: boolean;

  if (
    Array.isArray(targetOrBindings) &&
    targetOrBindings.length > 0 &&
    typeof targetOrBindings[0] === 'object' &&
    'keys' in (targetOrBindings[0] as unknown as Record<string, unknown>)
  ) {
    // Overload 2: useKeyPress(bindings, options?)
    bindings = targetOrBindings as KeyBinding[];
    enabled =
      (callbackOrOptions as { enabled?: boolean } | undefined)?.enabled ?? true;
  } else {
    // Overload 1: useKeyPress(target, callback, options?)
    bindings = [
      {
        keys: targetOrBindings as KeyTarget,
        callback: callbackOrOptions as (event: KeyboardEvent) => void,
      },
    ];
    enabled = maybeOptions?.enabled ?? true;
  }

  // Use ref so listener doesn't re-subscribe when bindings change
  const bindingsRef = useRef(bindings);
  bindingsRef.current = bindings;

  useEffect(() => {
    if (!enabled) return;

    const handler = (event: KeyboardEvent) => {
      for (const binding of bindingsRef.current) {
        if (matchesKeyCombo(event, binding.keys)) {
          binding.callback(event);
          return;
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [enabled]);
}
