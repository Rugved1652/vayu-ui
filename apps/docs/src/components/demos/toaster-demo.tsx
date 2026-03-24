"use client";

import React, { useState } from "react";
import { useToast, Toast, ToastProvider, Button, Typography, Divider } from "vayu-ui";

function ToastDemoContent() {
    const toast = useToast();
    const [customToastId, setCustomToastId] = useState<string | null>(null);

    const showCustomToast = () => {
        const id = toast.custom(
            <div className="w-full max-w-sm border border-border bg-surface p-4 shadow-elevated rounded-surface">
                <div className="flex items-start gap-4">
                    <div className="bg-brand/10 p-2 rounded-control text-brand">
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
                            className="mt-2 text-sm font-medium text-brand hover:underline underline-offset-2"
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
        <div className="flex flex-col not-prose items-center justify-center gap-8 p-8 border border-border bg-surface rounded-surface">
            {/* Standard Variants Section */}
            <Typography.H3 variant="primary">Standard Variants</Typography.H3>
            <div className="flex gap-4 flex-wrap justify-center">
                <Button
                    variant="outline"
                    onClick={() => toast.success("Operation successful", {
                        description: "Your changes have been saved.",
                        position: "bottom-left"
                    })}
                >
                    <Button.Text>Success</Button.Text>
                </Button>
                <Button
                    variant="destructive"
                    onClick={() => toast.error("Operation failed", {
                        description: "Please try again later."
                    })}
                >
                    <Button.Text>Error</Button.Text>
                </Button>
                <Button
                    variant="outline"
                    onClick={() => toast.warning("Warning", {
                        description: "This action cannot be undone."
                    })}
                >
                    <Button.Text>Warning</Button.Text>
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => toast.info("Information", {
                        description: "A new update is available."
                    })}
                >
                    <Button.Text>Info</Button.Text>
                </Button>
            </div>

            <Divider spacing="md">
                <Divider.Line color="ground" />
            </Divider>

            {/* With Actions Section */}
            <Typography.H3 variant="primary">With Actions</Typography.H3>
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
                    <Button.Text>With Action</Button.Text>
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
                    <Button.Text>With View Action</Button.Text>
                </Button>
            </div>

            <Divider spacing="md">
                <Divider.Line color="ground" />
            </Divider>

            {/* Promise & Loading Section */}
            <Typography.H3 variant="primary">Promise & Loading</Typography.H3>
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
                    <Button.Text>Promise (Success)</Button.Text>
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
                    <Button.Text>Promise (Error)</Button.Text>
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
                    <Button.Text>Manual Loading</Button.Text>
                </Button>
            </div>

            <Divider spacing="md">
                <Divider.Line color="ground" />
            </Divider>

            {/* Duration Control Section */}
            <Typography.H3 variant="primary">Duration Control</Typography.H3>
            <div className="flex gap-4 flex-wrap justify-center">
                <Button
                    variant="outline"
                    onClick={() => toast.info("Quick toast", { duration: 2000 })}
                >
                    <Button.Text>2 Second</Button.Text>
                </Button>
                <Button
                    variant="outline"
                    onClick={() => toast.info("Long toast", { duration: 10000 })}
                >
                    <Button.Text>10 Second</Button.Text>
                </Button>
                <Button
                    variant="outline"
                    onClick={() => toast.info("Persistent toast", {
                        duration: 0,
                        description: "Click to dismiss",
                    })}
                >
                    <Button.Text>Persistent</Button.Text>
                </Button>
            </div>

            <Divider spacing="md">
                <Divider.Line color="ground" />
            </Divider>

            {/* Positions Section */}
            <Typography.H3 variant="primary">Positions</Typography.H3>
            <div className="grid grid-cols-3 gap-2">
                <Button size="small" variant="outline" onClick={() => toast.info("Top Left", { position: "top-left" })}>
                    <Button.Text>Top Left</Button.Text>
                </Button>
                <Button size="small" variant="outline" onClick={() => toast.info("Top Center", { position: "top-center" })}>
                    <Button.Text>Top Center</Button.Text>
                </Button>
                <Button size="small" variant="outline" onClick={() => toast.info("Top Right", { position: "top-right" })}>
                    <Button.Text>Top Right</Button.Text>
                </Button>
                <Button size="small" variant="outline" onClick={() => toast.info("Bottom Left", { position: "bottom-left" })}>
                    <Button.Text>Bottom Left</Button.Text>
                </Button>
                <Button size="small" variant="outline" onClick={() => toast.info("Bottom Center", { position: "bottom-center" })}>
                    <Button.Text>Bottom Center</Button.Text>
                </Button>
                <Button size="small" variant="outline" onClick={() => toast.info("Bottom Right", { position: "bottom-right" })}>
                    <Button.Text>Bottom Right</Button.Text>
                </Button>
            </div>

            <Divider spacing="md">
                <Divider.Line color="ground" />
            </Divider>

            {/* Stack Test Section */}
            <Typography.H3 variant="primary">Stack Test</Typography.H3>
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
                    <Button.Text>Add 5 Toasts</Button.Text>
                </Button>
            </div>

            <Divider spacing="md">
                <Divider.Line color="ground" />
            </Divider>

            {/* Custom Toast Section */}
            <Typography.H3 variant="primary">Custom Toast (Compound)</Typography.H3>
            <div className="flex gap-4">
                <Button variant="outline" onClick={showCustomToast}>
                    <Button.Text>Show Custom Toast</Button.Text>
                </Button>
            </div>

            <Divider spacing="md">
                <Divider.Line color="ground" />
            </Divider>

            {/* Non-Dismissible Section */}
            <Typography.H3 variant="primary">Non-Dismissible</Typography.H3>
            <div className="flex gap-4">
                <Button
                    variant="outline"
                    onClick={() => toast.warning("Important notice", {
                        description: "This toast cannot be dismissed by clicking X",
                        dismissible: false,
                        duration: 5000,
                    })}
                >
                    <Button.Text>Non-Dismissible</Button.Text>
                </Button>
            </div>

            <Divider spacing="md">
                <Divider.Line color="ground" />
            </Divider>

            {/* Custom Icon Section */}
            <Typography.H3 variant="primary">With Custom Icon</Typography.H3>
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
                    <Button.Text>Custom Icon</Button.Text>
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
