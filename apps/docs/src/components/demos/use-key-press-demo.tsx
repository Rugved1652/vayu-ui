"use client";

import { useKeyPress } from "vayu-ui";
import { useState } from "react";

export function UseKeyPressDemo() {
    const [activeKey, setActiveKey] = useState<string | null>(null);

    const activate = (key: string) => {
        setActiveKey(key);
        setTimeout(() => setActiveKey(null), 200);
    };

    useKeyPress("a", () => activate("a"));
    useKeyPress("s", () => activate("s"));
    useKeyPress("d", () => activate("d"));
    useKeyPress("f", () => activate("f"));

    const keys = [
        { key: "a", label: "A" },
        { key: "s", label: "S" },
        { key: "d", label: "D" },
        { key: "f", label: "F" },
    ];

    return (
        <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full">
            <div className="flex flex-col gap-6 items-center">
                <p className="text-sm text-muted-foreground">
                    Press the corresponding keys on your keyboard
                </p>

                <div className="flex gap-4">
                    {keys.map((k) => (
                        <div
                            key={k.key}
                            className={`
                        w-16 h-16 flex items-center justify-center rounded-lg border-2 text-2xl font-bold font-mono transition-all duration-100 shadow-sm
                        ${activeKey === k.key
                                    ? 'bg-primary text-primary-foreground border-primary scale-95 shadow-inner'
                                    : 'bg-background border-input text-foreground hover:border-primary/50'}
                    `}
                        >
                            {k.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
