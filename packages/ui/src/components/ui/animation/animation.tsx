// animation.tsx
// Composition: UI + logic

"use client";

import "../animation.css";

import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils";
import { AnimationFade } from "./fade";
import { AnimationSlide } from "./slide";
import { AnimationBounce } from "./bounce";
import { AnimationFlip } from "./flip";
import { AnimationRotate } from "./rotate";
import { AnimationZoom } from "./zoom";
import { AnimationRoll } from "./roll";
import { AnimationJackInTheBox } from "./jackinthebox";
import { AnimationHinge } from "./hinge";

interface AnimationRootProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const AnimationRoot = forwardRef<HTMLDivElement, AnimationRootProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <div ref={ref} className={cn("", className)} {...props}>
                {children}
            </div>
        );
    }
);

AnimationRoot.displayName = "Animation";

// Compound Component Export
const Animation = Object.assign(AnimationRoot, {
    Fade: AnimationFade,
    Slide: AnimationSlide,
    Bounce: AnimationBounce,
    Flip: AnimationFlip,
    Rotate: AnimationRotate,
    Zoom: AnimationZoom,
    Roll: AnimationRoll,
    JackInTheBox: AnimationJackInTheBox,
    Hinge: AnimationHinge,
});

export { Animation };
export default Animation;
