"use client";

import { useIsMount } from "vayu-ui";
import { useState } from "react";
import { RotateCcw } from "lucide-react";

const ChildComponent = () => {
    const isMount = useIsMount();

    return (
        <div className={`p-4 rounded-md border text-center transition-colors duration-500 ${isMount ? 'bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-400' : 'bg-green-100 border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400'}`}>
            <p className="font-mono font-bold text-xl mb-1">
                {isMount ? "MOUNTING..." : "MOUNTED"}
            </p>
            <p className="text-xs opacity-80">
                {isMount ? "First Render" : "Subsequent Renders"}
            </p>
        </div>
    );
};

export function UseIsMountDemo() {
    const [key, setKey] = useState(0);

    const remount = () => {
        setKey((k) => k + 1);
    };

    return (
        <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full">
            <div className="flex flex-col gap-6 items-center">

                <div className="w-full max-w-xs">
                    {/* Changing key forces the component to unmount and remount */}
                    <ChildComponent key={key} />
                </div>

                <button
                    onClick={remount}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Remount Component
                </button>

                <p className="text-xs text-muted-foreground text-center max-w-sm">
                    Clicking "Remount" changes the key of the child component, forcing React to destroy and recreate it, triggering the mount effect again.
                </p>
            </div>
        </div>
    );
}
