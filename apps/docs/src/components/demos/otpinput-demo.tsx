"use client";

import { useState } from "react";
import { OTPGroup, OTPInput, OTPSeparator, OTPSlot } from "vayu-ui";

export default function OTPInputDemo() {
    const [value, setValue] = useState("");

    return (
        <div className="flex flex-col items-center gap-10">
            {/* Basic 6-digit Example */}
            <div className="space-y-4 flex flex-col items-center">
                <h3 className="text-lg font-medium">Default (6-digit)</h3>
                <OTPInput
                    value={value}
                    onChange={setValue}
                    maxLength={6}
                    onComplete={(code) => console.log("Complete:", code)}
                >
                    <OTPGroup>
                        <OTPSlot index={0} />
                        <OTPSlot index={1} />
                        <OTPSlot index={2} />
                        <OTPSlot index={3} />
                        <OTPSlot index={4} />
                        <OTPSlot index={5} />
                    </OTPGroup>
                </OTPInput>
                <p className="text-sm text-neutral-500">Value: {value}</p>
            </div>

            {/* Grouped Example */}
            <div className="space-y-4 flex flex-col items-center">
                <h3 className="text-lg font-medium">Grouped with Separator</h3>
                <OTPInput maxLength={6}>
                    <OTPGroup>
                        <OTPSlot index={0} />
                        <OTPSlot index={1} />
                        <OTPSlot index={2} />
                    </OTPGroup>
                    <OTPSeparator />
                    <OTPGroup>
                        <OTPSlot index={3} />
                        <OTPSlot index={4} />
                        <OTPSlot index={5} />
                    </OTPGroup>
                </OTPInput>
            </div>
        </div>
    );
}
