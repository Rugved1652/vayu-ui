"use client";

import { QRCode } from "vayu-ui";

export default function QRCodeDemo() {
    return (
        <div className="not-prose flex flex-col items-center gap-10 w-full">
            {/* ── Default ── */}
            <div className="flex flex-col items-center gap-3">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    Default
                </p>
                <QRCode value="https://vayu-ui.com" />
            </div>

            {/* ── Custom Colors ── */}
            <div className="flex flex-col items-center gap-3">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    Custom Colors
                </p>
                <QRCode
                    value="https://vayu-ui.com"
                    bgColor="#1a1a1a"
                    fgColor="#3b82f6"
                    className="rounded-xl overflow-hidden shadow-lg"
                />
            </div>

            {/* ── With Logo ── */}
            <div className="flex flex-col items-center gap-3">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    With Excavated Logo
                </p>
                <QRCode
                    value="https://vayu-ui.com"
                    size={250}
                    level="H"
                    imageSettings={{
                        src: "https://github.com/shadcn.png",
                        width: 40,
                        height: 40,
                        excavate: true,
                    }}
                    className="border-4 border-white rounded-xl shadow-xl"
                />
            </div>

            {/* ── No Margin ── */}
            <div className="flex flex-col items-center gap-3">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    No Margin
                </p>
                <QRCode
                    value="https://vayu-ui.com"
                    includeMargin={false}
                    className="border border-ground-200 dark:border-ground-800"
                />
            </div>
        </div>
    );
}
