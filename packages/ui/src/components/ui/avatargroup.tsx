"use client";

import { Avatar } from "./avatar";
import { clsx } from "clsx";
import {
    Children,
    cloneElement,
    CSSProperties,
    forwardRef,
    HTMLAttributes,
    isValidElement,
    ReactElement,
    useMemo,
} from "react";

// ============================================================================
// Types
// ============================================================================

export type AvatarGroupSize = "sm" | "md" | "lg" | "xl";
export type AvatarGroupLayout = "stack" | "grid";

export interface UserData {
    id?: string | number | null;
    src?: string;
    username?: string;
    alt?: string;
    fallback?: string;
    isOnline?: boolean;
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
            size = "md",
            maxDisplay = 5,
            layout = "stack",
            spacing = "normal",
            className,
            renderOverflow,
            onAvatarClick,
            onOverflowClick,
            children,
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

        const avatarStyle: CSSProperties | undefined =
            layout === "stack" ? { marginLeft: spacingValue } : undefined;

        // ------------------------------------------------------------------------
        // Render
        // ------------------------------------------------------------------------

        return (
            <div
                ref={ref}
                className={clsx(
                    "flex items-center",
                    layout === "grid" && "flex-wrap gap-2",
                    layout === "stack" && "pl-2", // compensator for negative margin
                    className
                )}
                role="group"
                aria-label={`Avatar group with ${users.length} members`}
                {...props}
            >
                {/* Visible Avatars */}
                {visibleUsers.map((user, index) => (
                    <div
                        key={user.id || index}
                        className={clsx(
                            "relative transition-all duration-200 ease-in-out",
                            layout === "stack" && "hover:z-10 hover:scale-110 hover:ml-2 hover:mr-2 first:ml-0", // Hover effects for stack
                            layout === "stack" && "rounded-full ring-2 ring-white dark:ring-ground-950", // Border separation
                            onAvatarClick && "cursor-pointer"
                        )}
                        style={{
                            zIndex: layout === "stack" ? visibleUsers.length - index : undefined,
                            marginLeft: index === 0 ? 0 : avatarStyle?.marginLeft,
                        }}
                        onClick={() => onAvatarClick?.(user, index)}
                    >
                        <Avatar
                            size={size as any}
                            username={user.username}
                            className="pointer-events-none"
                        >
                            {user.src ? (
                                <Avatar.Image src={user.src} alt={user.alt || user.username} />
                            ) : (
                                <Avatar.Initials username={user.username || user.fallback || "?"} />
                            )}
                            {user.isOnline !== undefined && (
                                <Avatar.Status status={user.isOnline ? "online" : "offline"} />
                            )}
                        </Avatar>
                    </div>
                ))}

                {/* Overflow */}
                {hasOverflow && (
                    <div
                        className={clsx(
                            "relative flex items-center justify-center rounded-full bg-ground-200 dark:bg-ground-800 text-ground-600 dark:text-ground-300 font-medium text-xs ring-2 ring-white dark:ring-ground-950",
                            layout === "stack" && "hover:z-10",
                            onOverflowClick && "cursor-pointer hover:bg-ground-300 dark:hover:bg-ground-700",
                            // Sizes matching Avatar
                            size === "sm" && "w-8 h-8",
                            size === "md" && "w-10 h-10",
                            size === "lg" && "w-12 h-12",
                            size === "xl" && "w-14 h-14"
                        )}
                        style={{
                            marginLeft: layout === "stack" ? spacingValue : 0,
                        }}
                        onClick={() => onOverflowClick?.(hiddenUsers)}
                    >
                        {renderOverflow ? renderOverflow(hiddenUsers.length) : `+${hiddenUsers.length}`}
                    </div>
                )}
            </div>
        );
    }
);

AvatarGroup.displayName = "AvatarGroup";

export { AvatarGroup };
