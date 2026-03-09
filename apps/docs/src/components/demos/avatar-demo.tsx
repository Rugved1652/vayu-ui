"use client";
import { Avatar } from "vayu-ui";

export default function AvatarDemo() {
    return (
        <div className="w-full max-w-md not-prose space-y-8">
            <h2 className="text-xl font-semibold mb-4">
                Avatar Examples
            </h2>

            {/* 1. Sizes */}
            <div className="flex flex-col gap-4">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Sizes</h3>
                <div className="flex items-end gap-6 flex-wrap">
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="small" username="Small User">
                            <Avatar.Initials username="Small User" />
                        </Avatar>
                        <span className="text-xs text-gray-500">Small</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="medium" username="Medium User">
                            <Avatar.Initials username="Medium User" />
                        </Avatar>
                        <span className="text-xs text-gray-500">Medium</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="large" username="Large User">
                            <Avatar.Initials username="Large User" />
                        </Avatar>
                        <span className="text-xs text-gray-500">Large</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="xlarge" username="XL User">
                            <Avatar.Initials username="XL User" />
                        </Avatar>
                        <span className="text-xs text-gray-500">Extra Large</span>
                    </div>
                </div>
            </div>

            {/* 2. Variants (Image, Initials, Fallback) */}
            <div className="flex flex-col gap-4">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Variants</h3>
                <div className="flex flex-wrap gap-8">
                    {/* Image Avatar */}
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="large" username="John Doe">
                            {/* WCAG Fix: alt="" because parent Avatar handles the accessible label */}
                            <Avatar.Image
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60"
                                alt=""
                            />
                        </Avatar>
                        <span className="text-xs text-gray-500 font-medium">Image</span>
                    </div>

                    {/* Initials Avatar */}
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="large" username="Rugved Patel">
                            <Avatar.Initials username="Rugved Patel" />
                        </Avatar>
                        <span className="text-xs text-gray-500 font-medium">Initials</span>
                    </div>

                    {/* Fallback Avatar (Broken Image Source) */}
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="large" username="Fallback User">
                            <Avatar.Image src="https://broken-image-link.com/image.jpg" alt="" />
                            <Avatar.Fallback />
                        </Avatar>
                        <span className="text-xs text-gray-500 font-medium">Fallback</span>
                    </div>
                </div>
            </div>

            {/* 3. Status States */}
            <div className="flex flex-col gap-4">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Status States</h3>
                <div className="flex flex-wrap gap-8">
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="large" username="Online" status="online">
                            <Avatar.Initials username="Online" />
                            <Avatar.Status status="online" />
                        </Avatar>
                        <span className="text-xs text-gray-500">Online</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="large" username="Away" status="away">
                            <Avatar.Initials username="Away" />
                            <Avatar.Status status="away" />
                        </Avatar>
                        <span className="text-xs text-gray-500">Away</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="large" username="Busy" status="busy">
                            <Avatar.Initials username="Busy" />
                            <Avatar.Status status="busy" />
                        </Avatar>
                        <span className="text-xs text-gray-500">Busy</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="large" username="Offline" status="offline">
                            <Avatar.Initials username="Offline" />
                            <Avatar.Status status="offline" />
                        </Avatar>
                        <span className="text-xs text-gray-500">Offline</span>
                    </div>
                </div>
            </div>

            {/* 4. Interactive (New) */}
            <div className="flex flex-col gap-4">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Interactive</h3>
                <p className="text-xs text-gray-400 mb-2">
                    Click or focus these avatars to see WCAG-compliant interactions.
                </p>
                <div className="flex flex-wrap gap-8">
                    <div className="flex flex-col items-center gap-2">
                        <Avatar 
                            size="large" 
                            username="Click Me" 
                            onClick={() => alert("Avatar Clicked!")}
                        >
                            <Avatar.Initials username="Click Me" />
                        </Avatar>
                        <span className="text-xs text-gray-500">Button</span>
                    </div>
                    
                    <div className="flex flex-col items-center gap-2">
                        <Avatar 
                            size="large" 
                            username="Profile" 
                            onClick={() => alert("Opening Profile...")}
                            status="online"
                        >
                            <Avatar.Image 
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60" 
                                alt="" 
                            />
                            <Avatar.Status status="online" />
                        </Avatar>
                        <span className="text-xs text-gray-500">With Status</span>
                    </div>
                </div>
            </div>
        </div>
    );
}