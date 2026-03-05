"use client";

import { Select } from "vayu-ui";
import { useState } from "react";

const fruits = [
    { label: "Apple", value: "apple", description: "A crisp, sweet fruit" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
    { label: "Dragonfruit", value: "dragonfruit" },
    { label: "Elderberry", value: "elderberry", disabled: true },
];

const grouped = [
    { label: "React", value: "react", group: "Frontend" },
    { label: "Vue", value: "vue", group: "Frontend" },
    { label: "Svelte", value: "svelte", group: "Frontend" },
    { label: "Node.js", value: "node", group: "Backend" },
    { label: "Django", value: "django", group: "Backend" },
    { label: "Rails", value: "rails", group: "Backend" },
];

export default function SelectDemo() {
    const [single, setSingle] = useState<string | number | null>(null);
    const [multi, setMulti] = useState<(string | number)[]>([]);

    return (
        <div className="flex flex-col not-prose gap-10 w-full max-w-sm">
            {/* ── Basic ── */}
            <Select
                label="Favourite fruit"
                options={fruits}
                placeholder="Pick a fruit…"
                value={single}
                onChange={setSingle}
                searchable
                clearable
            />

            {/* ── Multi-select ── */}
            <Select
                label="Technologies"
                options={grouped}
                placeholder="Select technologies…"
                multiple
                value={multi}
                onChange={setMulti}
                searchable
                clearable
                maxSelected={4}
            />

            {/* ── Error State ── */}
            <Select
                label="Required field"
                options={fruits}
                placeholder="Choose…"
                error
                errorText="This field is required"
                required
            />

            {/* ── Disabled ── */}
            <Select
                label="Disabled"
                options={fruits}
                placeholder="Can't touch this"
                disabled
            />
        </div>
    );
}
