"use client";

import { usePageLeave } from "vayu-ui";
import { useState } from "react";

export function UsePageLeaveDemo() {
    const [showModal, setShowModal] = useState(false);

    usePageLeave(() => {
        setShowModal(true);
    });

    return (
        <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm w-full h-[200px] flex flex-col items-center justify-center relative bg-muted/20">

            <p className="text-center text-muted-foreground">
                Move your mouse cursor out of the page (towards the top tab bar) to see the effect.
            </p>

            {showModal && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 animate-in fade-in duration-200 backdrop-blur-sm rounded-lg">
                    <div className="bg-card p-6 rounded-lg shadow-xl border w-[300px] animate-in zoom-in-95 duration-200 text-center">
                        <div className="mb-4 text-4xl">👋</div>
                        <h3 className="text-lg font-semibold mb-2">Wait, don't go!</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            We have so much more to show you.
                        </p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors text-sm font-medium"
                        >
                            Stay Here
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
