"use client";

import { Animation } from "vayu-ui";
import { Button } from "vayu-ui";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";

export default function AnimationDemo() {
    const [key, setKey] = useState(0);

    const reload = () => setKey((prev) => prev + 1);

    return (
        <div className="flex not-prose flex-col gap-6 w-full">
            <div className="flex justify-end">
                <Button variant="outline" size="small" onClick={reload}>
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    Replay Animations
                </Button>
            </div>

            <div key={key} className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {/* Fade */}
                <div className="flex flex-col items-center gap-2">
                    <Animation.Fade duration="slow">
                        <div className="w-20 h-20 bg-primary-500 rounded-lg shadow-lg flex items-center justify-center text-white font-bold">
                            Fade
                        </div>
                    </Animation.Fade>
                    <span className="text-sm text-neutral-500">Fade In</span>
                </div>

                {/* Slide */}
                <div className="flex flex-col items-center gap-2">
                    <Animation.Slide direction="left" duration="normal">
                        <div className="w-20 h-20 bg-secondary-500 rounded-lg shadow-lg flex items-center justify-center text-white font-bold">
                            Slide
                        </div>
                    </Animation.Slide>
                    <span className="text-sm text-neutral-500">Slide Left</span>
                </div>

                {/* Bounce */}
                <div className="flex flex-col items-center gap-2">
                    <Animation.Bounce scale="medium">
                        <div className="w-20 h-20 bg-success-500 rounded-lg shadow-lg flex items-center justify-center text-white font-bold">
                            Bounce
                        </div>
                    </Animation.Bounce>
                    <span className="text-sm text-neutral-500">Bounce</span>
                </div>

                {/* Flip */}
                <div className="flex flex-col items-center gap-2">
                    <Animation.Flip direction="up">
                        <div className="w-20 h-20 bg-warning-500 rounded-lg shadow-lg flex items-center justify-center text-white font-bold">
                            Flip
                        </div>
                    </Animation.Flip>
                    <span className="text-sm text-neutral-500">Flip Up</span>
                </div>

                {/* Rotate */}
                <div className="flex flex-col items-center gap-2">
                    <Animation.Rotate degrees={-180}>
                        <div className="w-20 h-20 bg-error-500 rounded-lg shadow-lg flex items-center justify-center text-white font-bold">
                            Rotate
                        </div>
                    </Animation.Rotate>
                    <span className="text-sm text-neutral-500">Rotate</span>
                </div>

                {/* Zoom */}
                <div className="flex flex-col items-center gap-2">
                    <Animation.Zoom scale="medium">
                        <div className="w-20 h-20 bg-info-500 rounded-lg shadow-lg flex items-center justify-center text-white font-bold">
                            Zoom
                        </div>
                    </Animation.Zoom>
                    <span className="text-sm text-neutral-500">Zoom</span>
                </div>

                {/* Roll */}
                <div className="flex flex-col items-center gap-2 overflow-hidden">
                    <Animation.Roll direction="left">
                        <div className="w-20 h-20 bg-purple-500 rounded-lg shadow-lg flex items-center justify-center text-white font-bold">
                            Roll
                        </div>
                    </Animation.Roll>
                    <span className="text-sm text-neutral-500">Roll Left</span>
                </div>

                {/* JackInTheBox */}
                <div className="flex flex-col items-center gap-2">
                    <Animation.JackInTheBox>
                        <div className="w-20 h-20 bg-pink-500 rounded-lg shadow-lg flex items-center justify-center text-white font-bold text-center text-xs">
                            Jack In Box
                        </div>
                    </Animation.JackInTheBox>
                    <span className="text-sm text-neutral-500">JackInTheBox</span>
                </div>

                {/* Hinge */}
                <div className="flex flex-col items-center gap-2">
                    <Animation.Hinge>
                        <div className="w-20 h-20 bg-orange-500 rounded-lg shadow-lg flex items-center justify-center text-white font-bold">
                            Hinge
                        </div>
                    </Animation.Hinge>
                    <span className="text-sm text-neutral-500">Hinge</span>
                </div>
            </div>
        </div>
    );
}
