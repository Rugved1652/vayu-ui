"use client"
import { Skeleton } from "vayu-ui";

export default function SkeletonDemo() {
    return (
        <div className="w-full max-w-md not-prose">
            <h2 id="skeleton-demo-label" className="text-xl font-semibold mb-4">
                Skeleton Example
            </h2>

            <div className="space-y-6">
                {/* Text Skeleton */}
                <div>
                    <h3 className="text-sm font-medium text-ground-500 uppercase tracking-wider mb-2">
                        Text Loading
                    </h3>
                    <Skeleton.Text lines={3} />
                </div>

                {/* Avatar Skeleton */}
                <div>
                    <h3 className="text-sm font-medium text-ground-500 uppercase tracking-wider mb-2">
                        Avatar Loading
                    </h3>
                    <div className="flex items-center gap-6">
                        <Skeleton.Avatar size="sm" />
                        <Skeleton.Avatar size="md" />
                        <Skeleton.Avatar size="lg" />
                    </div>
                </div>

                {/* Card Skeleton */}
                <div>
                    <h3 className="text-sm font-medium text-ground-500 uppercase tracking-wider mb-2">
                        Card Loading
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                        <Skeleton.Card />
                        <Skeleton.Card showImage={false} />
                    </div>
                </div>

                {/* List Skeleton */}
                <div>
                    <h3 className="text-sm font-medium text-ground-500 uppercase tracking-wider mb-2">
                        List Loading
                    </h3>
                    <Skeleton.List items={3} />
                </div>

                {/* Animation Variants */}
                <div>
                    <h3 className="text-sm font-medium text-ground-500 uppercase tracking-wider mb-2">
                        Animation Variants
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <span className="text-xs text-ground-400 block mb-1">Pulse (default)</span>
                            <Skeleton.Item variant="rectangular" height={48} animation="pulse" />
                        </div>
                        <div>
                            <span className="text-xs text-ground-400 block mb-1">Wave</span>
                            <Skeleton.Item variant="rectangular" height={48} animation="wave" />
                        </div>
                        <div>
                            <span className="text-xs text-ground-400 block mb-1">None</span>
                            <Skeleton.Item variant="rectangular" height={48} animation="none" />
                        </div>
                    </div>
                </div>

                {/* With Root Context */}
                <div>
                    <h3 className="text-sm font-medium text-ground-500 uppercase tracking-wider mb-2">
                        With Root Context
                    </h3>
                    <Skeleton.Root animation="wave" size="lg">
                        <Skeleton.Text lines={2} />
                    </Skeleton.Root>
                </div>
            </div>
        </div>
    );
}