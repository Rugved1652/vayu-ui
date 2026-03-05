"use client";

import { clsx } from "clsx";
import { forwardRef, HTMLAttributes, useCallback, useEffect, useMemo, useRef, useState } from "react";

// ── Lexical Core ──
import { $getRoot, $getSelection, $isRangeSelection, $createParagraphNode, $createTextNode, EditorState, LexicalEditor, FORMAT_TEXT_COMMAND, TextFormatType, COMMAND_PRIORITY_LOW, KEY_ENTER_COMMAND, createCommand, LexicalCommand, $isTextNode } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";

// ── Lexical Extensions ──
import { HeadingNode, QuoteNode, $createHeadingNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { $convertToMarkdownString, $convertFromMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { $generateHtmlFromNodes } from "@lexical/html";
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list";

// ============================================================================
// Types
// ============================================================================

export interface MentionUser {
    id: string | number;
    name: string;
    avatar?: string;
}

export interface RichTextEditorProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    /** Initial content as markdown. */
    defaultValue?: string;
    /** Placeholder text. */
    placeholder?: string;
    /** Called on every change with markdown string. */
    onChange?: (markdown: string) => void;
    /** Called on every change with HTML string. */
    onHtmlChange?: (html: string) => void;
    /** Called on every change with editor state. */
    onEditorStateChange?: (state: EditorState) => void;
    /** List of mentionable users. */
    mentions?: MentionUser[];
    /** Called when an image is inserted (e.g. from a file picker). */
    onImageUpload?: (file: File) => Promise<string>;
    /** Disabled state. */
    disabled?: boolean;
    /** Min height of the editing area. */
    minHeight?: string;
    /** Expose editor instance via ref callback. */
    editorRef?: (editor: LexicalEditor) => void;
}

// ============================================================================
// Mention Node
// ============================================================================

import { DecoratorNode, NodeKey, SerializedLexicalNode, Spread, DOMExportOutput, DOMConversionMap, LexicalNode } from "lexical";
import React from "react";

type SerializedMentionNode = Spread<
    { mentionName: string; mentionId: string | number; type: "mention"; version: 1 },
    SerializedLexicalNode
>;

class MentionNode extends DecoratorNode<React.JSX.Element> {
    __mentionName: string;
    __mentionId: string | number;

    static getType(): string {
        return "mention";
    }

    static clone(node: MentionNode): MentionNode {
        return new MentionNode(node.__mentionName, node.__mentionId, node.__key);
    }

    constructor(mentionName: string, mentionId: string | number, key?: NodeKey) {
        super(key);
        this.__mentionName = mentionName;
        this.__mentionId = mentionId;
    }

    createDOM(): HTMLElement {
        const span = document.createElement("span");
        span.className = "mention-node";
        return span;
    }

    updateDOM(): boolean {
        return false;
    }

    exportDOM(): DOMExportOutput {
        const span = document.createElement("span");
        span.className = "mention-node";
        span.textContent = `@${this.__mentionName}`;
        span.setAttribute("data-mention-id", String(this.__mentionId));
        return { element: span };
    }

    static importJSON(json: SerializedMentionNode): MentionNode {
        return new MentionNode(json.mentionName, json.mentionId);
    }

    exportJSON(): SerializedMentionNode {
        return {
            mentionName: this.__mentionName,
            mentionId: this.__mentionId,
            type: "mention",
            version: 1,
        };
    }

    decorate(): React.JSX.Element {
        return (
            <span
                className="inline-flex items-center px-1.5 py-0.5 rounded bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium font-secondary cursor-default"
                data-mention-id={this.__mentionId}
            >
                @{this.__mentionName}
            </span>
        );
    }

    getTextContent(): string {
        return `@${this.__mentionName}`;
    }

    isInline(): boolean {
        return true;
    }
}

function $createMentionNode(name: string, id: string | number): MentionNode {
    return new MentionNode(name, id);
}

// ============================================================================
// Image Node
// ============================================================================

type SerializedImageNode = Spread<
    { src: string; alt: string; width?: number; type: "image"; version: 1 },
    SerializedLexicalNode
>;

class ImageNode extends DecoratorNode<React.JSX.Element> {
    __src: string;
    __alt: string;
    __width?: number;

    static getType(): string {
        return "image";
    }

    static clone(node: ImageNode): ImageNode {
        return new ImageNode(node.__src, node.__alt, node.__width, node.__key);
    }

    constructor(src: string, alt: string, width?: number, key?: NodeKey) {
        super(key);
        this.__src = src;
        this.__alt = alt;
        this.__width = width;
    }

    createDOM(): HTMLElement {
        const div = document.createElement("div");
        div.className = "image-node-wrapper";
        return div;
    }

    updateDOM(): boolean {
        return false;
    }

    exportDOM(): DOMExportOutput {
        const img = document.createElement("img");
        img.src = this.__src;
        img.alt = this.__alt;
        if (this.__width) img.width = this.__width;
        return { element: img };
    }

    static importJSON(json: SerializedImageNode): ImageNode {
        return new ImageNode(json.src, json.alt, json.width);
    }

    exportJSON(): SerializedImageNode {
        return {
            src: this.__src,
            alt: this.__alt,
            width: this.__width,
            type: "image",
            version: 1,
        };
    }

    decorate(): React.JSX.Element {
        return (
            <div className="my-2 rounded-lg overflow-hidden border border-ground-200 dark:border-ground-800 inline-block max-w-full">
                <img
                    src={this.__src}
                    alt={this.__alt}
                    className="max-w-full h-auto rounded-lg"
                    style={this.__width ? { width: this.__width } : undefined}
                />
            </div>
        );
    }

    isInline(): boolean {
        return false;
    }
}

function $createImageNode(src: string, alt: string, width?: number): ImageNode {
    return new ImageNode(src, alt, width);
}

// ============================================================================
// Toolbar Plugin
// ============================================================================

function ToolbarPlugin({
    onImageUpload,
    mentions,
}: {
    onImageUpload?: (file: File) => Promise<string>;
    mentions?: MentionUser[];
}) {
    const [editor] = useLexicalComposerContext();
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);
    const [isCode, setIsCode] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Update toolbar state on selection change
    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    setIsBold(selection.hasFormat("bold"));
                    setIsItalic(selection.hasFormat("italic"));
                    setIsUnderline(selection.hasFormat("underline"));
                    setIsStrikethrough(selection.hasFormat("strikethrough"));
                    setIsCode(selection.hasFormat("code"));
                }
            });
        });
    }, [editor]);

    const formatText = (format: TextFormatType) => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !onImageUpload) return;

        try {
            const url = await onImageUpload(file);
            editor.update(() => {
                const imageNode = $createImageNode(url, file.name);
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    selection.insertNodes([imageNode]);
                }
            });
        } catch (err) {
            console.error("Image upload failed:", err);
        }

        // Reset input
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const insertImageFromUrl = () => {
        const url = prompt("Enter image URL:");
        if (!url) return;
        editor.update(() => {
            const imageNode = $createImageNode(url, "image");
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                selection.insertNodes([imageNode]);
            }
        });
    };

    const btnClass = (active: boolean) =>
        clsx(
            "flex items-center justify-center w-8 h-8 rounded-md text-sm transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
            active
                ? "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                : "text-ground-600 dark:text-ground-400 hover:bg-ground-100 dark:hover:bg-ground-800"
        );

    const divider = (
        <div className="w-px h-5 bg-ground-200 dark:bg-ground-700 mx-0.5" />
    );

    return (
        <div className="flex items-center gap-0.5 flex-wrap px-3 py-2 border-b border-ground-200 dark:border-ground-800 bg-ground-50 dark:bg-ground-900/50">
            {/* Text formatting */}
            <button type="button" onClick={() => formatText("bold")} className={btnClass(isBold)} title="Bold (Ctrl+B)" aria-label="Bold">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" /></svg>
            </button>
            <button type="button" onClick={() => formatText("italic")} className={btnClass(isItalic)} title="Italic (Ctrl+I)" aria-label="Italic">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z" /></svg>
            </button>
            <button type="button" onClick={() => formatText("underline")} className={btnClass(isUnderline)} title="Underline (Ctrl+U)" aria-label="Underline">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z" /></svg>
            </button>
            <button type="button" onClick={() => formatText("strikethrough")} className={btnClass(isStrikethrough)} title="Strikethrough" aria-label="Strikethrough">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z" /></svg>
            </button>
            <button type="button" onClick={() => formatText("code")} className={btnClass(isCode)} title="Inline Code" aria-label="Inline Code">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" /></svg>
            </button>

            {divider}

            {/* Lists */}
            <button
                type="button"
                onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
                className={btnClass(false)}
                title="Bullet List"
                aria-label="Bullet List"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" /></svg>
            </button>
            <button
                type="button"
                onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
                className={btnClass(false)}
                title="Numbered List"
                aria-label="Numbered List"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z" /></svg>
            </button>

            {divider}

            {/* Image */}
            {onImageUpload && (
                <>
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className={btnClass(false)}
                        title="Upload Image"
                        aria-label="Upload Image"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" /></svg>
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        aria-hidden="true"
                    />
                </>
            )}
            <button
                type="button"
                onClick={insertImageFromUrl}
                className={btnClass(false)}
                title="Image from URL"
                aria-label="Image from URL"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" /></svg>
            </button>
        </div>
    );
}

