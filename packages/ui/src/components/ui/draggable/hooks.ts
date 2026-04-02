// hooks.ts
// Logic

import { useCallback, useEffect, useRef, useState } from 'react';
import type { DraggableDirection, DraggableItem } from './types';
import { reorder } from './types';

// ── useAnnounce ──

export function useAnnounce() {
  const [liveText, setLiveText] = useState('');

  const announce = useCallback((msg: string) => {
    setLiveText('');
    requestAnimationFrame(() => setLiveText(msg));
  }, []);

  return { liveText, announce };
}

// ── useDragOperations ──

export function useDragOperations<T extends DraggableItem>(
  items: T[],
  onReorder: (items: T[]) => void,
) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const dragStartPos = useRef({ x: 0, y: 0 });
  const dragClone = useRef<HTMLDivElement | null>(null);

  // Start
  const handleDragStart = useCallback((itemId: string, clientX: number, clientY: number) => {
    const el = itemRefs.current.get(itemId);
    if (!el) return;

    setDraggedId(itemId);
    setOverId(itemId);
    dragStartPos.current = { x: clientX, y: clientY };

    // Visual clone
    const rect = el.getBoundingClientRect();
    const clone = el.cloneNode(true) as HTMLDivElement;
    clone.style.position = 'fixed';
    clone.style.left = `${rect.left}px`;
    clone.style.top = `${rect.top}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.zIndex = '9999';
    clone.style.pointerEvents = 'none';
    clone.style.opacity = '0.9';
    clone.style.transform = 'scale(1.03)';
    clone.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
    clone.style.borderRadius = '8px';
    clone.style.transition = 'transform 0.15s ease, box-shadow 0.15s ease';
    clone.setAttribute('aria-hidden', 'true');
    document.body.appendChild(clone);
    dragClone.current = clone;

    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  }, []);

  // Move
  const handleDragMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!draggedId || !dragClone.current) return;

      const dx = clientX - dragStartPos.current.x;
      const dy = clientY - dragStartPos.current.y;
      const el = itemRefs.current.get(draggedId);
      if (el) {
        const rect = el.getBoundingClientRect();
        dragClone.current.style.left = `${rect.left + dx}px`;
        dragClone.current.style.top = `${rect.top + dy}px`;
      }

      // Find closest item by distance to center
      let closest: { id: string; dist: number } | null = null;

      for (const [id, itemEl] of itemRefs.current) {
        if (id === draggedId) continue;
        const r = itemEl.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;

        const inX = clientX > r.left - r.width * 0.1 && clientX < r.right + r.width * 0.1;
        const inY = clientY > r.top - r.height * 0.1 && clientY < r.bottom + r.height * 0.1;

        if (inX && inY) {
          const dist = Math.hypot(clientX - cx, clientY - cy);
          if (!closest || dist < closest.dist) {
            closest = { id, dist };
          }
        }
      }

      if (closest) setOverId(closest.id);
    },
    [draggedId],
  );

  // End
  const handleDragEnd = useCallback(() => {
    if (draggedId && overId && draggedId !== overId) {
      const from = items.findIndex((i) => i.id === draggedId);
      const to = items.findIndex((i) => i.id === overId);
      if (from !== -1 && to !== -1) {
        onReorder(reorder(items, from, to));
      }
    }

    if (dragClone.current) {
      dragClone.current.remove();
      dragClone.current = null;
    }

    setDraggedId(null);
    setOverId(null);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, [draggedId, overId, items, onReorder]);

  // Global move / end listeners
  useEffect(() => {
    if (!draggedId) return;

    const onMouseMove = (e: MouseEvent) => handleDragMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onEnd = () => handleDragEnd();

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onTouchMove, {
      passive: false,
    });
    document.addEventListener('touchend', onEnd);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onEnd);
    };
  }, [draggedId, handleDragMove, handleDragEnd]);

  return { draggedId, overId, itemRefs, handleDragStart };
}

// ── useKeyboardSort ──

export function useKeyboardSort<T extends DraggableItem>(
  items: T[],
  onReorder: (items: T[]) => void,
  direction: DraggableDirection,
  columns: number,
  announce: (msg: string) => void,
) {
  const [keyboardGrabbedId, setKeyboardGrabbedId] = useState<string | null>(null);

  const isGrid = direction === 'grid';
  const isVertical = direction === 'vertical';

  const handleItemKeyDown = useCallback(
    (itemId: string, e: React.KeyboardEvent) => {
      const idx = items.findIndex((i) => i.id === itemId);
      if (idx === -1) return;

      // Grab / drop
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (keyboardGrabbedId === itemId) {
          setKeyboardGrabbedId(null);
          announce(`Dropped. Item now at position ${idx + 1} of ${items.length}.`);
        } else {
          setKeyboardGrabbedId(itemId);
          announce(
            `Grabbed. Current position ${idx + 1} of ${items.length}. Use arrow keys to move, Space to drop, Escape to cancel.`,
          );
        }
        return;
      }

      // Cancel
      if (e.key === 'Escape' && keyboardGrabbedId === itemId) {
        e.preventDefault();
        setKeyboardGrabbedId(null);
        announce('Reorder cancelled.');
        return;
      }

      if (keyboardGrabbedId !== itemId) return;

      // Compute target index based on direction
      let target = -1;

      if (isGrid) {
        switch (e.key) {
          case 'ArrowLeft':
            target = idx > 0 ? idx - 1 : -1;
            break;
          case 'ArrowRight':
            target = idx < items.length - 1 ? idx + 1 : -1;
            break;
          case 'ArrowUp':
            target = idx - columns >= 0 ? idx - columns : -1;
            break;
          case 'ArrowDown':
            target = idx + columns < items.length ? idx + columns : -1;
            break;
          default:
            return;
        }
      } else if (isVertical) {
        if (e.key === 'ArrowUp' && idx > 0) target = idx - 1;
        else if (e.key === 'ArrowDown' && idx < items.length - 1) target = idx + 1;
        else return;
      } else {
        if (e.key === 'ArrowLeft' && idx > 0) target = idx - 1;
        else if (e.key === 'ArrowRight' && idx < items.length - 1) target = idx + 1;
        else return;
      }

      if (target >= 0) {
        e.preventDefault();
        onReorder(reorder(items, idx, target));
        announce(`Moved to position ${target + 1} of ${items.length}.`);
      }
    },
    [items, onReorder, keyboardGrabbedId, isGrid, isVertical, columns, announce],
  );

  return { keyboardGrabbedId, handleItemKeyDown };
}
