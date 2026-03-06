"use client";

import React from "react";
import { useToast, Toast, ToastProvider, Button } from "vayu-ui";

export default function ToasterDemo() {
    const toast = useToast();

    return (
        <ToastProvider>
            <div className="flex flex-col not-prose items-center justify-center gap-8 p-8 border border-ground-200 dark:border-ground-700 bg-ground-50 dark:bg-ground-900">
                <h2 id="toaster-demo-label" className="text-xl font-primary font-semibold text-ground-800 dark:text-ground-100">
                    Standard Variants
                </h2>
                <div className="flex gap-4 flex-wrap justify-center">
                    <Button 
                        variant="outline" 
                        onClick={() => toast.success("Operation successful", { description: "Your changes have been saved." })}
                    >
                        Success
                    </Button>
                    <Button 
                        variant="destructive" 
                        onClick={() => toast.error("Operation failed", { description: "Please try again later." })}
                    >
                        Error
                    </Button>
                    <Button 
                        variant="outline" 
                        onClick={() => toast.warning("Warning", { description: "This action cannot be undone." })}
                    >
                        Warning
                    </Button>
                    <Button 
                        variant="secondary" 
                        onClick={() => toast.info("Information", { description: "A new update is available." })}
                    >
                        Info
                    </Button>
                </div>

                <h2 className="text-xl font-primary font-semibold text-ground-800 dark:text-ground-100">
                    Promise & Loading
                </h2>
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

                <h2 className="text-xl font-primary font-semibold text-ground-800 dark:text-ground-100">
                    Custom Toast (Compound)
                </h2>
                <div className="flex gap-4">
                    <Button
                        variant="outline"
                        onClick={() => {
                            toast.custom(
                                <div className="w-full max-w-sm border border-ground-200 dark:border-ground-700 bg-ground-50 dark:bg-ground-900 p-4 shadow-outer">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary-100 dark:bg-primary-900/30 p-2 text-primary-600 dark:text-primary-400">
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
        </ToastProvider>
    );
}