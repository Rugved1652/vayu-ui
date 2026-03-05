"use client";

import { RichTextEditor } from "vayu-ui";
import { useState } from "react";

const DEMO_USERS = [
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
    { id: 3, name: "Charlie Brown" },
    { id: 4, name: "Diana Prince" },
    { id: 5, name: "Eve Wilson" },
    { id: 6, name: "Frank Castle" },
];

export default function RichTextEditorDemo() {
    const [markdown, setMarkdown] = useState("");

    const handleImageUpload = async (file: File): Promise<string> => {
        // Simulate upload — in production, upload to your CDN
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
        });
    };

    return (
        <div className="flex flex-col not-prose gap-6 w-full">
            <RichTextEditor
                defaultValue="# Hello World\n\nStart typing here. Use **markdown shortcuts** like `#`, `**`, `>`, or `-` at the start of a line.\n\nType `@` to mention someone."
                placeholder="Start writing…"
                onChange={setMarkdown}
                mentions={DEMO_USERS}
                onImageUpload={handleImageUpload}
                minHeight="250px"
            />

            {/* Markdown output */}
            {markdown && (
                <details className="group">
                    <summary className="text-xs font-secondary font-medium text-ground-500 dark:text-ground-400 cursor-pointer hover:text-ground-700 dark:hover:text-ground-300">
                        View Markdown Output
                    </summary>
                    <pre className="mt-2 p-4 bg-ground-50 dark:bg-ground-900 border border-ground-200 dark:border-ground-800 rounded-lg text-xs font-mono text-ground-700 dark:text-ground-300 overflow-x-auto whitespace-pre-wrap">
                        {markdown}
                    </pre>
                </details>
            )}
        </div>
    );
}
