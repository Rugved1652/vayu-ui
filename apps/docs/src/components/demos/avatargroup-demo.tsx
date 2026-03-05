"use client";

import { AvatarGroup } from "vayu-ui";

export default function AvatarGroupDemo() {
    const users = [
        {
            id: 1,
            username: "John Doe",
            src: "https://github.com/shadcn.png",
            alt: "John Doe",
            isOnline: true,
        },
        {
            id: 2,
            username: "Jane Smith",
            fallback: "JS",
            isOnline: false,
        },
        {
            id: 3,
            username: "Bob Wilson",
            src: "https://github.com/vercel.png",
            alt: "Bob Wilson",
            isOnline: true,
        },
        {
            id: 4,
            username: "Alice Johnson",
            fallback: "AJ",
        },
        {
            id: 5,
            username: "Charlie Brown",
            src: "https://github.com/octocat.png",
        },
        {
            id: 6,
            username: "David Lee",
            fallback: "DL",
        },
    ];

    return (
        <div className="flex flex-col not-prose gap-10">
            {/* ── Basic Stack ── */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    Basic Stack
                </p>
                <AvatarGroup users={users} maxDisplay={4} />
            </div>

            {/* ── Grid Layout ── */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    Grid Layout (All Visible)
                </p>
                <div className="max-w-[200px]">
                    <AvatarGroup users={users} layout="grid" maxDisplay={10} />
                </div>
            </div>

            {/* ── Sizing ── */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    Sizes
                </p>
                <div className="flex flex-col gap-4">
                    <AvatarGroup users={users.slice(0, 3)} size="sm" spacing="tight" />
                    <AvatarGroup users={users.slice(0, 3)} size="md" />
                    <AvatarGroup users={users.slice(0, 3)} size="lg" spacing="loose" />
                </div>
            </div>

            {/* ── Custom Overflow ── */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    Custom Overflow
                </p>
                <AvatarGroup
                    users={users}
                    maxDisplay={3}
                    renderOverflow={(count) => (
                        <span className="text-xs font-bold text-primary-500">
                            +{count} hidden
                        </span>
                    )}
                />
            </div>
        </div>
    );
}
