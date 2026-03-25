"use client";

import { useState, useCallback } from "react";
import { FloatingDock, Typography } from "vayu-ui";
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
            <Typography.P variant="secondary" className="text-xs text-center">
                The dock is fixed to the top of the viewport. Hover or focus any item to see its tooltip.
            </Typography.P>

            <FloatingDock aria-label="Demo navigation">
                <FloatingDock.Container>
                    <FloatingDock.Logo href="/">Vayu UI</FloatingDock.Logo>
                    <FloatingDock.Divider orientation="vertical" spacing="none" decorative />
                    <FloatingDock.Item icon={Search} label="Search" onClick={() => handleClick("Search")} />
                    <FloatingDock.Item icon={Mail} label="Messages" onClick={() => handleClick("Messages")} />
                    <FloatingDock.Item icon={Bell} label="Notifications" onClick={() => handleClick("Notifications")} />
                    <FloatingDock.Item icon={Heart} label="Favorites" onClick={() => handleClick("Favorites")} />
                    <FloatingDock.Divider orientation="vertical" spacing="none" decorative />
                    <FloatingDock.Item icon={User} label="Profile" onClick={() => handleClick("Profile")} />
                    <FloatingDock.Item icon={Settings} label="Settings" onClick={() => handleClick("Settings")} />
                </FloatingDock.Container>
            </FloatingDock>

            {lastAction && (
                <Typography.P className="text-sm text-brand text-center">
                    {lastAction}
                </Typography.P>
            )}
        </div>
    );
}
