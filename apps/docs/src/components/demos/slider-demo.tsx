"use client";

import { Slider } from "vayu-ui";
import { useState } from "react";

export default function SliderDemo() {
    const [volume, setVolume] = useState([50]);
    const [range, setRange] = useState([20, 80]);

    return (
        <div className="flex flex-col gap-10 w-full max-w-sm">
            {/* ── Basic ── */}
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                        Volume
                    </p>
                    <span className="text-sm font-medium tabular-nums">{volume[0]}%</span>
                </div>
                <Slider
                    defaultValue={[50]}
                    max={100}
                    step={1}
                    onValueChange={setVolume}
                />
            </div>

            {/* ── Range ── */}
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                        Price Range
                    </p>
                    <span className="text-sm font-medium tabular-nums">
                        ${range[0]} - ${range[1]}
                    </span>
                </div>
                <Slider
                    defaultValue={[20, 80]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={setRange}
                />
            </div>

            {/* ── Disabled ── */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    Disabled
                </p>
                <Slider defaultValue={[25]} disabled />
            </div>

            {/* ── Custom Step ── */}
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                        Steps (25)
                    </p>
                </div>
                <Slider defaultValue={[25]} max={100} step={25} />
                <div className="flex justify-between text-[10px] text-ground-400 font-secondary px-1">
                    <span>0</span>
                    <span>25</span>
                    <span>50</span>
                    <span>75</span>
                    <span>100</span>
                </div>
            </div>
        </div>
    );
}
