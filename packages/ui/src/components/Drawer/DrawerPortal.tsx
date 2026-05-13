// portal.tsx
// UI: renders children into document.body via React portal

'use client';

import React from 'react';
import { createPortal } from 'react-dom';

const DrawerPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (typeof document === 'undefined') return null;
  return createPortal(children, document.body);
};
DrawerPortal.displayName = 'Drawer.Portal';

export { DrawerPortal };
