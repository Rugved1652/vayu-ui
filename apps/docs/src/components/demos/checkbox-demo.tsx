"use client";

import { Checkbox } from "vayu-ui";
import { useState } from "react";

export default function CheckboxDemo() {
    const [checked, setChecked] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>(["Notifications"]);

    const allItems = ["Notifications", "Marketing", "Security updates"];

    const isAllSelected = selectedItems.length === allItems.length;
    const isIndeterminate = selectedItems.length > 0 && selectedItems.length < allItems.length;

    const handleSelectAll = (checked: boolean) => {
        setSelectedItems(checked ? allItems : []);
    };

    const handleItemToggle = (item: string) => {
        setSelectedItems((prev) =>
            prev.includes(item)
                ? prev.filter((i) => i !== item)
                : [...prev, item]
        );
    };

    return (
        <div className="flex not-prose flex-col gap-4">
            {/* Controlled checkbox */}
            <Checkbox checked={checked} onChange={setChecked}>
                <div className="flex items-start gap-3">
                    <Checkbox.Indicator />
                    <div className="flex flex-col">
                        <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
                    </div>
                </div>
            </Checkbox>

            {/* With description */}
            <Checkbox>
                <div className="flex items-start gap-3">
                    <Checkbox.Indicator />
                    <div className="flex flex-col gap-1">
                        <Checkbox.Label>Marketing emails</Checkbox.Label>
                        <Checkbox.Description>
                            Receive updates about new products and features
                        </Checkbox.Description>
                    </div>
                </div>
            </Checkbox>

            {/* With error */}
            <Checkbox error>
                <div className="flex items-start gap-3">
                    <Checkbox.Indicator />
                    <div className="flex flex-col gap-1">
                        <Checkbox.Label>Required field</Checkbox.Label>
                        <Checkbox.Error>You must accept to continue</Checkbox.Error>
                    </div>
                </div>
            </Checkbox>

            {/* Select All with indeterminate state */}
            <div className="flex flex-col gap-2">
                <Checkbox
                    checked={isAllSelected}
                    indeterminate={isIndeterminate}
                    onChange={handleSelectAll}
                >
                    <div className="flex items-center gap-3">
                        <Checkbox.Indicator />
                        <Checkbox.Label>Select all email preferences</Checkbox.Label>
                    </div>
                </Checkbox>

                {allItems.map((item) => (
                    <Checkbox
                        key={item}
                        checked={selectedItems.includes(item)}
                        onChange={() => handleItemToggle(item)}
                    >
                        <div className="flex items-center gap-3 ml-6">
                            <Checkbox.Indicator />
                            <Checkbox.Label>{item}</Checkbox.Label>
                        </div>
                    </Checkbox>
                ))}
            </div>
        </div>
    );
}
