// AccordionBody: collapsible panel with smooth height animation and ARIA attributes
'use client';
import React, { useContext, useRef, useState, useEffect } from 'react';
import { cn } from '../utils';
import { AccordionContext } from './types';
import type { AccordionBodyProps } from './types';

export const AccordionBody: React.FC<AccordionBodyProps> = ({ children, itemId, className }) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionBody must be inside Accordion');

  const { isItemOpen, registerPanel, unregisterPanel } = context;
  const isOpen = isItemOpen(itemId);

  const headerId = `accordion-header-${itemId}`;
  const panelId = `accordion-panel-${itemId}`;

  const contentRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | 'auto'>(0);
  const [rendered, setRendered] = useState(isOpen);

  useEffect(() => {
    registerPanel(itemId, panelRef);
    return () => unregisterPanel(itemId);
  }, [itemId, registerPanel, unregisterPanel]);

  useEffect(() => {
    if (isOpen) {
      setRendered(true);
      requestAnimationFrame(() => {
        if (contentRef.current) {
          setHeight(contentRef.current.scrollHeight);
        }
      });
    } else {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight);
        requestAnimationFrame(() => {
          setHeight(0);
        });
      }
    }
  }, [isOpen]);

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setRendered(false);
    } else {
      setHeight('auto');
    }
  };

  return (
    <div
      ref={panelRef}
      id={panelId}
      role="region"
      aria-labelledby={headerId}
      aria-hidden={!isOpen}
      style={{
        height: rendered ? height : 0,
      }}
      className={cn('overflow-hidden will-change-[height]', !isOpen && 'pointer-events-none')}
      onTransitionEnd={handleTransitionEnd}
      tabIndex={-1}
    >
      <div
        ref={contentRef}
        className={cn(
          'px-5 py-3',
          'font-secondary text-base leading-relaxed text-muted-content bg-muted',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};
