// composites.tsx
// UI: Pre-built skeleton patterns (Card, Avatar, List, Table, Grid, Group)

import SkeletonItem from "./SkeletonItem";
import { SkeletonText, SkeletonCircle, SkeletonRectangle } from "./SkeletonPrimitives";
import type {
    SkeletonCardProps,
    SkeletonAvatarProps,
    SkeletonListProps,
    SkeletonTableProps,
    SkeletonGridProps,
    SkeletonGroupProps,
} from "./types";

// ============================================================================
// Skeleton Card
// ============================================================================

function SkeletonCard({
    className = "",
    showImage = true,
    imageHeight = 200,
    lines = 3,
    titleWidth = "60%",
    animation = "pulse",
    size = "md",
    ...props
}: SkeletonCardProps) {
    return (
        <div
            className={`bg-surface rounded-surface p-4 border border-border shadow-surface ${className}`}
            aria-hidden="true"
            {...props}
        >
            {showImage && (
                <SkeletonRectangle
                    height={imageHeight}
                    className="mb-4"
                    animation={animation}
                    size={size}
                />
            )}
            <SkeletonItem
                variant="text"
                size="lg"
                width={titleWidth}
                className="mb-3"
                animation={animation}
            />
            <SkeletonText lines={lines} animation={animation} size={size} />
        </div>
    );
}

// ============================================================================
// Skeleton Avatar
// ============================================================================

function SkeletonAvatar({
    className = "",
    showText = true,
    textLines = 2,
    titleWidth = "40%",
    subtitleWidth = "60%",
    size = "md",
    animation = "pulse",
    ...props
}: SkeletonAvatarProps) {
    return (
        <div className={`flex items-center gap-3 ${className}`} aria-hidden="true" {...props}>
            <SkeletonCircle size={size} animation={animation} />
            {showText && (
                <div className="flex-1">
                    <SkeletonItem
                        variant="text"
                        width={titleWidth}
                        className="mb-2"
                        animation={animation}
                        size={size}
                    />
                    {textLines > 1 && (
                        <SkeletonItem
                            variant="text"
                            size="sm"
                            width={subtitleWidth}
                            animation={animation}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

// ============================================================================
// Skeleton List
// ============================================================================

function SkeletonList({
    className = "",
    items = 5,
    showAvatar = true,
    animation = "pulse",
    size = "md",
    ...props
}: SkeletonListProps) {
    return (
        <div className={`space-y-4 ${className}`} aria-hidden="true" {...props}>
            {Array.from({ length: items }).map((_, index) => (
                <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-surface rounded-surface border border-border"
                >
                    {showAvatar && <SkeletonCircle size={size} animation={animation} />}
                    <div className="flex-1">
                        <SkeletonItem
                            variant="text"
                            width="70%"
                            className="mb-2"
                            animation={animation}
                            size={size}
                        />
                        <SkeletonItem
                            variant="text"
                            size="sm"
                            width="40%"
                            animation={animation}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

// ============================================================================
// Skeleton Table
// ============================================================================

function SkeletonTable({
    className = "",
    rows = 5,
    columns = 4,
    showHeader = true,
    animation = "pulse",
    size = "md",
    ...props
}: SkeletonTableProps) {
    return (
        <div
            className={`bg-surface rounded-surface border border-border overflow-hidden ${className}`}
            aria-hidden="true"
            {...props}
        >
            {showHeader && (
                <div
                    className="grid gap-4 p-4 border-b border-border bg-muted/50"
                    style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
                >
                    {Array.from({ length: columns }).map((_, index) => (
                        <SkeletonItem
                            key={index}
                            variant="text"
                            width="60%"
                            animation={animation}
                            size={size}
                        />
                    ))}
                </div>
            )}
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div
                    key={rowIndex}
                    className="grid gap-4 p-4 border-b border-border last:border-b-0"
                    style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
                >
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <SkeletonItem
                            key={colIndex}
                            variant="text"
                            size="sm"
                            width="80%"
                            animation={animation}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

// ============================================================================
// Skeleton Grid
// ============================================================================

function SkeletonGrid({
    className = "",
    items = 6,
    columns = 3,
    itemHeight = 200,
    animation = "pulse",
    size = "md",
    ...props
}: SkeletonGridProps) {
    return (
        <div
            className={`grid gap-4 ${className}`}
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
            aria-hidden="true"
            {...props}
        >
            {Array.from({ length: items }).map((_, index) => (
                <SkeletonCard
                    key={index}
                    imageHeight={itemHeight}
                    lines={2}
                    animation={animation}
                    size={size}
                />
            ))}
        </div>
    );
}

// ============================================================================
// Skeleton Group
// ============================================================================

function SkeletonGroup({
    children,
    className = "",
    spacing = "md",
    ...props
}: SkeletonGroupProps) {
    const spacingClasses = {
        sm: "space-y-2",
        md: "space-y-4",
        lg: "space-y-6",
    };

    return (
        <div className={`${spacingClasses[spacing]} ${className}`} {...props}>
            {children}
        </div>
    );
}

export { SkeletonCard, SkeletonAvatar, SkeletonList, SkeletonTable, SkeletonGrid, SkeletonGroup };