// ============================================================================
// Mention Plugin
// ============================================================================

function MentionPlugin({ mentions = [] }: { mentions?: MentionUser[] }) {
    const [editor] = useLexicalComposerContext();
    const [query, setQuery] = useState<string | null>(null);
    const [filteredMentions, setFilteredMentions] = useState<MentionUser[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const selection = $getSelection();
                if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
                    setQuery(null);
                    return;
                }

                const anchor = selection.anchor;
                const anchorNode = anchor.getNode();

                if (!$isTextNode(anchorNode)) {
                    setQuery(null);
                    return;
                }

                const text = anchorNode.getTextContent();
                const offset = anchor.offset;
                // Look backwards from cursor for @
                const textBeforeCursor = text.slice(0, offset);
                const atIndex = textBeforeCursor.lastIndexOf("@");

                if (atIndex === -1) {
                    setQuery(null);
                    return;
                }

                // Ensure no space before @ or it's at the start
                if (atIndex > 0 && textBeforeCursor[atIndex - 1] !== " " && textBeforeCursor[atIndex - 1] !== "\n") {
                    setQuery(null);
                    return;
                }

                const mentionQuery = textBeforeCursor.slice(atIndex + 1);
                // Don't show if there's a space in the query (means mention ended)
                if (mentionQuery.includes(" ")) {
                    setQuery(null);
                    return;
                }

                setQuery(mentionQuery);
                setSelectedIndex(0);

                // Get cursor position for menu placement
                const domSelection = window.getSelection();
                if (domSelection && domSelection.rangeCount > 0) {
                    const range = domSelection.getRangeAt(0);
                    const rect = range.getBoundingClientRect();
                    const editorEl = editor.getRootElement();
                    if (editorEl) {
                        const editorRect = editorEl.getBoundingClientRect();
                        setPosition({
                            top: rect.bottom - editorRect.top + 4,
                            left: rect.left - editorRect.left,
                        });
                    }
                }
            });
        });
    }, [editor]);

    useEffect(() => {
        if (query === null) {
            setFilteredMentions([]);
            return;
        }
        const q = query.toLowerCase();
        setFilteredMentions(
            mentions.filter((m) => m.name.toLowerCase().includes(q)).slice(0, 8)
        );
    }, [query, mentions]);

    const insertMention = useCallback(
        (user: MentionUser) => {
            editor.update(() => {
                const selection = $getSelection();
                if (!$isRangeSelection(selection)) return;

                const anchor = selection.anchor;
                const anchorNode = anchor.getNode();
                if (!$isTextNode(anchorNode)) return;

                const text = anchorNode.getTextContent();
                const offset = anchor.offset;
                const textBefore = text.slice(0, offset);
                const atIndex = textBefore.lastIndexOf("@");

                if (atIndex === -1) return;

                // Remove the @query text
                const beforeAt = text.slice(0, atIndex);
                const afterCursor = text.slice(offset);

                anchorNode.setTextContent(beforeAt);

                const mentionNode = $createMentionNode(user.name, user.id);
                anchorNode.insertAfter(mentionNode);

                // Add a space after the mention
                const spaceNode = $createTextNode(" " + afterCursor);
                mentionNode.insertAfter(spaceNode);

                // Move cursor after space
                spaceNode.select(1, 1);
            });

            setQuery(null);
        },
        [editor]
    );

    // Keyboard navigation
    useEffect(() => {
        if (query === null || filteredMentions.length === 0) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev >= filteredMentions.length - 1 ? 0 : prev + 1
                );
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev <= 0 ? filteredMentions.length - 1 : prev - 1
                );
            } else if (e.key === "Enter" || e.key === "Tab") {
                e.preventDefault();
                insertMention(filteredMentions[selectedIndex]);
            } else if (e.key === "Escape") {
                setQuery(null);
            }
        };

        document.addEventListener("keydown", handleKeyDown, true);
        return () => document.removeEventListener("keydown", handleKeyDown, true);
    }, [query, filteredMentions, selectedIndex, insertMention]);

    if (query === null || filteredMentions.length === 0 || !position) return null;

    return (
        <div
            ref={menuRef}
            className="absolute z-50 w-56 py-1 bg-white dark:bg-ground-900 border border-ground-200 dark:border-ground-800 rounded-lg shadow-xl overflow-hidden"
            style={{ top: position.top, left: position.left }}
            role="listbox"
            aria-label="Mention suggestions"
        >
            {filteredMentions.map((user, i) => (
                <button
                    key={user.id}
                    type="button"
                    role="option"
                    aria-selected={i === selectedIndex}
                    onClick={() => insertMention(user)}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={clsx(
                        "w-full text-left px-3 py-2 text-sm font-secondary flex items-center gap-2 transition-colors",
                        i === selectedIndex
                            ? "bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300"
                            : "text-ground-700 dark:text-ground-300 hover:bg-ground-50 dark:hover:bg-ground-800"
                    )}
                >
                    {user.avatar ? (
                        <img src={user.avatar} alt="" className="w-6 h-6 rounded-full" />
                    ) : (
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-800 text-primary-600 dark:text-primary-300 text-xs font-bold">
                            {user.name.slice(0, 1).toUpperCase()}
                        </span>
                    )}
                    <span>{user.name}</span>
                </button>
            ))}
        </div>
    );
}

