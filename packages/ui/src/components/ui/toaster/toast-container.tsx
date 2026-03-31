// toast-container.tsx
// UI: portal + position grouping

"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import type { ToastContainerProps, ToastPosition } from "./types";
import { ToastStack } from "./toast-stack";
import { PORTAL_ID } from "./constants";

function getPortalRoot(): HTMLElement {
  let el = document.getElementById(PORTAL_ID);
  if (!el) {
    el = document.createElement("div");
    el.id = PORTAL_ID;
    el.style.cssText =
      "position:fixed;inset:0;pointer-events:none;z-index:2147483647;isolation:isolate;";
    document.body.appendChild(el);
  }
  return el;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onRemove,
}) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(getPortalRoot());
  }, []);

  if (!portalRoot) return null;

  const toastsByPosition = toasts.reduce(
    (acc, toast) => {
      const position = toast.position || "bottom-right";
      if (!acc[position]) acc[position] = [];
      acc[position].push(toast);
      return acc;
    },
    {} as Record<ToastPosition, typeof toasts>
  );

  return createPortal(
    <>
      {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
        <ToastStack
          key={position}
          position={position as ToastPosition}
          toasts={positionToasts}
          onRemove={onRemove}
        />
      ))}
    </>,
    portalRoot
  );
};

export { ToastContainer };
