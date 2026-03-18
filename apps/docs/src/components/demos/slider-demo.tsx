"use client";

import { Slider } from "vayu-ui";
import { useState } from "react";

export default function SliderDemo() {
    const [volume, setVolume] = useState([50]);
    const [range, setRange] = useState([20, 80]);
    const [brightness, setBrightness] = useState([75]);

    return (
        <div className="w-full max-w-md not-prose space-y-8">
            <h2 id="slider-demo-label" className="text-xl font-primary font-semibold text-ground-900 dark:text-ground-100">
                Slider Examples
            </h2>

            {/* Default Single Value */}
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-secondary font-medium text-ground-700 dark:text-ground-300">
                        Volume
                    </label>
                    <span className="text-sm font-tertiary tabular-nums text-ground-600 dark:text-ground-400">
                        {volume[0]}%
                    </span>
                </div>
                <Slider
                    defaultValue={[50]}
                    max={100}
                    step={1}
                    label="Volume"
                    onValueChange={setVolume}
                />
            </div>

            {/* Range Slider */}
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-secondary font-medium text-ground-700 dark:text-ground-300">
                        Price Range
                    </label>
                    <span className="text-sm font-tertiary tabular-nums text-ground-600 dark:text-ground-400">
                        ${range[0]} - ${range[1]}
                    </span>
                </div>
                <Slider
                    defaultValue={[20, 80]}
                    min={0}
                    max={100}
                    step={5}
                    label="Price range"
                    onValueChange={setRange}
                />
            </div>

            {/* Controlled */}
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-secondary font-medium text-ground-700 dark:text-ground-300">
                        Brightness (Controlled)
                    </label>
                    <span className="text-sm font-tertiary tabular-nums text-ground-600 dark:text-ground-400">
                        {brightness[0]}%
                    </span>
                </div>
                <Slider
                    value={brightness}
                    max={100}
                    step={1}
                    label="Brightness"
                    onValueChange={setBrightness}
                />
            </div>

            {/* Disabled */}
            <div className="space-y-3">
                <label className="text-sm font-secondary font-medium text-ground-700 dark:text-ground-300">
                    Disabled
                </label>
                <Slider defaultValue={[25]} disabled label="Disabled slider" />
            </div>

            {/* Custom Step */}
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-secondary font-medium text-ground-700 dark:text-ground-300">
                        Custom Step (25)
                    </label>
                </div>
                <Slider defaultValue={[50]} max={100} step={25} label="Step slider" />
                <div className="flex justify-between text-[10px] font-secondary text-ground-400 px-1">
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