// hovercard.tsx
// Composition: UI + wiring

"use client";

import { cn } from "../utils";
import React, { forwardRef, useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HoverCardArrow } from "./arrow";
import { useHoverCardOpen, useHoverCardPosition } from "./hooks";
import type { HoverCardProps } from "./types";

const HoverCard = forwardRef<HTMLDivElement, HoverCardProps>(
    (
        {
            children,
            content,
            side = "bottom",
            align = "center",
            sideOffset = 8,
            alignOffset = 0,
            openDelay = 200,
            closeDelay = 300,
            className,
            contentClassName,
            disabled = false,
            showArrow = true,
            ...props
        },
        ref
    ) => {
        const [mounted, setMounted] = useState(false);
        const triggerRef = useRef<HTMLDivElement>(null);
        const contentRef = useRef<HTMLDivElement>(null);

        const cardId = useId();

        const { isOpen, open, close } = useHoverCardOpen({
            disabled,
            openDelay,
            closeDelay,
        });

        const { position, currentSide, arrowPosition, positioned } =
            useHoverCardPosition({
                side,
                align,
                sideOffset,
                alignOffset,
                showArrow,
                triggerRef,
                contentRef,
                isOpen,
            });

        useEffect(() => {
            setMounted(true);
        }, []);

        // ------------------------------------------------------------------
        // Ref merge
        // ------------------------------------------------------------------
        const setRefs = useCallback(
            (node: HTMLDivElement | null) => {
                (triggerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                if (typeof ref === "function") {
                    ref(node);
                } else if (ref) {
                    (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
                }
            },
            [ref]
        );

        return (
            <>
                {/* Trigger */}
                <div
                    ref={setRefs}
                    onMouseEnter={open}
                    onMouseLeave={close}
                    onFocus={open}
                    onBlur={close}
                    className={cn("inline-block", className)}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    aria-describedby={isOpen ? cardId : undefined}
                    {...props}
                >
                    {children}
                </div>

                {/* Portal card */}
                {mounted &&
                    isOpen &&
                    createPortal(
                        <div
                            ref={contentRef}
                            id={cardId}
                            onMouseEnter={open}
                            onMouseLeave={close}
                            style={{
                                position: "fixed",
                                top: `${position.top}px`,
                                left: `${position.left}px`,
                                zIndex: 50,
                                opacity: positioned ? 1 : 0,
                            }}
                            className={cn(
                                "bg-elevated border border-border rounded-overlay shadow-elevated p-4",
                                positioned && "animate-in fade-in-0 zoom-in-95 duration-200",
                                contentClassName
                            )}
                        >
                            {/* Arrow */}
                            {showArrow && (
                                <HoverCardArrow
                                    side={currentSide}
                                    position={arrowPosition}
                                />
                            )}

                            {/* Content */}
                            <div className="relative z-10 font-secondary text-elevated-content">
                                {content}
                            </div>
                        </div>,
                        document.body
                    )}
            </>
        );
    }
);

HoverCard.displayName = "HoverCard";

export { HoverCard };
