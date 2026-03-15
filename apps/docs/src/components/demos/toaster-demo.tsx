"use client";

import React, { useState } from "react";
import { useToast, Toast, ToastProvider, Button } from "vayu-ui";

function ToastDemoContent() {
    const toast = useToast();
    const [customToastId, setCustomToastId] = useState<string | null>(null);

    const showCustomToast = () => {
        const id = toast.custom(
            <div className="w-full max-w-sm border border-ground-200 dark:border-ground-700 bg-ground-50 dark:bg-ground-950 p-4 shadow-lg rounded-lg">
                <div className="flex items-start gap-4">
                    <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded text-primary-600 dark:text-primary-400">
                        👋
                    </div>
                    <div className="flex-1">
                        <Toast.Title>Hello World</Toast.Title>
                        <Toast.Description>This is a fully custom toast using compound components.</Toast.Description>
                        <button
                            onClick={() => {
                                console.log("Undo action triggered");
                                toast.removeToast(id);
                            }}
                            className="mt-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline underline-offset-2"
                        >
                            Undo
                        </button>
                    </div>
                </div>
            </div>,
            { duration: 10000 }
        );
        setCustomToastId(id);
    };

    return (
        <div className="flex flex-col not-prose items-center justify-center gap-8 p-8 border border-ground-200 dark:border-ground-700 bg-ground-50 dark:bg-ground-900">
            <h2 className="text-xl font-primary font-semibold text-ground-800 dark:text-ground-100">
                Standard Variants
            </h2>
            <div className="flex gap-4 flex-wrap justify-center">
                <Button
                    variant="outline"
                    onClick={() => toast.success("Operation successful", {
                        description: "Your changes have been saved.",
                        position: "bottom-left"
                    })}
                >
                    Success
                </Button>
                <Button
                    variant="destructive"
                    onClick={() => toast.error("Operation failed", {
                        description: "Please try again later."
                    })}
                >
                    Error
                </Button>
                <Button
                    variant="outline"
                    onClick={() => toast.warning("Warning", {
                        description: "This action cannot be undone."
                    })}
                >
                    Warning
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => toast.info("Information", {
                        description: "A new update is available."
                    })}
                >
                    Info
                </Button>
            </div>

            <h2 className="text-xl font-primary font-semibold text-ground-800 dark:text-ground-100">
                With Actions
            </h2>
            <div className="flex gap-4 flex-wrap justify-center">
                <Button
                    variant="outline"
                    onClick={() => toast.info("File deleted", {
                        description: "Your file has been moved to trash.",
                        action: {
                            label: "Undo",
                            onClick: () => console.log("Undo clicked"),
                        },
                    })}
                >
                    With Action
                </Button>
                <Button
                    variant="outline"
                    onClick={() => toast.success("Message sent", {
                        description: "Your message has been delivered.",
                        action: {
                            label: "View",
                            onClick: () => console.log("View clicked"),
                        },
                    })}
                >
                    With View Action
                </Button>
            </div>

            <h2 className="text-xl font-primary font-semibold text-ground-800 dark:text-ground-100">
                Promise & Loading
            </h2>
            <div className="flex gap-4 flex-wrap justify-center">
                <Button
                    onClick={() => {
                        const promise = new Promise((resolve) => setTimeout(resolve, 2000));
                        toast.promise(promise, {
                            loading: "Loading data...",
                            success: "Data loaded successfully!",
                            error: "Failed to load data",
                        });
                    }}
                >
                    Promise (Success)
                </Button>
                <Button
                    variant="outline"
                    onClick={() => {
                        const promise = new Promise((_, reject) => setTimeout(() => reject(new Error("API Error")), 2000));
                        toast.promise(promise, {
                            loading: "Uploading file...",
                            success: "File uploaded!",
                            error: "Upload failed",
                        }).catch(() => {});
                    }}
                >
                    Promise (Error)
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => {
                        const toastId = toast.loading("Processing...", {
                            description: "This may take a while",
                        });
                        setTimeout(() => {
                            toast.updateToast(toastId, {
                                type: "success",
                                description: "Processing complete!",
                            });
                        }, 3000);
                    }}
                >
                    Manual Loading
                </Button>
            </div>

            <h2 className="text-xl font-primary font-semibold text-ground-800 dark:text-ground-100">
                Duration Control
            </h2>
            <div className="flex gap-4 flex-wrap justify-center">
                <Button
                    variant="outline"
                    onClick={() => toast.info("Quick toast", { duration: 2000 })}
                >
                    2 Second
                </Button>
                <Button
                    variant="outline"
                    onClick={() => toast.info("Long toast", { duration: 10000 })}
                >
                    10 Second
                </Button>
                <Button
                    variant="outline"
                    onClick={() => toast.info("Persistent toast", {
                        duration: 0,
                        description: "Click to dismiss",
                    })}
                >
                    Persistent
                </Button>
            </div>

            <h2 className="text-xl font-primary font-semibold text-ground-800 dark:text-ground-100">
                Positions
            </h2>
            <div className="grid grid-cols-3 gap-2">
                <Button
                    size="small"
                    variant="outline"
                    onClick={() => toast.info("Top Left", { position: "top-left" })}
                >
                    Top Left
                </Button>
                <Button
                    size="small"
                    variant="outline"
                    onClick={() => toast.info("Top Center", { position: "top-center" })}
                >
                    Top Center
                </Button>
                <Button
                    size="small"
                    variant="outline"
                    onClick={() => toast.info("Top Right", { position: "top-right" })}
                >
                    Top Right
                </Button>
                <Button
                    size="small"
                    variant="outline"
                    onClick={() => toast.info("Bottom Left", { position: "bottom-left" })}
                >
                    Bottom Left
                </Button>
                <Button
                    size="small"
                    variant="outline"
                    onClick={() => toast.info("Bottom Center", { position: "bottom-center" })}
                >
                    Bottom Center
                </Button>
                <Button
                    size="small"
                    variant="outline"
                    onClick={() => toast.info("Bottom Right", { position: "bottom-right" })}
                >
                    Bottom Right
                </Button>
            </div>

            <h2 className="text-xl font-primary font-semibold text-ground-800 dark:text-ground-100">
                Stack Test
            </h2>
            <div className="flex gap-4">
                <Button
                    variant="outline"
                    onClick={() => {
                        for (let i = 1; i <= 5; i++) {
                            setTimeout(() => {
                                toast.info(`Toast ${i}`, { description: `Notification ${i} of 5` });
                            }, i * 200);
                        }
                    }}
                >
                    Add 5 Toasts
                </Button>
            </div>

            <h2 className="text-xl font-primary font-semibold text-ground-800 dark:text-ground-100">
                Custom Toast (Compound)
            </h2>
            <div className="flex gap-4">
                <Button
                    variant="outline"
                    onClick={showCustomToast}
                >
                    Show Custom Toast
                </Button>
            </div>

            <h2 className="text-xl font-primary font-semibold text-ground-800 dark:text-ground-100">
                Non-Dismissible
            </h2>
            <div className="flex gap-4">
                <Button
                    variant="outline"
                    onClick={() => toast.warning("Important notice", {
                        description: "This toast cannot be dismissed by clicking X",
                        dismissible: false,
                        duration: 5000,
                    })}
                >
                    Non-Dismissible
                </Button>
            </div>

            <h2 className="text-xl font-primary font-semibold text-ground-800 dark:text-ground-100">
                With Custom Icon
            </h2>
            <div className="flex gap-4">
                <Button
                    variant="outline"
                    onClick={() => toast.info("Custom Icon", {
                        description: "This toast has a custom icon",
                        icon: (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        ),
                    })}
                >
                    Custom Icon
                </Button>
            </div>
        </div>
    );
}

export default function ToasterDemo() {
    return (
        <ToastProvider>
            <ToastDemoContent />
        </ToastProvider>
    );
}
