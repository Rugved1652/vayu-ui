// avatargroup.tsx
// Composition: UI + logic

"use client";

import React, { useMemo, forwardRef, HTMLAttributes } from "react";
import { clsx } from "clsx";
import type { AvatarGroupProps, UserData } from "./types";
import { AvatarItem } from "./avatar-item";
import { OverflowButton } from "./overflow-button";
import { useSpacing, useKeyboardNavigation } from "./hooks";

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
        // Hooks
        // ------------------------------------------------------------------------

        const spacingValue = useSpacing(spacing);
        const handleKeyDown = useKeyboardNavigation();

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
                    <AvatarItem
                        key={user.id || index}
                        user={user}
                        index={index}
                        size={size}
                        layout={layout}
                        spacingValue={spacingValue}
                        onAvatarClick={onAvatarClick}
                    />
                ))}

                {hasOverflow && (
                    <OverflowButton
                        count={hiddenUsers.length}
                        size={size}
                        spacingValue={spacingValue}
                        layout={layout}
                        renderOverflow={renderOverflow}
                        onOverflowClick={onOverflowClick ? () => onOverflowClick(hiddenUsers) : undefined}
                    />
                )}
            </div>
        );
    }
);

AvatarGroup.displayName = "AvatarGroup";

export default AvatarGroup;
export { AvatarGroup };