// ============================================================================
// Markdown Export Plugin
// ============================================================================

function MarkdownExportPlugin({
    onChange,
    onHtmlChange,
    onEditorStateChange,
}: {
    onChange?: (md: string) => void;
    onHtmlChange?: (html: string) => void;
    onEditorStateChange?: (state: EditorState) => void;
}) {
    const [editor] = useLexicalComposerContext();

    const handleChange = useCallback(
        (editorState: EditorState) => {
            onEditorStateChange?.(editorState);

            editorState.read(() => {
                if (onChange) {
                    const md = $convertToMarkdownString(TRANSFORMERS);
                    onChange(md);
                }
                if (onHtmlChange) {
                    const html = $generateHtmlFromNodes(editor);
                    onHtmlChange(html);
                }
            });
        },
        [editor, onChange, onHtmlChange, onEditorStateChange]
    );

    return <OnChangePlugin onChange={handleChange} />;
}

// ============================================================================
// Init Plugin (set initial markdown content)
// ============================================================================

function InitPlugin({ defaultValue }: { defaultValue?: string }) {
    const [editor] = useLexicalComposerContext();
    const initialized = useRef(false);

    useEffect(() => {
        if (!defaultValue || initialized.current) return;
        initialized.current = true;

        editor.update(() => {
            $convertFromMarkdownString(defaultValue, TRANSFORMERS);
        });
    }, [editor, defaultValue]);

    return null;
}

