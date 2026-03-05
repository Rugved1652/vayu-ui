"use client";

import { useMediaQuery } from "vayu-ui";
import { Laptop, Smartphone, Tablet } from "lucide-react";

export function UseMediaQueryDemo() {
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
    const isMobile = useMediaQuery("(max-width: 767px)");

    return (
        <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full flex flex-col items-center gap-6">
            <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Resize your window to see the value change.</p>

                <div className="flex gap-4 justify-center py-4">
                    <div className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-colors ${isDesktop ? 'bg-primary/20 border-primary' : 'bg-muted border-transparent opacity-50'}`}>
                        <Laptop className="h-8 w-8" />
                        <span className="text-xs font-medium">Desktop</span>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">&gt; 1024px</span>
                    </div>
                    <div className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-colors ${isTablet ? 'bg-primary/20 border-primary' : 'bg-muted border-transparent opacity-50'}`}>
                        <Tablet className="h-8 w-8" />
                        <span className="text-xs font-medium">Tablet</span>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">768px - 1023px</span>
                    </div>
                    <div className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-colors ${isMobile ? 'bg-primary/20 border-primary' : 'bg-muted border-transparent opacity-50'}`}>
                        <Smartphone className="h-8 w-8" />
                        <span className="text-xs font-medium">Mobile</span>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">&lt; 767px</span>
                    </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-md border font-mono text-sm">
                    <p>
                        Match: <span className="font-bold text-primary">
                            {isDesktop ? "Desktop" : isTablet ? "Tablet" : "Mobile"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
