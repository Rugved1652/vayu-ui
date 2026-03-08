import { RegistryItem } from "..";

export const affixRegistry: RegistryItem = {
  name: "Affix",
  slug: "affix",
  type: "component",
  category: "layout",
  since: "1.0.0",
  description:
    "Pins content to the viewport or a specific container when scrolled past. Supports top/bottom positioning and custom scroll contexts.",
  targetPath: "src/components/ui",
  fileName: "affix.tsx",
  dependencies: ["clsx"],
  registryDependencies: [],
  tags: ["component", "sticky", "scroll", "utility"],
  composition: {
    parts: {
      Affix:
        "The root container that monitors scroll position and applies fixed positioning styles.",
    },
    example: `<Affix offset={64} position="top" onAffixed={(isFixed) => console.log(isFixed)}>
  <div className="bg-white p-4 shadow">
    I am sticky!
  </div>
</Affix>`,
    partsRequired: false,
  },
  a11y: {
    role: "None (defaults to presentation/div)",
    managedAttrs: ["data-affixed"],
    keyboard: {},
    focusManagement: "None. Component is a layout utility.",
    notes: [
      "Component relies on consumer to provide semantic structure (e.g., role='region', aria-label).",
      "data-affixed attribute is applied to the root element when active, allowing for style hooks.",
    ],
  },
  props: {
    offset: {
      type: "number",
      required: false,
      default: "0",
      description: "Distance in pixels from the viewport edge when affixed.",
    },
    position: {
      type: "'top' | 'bottom'",
      required: false,
      default: "'top'",
      description: "Determines which viewport edge the component pins to.",
    },
    target: {
      type: "HTMLElement | null",
      required: false,
      default: "window",
      description: "Custom scroll container to observe. Defaults to the window.",
    },
    zIndex: {
      type: "number",
      required: false,
      default: "100",
      description: "Z-index applied to the content when it is affixed.",
    },
    onAffixed: {
      type: "(affixed: boolean) => void",
      required: false,
      description: "Callback fired when the affixed state changes.",
    },
    className: {
      type: "string",
      required: false,
      description: "CSS classes applied to the wrapper div.",
    },
  },
  examples: {
    default: {
      code: `<Affix offset={64}>
  <div className="bg-white shadow-md p-4 rounded">
    Sticky Navigation
  </div>
</Affix>`,
      description: "Basic usage pinning a navigation bar to the top of the viewport.",
    },
    container: {
      code: `const scrollContainerRef = useRef(null);

return (
  <div ref={scrollContainerRef} style={{ height: '400px', overflow: 'auto' }}>
    <div style={{ height: '1000px' }}>
      <Affix target={scrollContainerRef} position="bottom" offset={10}>
        <div className="bg-gray-800 text-white p-2">
          Container Footer
        </div>
      </Affix>
    </div>
  </div>
)`,
      description: "Affixing content to the bottom of a specific scrollable container.",
    },
  },
  doNot: [
    {
      rule: "Do not use 'label' prop for accessibility",
      category: "api",
      why: "The source implementation uses standard HTML attribute spreading. Use 'aria-label' or 'aria-labelledby' props directly instead of a custom 'label' prop.",
    },
    {
      rule: "Do not forget to style the affixed state",
      category: "styling",
      why: "While a shadow is applied by default, you often need visual differentiation (like background color) to prevent content transparency issues when fixed.",
    },
  ],
};