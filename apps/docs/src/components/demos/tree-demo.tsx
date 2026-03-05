"use client";

import { useState, useCallback } from "react";
import { Tree, type TreeNode } from "vayu-ui";
import { Trash2, FilePlus } from "lucide-react";

const fileTree: TreeNode[] = [
    {
        id: "src",
        label: "src",
        children: [
            {
                id: "components",
                label: "components",
                children: [
                    {
                        id: "ui",
                        label: "ui",
                        children: [
                            { id: "button.tsx", label: "button.tsx" },
                            { id: "card.tsx", label: "card.tsx" },
                            { id: "tree.tsx", label: "tree.tsx" },
                        ],
                    },
                    {
                        id: "demos",
                        label: "demos",
                        children: [
                            { id: "button-demo.tsx", label: "button-demo.tsx" },
                            { id: "tree-demo.tsx", label: "tree-demo.tsx" },
                        ],
                    },
                ],
            },
            {
                id: "app",
                label: "app",
                children: [
                    { id: "layout.tsx", label: "layout.tsx" },
                    { id: "page.tsx", label: "page.tsx" },
                    { id: "global.css", label: "global.css" },
                ],
            },
            { id: "lib", label: "lib", children: [{ id: "utils.ts", label: "utils.ts" }] },
        ],
    },
    { id: "package.json", label: "package.json" },
    { id: "tsconfig.json", label: "tsconfig.json" },
    { id: "README.md", label: "README.md", disabled: true },
];

export default function TreeDemo() {
    const [search, setSearch] = useState("");
    const [expandedKeys, setExpandedKeys] = useState<(string | number)[]>(["src", "components"]);
    const [selected, setSelected] = useState<string | number | null>(null);
    const [checked, setChecked] = useState<(string | number)[]>([]);
    const [mode, setMode] = useState<"normal" | "checkbox">("normal");

    const handleExpandAll = useCallback(() => {
        const allIds: (string | number)[] = [];
        const walk = (nodes: TreeNode[]) => {
            nodes.forEach((n) => {
                allIds.push(n.id);
                if (n.children) walk(n.children);
            });
        };
        walk(fileTree);
        setExpandedKeys(allIds);
    }, []);

    const handleCollapseAll = useCallback(() => {
        setExpandedKeys([]);
    }, []);

    const filterTree = useCallback(
        (nodes: TreeNode[], q: string): TreeNode[] => {
            if (!q) return nodes;
            return nodes
                .map((node) => {
                    const childMatch = node.children ? filterTree(node.children, q) : [];
                    if (
                        node.label.toLowerCase().includes(q.toLowerCase()) ||
                        childMatch.length > 0
                    ) {
                        return { ...node, children: childMatch.length ? childMatch : node.children };
                    }
                    return null;
                })
                .filter(Boolean) as TreeNode[];
        },
        []
    );

    const filtered = filterTree(fileTree, search);

    return (
        <div className="not-prose flex flex-col gap-4 w-full max-w-md">
            {/* Mode toggle */}
            <div className="flex gap-2">
                <button
                    onClick={() => setMode("normal")}
                    className={`px-3 py-1.5 text-xs font-secondary font-medium rounded-md transition-colors ${mode === "normal"
                            ? "bg-primary-600 text-white"
                            : "bg-ground-100 dark:bg-ground-800 text-ground-700 dark:text-ground-300"
                        }`}
                >
                    Normal
                </button>
                <button
                    onClick={() => setMode("checkbox")}
                    className={`px-3 py-1.5 text-xs font-secondary font-medium rounded-md transition-colors ${mode === "checkbox"
                            ? "bg-primary-600 text-white"
                            : "bg-ground-100 dark:bg-ground-800 text-ground-700 dark:text-ground-300"
                        }`}
                >
                    Checkbox
                </button>
            </div>

            <Tree
                data={filtered}
                mode={mode}
                expandedKeys={expandedKeys}
                onExpandedChange={setExpandedKeys}
                selectedKey={selected}
                onSelect={(key) => setSelected(key)}
                checkedKeys={checked}
                onCheck={(keys) => setChecked(keys)}
                showLines
                showIcons
                renderActions={(node) =>
                    !node.children ? (
                        <button
                            className="p-1 text-neutral-400 hover:text-red-500 transition-colors"
                            aria-label={`Delete ${node.label}`}
                        >
                            <Trash2 className="w-3 h-3" aria-hidden="true" />
                        </button>
                    ) : (
                        <button
                            className="p-1 text-neutral-400 hover:text-primary-500 transition-colors"
                            aria-label={`Add file to ${node.label}`}
                        >
                            <FilePlus className="w-3 h-3" aria-hidden="true" />
                        </button>
                    )
                }
                aria-label="Project file tree"
            >
                <Tree.Search searchQuery={search} onSearchChange={setSearch} className="mb-3" />
                <Tree.Actions onExpandAll={handleExpandAll} onCollapseAll={handleCollapseAll} className="mb-3" />
                <Tree.Container>
                    <Tree.Nodes nodes={filtered} />
                </Tree.Container>
            </Tree>

            {mode === "normal" && selected && (
                <p className="text-xs font-secondary text-ground-500">
                    Selected: <strong>{String(selected)}</strong>
                </p>
            )}
            {mode === "checkbox" && checked.length > 0 && (
                <p className="text-xs font-secondary text-ground-500">
                    Checked: <strong>{checked.join(", ")}</strong>
                </p>
            )}
        </div>
    );
}
