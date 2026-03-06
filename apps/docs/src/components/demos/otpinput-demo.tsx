"use client";

import { useState } from "react";
import { OTPInput } from "vayu-ui";

export default function OTPInputDemo() {
    const [value, setValue] = useState("");

    return (
        <div className="w-full max-w-md not-prose">
            <h2 id="otpinput-demo-label" className="text-xl font-semibold mb-4">
                OTP Input Example
            </h2>

            {/* Default usage */}
            <div className="space-y-6">
                <div>
                    <p className="text-sm text-ground-600 dark:text-ground-400 mb-3">
                        Default (6-digit)
                    </p>
                    <OTPInput.Root
                        value={value}
                        onChange={setValue}
                        maxLength={6}
                        onComplete={(code) => console.log("Complete:", code)}
                    >
                        <OTPInput.Group>
                            <OTPInput.Slot index={0} />
                            <OTPInput.Slot index={1} />
                            <OTPInput.Slot index={2} />
                            <OTPInput.Slot index={3} />
                            <OTPInput.Slot index={4} />
                            <OTPInput.Slot index={5} />
                        </OTPInput.Group>
                    </OTPInput.Root>
                    <p className="text-sm text-ground-500 mt-2">Value: {value || "—"}</p>
                </div>

                {/* Grouped with Separator */}
                <div>
                    <p className="text-sm text-ground-600 dark:text-ground-400 mb-3">
                        Grouped with Separator
                    </p>
                    <OTPInput.Root maxLength={6}>
                        <OTPInput.Group>
                            <OTPInput.Slot index={0} />
                            <OTPInput.Slot index={1} />
                            <OTPInput.Slot index={2} />
                        </OTPInput.Group>
                        <OTPInput.Separator />
                        <OTPInput.Group>
                            <OTPInput.Slot index={3} />
                            <OTPInput.Slot index={4} />
                            <OTPInput.Slot index={5} />
                        </OTPInput.Group>
                    </OTPInput.Root>
                </div>

                {/* Disabled state */}
                <div>
                    <p className="text-sm text-ground-600 dark:text-ground-400 mb-3">
                        Disabled
                    </p>
                    <OTPInput.Root maxLength={6} disabled>
                        <OTPInput.Group>
                            <OTPInput.Slot index={0} />
                            <OTPInput.Slot index={1} />
                            <OTPInput.Slot index={2} />
                            <OTPInput.Slot index={3} />
                            <OTPInput.Slot index={4} />
                            <OTPInput.Slot index={5} />
                        </OTPInput.Group>
                    </OTPInput.Root>
                </div>
            </div>
        </div>
    );
}