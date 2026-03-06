"use client";

import React, { useState } from "react";
import { AvatarGroup } from "@/components/ui/avatargroup";

export default function AvatarGroupDemo() {
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [showHiddenUsers, setShowHiddenUsers] = useState(false);

    const users = [
        {
            id: 1,
            username: "John Doe",
            src: "https://github.com/shadcn.png",
            alt: "John Doe",
            status: "online" as const,
        },
        {
            id: 2,
            username: "Jane Smith",
            fallback: "JS",
            status: "offline" as const,
        },
        {
            id: 3,
            username: "Bob Wilson",
            src: "https://github.com/vercel.png",
            alt: "Bob Wilson",
            status: "online" as const,
        },
        {
            id: 4,
            username: "Alice Johnson",
            fallback: "AJ",
            status: "away" as const,
        },
        {
            id: 5,
            username: "Charlie Brown",
            src: "https://github.com/octocat.png",
            status: "busy" as const,
        },
        {
            id: 6,
            username: "David Lee",
            fallback: "DL",
            status: "offline" as const,
        },
    ];

    const handleAvatarClick = (user: { username?: string; id?: number | string | null }, index: number) => {
        setSelectedUser(user.username || `User ${index + 1}`);
    };

    const handleOverflowClick = (hiddenUsers: typeof users) => {
        setShowHiddenUsers(!showHiddenUsers);
        console.log("Hidden users:", hiddenUsers);
    };

    return (
        <div className="flex flex-col not-prose gap-10 w-full max-w-2xl bg-white dark:bg-black p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
            {/* ── Basic Stack ── */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-neutral-500 dark:text-neutral-400">
                    Basic Stack
                </p>
                <AvatarGroup users={users} maxDisplay={4} />
            </div>

            {/* ── Grid Layout ── */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-neutral-500 dark:text-neutral-400">
                    Grid Layout (All Visible)
                </p>
                <div className="max-w-50">
                    <AvatarGroup users={users} layout="grid" maxDisplay={10} />
                </div>
            </div>

            {/* ── Sizing ── */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-neutral-500 dark:text-neutral-400">
                    Sizes
                </p>
                <div className="flex flex-col gap-4">
                    <AvatarGroup users={users.slice(0, 3)} size="small" spacing="tight" />
                    <AvatarGroup users={users.slice(0, 3)} size="medium" />
                    <AvatarGroup users={users.slice(0, 3)} size="large" spacing="loose" />
                    <AvatarGroup users={users.slice(0, 3)} size="xlarge" />
                </div>
            </div>

            {/* ── Interactive Demo ── */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-neutral-500 dark:text-neutral-400">
                    Interactive (Click avatars to select)
                </p>
                <div>
                    <AvatarGroup
                        users={users}
                        maxDisplay={5}
                        onAvatarClick={handleAvatarClick}
                        onOverflowClick={handleOverflowClick}
                    />
                    {selectedUser && (
                        <p className="mt-2 text-sm text-primary-600 dark:text-primary-400">
                            Selected: {selectedUser}
                        </p>
                    )}
                    {showHiddenUsers && (
                        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                            Hidden users menu would appear here
                        </p>
                    )}
                </div>
            </div>

            {/* ── Custom Overflow ── */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-neutral-500 dark:text-neutral-400">
                    Custom Overflow
                </p>
                <AvatarGroup
                    users={users}
                    maxDisplay={3}
                    renderOverflow={(count) => (
                        <span className="text-xs font-bold text-primary-600 dark:text-primary-400">
                            +{count} more
                        </span>
                    )}
                />
            </div>

            {/* ── Status Indicators ── */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-neutral-500 dark:text-neutral-400">
                    Status Indicators
                </p>
                <AvatarGroup
                    users={users.slice(0, 4)}
                    maxDisplay={4}
                />
            </div>
        </div>
    );
}
