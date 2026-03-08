import { RegistryItem } from "..";

export const aspectRatioRegistry: RegistryItem = {
  name: "AspectRatio",
  slug: "aspectratio",
  type: "component",
  category: "layout",
  since: "1.0.0",
  description:
    "A layout primitive that constrains children to a specific aspect ratio. Uses native Tailwind classes for presets and a padding-bottom fallback for custom numeric ratios.",
  targetPath: "src/components/ui",
  fileName: "aspectratio.tsx",
  dependencies: ["clsx"],
  registryDependencies: [],
  tags: ["component", "layout", "responsive", "utility"],
  composition: {
    parts: {
      AspectRatio:
        "The root container that enforces the ratio. Wraps children in an absolute positioned div to fill the space.",
    },
    example: `<AspectRatio ratio="video" className="rounded overflow-hidden">
  <img src="/image.jpg" alt="Description" />
</AspectRatio>`,
    partsRequired: false,
  },
  a11y: {
    role: "region (default) or presentation (if decorative)",
    managedAttrs: ["aria-hidden", "role"],
    keyboard: {},
    focusManagement: "None.",
    notes: [
      "Defaults to role='region' making it a landmark for screen readers.",
      "Use the 'decorative' prop to hide the container from assistive technology if it is purely visual.",
      "If not decorative, use 'aria-label' to describe the content context.",
    ],
  },
  props: {
    ratio: {
      type: "number | AspectRatioPreset",
      required: false,
      default: "'square'",
      description:
        "The desired aspect ratio (width / height). Presets ('video', 'square') use native CSS, numbers use padding-bottom fallback.",
    },
    objectFit: {
      type: "'cover' | 'contain' | 'fill' | 'scale-down' | 'none'",
      required: false,
      default: "'cover'",
      description:
        "Automatically applies object-fit styles to direct `<img>` or `<video>` children.",
    },
    overflow: {
      type: "'hidden' | 'visible' | 'auto' | 'scroll'",
      required: false,
      default: "'hidden'",
      description: "Controls overflow behavior of the container.",
    },
    decorative: {
      type: "boolean",
      required: false,
      default: "false",
      description:
        "If true, sets role='presentation' and aria-hidden='true' to hide from screen readers.",
    },
  },
  examples: {
    preset: {
      code: `<AspectRatio ratio="video" className="bg-gray-100">
  <div className="flex items-center justify-center h-full">
    16:9 Container
  </div>
</AspectRatio>`,
      description: "Using a named preset for standard video dimensions.",
    },
    custom: {
      code: `<AspectRatio ratio={2.5} className="bg-gray-100">
  <img src="/banner.jpg" alt="Wide banner" className="w-full h-full" />
</AspectRatio>`,
      description: "Using a custom numeric ratio for specific layouts.",
    },
    decorative: {
      code: `<AspectRatio ratio="square" decorative className="w-24 h-24 bg-gray-200 rounded-full">
  <UserIcon className="w-full h-full p-4" />
</AspectRatio>`,
      description: "A decorative container for an icon, hidden from screen readers.",
    },
  },
  doNot: [
    {
      rule: "Do not apply margins to the AspectRatio container itself",
      category: "styling",
      why: "The component relies on width: 100% to calculate height. Margins can disrupt layout flow; wrap it in a div instead.",
    },
    {
      rule: "Do not rely on objectFit prop for deeply nested images",
      category: "styling",
      why: "The objectFit prop applies styles via direct child selectors ([&>img]). If your image is wrapped in another element, you must apply object-fit manually.",
    },
    {
      rule: "Do not forget aria-label for meaningful content",
      category: "a11y",
      why: "If the container holds meaningful information (like a chart or graph), provide an aria-label to give context to the 'region' landmark.",
    },
  ],
};