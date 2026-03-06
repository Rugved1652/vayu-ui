"use client";
import React from "react";
import { Avatar } from "vayu-ui";

export default function AvatarDemo() {
    return (
        <div className="flex flex-col not-prose gap-10 w-full max-w-2xl bg-white dark:bg-black p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
            {/* Sizes */}
            <div className="flex flex-col gap-4">
                <h3 className="text-sm font-medium text-muted-foreground border-b pb-2">Sizes</h3>
                <div className="flex items-center gap-6 flex-wrap">
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="small" username="Small">
                            <Avatar.Initials username="Small" />
                        </Avatar>
                        <span className="text-xs text-muted-foreground">Small</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="medium" username="Medium">
                            <Avatar.Initials username="Medium" />
                        </Avatar>
                        <span className="text-xs text-muted-foreground">Medium</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="large" username="Large">
                            <Avatar.Initials username="Large" />
                        </Avatar>
                        <span className="text-xs text-muted-foreground">Large</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="xlarge" username="Extra">
                            <Avatar.Initials username="Extra" />
                        </Avatar>
                        <span className="text-xs text-muted-foreground">Extra Large</span>
                    </div>
                </div>
            </div>

            {/* States & Variants */}
            <div className="flex flex-col gap-4">
                <h3 className="text-sm font-medium text-muted-foreground border-b pb-2">
                    Usage Variants
                </h3>
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
                        <span className="text-xs text-muted-foreground font-medium">Image</span>
                    </div>

                    {/* Initials Avatar */}
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="large" username="Rugved Patel">
                            <Avatar.Initials username="Rugved Patel" />
                        </Avatar>
                        <span className="text-xs text-muted-foreground font-medium">Initials</span>
                    </div>

                    {/* Auto-Color Initials */}
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="large" username="Alice Wonder">
                            <Avatar.Initials username="Alice Wonder" />
                        </Avatar>
                        <span className="text-xs text-muted-foreground font-medium">Auto Color</span>
                    </div>

                    {/* With Status */}
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="large" username="Online User" status="online">
                            <Avatar.Initials username="Online User" />
                            <Avatar.Status status="online" />
                        </Avatar>
                        <span className="text-xs text-muted-foreground font-medium">Status</span>
                    </div>
                </div>
            </div>

            {/* Fallback Behavior */}
            <div className="flex flex-col gap-4">
                <h3 className="text-sm font-medium text-muted-foreground border-b pb-2">
                    Error & Fallback Handling
                </h3>
                <div className="flex flex-wrap gap-8">
                    {/* Fallback to Initials */}
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="large" username="Broken Image">
                            <Avatar.Image
                                src="https://invalid-url.com/broken.jpg"
                                alt="Broken"
                            />
                            {/* If image fails, initials will show if we don't put a Fallback Image, 
                                but in this DOM structure, we usually layer them. 
                                Actually, existing logic hides image on error. 
                                Initials are separate. We can put both? 
                                No, Initials component always renders. 
                                New Pattern: Put Initials behind Image (absolute positioning handled by CSS) 
                            */}
                            <Avatar.Initials username="Broken Image" />
                        </Avatar>
                        <span className="text-xs text-muted-foreground font-medium">Fallback to Initials</span>
                    </div>

                    {/* Fallback to Verified Image */}
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="large" username="Fallback">
                            <Avatar.Image
                                src="https://invalid-url.com/broken.jpg"
                                fallbackSrc="https://github.com/shadcn.png"
                                alt="Fallback"
                            />
                        </Avatar>
                        <span className="text-xs text-muted-foreground font-medium">Fallback Image</span>
                    </div>
                </div>
            </div>

        </div>
    );
}
