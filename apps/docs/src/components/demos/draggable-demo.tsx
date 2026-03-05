"use client";

import { useState, useCallback } from "react";
import {
    DraggableList,
    DragHandle,
    type DraggableItem,
} from "vayu-ui";
import {
    Mail,
    Image,
    FileText,
    Music,
    Video,
    Archive,
    Star,
    Heart,
    Zap,
} from "lucide-react";

const ICONS: Record<
    string,
    React.ComponentType<{ className?: string }>
> = {
    mail: Mail,
    image: Image,
    document: FileText,
    music: Music,
    video: Video,
    archive: Archive,
    star: Star,
    heart: Heart,
    zap: Zap,
};

type FileItem = DraggableItem & {
    title: string;
    subtitle: string;
    icon: string;
};

const listItems: FileItem[] = [
    { id: "1", title: "Inbox", subtitle: "12 unread", icon: "mail" },
    { id: "2", title: "Photos", subtitle: "3,429 items", icon: "image" },
    { id: "3", title: "Documents", subtitle: "156 files", icon: "document" },
    { id: "4", title: "Music", subtitle: "2,847 tracks", icon: "music" },
    { id: "5", title: "Videos", subtitle: "89 clips", icon: "video" },
    { id: "6", title: "Archives", subtitle: "24 files", icon: "archive" },
];

const gridItems: FileItem[] = [
    { id: "g1", title: "Inbox", subtitle: "12", icon: "mail" },
    { id: "g2", title: "Photos", subtitle: "3,429", icon: "image" },
    { id: "g3", title: "Docs", subtitle: "156", icon: "document" },
    { id: "g4", title: "Music", subtitle: "2,847", icon: "music" },
    { id: "g5", title: "Videos", subtitle: "89", icon: "video" },
    { id: "g6", title: "Archives", subtitle: "24", icon: "archive" },
    { id: "g7", title: "Starred", subtitle: "7", icon: "star" },
    { id: "g8", title: "Favorites", subtitle: "31", icon: "heart" },
    { id: "g9", title: "Quick", subtitle: "5", icon: "zap" },
];

export default function DraggableDemo() {
    const [list, setList] = useState(listItems);
    const [grid, setGrid] = useState(gridItems);

    const handleListReorder = useCallback(
        (items: FileItem[]) => setList(items),
        []
    );
    const handleGridReorder = useCallback(
        (items: FileItem[]) => setGrid(items),
        []
    );

    return (
        <div className="not-prose flex flex-col gap-10 w-full">
            {/* ── List mode ── */}
            <div className="max-w-md">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400 mb-3">
                    List — Drag or keyboard (Space → Arrow ↑↓ → Space)
                </p>

                <DraggableList
                    items={list}
                    onReorder={handleListReorder}
                    aria-label="File categories"
                >
                    {(item, { dragHandleProps }) => {
                        const Icon = ICONS[item.icon] ?? FileText;
                        return (
                            <div className="flex items-center gap-3 p-3 bg-white dark:bg-ground-900 border-2 border-ground-200 dark:border-ground-800 rounded-lg hover:border-ground-300 dark:hover:border-ground-700 transition-colors">
                                <DragHandle
                                    handleProps={dragHandleProps}
                                />
                                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                                    <Icon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-secondary font-semibold text-ground-900 dark:text-ground-100 truncate">
                                        {item.title}
                                    </p>
                                    <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                                        {item.subtitle}
                                    </p>
                                </div>
                            </div>
                        );
                    }}
                </DraggableList>
            </div>

            {/* ── Grid mode ── */}
            <div>
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400 mb-3">
                    Grid — Drag or keyboard (Space → Arrow ←→↑↓ → Space)
                </p>

                <DraggableList
                    items={grid}
                    onReorder={handleGridReorder}
                    direction="grid"
                    columns={3}
                    aria-label="Grid items"
                >
                    {(item, { dragHandleProps }) => {
                        const Icon = ICONS[item.icon] ?? FileText;
                        return (
                            <div className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-ground-900 border-2 border-ground-200 dark:border-ground-800 rounded-xl hover:border-ground-300 dark:hover:border-ground-700 transition-colors">
                                <div className="flex items-center justify-between w-full">
                                    <DragHandle
                                        handleProps={dragHandleProps}
                                    />
                                    <span className="text-[10px] font-secondary text-ground-400">
                                        {item.subtitle}
                                    </span>
                                </div>
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20">
                                    <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                                </div>
                                <p className="text-xs font-secondary font-semibold text-ground-900 dark:text-ground-100">
                                    {item.title}
                                </p>
                            </div>
                        );
                    }}
                </DraggableList>
            </div>
        </div>
    );
}
