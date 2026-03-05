"use client";

import { Combobox, type ComboboxOption } from "vayu-ui";
import { Globe, Palette, Smartphone } from "lucide-react";
import { useState } from "react";

const frameworks: ComboboxOption[] = [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
    { label: "Next.js", value: "nextjs" },
    { label: "Nuxt", value: "nuxt" },
    { label: "SolidJS", value: "solid" },
    { label: "Qwik", value: "qwik", disabled: true },
];

const categorized: ComboboxOption[] = [
    {
        label: "Tailwind CSS",
        value: "tailwind",
        group: "Styling",
        icon: <Palette className="w-4 h-4" />,
        description: "Utility-first CSS framework",
    },
    {
        label: "Styled Components",
        value: "styled",
        group: "Styling",
        icon: <Palette className="w-4 h-4" />,
    },
    {
        label: "React Native",
        value: "rn",
        group: "Mobile",
        icon: <Smartphone className="w-4 h-4" />,
    },
    {
        label: "Flutter",
        value: "flutter",
        group: "Mobile",
        icon: <Smartphone className="w-4 h-4" />,
    },
    {
        label: "Vercel",
        value: "vercel",
        group: "Hosting",
        icon: <Globe className="w-4 h-4" />,
    },
    {
        label: "Netlify",
        value: "netlify",
        group: "Hosting",
        icon: <Globe className="w-4 h-4" />,
    },
];

export default function ComboboxDemo() {
    const [single, setSingle] = useState<string | number | null>("react");
    const [multi, setMulti] = useState<(string | number)[]>([
        "tailwind",
        "vercel",
    ]);

    return (
        <div className="not-prose flex flex-col gap-8 w-full max-w-md">
            {/* Single select */}
            <Combobox
                label="Framework"
                options={frameworks}
                value={single}
                onChange={setSingle}
                clearable
                required
            />

            {/* Multi select with groups */}
            <Combobox
                label="Tech Stack"
                options={categorized}
                multiple
                value={multi}
                onChange={setMulti}
                maxSelected={4}
                clearable
                variant="outline"
            />

            {/* Error state */}
            <Combobox
                label="Category"
                options={frameworks.slice(0, 3)}
                error
                errorText="Please select a category."
            />

            {/* Disabled */}
            <Combobox
                label="Locked"
                options={frameworks}
                value="react"
                disabled
            />
        </div>
    );
}
