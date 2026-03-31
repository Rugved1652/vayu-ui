// avatar-item.tsx
// UI: Individual avatar wrapper

"use client";

import { forwardRef, HTMLAttributes } from "react";
import { Avatar } from "vayu-ui";
import { clsx } from "clsx";
import type { UserData, AvatarGroupSize, AvatarGroupLayout } from "./types";

interface AvatarItemProps extends Omit<HTMLAttributes<HTMLDivElement>, "onClick"> {
    user: UserData;
    index: number;
    size: AvatarGroupSize;
    layout: AvatarGroupLayout;
    spacingValue: number;
    onAvatarClick?: (user: UserData, index: number) => void;
}

export const AvatarItem = forwardRef<HTMLDivElement, AvatarItemProps>(
    (
        {
            user,
            index,
            size,
            layout,
            spacingValue,
            onAvatarClick,
            className,
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={clsx(
                    // Layout: Forces wrapper to match Avatar height exactly
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
                {...props}
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
                        <Avatar.Initials
                            username={user.username || user.fallback || "?"}
                        />
                    )}
                    {user.status && <Avatar.Status status={user.status} />}
                </Avatar>
            </div>
        );
    }
);

AvatarItem.displayName = "AvatarItem";
