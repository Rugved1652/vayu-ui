"use client";

import { Checkbox } from "vayu-ui";
import { useState } from "react";

export default function CheckboxDemo() {
    const [indeterminate, setIndeterminate] = useState(true);

    return (
        <div className="flex flex-col gap-10">
            {/* Basic States */}
            <div className="flex flex-wrap gap-8 items-start">
                <Checkbox label="Accept terms and conditions" />
                <Checkbox label="Checked state" defaultChecked />
                <Checkbox
                    label="Indeterminate state"
                    checked={indeterminate}
                    indeterminate={indeterminate}
                    onChange={() => setIndeterminate(!indeterminate)}
                />
                <Checkbox label="Disabled" disabled />
                <Checkbox label="Disabled Checked" disabled defaultChecked />
            </div>

            {/* With Description */}
            <div className="max-w-md">
                <Checkbox
                    label="Subscribe to newsletter"
                    description="We will send you weekly updates about our products and features."
                />
            </div>

            {/* Variants */}
            <div className="flex flex-wrap gap-4">
                <Checkbox label="Primary" variant="primary" defaultChecked />
                <Checkbox label="Secondary" variant="secondary" defaultChecked />
                <Checkbox label="Success" variant="success" defaultChecked />
                <Checkbox label="Warning" variant="warning" defaultChecked />
                <Checkbox label="Error" variant="error" defaultChecked />
                <Checkbox label="Info" variant="info" defaultChecked />
            </div>

            {/* Group */}
            <div className="max-w-md">
                <Checkbox.Group
                    label="Notifications"
                    description="Select the notifications you want to receive."
                    required
                >
                    <Checkbox label="Email" value="email" />
                    <Checkbox label="SMS" value="sms" />
                    <Checkbox label="Push Notifications" value="push" />
                </Checkbox.Group>
            </div>

            {/* Error State */}
            <div className="max-w-md">
                <Checkbox
                    label="I agree to the privacy policy"
                    error
                    errorText="You must agree to the privacy policy."
                />
            </div>
        </div>
    );
}
