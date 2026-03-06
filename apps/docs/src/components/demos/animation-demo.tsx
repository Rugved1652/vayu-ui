"use client";

import { Animation, Button } from "vayu-ui";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";

export default function AnimationDemo() {
    const [key, setKey] = useState(0);

    const replay = () => setKey((prev) => prev + 1);

    return (
        <div className="w-full not-prose">
            <div className="flex justify-end mb-6">
                <Button variant="outline" size="small" onClick={replay}>
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    Replay
                </Button>
            </div>

            <div
                key={key}
                className="grid grid-cols-2 md:grid-cols-3 gap-6"
                role="region"
                aria-label="Animation examples"
            >
                {/* Fade */}
                <div className="flex flex-col items-center gap-2">
                    <Animation.Fade duration="slow">
                        <div className="w-16 h-16 bg-primary-500 rounded flex items-center justify-center text-ground-950 font-primary font-semibold text-sm shadow-outer">
                            Fade
                        </div>
                    </Animation.Fade>
                    <span className="text-sm text-ground-500">Fade In</span>
                </div>

                {/* Slide */}
                <div className="flex flex-col items-center gap-2">
                    <Animation.Slide direction="left" duration="normal">
                        <div className="w-16 h-16 bg-info-500 rounded flex items-center justify-center text-white font-primary font-semibold text-sm shadow-outer">
                            Slide
                        </div>
                    </Animation.Slide>
                    <span className="text-sm text-ground-500">Slide Left</span>
                </div>

                {/* Bounce */}
                <div className="flex flex-col items-center gap-2">
                    <Animation.Bounce scale="medium">
                        <div className="w-16 h-16 bg-success-500 rounded flex items-center justify-center text-white font-primary font-semibold text-sm shadow-outer">
                            Bounce
                        </div>
                    </Animation.Bounce>
                    <span className="text-sm text-ground-500">Bounce</span>
                </div>

                {/* Flip */}
                <div className="flex flex-col items-center gap-2">
                    <Animation.Flip direction="up">
                        <div className="w-16 h-16 bg-warning-500 rounded flex items-center justify-center text-ground-950 font-primary font-semibold text-sm shadow-outer">
                            Flip
                        </div>
                    </Animation.Flip>
                    <span className="text-sm text-ground-500">Flip Up</span>
                </div>

                {/* Rotate */}
                <div className="flex flex-col items-center gap-2">
                    <Animation.Rotate degrees={-180}>
                        <div className="w-16 h-16 bg-error-500 rounded flex items-center justify-center text-white font-primary font-semibold text-sm shadow-outer">
                            Rotate
                        </div>
                    </Animation.Rotate>
                    <span className="text-sm text-ground-500">Rotate</span>
                </div>

                {/* Zoom */}
                <div className="flex flex-col items-center gap-2">
                    <Animation.Zoom scale="medium">
                        <div className="w-16 h-16 bg-primary-600 rounded flex items-center justify-center text-white font-primary font-semibold text-sm shadow-outer">
                            Zoom
                        </div>
                    </Animation.Zoom>
                    <span className="text-sm text-ground-500">Zoom</span>
                </div>

                {/* Roll */}
                <div className="flex flex-col items-center gap-2 overflow-hidden">
                    <Animation.Roll direction="left">
                        <div className="w-16 h-16 bg-info-600 rounded flex items-center justify-center text-white font-primary font-semibold text-sm shadow-outer">
                            Roll
                        </div>
                    </Animation.Roll>
                    <span className="text-sm text-ground-500">Roll Left</span>
                </div>

                {/* JackInTheBox */}
                <div className="flex flex-col items-center gap-2">
                    <Animation.JackInTheBox>
                        <div className="w-16 h-16 bg-success-600 rounded flex items-center justify-center text-white font-primary font-semibold text-[10px] text-center leading-tight shadow-outer">
                            Jack In Box
                        </div>
                    </Animation.JackInTheBox>
                    <span className="text-sm text-ground-500">JackInTheBox</span>
                </div>

                {/* Hinge */}
                <div className="flex flex-col items-center gap-2">
                    <Animation.Hinge>
                        <div className="w-16 h-16 bg-warning-600 rounded flex items-center justify-center text-ground-950 font-primary font-semibold text-sm shadow-outer">
                            Hinge
                        </div>
                    </Animation.Hinge>
                    <span className="text-sm text-ground-500">Hinge</span>
                </div>
            </div>
        </div>
    );
}
