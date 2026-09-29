// content.tsx
// UI: presentational (with focus management)

'use client';

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  HTMLAttributes,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils';
import { useModal, sizeWidths, FOCUSABLE } from './Modal';
import { ModalOverlay } from './ModalOverlay';
import type { ModalContentProps } from './types';

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ children, className, onKeyDown, ...props }, ref) => {
    const {
      open,
      setOpen,
      titleId,
      descriptionId,
      size,
      closeOnEscape,
      closeOnOverlayClick,
      triggerRef,
    } = useModal();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
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

    // Move focus as soon as the portal is committed so immediate Escape/Tab works.
    useLayoutEffect(() => {
      if (!open || !mounted) return;
      previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
      const focusable = contentRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      (focusable ?? contentRef.current)?.focus({ preventScroll: true });
      return () => {
        (triggerRef.current ?? previouslyFocusedRef.current)?.focus({ preventScroll: true });
      };
    }, [open, mounted, triggerRef]);

    // Keyboard navigation: Escape + focus trap
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);
      if (e.defaultPrevented) return;

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
            lastElement.focus({ preventScroll: true });
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus({ preventScroll: true });
          }
        }
      }
    };

    if (!open || !mounted) return null;

    return createPortal(
      <>
        {/* Overlay */}
        <ModalOverlay />

        {/* Center wrapper */}
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget && closeOnOverlayClick) setOpen(false);
          }}
        >
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
