"use client";

import { useLocalStorage } from "vayu-ui";

export function UseLocalStorageDemo() {
    const [value, setValue] = useLocalStorage<string>("demo-key", "default value");

    return (
        <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium leading-none">
                        Update Local Storage Value
                    </label>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>

                <div className="p-4 rounded-md bg-muted/50 border border-border">
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Stored Value (in localStorage):</p>
                    <p className="font-mono text-sm break-all">{value}</p>
                </div>

                <p className="text-xs text-muted-foreground">
                    Type something above. If you reload the page, the value will persist.
                </p>
            </div>
        </div>
    );
}
