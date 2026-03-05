"use client";

import React from "react";
import { useToast, Toast, ToastProvider } from "vayu-ui";
import { Button } from "vayu-ui";

export default function ToasterDemo() {
    const toast = useToast();

    return (
        <ToastProvider>
            <div className="flex flex-col not-prose items-center justify-center space-y-8 p-8 border rounded-lg border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
                <h2 className="text-xl font-semibold">Standard Variants</h2>
                <div className="flex gap-4 flex-wrap justify-center">
                    <Button variant="outline" onClick={() => toast.success("Operation successful", { description: "Your changes have been saved." })}>
                        Success
                    </Button>
                    <Button variant="destructive" onClick={() => toast.error("Operation failed", { description: "Please try again later." })}>
                        Error
                    </Button>
                    <Button variant="outline" onClick={() => toast.warning("Warning", { description: "This action cannot be undone." })}>
                        Warning
                    </Button>
                    <Button variant="secondary" onClick={() => toast.info("Information", { description: "A new update is available." })}>
                        Info
                    </Button>
                </div>

                <h2 className="text-xl font-semibold">Promise & Loading</h2>
                <div className="flex gap-4">
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
                        Trigger Promise
                    </Button>
                </div>

                <h2 className="text-xl font-semibold">Custom Toast (Compound)</h2>
                <div className="flex gap-4">
                    <Button
                        variant="outline"
                        onClick={() => {
                            toast.custom(
                                <div className="w-full max-w-sm rounded-lg border border-neutral-200 bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-950">
                                    <div className="flex items-start gap-4">
                                        <div className="rounded-full bg-primary-100 p-2 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                                            👋
                                        </div>
                                        <div className="flex-1">
                                            <Toast.Title>Hello World</Toast.Title>
                                            <Toast.Description>This is a fully custom toast using compound components.</Toast.Description>
                                            <Toast.Action onClick={() => console.log("Undo")}>Undo</Toast.Action>
                                        </div>
                                    </div>
                                </div>
                            );
                        }}
                    >
                        Show Custom Toast
                    </Button>
                </div>
            </div>
        </ToastProvider >
    );
}
