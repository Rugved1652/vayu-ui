"use client";

import { useState, useCallback } from "react";
import { FloatingDock } from "vayu-ui";
import {
    Home,
    Search,
    Bell,
    Settings,
    User,
    Mail,
    Heart,
} from "lucide-react";

export default function FloatingDockDemo() {
    const [lastAction, setLastAction] = useState("");

    const handleClick = useCallback((label: string) => {
        setLastAction(`Clicked: ${label}`);
    }, []);

    return (
        <div className="not-prose flex flex-col items-center gap-6 w-full">
            <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                The dock is fixed to the top of the viewport. Hover or focus any item to see its tooltip.
            </p>

            <FloatingDock aria-label="Demo navigation">
                <FloatingDock.Container>
                    <FloatingDock.Logo href="/">Vayu UI</FloatingDock.Logo>
                    <FloatingDock.Divider />
                    <FloatingDock.Item icon={Search} label="Search" onClick={() => handleClick("Search")} />
                    <FloatingDock.Item icon={Mail} label="Messages" onClick={() => handleClick("Messages")} />
                    <FloatingDock.Item icon={Bell} label="Notifications" onClick={() => handleClick("Notifications")} />
                    <FloatingDock.Item icon={Heart} label="Favorites" onClick={() => handleClick("Favorites")} />
                    <FloatingDock.Divider />
                    <FloatingDock.Item icon={User} label="Profile" onClick={() => handleClick("Profile")} />
                    <FloatingDock.Item icon={Settings} label="Settings" onClick={() => handleClick("Settings")} />
                </FloatingDock.Container>
            </FloatingDock>

            {lastAction && (
                <p className="text-sm font-secondary text-primary-600 dark:text-primary-400">
                    {lastAction}
                </p>
            )}
        </div>
    );
}
