"use client";

import React, { useMemo, forwardRef, HTMLAttributes, KeyboardEvent } from "react";
import { Avatar } from "vayu-ui";
import { clsx } from "clsx";

// ============================================================================
// Types
// ============================================================================

export type AvatarGroupSize = "small" | "medium" | "large" | "xlarge";
export type AvatarGroupLayout = "stack" | "grid";

export interface UserData {
    id?: string | number | null;
    src?: string;
    username?: string;
    alt?: string;
    fallback?: string;
    status?: "online" | "offline" | "away" | "busy";
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
    users?: UserData[];
    size?: AvatarGroupSize;
    maxDisplay?: number;
    layout?: AvatarGroupLayout;
    spacing?: "tight" | "normal" | "loose" | number;
    renderOverflow?: (count: number) => React.ReactNode;
    onAvatarClick?: (user: UserData, index: number) => void;
    onOverflowClick?: (hiddenUsers: UserData[]) => void;
}

// ============================================================================
// Component
// ============================================================================

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
    (
        {
            users = [],
            size = "medium",
            maxDisplay = 5,
            layout = "stack",
            spacing = "normal",
            className,
            renderOverflow,
            onAvatarClick,
            onOverflowClick,
            ...props
        },
        ref
    ) => {
        // ------------------------------------------------------------------------
        // Data Processing
        // ------------------------------------------------------------------------

        const visibleUsers = useMemo(
            () => users.slice(0, maxDisplay),
            [users, maxDisplay]
        );
        const hiddenUsers = useMemo(
            () => users.slice(maxDisplay),
            [users, maxDisplay]
        );
        const hasOverflow = hiddenUsers.length > 0;

        // ------------------------------------------------------------------------
        // Spacing Logic
        // ------------------------------------------------------------------------

        const spacingValue = useMemo(() => {
            if (typeof spacing === "number") return spacing;
            const map = {
                tight: -12,
                normal: -8,
                loose: -4,
            };
            return map[spacing];
        }, [spacing]);

        // ------------------------------------------------------------------------
        // Keyboard Navigation (WCAG 2.2)
        // ------------------------------------------------------------------------

        const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                event.preventDefault();
                const focusableElements = Array.from(
                    event.currentTarget.querySelectorAll('[role="button"]')
                );
                const currentIndex = focusableElements.indexOf(event.target as HTMLElement);
                if (currentIndex === -1) return;

                let newIndex = currentIndex;
                if (event.key === "ArrowRight") {
                    newIndex = (currentIndex + 1) % focusableElements.length;
                } else if (event.key === "ArrowLeft") {
                    newIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
                }
                (focusableElements[newIndex] as HTMLElement).focus();
            }
        };

        // ------------------------------------------------------------------------
        // Render
        // ------------------------------------------------------------------------

        return (
            <div
                ref={ref}
                className={clsx(
                    "flex items-center",
                    layout === "grid" && "flex-wrap gap-2",
                    layout === "stack" && "pl-2",
                    className
                )}
                role="group"
                aria-label={`Avatar group with ${users.length} members`}
                onKeyDown={handleKeyDown}
                {...props}
            >
                {visibleUsers.map((user, index) => (
                    <div
                        key={user.id || index}
                        className={clsx(
                            // FIX 1: Added "flex items-center justify-center"
                            // This forces the wrapper to ignore line-height/baseline issues of the Avatar (inline-flex)
                            // ensuring the wrapper height matches the Avatar height exactly (e.g., 48px).
                            "relative flex items-center justify-center",
                            "motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-in-out",
                            layout === "stack" && [
                                "rounded-full ring-2 ring-canvas",
                                "motion-safe:hover:z-20 motion-safe:hover:scale-110 motion-safe:hover:ml-2 motion-safe:hover:mr-2 first:ml-0",
                            ],
                            onAvatarClick && "cursor-pointer"
                        )}
                        style={{
                            zIndex: layout === "stack" ? index + 1 : undefined,
                            marginLeft: index === 0 ? 0 : spacingValue,
                        }}
                    >
                        <Avatar
                            size={size}
                            username={user.username}
                            onClick={onAvatarClick ? () => onAvatarClick(user, index) : undefined}
                            tabIndex={onAvatarClick ? 0 : undefined}
                        >
                            {user.src ? (
                                <Avatar.Image src={user.src} alt="" />
                            ) : (
                                <Avatar.Initials username={user.username || user.fallback || "?"} />
                            )}
                            {user.status && <Avatar.Status status={user.status} />}
                        </Avatar>
                    </div>
                ))}

                {hasOverflow && (
                    <button
                        type="button"
                        className={clsx(
                            "relative flex items-center justify-center rounded-full",
                            "bg-muted text-muted-content",
                            "font-medium",
                            "ring-2 ring-canvas",
                            onOverflowClick && "cursor-pointer hover:bg-muted/80",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2",
                            "focus-visible:ring-offset-canvas",
                            onOverflowClick && "motion-safe:transition-all motion-safe:duration-200",

                            // Sizes match Avatar exactly
                            size === "small" && "w-8 h-8 text-xs",
                            size === "medium" && "w-12 h-12 text-sm",
                            size === "large" && "w-16 h-16 text-lg",
                            size === "xlarge" && "w-24 h-24 text-2xl"
                        )}
                        style={{
                            marginLeft: layout === "stack" ? spacingValue : 0,
                        }}
                        onClick={() => onOverflowClick?.(hiddenUsers)}
                        aria-label={`Show ${hiddenUsers.length} more users`}
                        role="button"
                    >
                        {renderOverflow ? renderOverflow(hiddenUsers.length) : `+${hiddenUsers.length}`}
                    </button>
                )}
            </div>
        );
    }
);

AvatarGroup.displayName = "AvatarGroup";

export { AvatarGroup };