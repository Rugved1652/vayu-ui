// context.ts
// Context

import { createContext, useContext } from "react";
import type { TreeContextType } from "./types";

const TreeContext = createContext<TreeContextType | null>(null);

export const useTree = () => {
    const ctx = useContext(TreeContext);
    if (!ctx) throw new Error("Tree compound components must be used within <Tree>");
    return ctx;
};

export { TreeContext };
