"use client"
import { Button, Status } from "vayu-ui";
import { Mail, Trash2, Send, Bell } from "lucide-react";
import React, { useState } from "react";

export default function ButtonDemo() {
    const [loading, setLoading] = useState(Status.IDLE);

    const handleLoadingClick = () => {
        setLoading(Status.PENDING);
        setTimeout(() => setLoading(Status.SUCCESS), 2000);
        setTimeout(() => setLoading(Status.IDLE), 4000);
    };

    return (
        <div className="flex flex-col gap-8 items-center justify-center p-8 bg-ground-100 dark:bg-ground-900 rounded-lg w-full">
            {/* Variants */}
            <div className="flex flex-wrap gap-4 justify-center items-center">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
            </div>

            {/* Sizes */}
            <div className="flex flex-wrap gap-4 justify-center items-center">
                <Button size="small" variant="secondary">Small</Button>
                <Button size="medium" variant="secondary">Medium</Button>
                <Button size="large" variant="secondary">Large</Button>
            </div>

            {/* With Icon */}
            <div className="flex flex-wrap gap-4 justify-center items-center">
                <Button variant="primary">
                    <Button.Icon><Mail /></Button.Icon>
                    <Button.Text>Email Login</Button.Text>
                </Button>
                <Button variant="destructive" size="small">
                    <Button.Icon size="small"><Trash2 /></Button.Icon>
                    <Button.Text>Delete</Button.Text>
                </Button>
                <Button variant="outline" size="large">
                    <Button.Text>Send</Button.Text>
                    <Button.Icon size="large"><Send /></Button.Icon>
                </Button>
            </div>

            {/* Loading State */}
            <div className="flex flex-wrap gap-4 justify-center items-center">
                <Button
                    variant="primary"
                    loading={loading}
                    onClick={handleLoadingClick}
                    loadingText="Sending..."
                >
                    Click to Load
                </Button>
            </div>

            {/* With Badge */}
            <div className="flex flex-wrap gap-8 justify-center items-center">
                <Button variant="secondary">
                    <Button.Icon><Bell /></Button.Icon>
                    <Button.Badge value={3} variant="danger" />
                </Button>

                <Button variant="outline">
                    <Button.Text>Messages</Button.Text>
                    <Button.Badge value={12} max={9} variant="primary" position="top-right" />
                </Button>

                <Button variant="ghost">
                    <Button.Text>Updates</Button.Text>
                    <Button.Badge value="New" variant="info" position="inline-right" />
                </Button>
            </div>

            {/* Disabled State */}
            <div className="flex flex-wrap gap-4 justify-center items-center">
                <Button variant="primary" disabled>Disabled</Button>
                <Button variant="secondary" disabled>Disabled</Button>
                <Button variant="outline" disabled>Disabled</Button>
            </div>
        </div>
    );
}