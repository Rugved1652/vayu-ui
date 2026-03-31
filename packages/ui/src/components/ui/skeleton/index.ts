// index.ts
// Public API

import SkeletonRoot from "./skeleton-root";
import SkeletonItem from "./skeleton-item";
import { SkeletonText, SkeletonCircle, SkeletonRectangle } from "./primitives";
import {
    SkeletonCard,
    SkeletonAvatar,
    SkeletonList,
    SkeletonTable,
    SkeletonGrid,
    SkeletonGroup,
} from "./composites";

export type {
    SkeletonAnimation,
    SkeletonAvatarProps,
    SkeletonCardProps,
    SkeletonCircleProps,
    SkeletonGridProps,
    SkeletonGroupProps,
    SkeletonItemProps,
    SkeletonListProps,
    SkeletonRectangleProps,
    SkeletonRootProps,
    SkeletonSize,
    SkeletonTableProps,
    SkeletonTextProps,
    SkeletonVariant,
} from "./types";

const Skeleton = Object.assign(SkeletonRoot, {
    Root: SkeletonRoot,
    Item: SkeletonItem,
    Text: SkeletonText,
    Circle: SkeletonCircle,
    Rectangle: SkeletonRectangle,
    Card: SkeletonCard,
    Avatar: SkeletonAvatar,
    List: SkeletonList,
    Table: SkeletonTable,
    Grid: SkeletonGrid,
    Group: SkeletonGroup,
});

export { Skeleton };