// ============================================================================
// Editor Ref Plugin
// ============================================================================

function EditorRefPlugin({ editorRef }: { editorRef?: (editor: LexicalEditor) => void }) {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        editorRef?.(editor);
    }, [editor, editorRef]);

    return null;
}

// ============================================================================
// RichTextEditor Root
// ============================================================================

const RichTextEditor = forwardRef<HTMLDivElement, RichTextEditorProps>(
    (
        {
            defaultValue,
            placeholder = "Start writing…",
            onChange,
            onHtmlChange,
            onEditorStateChange,
            mentions,
            onImageUpload,
            disabled = false,
            minHeight = "200px",
            editorRef,
            className,
            ...props
        },
        ref
    ) => {
        const initialConfig = useMemo(
            () => ({
                namespace: "RichTextEditor",
                onError: (error: Error) => console.error("Lexical error:", error),
                nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, AutoLinkNode, LinkNode, CodeNode, CodeHighlightNode, MentionNode, ImageNode],
                editable: !disabled,
                theme: {
                    root: "rte-root",
                    paragraph: "rte-paragraph",
                    heading: {
                        h1: "rte-h1",
                        h2: "rte-h2",
                        h3: "rte-h3",
                    },
                    text: {
                        bold: "rte-bold",
                        italic: "rte-italic",
                        underline: "rte-underline",
                        strikethrough: "rte-strikethrough",
                        code: "rte-code",
                    },
                    list: {
                        ul: "rte-ul",
                        ol: "rte-ol",
                        listitem: "rte-li",
                        nested: { listitem: "rte-li-nested" },
                    },
                    link: "rte-link",
                    quote: "rte-blockquote",
                    code: "rte-codeblock",
                },
            }),
            [disabled]
        );

        return (
            <div
                ref={ref}
                className={clsx(
                    "relative border border-ground-200 dark:border-ground-800 rounded-xl bg-white dark:bg-ground-950 overflow-hidden",
                    disabled && "opacity-50 pointer-events-none",
                    className
                )}
                {...props}
            >
                <LexicalComposer initialConfig={initialConfig}>
                    <ToolbarPlugin onImageUpload={onImageUpload} mentions={mentions} />

                    <div className="relative" style={{ minHeight }}>
                        <RichTextPlugin
                            contentEditable={
                                <ContentEditable
                                    className={clsx(
                                        "px-4 py-3 outline-none text-sm font-secondary text-ground-900 dark:text-ground-100",
                                        "min-h-full",
                                        // Theme classes
                                        "[&_.rte-paragraph]:mb-2 [&_.rte-paragraph]:leading-relaxed",
                                        "[&_.rte-h1]:text-2xl [&_.rte-h1]:font-bold [&_.rte-h1]:font-primary [&_.rte-h1]:mb-3 [&_.rte-h1]:mt-4",
                                        "[&_.rte-h2]:text-xl [&_.rte-h2]:font-bold [&_.rte-h2]:font-primary [&_.rte-h2]:mb-2 [&_.rte-h2]:mt-3",
                                        "[&_.rte-h3]:text-lg [&_.rte-h3]:font-semibold [&_.rte-h3]:font-primary [&_.rte-h3]:mb-2 [&_.rte-h3]:mt-2",
                                        "[&_.rte-bold]:font-bold",
                                        "[&_.rte-italic]:italic",
                                        "[&_.rte-underline]:underline",
                                        "[&_.rte-strikethrough]:line-through",
                                        "[&_.rte-code]:px-1.5 [&_.rte-code]:py-0.5 [&_.rte-code]:bg-ground-100 [&_.rte-code]:dark:bg-ground-800 [&_.rte-code]:rounded [&_.rte-code]:font-mono [&_.rte-code]:text-xs",
                                        "[&_.rte-ul]:list-disc [&_.rte-ul]:pl-6 [&_.rte-ul]:mb-2",
                                        "[&_.rte-ol]:list-decimal [&_.rte-ol]:pl-6 [&_.rte-ol]:mb-2",
                                        "[&_.rte-li]:mb-1",
                                        "[&_.rte-link]:text-primary-600 [&_.rte-link]:dark:text-primary-400 [&_.rte-link]:underline",
                                        "[&_.rte-blockquote]:border-l-4 [&_.rte-blockquote]:border-ground-300 [&_.rte-blockquote]:dark:border-ground-700 [&_.rte-blockquote]:pl-4 [&_.rte-blockquote]:italic [&_.rte-blockquote]:text-ground-600 [&_.rte-blockquote]:dark:text-ground-400 [&_.rte-blockquote]:my-2",
                                        "[&_.rte-codeblock]:bg-ground-100 [&_.rte-codeblock]:dark:bg-ground-900 [&_.rte-codeblock]:p-4 [&_.rte-codeblock]:rounded-lg [&_.rte-codeblock]:font-mono [&_.rte-codeblock]:text-xs [&_.rte-codeblock]:my-2 [&_.rte-codeblock]:overflow-x-auto"
                                    )}
                                    style={{ minHeight }}
                                    aria-label="Rich text editor"
                                />
                            }
                            placeholder={
                                <div className="absolute top-3 left-4 text-sm font-secondary text-ground-400 dark:text-ground-500 pointer-events-none">
                                    {placeholder}
                                </div>
                            }
                            ErrorBoundary={LexicalErrorBoundary}
                        />
                    </div>

                    {/* Plugins */}
                    <HistoryPlugin />
                    <ListPlugin />
                    <LinkPlugin />
                    <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
                    <MarkdownExportPlugin onChange={onChange} onHtmlChange={onHtmlChange} onEditorStateChange={onEditorStateChange} />
                    <InitPlugin defaultValue={defaultValue} />
                    <EditorRefPlugin editorRef={editorRef} />
                    {mentions && mentions.length > 0 && <MentionPlugin mentions={mentions} />}
                </LexicalComposer>
            </div>
        );
    }
);

RichTextEditor.displayName = "RichTextEditor";

export { RichTextEditor, MentionNode, ImageNode };
