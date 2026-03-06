"use client";

import { QRCode } from "vayu-ui";

export default function QRCodeDemo() {
    return (
        <div className="w-full max-w-lg not-prose">
            <h2 id="qrcode-demo-label" className="text-xl font-semibold mb-6">
                QRCode Example
            </h2>

            <div className="flex flex-col items-center gap-8 w-full">
                {/* Default */}
                <div className="flex flex-col items-center gap-2">
                    <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                        Default (md)
                    </p>
                    <QRCode value="https://vayu-ui.com" />
                </div>

                {/* Size Variants */}
                <div className="flex flex-col items-center gap-2">
                    <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                        Size Variants
                    </p>
                    <div className="flex items-end gap-4">
                        <QRCode value="https://vayu-ui.com" size="sm" />
                        <QRCode value="https://vayu-ui.com" size="md" />
                        <QRCode value="https://vayu-ui.com" size="lg" />
                    </div>
                </div>

                {/* Custom Colors */}
                <div className="flex flex-col items-center gap-2">
                    <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                        Custom Colors
                    </p>
                    <QRCode
                        value="https://vayu-ui.com"
                        bgColor="#18181b"
                        fgColor="#a3e635"
                        className="rounded overflow-hidden shadow-outer"
                    />
                </div>

                {/* With Logo */}
                <div className="flex flex-col items-center gap-2">
                    <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                        With Excavated Logo
                    </p>
                    <QRCode
                        value="https://vayu-ui.com"
                        size="lg"
                        level="H"
                        imageSettings={{
                            src: "https://github.com/shadcn.png",
                            width: 50,
                            height: 50,
                            excavate: true,
                        }}
                        className="border-4 border-ground-50 rounded shadow-outer"
                    />
                </div>

                {/* No Margin */}
                <div className="flex flex-col items-center gap-2">
                    <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                        No Margin
                    </p>
                    <QRCode
                        value="https://vayu-ui.com"
                        includeMargin={false}
                        className="border border-ground-200 dark:border-ground-800 rounded"
                    />
                </div>

                {/* Empty State */}
                <div className="flex flex-col items-center gap-2">
                    <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                        Empty State
                    </p>
                    <QRCode value="" />
                </div>
            </div>
        </div>
    );
}