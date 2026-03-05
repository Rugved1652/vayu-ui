"use client";

import { useState, useCallback } from "react";
import { FloatingDock, type DockItem } from "vayu-ui";
import {
    Home,
    Search,
    Bell,
    Settings,
    User,
    Mail,
    Heart,
} from "lucide-react";

const dockItems: DockItem[] = [
    { label: "logo", logoText: "Vayu UI", href: "/" },
    { label: "divider" },
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Search" },
    { icon: Mail, label: "Messages" },
    { icon: Bell, label: "Notifications" },
    { icon: Heart, label: "Favorites" },
    { label: "divider" },
    { icon: User, label: "Profile" },
    { icon: Settings, label: "Settings" },
];

export default function FloatingDockDemo() {
    const [lastAction, setLastAction] = useState("");

    const handleClick = useCallback((label: string) => {
        setLastAction(`Clicked: ${label}`);
    }, []);

    const items: DockItem[] = dockItems.map((item) =>
        item.label !== "divider" && item.label !== "logo" && !item.href
            ? { ...item, onClick: () => handleClick(item.label) }
            : item
    );

    return (
        <div className="not-prose flex flex-col items-center gap-6 w-full">
            <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                The dock is fixed to the top of the viewport. Hover or
                focus any item to see its tooltip.
            </p>

            <FloatingDock items={items} aria-label="Demo navigation" />

            {lastAction && (
                <p className="text-sm font-secondary text-primary-600 dark:text-primary-400">
                    {lastAction}
                </p>
            )}
        </div>
    );
}
