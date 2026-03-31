// animation.tsx
// Composition: UI + logic

"use client";

import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils";
import { AnimationFade } from "./FadeAnimation";
import { AnimationSlide } from "./SlideAnimation";
import { AnimationBounce } from "./BounceAnimation";
import { AnimationFlip } from "./FlipAnimation";
import { AnimationRotate } from "./RotateAnimation";
import { AnimationZoom } from "./ZoomAnimation";
import { AnimationRoll } from "./RollAnimation";
import { AnimationJackInTheBox } from "./JackInTheBoxAnimation";
import { AnimationHinge } from "./HingeAnimation";

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
