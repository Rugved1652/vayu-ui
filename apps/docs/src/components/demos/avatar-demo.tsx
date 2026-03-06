"use client";
import React from "react";
import { Avatar } from "vayu-ui";

export default function AvatarDemo() {
    return (
        <div className="w-full max-w-md not-prose">
            <h2 id="avatar-demo-label" className="text-xl font-semibold mb-4">
                Avatar Example
            </h2>

            {/* Sizes */}
            <div className="flex flex-col gap-4 mb-6">
                <h3 className="text-sm font-medium text-ground-600 dark:text-ground-400">Sizes</h3>
                <div className="flex items-center gap-6 flex-wrap">
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="small" username="Small">
                            <Avatar.Initials username="Small" />
                        </Avatar>
                        <span className="text-xs text-ground-500 dark:text-ground-400">Small</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="medium" username="Medium">
                            <Avatar.Initials username="Medium" />
                        </Avatar>
                        <span className="text-xs text-ground-500 dark:text-ground-400">Medium</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="large" username="Large">
                            <Avatar.Initials username="Large" />
                        </Avatar>
                        <span className="text-xs text-ground-500 dark:text-ground-400">Large</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="xlarge" username="Extra">
                            <Avatar.Initials username="Extra" />
                        </Avatar>
                        <span className="text-xs text-ground-500 dark:text-ground-400">Extra Large</span>
                    </div>
                </div>
            </div>

            {/* Variants */}
            <div className="flex flex-col gap-4 mb-6">
                <h3 className="text-sm font-medium text-ground-600 dark:text-ground-400">Usage Variants</h3>
                <div className="flex flex-wrap gap-8">
                    {/* Image Avatar */}
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="large" username="John Doe">
                            <Avatar.Image
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60"
                                alt="John Doe"
                            />
                            <Avatar.Fallback src="https://via.placeholder.com/150" />
                        </Avatar>
                        <span className="text-xs text-ground-500 dark:text-ground-400 font-medium">Image</span>
                    </div>

                    {/* Initials Avatar */}
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="large" username="Rugved Patel">
                            <Avatar.Initials username="Rugved Patel" />
                        </Avatar>
                        <span className="text-xs text-ground-500 dark:text-ground-400 font-medium">Initials</span>
                    </div>

                    {/* With Status */}
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="large" username="Online User" status="online">
                            <Avatar.Initials username="Online User" />
                            <Avatar.Status status="online" />
                        </Avatar>
                        <span className="text-xs text-ground-500 dark:text-ground-400 font-medium">Status</span>
                    </div>

                    {/* Offline Status */}
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="large" username="Offline User" status="offline">
                            <Avatar.Initials username="Offline User" />
                            <Avatar.Status status="offline" />
                        </Avatar>
                        <span className="text-xs text-ground-500 dark:text-ground-400 font-medium">Offline</span>
                    </div>
                </div>
            </div>

            {/* Status States */}
            <div className="flex flex-col gap-4 mb-6">
                <h3 className="text-sm font-medium text-ground-600 dark:text-ground-400">Status States</h3>
                <div className="flex flex-wrap gap-8">
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="large" status="online">
                            <Avatar.Initials username="Online" />
                            <Avatar.Status status="online" />
                        </Avatar>
                        <span className="text-xs text-ground-500 dark:text-ground-400">Online</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="large" status="away">
                            <Avatar.Initials username="Away" />
                            <Avatar.Status status="away" />
                        </Avatar>
                        <span className="text-xs text-ground-500 dark:text-ground-400">Away</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="large" status="busy">
                            <Avatar.Initials username="Busy" />
                            <Avatar.Status status="busy" />
                        </Avatar>
                        <span className="text-xs text-ground-500 dark:text-ground-400">Busy</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="large" status="offline">
                            <Avatar.Initials username="Offline" />
                            <Avatar.Status status="offline" />
                        </Avatar>
                        <span className="text-xs text-ground-500 dark:text-ground-400">Offline</span>
                    </div>
                </div>
            </div>

            {/* Group */}
            <div className="flex flex-col gap-4">
                <h3 className="text-sm font-medium text-ground-600 dark:text-ground-400">Avatar Group</h3>
                <Avatar.Group max={3}>
                    <Avatar username="User 1">
                        <Avatar.Initials username="User 1" />
                    </Avatar>
                    <Avatar username="User 2">
                        <Avatar.Initials username="User 2" />
                    </Avatar>
                    <Avatar username="User 3">
                        <Avatar.Initials username="User 3" />
                    </Avatar>
                    <Avatar username="User 4">
                        <Avatar.Initials username="User 4" />
                    </Avatar>
                    <Avatar username="User 5">
                        <Avatar.Initials username="User 5" />
                    </Avatar>
                </Avatar.Group>
            </div>
        </div>
    );
}