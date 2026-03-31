// qrcode.tsx
// Composition: UI + logic

"use client";
import React, { useMemo } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { forwardRef, HTMLAttributes } from "react";
import { encodeQR } from "./encoder";
import type { ErrorCorrectionLevel, QRCodeImageSettings } from "./types";

export const qrcodeVariants = cva("inline-block", {
    variants: {
        size: {
            sm: "",
            md: "",
            lg: "",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

const sizeMap = {
    sm: 128,
    md: 200,
    lg: 300,
} as const;

export interface QRCodeProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "children">,
        VariantProps<typeof qrcodeVariants> {
    /** Data to encode in the QR code */
    value: string;
    /** Width & height in pixels (default 200) */
    qrSize?: number;
    /** Error correction level (default "M") */
    level?: ErrorCorrectionLevel;
    /** Background color (uses design token by default) */
    bgColor?: string;
    /** Foreground / module color (uses design token by default) */
    fgColor?: string;
    /** Add quiet-zone margin (default true) */
    includeMargin?: boolean;
    /** Center logo overlay */
    imageSettings?: QRCodeImageSettings;
}

const QRCode = forwardRef<HTMLDivElement, QRCodeProps>(
    (
        {
            value,
            size = "md",
            qrSize,
            level = "M",
            bgColor,
            fgColor,
            includeMargin = true,
            imageSettings,
            className,
            "aria-label": ariaLabel,
            ...props
        },
        ref
    ) => {
        const computedSize = qrSize ?? sizeMap[size ?? "md"];

        // Default colors using CSS custom properties that map to design tokens
        // Falls back to sensible defaults for QR scannability
        const resolvedBgColor = bgColor ?? "var(--color-ground-50, #fafafa)";
        const resolvedFgColor = fgColor ?? "var(--color-ground-950, #09090b)";

        const { cells, numCells } = useMemo(() => {
            if (!value) return { cells: [] as boolean[][], numCells: 0 };
            const matrix = encodeQR(value, level);
            return { cells: matrix, numCells: matrix.length };
        }, [value, level]);

        const margin = includeMargin ? 4 : 0;
        const viewBoxSize = numCells + margin * 2;
        const cellSize = 1;

        // Determine which cells to excavate (clear) for the center logo
        // Must be called before any early returns to satisfy Rules of Hooks
        const excavatedCells = useMemo(() => {
            if (!imageSettings?.excavate || numCells === 0) return new Set<string>();
            const imgW = (imageSettings.width / computedSize) * viewBoxSize;
            const imgH = (imageSettings.height / computedSize) * viewBoxSize;
            const startX = Math.floor((viewBoxSize - imgW) / 2) - margin;
            const startY = Math.floor((viewBoxSize - imgH) / 2) - margin;
            const endX = Math.ceil(startX + imgW);
            const endY = Math.ceil(startY + imgH);

            const set = new Set<string>();
            for (let r = Math.max(0, startY); r < Math.min(numCells, endY); r++) {
                for (
                    let c = Math.max(0, startX);
                    c < Math.min(numCells, endX);
                    c++
                ) {
                    set.add(`${r},${c}`);
                }
            }
            return set;
        }, [imageSettings, computedSize, viewBoxSize, margin, numCells]);

        if (!value || numCells === 0) {
            return (
                <div
                    ref={ref}
                    className={clsx(
                        qrcodeVariants({ size }),
                        "inline-flex items-center justify-center bg-ground-100 dark:bg-ground-800 rounded",
                        className
                    )}
                    style={{ width: computedSize, height: computedSize }}
                    role="img"
                    aria-label={ariaLabel ?? "Empty QR code"}
                    {...props}
                >
                    <span className="text-ground-400 dark:text-ground-500 text-sm font-secondary">
                        No data
                    </span>
                </div>
            );
        }

        return (
            <div
                ref={ref}
                className={clsx(qrcodeVariants({ size }), className)}
                role="img"
                aria-label={ariaLabel ?? `QR code for: ${value}`}
                {...props}
            >
                <svg
                    width={computedSize}
                    height={computedSize}
                    viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
                    xmlns="http://www.w3.org/2000/svg"
                    shapeRendering="crispEdges"
                >
                    {/* Background */}
                    <rect
                        width={viewBoxSize}
                        height={viewBoxSize}
                        fill={resolvedBgColor}
                    />

                    {/* QR modules */}
                    {cells.map((row, r) =>
                        row.map((cell, c) => {
                            if (!cell) return null;
                            if (excavatedCells.has(`${r},${c}`)) return null;
                            return (
                                <rect
                                    key={`${r}-${c}`}
                                    x={c + margin}
                                    y={r + margin}
                                    width={cellSize}
                                    height={cellSize}
                                    fill={resolvedFgColor}
                                />
                            );
                        })
                    )}

                    {/* Center logo */}
                    {imageSettings && (
                        <image
                            href={imageSettings.src}
                            x={
                                (viewBoxSize -
                                    (imageSettings.width / computedSize) *
                                    viewBoxSize) /
                                2
                            }
                            y={
                                (viewBoxSize -
                                    (imageSettings.height / computedSize) *
                                    viewBoxSize) /
                                2
                            }
                            width={
                                (imageSettings.width / computedSize) * viewBoxSize
                            }
                            height={
                                (imageSettings.height / computedSize) * viewBoxSize
                            }
                            preserveAspectRatio="xMidYMid meet"
                        />
                    )}
                </svg>
            </div>
        );
    }
);

QRCode.displayName = "QRCode";

export { QRCode };
