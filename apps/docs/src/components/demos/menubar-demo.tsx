"use client";
import React, { useState } from "react";
import { Menubar } from "vayu-ui";
import {
    File,
    FolderOpen,
    Save,
    Printer,
    Scissors,
    Copy,
    Clipboard,
    Undo,
    Redo,
    Share2,
    Trash2,
    Bold,
    Italic,
    Underline
} from "lucide-react";

export default function MenubarDemo() {
    const [showStatusBar, setShowStatusBar] = useState(true);
    const [showActivityBar, setShowActivityBar] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    const [zoomLevel, setZoomLevel] = useState("100%");

    return (
        <div className="w-full min-h-screen p-8 bg-neutral-50 dark:bg-neutral-950">
            {/* Header Section with Menubar */}
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">Portal-Based Menubar Demo</h1>
                    <p className="text-neutral-600 dark:text-neutral-400">
                        Scroll down to see how the menu follows the trigger element
                    </p>
                </div>

                <div className="flex justify-center items-start p-8 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 mb-8">
                    <Menubar>
                        <Menubar.Menu trigger="File">
                            <Menubar.Item icon={<File size={14} />} shortcut="⌘N">
                                New Tab
                            </Menubar.Item>
                            <Menubar.Item icon={<FolderOpen size={14} />} shortcut="⌘O">
                                Open File...
                            </Menubar.Item>
                            <Menubar.Item icon={<Save size={14} />} shortcut="⌘S" disabled>
                                Save
                            </Menubar.Item>
                            <Menubar.Separator />
                            <Menubar.SubMenu trigger="Share">
                                <Menubar.Item icon={<Share2 size={14} />}>Email Link</Menubar.Item>
                                <Menubar.Item>Messages</Menubar.Item>
                                <Menubar.SubMenu trigger="Social Media">
                                    <Menubar.Item>Twitter</Menubar.Item>
                                    <Menubar.Item>Facebook</Menubar.Item>
                                    <Menubar.Item>LinkedIn</Menubar.Item>
                                </Menubar.SubMenu>
                                <Menubar.Item>Notes</Menubar.Item>
                            </Menubar.SubMenu>
                            <Menubar.Separator />
                            <Menubar.Item icon={<Printer size={14} />} shortcut="⌘P">
                                Print...
                            </Menubar.Item>
                        </Menubar.Menu>

                        <Menubar.Menu trigger="Edit">
                            <Menubar.Item icon={<Undo size={14} />} shortcut="⌘Z">Undo</Menubar.Item>
                            <Menubar.Item icon={<Redo size={14} />} shortcut="⇧⌘Z">Redo</Menubar.Item>
                            <Menubar.Separator />
                            <Menubar.Item icon={<Scissors size={14} />} shortcut="⌘X">Cut</Menubar.Item>
                            <Menubar.Item icon={<Copy size={14} />} shortcut="⌘C">Copy</Menubar.Item>
                            <Menubar.Item icon={<Clipboard size={14} />} shortcut="⌘V">Paste</Menubar.Item>
                            <Menubar.Separator />
                            <Menubar.SubMenu trigger="Find">
                                <Menubar.Item>Find...</Menubar.Item>
                                <Menubar.Item>Find Next</Menubar.Item>
                                <Menubar.Item>Find Previous</Menubar.Item>
                                <Menubar.Item>Replace...</Menubar.Item>
                            </Menubar.SubMenu>
                        </Menubar.Menu>

                        <Menubar.Menu trigger="View">
                            <Menubar.CheckboxItem
                                checked={showStatusBar}
                                onCheckedChange={setShowStatusBar}
                                shortcut="⌘/"
                            >
                                Show Status Bar
                            </Menubar.CheckboxItem>
                            <Menubar.CheckboxItem
                                checked={showActivityBar}
                                onCheckedChange={setShowActivityBar}
                                disabled
                            >
                                Show Activity Bar
                            </Menubar.CheckboxItem>
                            <Menubar.CheckboxItem
                                checked={showPanel}
                                onCheckedChange={setShowPanel}
                            >
                                Show Panel
                            </Menubar.CheckboxItem>
                            <Menubar.Separator />
                            <Menubar.Label>Zoom</Menubar.Label>
                            <Menubar.RadioGroup value={zoomLevel} onValueChange={setZoomLevel}>
                                <Menubar.RadioItem value="50%">50%</Menubar.RadioItem>
                                <Menubar.RadioItem value="100%">100%</Menubar.RadioItem>
                                <Menubar.RadioItem value="200%">200%</Menubar.RadioItem>
                            </Menubar.RadioGroup>
                        </Menubar.Menu>

                        <Menubar.Menu trigger="Format">
                            <Menubar.Item icon={<Bold size={14} />} shortcut="⌘B">Bold</Menubar.Item>
                            <Menubar.Item icon={<Italic size={14} />} shortcut="⌘I">Italic</Menubar.Item>
                            <Menubar.Item icon={<Underline size={14} />} shortcut="⌘U">Underline</Menubar.Item>
                            <Menubar.Separator />
                            <Menubar.Item danger icon={<Trash2 size={14} />}>Clear Formatting</Menubar.Item>
                        </Menubar.Menu>

                        <Menubar.Menu trigger="Help">
                            <Menubar.Item>Documentation</Menubar.Item>
                            <Menubar.Item>Feedback</Menubar.Item>
                            <Menubar.Separator />
                            <Menubar.Item>About Vayu UI</Menubar.Item>
                        </Menubar.Menu>
                    </Menubar>
                </div>

                {/* Content Section to demonstrate scrolling */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg border border-neutral-200 dark:border-neutral-800">
                        <h2 className="text-xl font-semibold mb-4">Key Features</h2>
                        <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                            <li>✨ Portal-based rendering - menus render at document.body level</li>
                            <li>🔄 Scroll-aware positioning - menus follow the trigger element</li>
                            <li>🎯 Hydration-safe - no SSR/hydration mismatches</li>
                            <li>⌨️ Full keyboard navigation support</li>
                            <li>🎨 Theme support (light/dark)</li>
                            <li>📱 Responsive and accessible</li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg border border-neutral-200 dark:border-neutral-800">
                        <h2 className="text-xl font-semibold mb-4">Technical Implementation</h2>
                        <div className="space-y-3 text-neutral-600 dark:text-neutral-400">
                            <p>
                                <strong>useElementPosition Hook:</strong> Custom hook that tracks the trigger element's position
                                and updates on scroll/resize events using requestAnimationFrame for smooth updates.
                            </p>
                            <p>
                                <strong>Portal Component:</strong> Wraps React's createPortal with hydration safety.
                                Uses useState and useEffect to ensure mounting only happens on the client.
                            </p>
                            <p>
                                <strong>Fixed Positioning:</strong> Menus use fixed positioning with absolute coordinates
                                calculated from the trigger's bounding rect plus scroll offsets.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg border border-neutral-200 dark:border-neutral-800">
                        <h2 className="text-xl font-semibold mb-4">Current State</h2>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded">
                                <div className="font-medium mb-1">Status Bar</div>
                                <div className={showStatusBar ? "text-green-600" : "text-red-600"}>
                                    {showStatusBar ? "Visible" : "Hidden"}
                                </div>
                            </div>
                            <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded">
                                <div className="font-medium mb-1">Activity Bar</div>
                                <div className="text-neutral-400">
                                    {showActivityBar ? "Visible" : "Hidden"} (Disabled)
                                </div>
                            </div>
                            <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded">
                                <div className="font-medium mb-1">Panel</div>
                                <div className={showPanel ? "text-green-600" : "text-red-600"}>
                                    {showPanel ? "Visible" : "Hidden"}
                                </div>
                            </div>
                            <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded">
                                <div className="font-medium mb-1">Zoom Level</div>
                                <div className="text-blue-600">{zoomLevel}</div>
                            </div>
                        </div>
                    </div>

                    {/* Spacer content to enable scrolling */}
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-neutral-900 p-6 rounded-lg border border-neutral-200 dark:border-neutral-800"
                        >
                            <h3 className="text-lg font-semibold mb-2">Section {i + 1}</h3>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                This is additional content to demonstrate scrolling behavior.
                                Try opening a menu and scrolling - the menu will stay positioned
                                relative to its trigger element thanks to the portal implementation
                                and position tracking.
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}