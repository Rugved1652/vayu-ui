"use client";

import { Slider, Typography, Divider, Button } from "vayu-ui";
import { useState } from "react";

const { H5, Label } = Typography;

export default function SliderDemo() {
    const [volume, setVolume] = useState([50]);
    const [range, setRange] = useState([20, 80]);
    const [brightness, setBrightness] = useState([75]);

    return (
        <div className="w-full max-w-md not-prose space-y-8">
            <H5 font="primary">Slider Examples</H5>

            {/* Default Single Value */}
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <Label>Volume</Label>
                    <span className="font-tertiary tabular-nums text-muted-content">
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

            <Divider />

            {/* Range Slider */}
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <Label>Price Range</Label>
                    <span className="font-tertiary tabular-nums text-muted-content">
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

            <Divider />

            {/* Controlled */}
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <Label>Brightness (Controlled)</Label>
                    <span className="font-tertiary tabular-nums text-muted-content">
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
                <Button
                    variant="ghost"
                    size="small"
                    onClick={() => setBrightness([75])}
                >
                    Reset to 75%
                </Button>
            </div>

            <Divider />

            {/* Disabled */}
            <div className="space-y-3">
                <Label>Disabled</Label>
                <Slider defaultValue={[25]} disabled label="Disabled slider" />
            </div>

            <Divider />

            {/* Custom Step */}
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <Label>Custom Step (25)</Label>
                </div>
                <Slider defaultValue={[50]} max={100} step={25} label="Step slider" />
                <div className="flex justify-between font-tertiary text-muted-content px-1">
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
