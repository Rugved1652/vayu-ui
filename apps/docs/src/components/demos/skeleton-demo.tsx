"use client";
import React from "react";
import { Skeleton } from "vayu-ui";

export default function SkeletonDemo() {
    return (
        <div className="w-full space-y-8 p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl">

            {/* Basic Text Skeleton */}
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">Text Loading</h3>
                <Skeleton.Group>
                    <Skeleton.Text lines={1} width="80%" className="h-6" />
                    <Skeleton.Text lines={3} />
                </Skeleton.Group>
            </div>

            {/* Avatar Skeleton */}
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">Avatar Loading</h3>
                <div className="flex items-center gap-8">
                    <Skeleton.Avatar size="sm" />
                    <Skeleton.Avatar size="md" />
                    <Skeleton.Avatar size="lg" />
                </div>
            </div>

            {/* Card Skeleton */}
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">Card Loading</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Skeleton.Card />
                    <Skeleton.Card showImage={false} />
                </div>
            </div>

            {/* List Skeleton */}
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">List Loading</h3>
                <Skeleton.List items={3} />
            </div>

        </div>
    );
}
