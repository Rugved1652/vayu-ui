"use client";

import { useMap } from "vayu-ui";
import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";

export function UseMapDemo() {
    const { map, set, remove, clear } = useMap<string, string>([
        ["key1", "value1"],
        ["key2", "value2"],
    ]);
    const [keyInput, setKeyInput] = useState("");
    const [valueInput, setValueInput] = useState("");

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (keyInput.trim() && valueInput.trim()) {
            set(keyInput.trim(), valueInput.trim());
            setKeyInput("");
            setValueInput("");
        }
    };

    return (
        <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full">
            <div className="flex flex-col gap-6">

                <form onSubmit={handleAdd} className="flex gap-2">
                    <input
                        type="text"
                        value={keyInput}
                        onChange={(e) => setKeyInput(e.target.value)}
                        placeholder="Key"
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <input
                        type="text"
                        value={valueInput}
                        onChange={(e) => setValueInput(e.target.value)}
                        placeholder="Value"
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Set
                    </button>
                </form>

                <div className="rounded-md border">
                    {map.size === 0 ? (
                        <div className="p-8 text-center text-sm text-muted-foreground">
                            Map is empty. Add items or reset.
                        </div>
                    ) : (
                        <ul className="divide-y">
                            {Array.from(map.entries()).map(([key, value]) => (
                                <li key={key} className="flex items-center justify-between p-3 hover:bg-muted/50 transition-colors">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold">{key}</span>
                                        <span className="text-xs text-muted-foreground">{value}</span>
                                    </div>
                                    <button
                                        onClick={() => remove(key)}
                                        className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded-md hover:bg-destructive/10"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={clear}
                        disabled={map.size === 0}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-destructive border border-destructive/20 bg-destructive/10 hover:bg-destructive/20 h-9 px-4 py-2"
                    >
                        <Trash2 className="mr-2 h-4 w-4" /> Clear All
                    </button>
                </div>
            </div>
        </div>
    );
}
