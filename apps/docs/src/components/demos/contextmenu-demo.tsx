"use client";

import { useState } from "react";
import { ContextMenu } from "vayu-ui";
import { Copy, Scissors, ClipboardPaste, Trash2, RotateCcw, Share } from "lucide-react";

export default function ContextMenuDemo() {
    const [showBookmarks, setShowBookmarks] = useState(true);
    const [showUrls, setShowUrls] = useState(false);
    const [person, setPerson] = useState("andy");

    return (
        <div className="not-prose flex flex-col gap-8 w-full max-w-md">
            <p className="text-sm font-secondary text-ground-500 dark:text-ground-400">
                Right-click the area below to open the context menu.
            </p>

            <ContextMenu>
                <ContextMenu.Trigger>
                    <div className="flex items-center justify-center h-40 rounded-lg border-2 border-dashed border-ground-300 dark:border-ground-700 bg-ground-50 dark:bg-ground-900 select-none">
                        <span className="text-sm font-secondary text-ground-500 dark:text-ground-400">
                            Right-click here
                        </span>
                    </div>
                </ContextMenu.Trigger>

                <ContextMenu.Content>
                    <ContextMenu.Item
                        icon={<RotateCcw className="w-4 h-4" />}
                        shortcut="⌘Z"
                        onSelect={() => console.log("Undo")}
                    >
                        Undo
                    </ContextMenu.Item>
                    <ContextMenu.Item
                        icon={<RotateCcw className="w-4 h-4 -scale-x-100" />}
                        shortcut="⌘⇧Z"
                        onSelect={() => console.log("Redo")}
                    >
                        Redo
                    </ContextMenu.Item>

                    <ContextMenu.Separator />

                    <ContextMenu.Item
                        icon={<Scissors className="w-4 h-4" />}
                        shortcut="⌘X"
                        onSelect={() => console.log("Cut")}
                    >
                        Cut
                    </ContextMenu.Item>
                    <ContextMenu.Item
                        icon={<Copy className="w-4 h-4" />}
                        shortcut="⌘C"
                        onSelect={() => console.log("Copy")}
                    >
                        Copy
                    </ContextMenu.Item>
                    <ContextMenu.Item
                        icon={<ClipboardPaste className="w-4 h-4" />}
                        shortcut="⌘V"
                        onSelect={() => console.log("Paste")}
                    >
                        Paste
                    </ContextMenu.Item>

                    <ContextMenu.Separator />

                    <ContextMenu.Label>View Options</ContextMenu.Label>
                    <ContextMenu.CheckboxItem
                        checked={showBookmarks}
                        onCheckedChange={setShowBookmarks}
                    >
                        Show Bookmarks Bar
                    </ContextMenu.CheckboxItem>
                    <ContextMenu.CheckboxItem
                        checked={showUrls}
                        onCheckedChange={setShowUrls}
                    >
                        Show Full URLs
                    </ContextMenu.CheckboxItem>

                    <ContextMenu.Separator />

                    <ContextMenu.Label>Assignee</ContextMenu.Label>
                    <ContextMenu.RadioGroup
                        value={person}
                        onValueChange={setPerson}
                    >
                        <ContextMenu.RadioItem value="andy">
                            Andy
                        </ContextMenu.RadioItem>
                        <ContextMenu.RadioItem value="pedro">
                            Pedro
                        </ContextMenu.RadioItem>
                        <ContextMenu.RadioItem value="colm">
                            Colm
                        </ContextMenu.RadioItem>
                    </ContextMenu.RadioGroup>

                    <ContextMenu.Separator />

                    <ContextMenu.Item
                        icon={<Share className="w-4 h-4" />}
                        onSelect={() => console.log("Share")}
                    >
                        Share&hellip;
                    </ContextMenu.Item>
                    <ContextMenu.Item
                        icon={<Trash2 className="w-4 h-4" />}
                        destructive
                        onSelect={() => console.log("Delete")}
                    >
                        Delete
                    </ContextMenu.Item>
                    <ContextMenu.Item disabled>
                        Disabled Item
                    </ContextMenu.Item>
                </ContextMenu.Content>
            </ContextMenu>
        </div>
    );
}
