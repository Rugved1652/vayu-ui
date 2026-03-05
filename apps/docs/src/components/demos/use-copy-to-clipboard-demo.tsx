"use client";

import { useCopyToClipboard } from "vayu-ui";
import { Check, Copy } from "lucide-react";

export function UseCopyToClipboardDemo() {
    const { copy, copied } = useCopyToClipboard();
    const textToCopy = "Hello from Vayu UI!";

    return (
        <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full">
            <div className="flex flex-col gap-4">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Copy this text
                </label>
                <div className="flex items-center gap-2">
                    <input
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        value={textToCopy}
                        readOnly
                    />
                    <button
                        onClick={() => copy(textToCopy)}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9"
                    >
                        {copied ? (
                            <Check className="h-4 w-4 text-green-500" />
                        ) : (
                            <Copy className="h-4 w-4" />
                        )}
                        <span className="sr-only">Copy</span>
                    </button>
                </div>
                {copied && (
                    <p className="text-xs text-green-500 font-medium animate-in fade-in slide-in-from-top-1">
                        Copied to clipboard!
                    </p>
                )}
            </div>
        </div>
    );
}
