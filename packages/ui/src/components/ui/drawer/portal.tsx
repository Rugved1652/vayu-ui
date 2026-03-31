// portal.tsx
// UI: presentational

"use client";

import React from "react";

const DrawerPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <>{children}</>;
};
DrawerPortal.displayName = "Drawer.Portal";

export { DrawerPortal };
