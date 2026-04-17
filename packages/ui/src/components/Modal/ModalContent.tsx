// content.tsx
// UI: presentational (with focus management)

'use client';

import React, { forwardRef, useCallback, useEffect, useRef, HTMLAttributes } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils';
import { useModal, sizeWidths, FOCUSABLE } from './Modal';
import { ModalOverlay } from './ModalOverlay';
import type { ModalContentProps } from './types';

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ children, className, onKeyDown, ...props }, ref) => {
    const { open, setOpen, titleId, descriptionId, size, closeOnEscape, triggerRef } = useModal();
    const contentRef = useRef<HTMLDivElement>(null);
    const previouslyFocusedRef = useRef<HTMLElement | null>(null);

    // Merge refs
    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        contentRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref],
    );

    // Focus management: capture previous focus, move into modal, restore on close
    useEffect(() => {
      if (open) {
        previouslyFocusedRef.current = document.activeElement as HTMLElement | null;

        const timer = setTimeout(() => {
          const focusable = contentRef.current?.querySelector<HTMLElement>(FOCUSABLE);
          if (focusable) {
            focusable.focus();
          } else {
            contentRef.current?.focus();
          }
        }, 50);

        return () => clearTimeout(timer);
      } else {
        const returnTarget = triggerRef.current ?? previouslyFocusedRef.current;
        returnTarget?.focus();
      }
    }, [open, triggerRef]);

    // Keyboard navigation: Escape + focus trap
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);

      if (e.key === 'Escape' && closeOnEscape) {
        e.stopPropagation();
        setOpen(false);
        return;
      }

      if (e.key === 'Tab') {
        const focusableElements = contentRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);

        if (!focusableElements || focusableElements.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    if (!open) return null;

    return createPortal(
      <>
        {/* Overlay */}
        <ModalOverlay />

        {/* Center wrapper */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-hidden="true">
          <div
            ref={setRefs}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            style={{ maxWidth: sizeWidths[size] }}
            className={cn(
              'relative w-full flex flex-col',
              'bg-elevated',
              'border border-border',
              'rounded-overlay shadow-elevated',
              'focus:outline-none',
              className,
            )}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
            {...props}
          >
            {children}
          </div>
        </div>
      </>,
      document.body,
    );
  },
);
ModalContent.displayName = 'Modal.Content';

export { ModalContent };
