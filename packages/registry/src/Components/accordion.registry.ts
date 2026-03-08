import { RegistryItem } from "..";

export const accordionRegistry: RegistryItem = {
  name: "Accordion",
  slug: "accordion",
  type: "component",
  category: "layout",
  since: "1.0.0",
  description:
    "A vertically stacked set of interactive headings that each reveal a section of content. Built with a compound component pattern for flexibility.",
  targetPath: "src/components/ui",
  fileName: "accordion.tsx",
  dependencies: [],
  registryDependencies: [],
  tags: ["component", "disclosure", "a11y"],
  composition: {
    parts: {
      Accordion: "Root context provider — manages open/close state and keyboard navigation.",
      "Accordion.Item": "Wraps a single accordion row.",
      "Accordion.Header": "The interactive trigger button — toggles the visibility of the body.",
      "Accordion.Body": "The content panel — handles height animation and inert state.",
    },
    example: `<Accordion allowMultiple>
  <Accordion.Item itemId="item-1">
    <Accordion.Header itemId="item-1">Is it accessible?</Accordion.Header>
    <Accordion.Body itemId="item-1">
      <p>Yes. It adheres to the WAI-ARIA design pattern.</p>
    </Accordion.Body>
  </Accordion.Item>
</Accordion>`,
    partsRequired: true,
  },
  a11y: {
    role: "presentation (root), region (body)",
    managedAttrs: [
      "aria-expanded",
      "aria-controls",
      "aria-labelledby",
      "aria-hidden",
      "inert",
    ],
    keyboard: {
      "Enter / Space": "Toggles the accordion item when the header has focus.",
      ArrowDown: "Moves focus to the next accordion header.",
      ArrowUp: "Moves focus to the previous accordion header.",
      Home: "Moves focus to the first accordion header.",
      End: "Moves focus to the last accordion header.",
    },
    focusManagement: "Focus is automatically restored to the header if the panel closes while focused internally.",
  },
  props: {
    allowMultiple: {
      type: "boolean",
      required: false,
      default: "false",
      component: "Accordion",
      description: "Allows multiple accordion items to be open simultaneously.",
    },
    itemId: {
      type: "string",
      required: true,
      component: "Accordion.Item, Accordion.Header, Accordion.Body",
      description: "A unique identifier used to link the Item, Header, and Body components.",
    },
  },
  examples: {
    default: {
      code: `<Accordion>
  <Accordion.Item itemId="q-1">
    <Accordion.Header itemId="q-1">What is Vayu UI?</Accordion.Header>
    <Accordion.Body itemId="q-1">A modern, accessible React component library.</Accordion.Body>
  </Accordion.Item>
  <Accordion.Item itemId="q-2">
    <Accordion.Header itemId="q-2">Is it styled?</Accordion.Header>
    <Accordion.Body itemId="q-2">Yes, it comes with default Tailwind CSS styles.</Accordion.Body>
  </Accordion.Item>
</Accordion>`,
      description: "A standard accordion where only one item can be open at a time.",
    },
    multiple: {
      code: `<Accordion allowMultiple>
  <Accordion.Item itemId="m-1">
    <Accordion.Header itemId="m-1">Details</Accordion.Header>
    <Accordion.Body itemId="m-1">Content for details.</Accordion.Body>
  </Accordion.Item>
  <Accordion.Item itemId="m-2">
    <Accordion.Header itemId="m-2">Reviews</Accordion.Header>
    <Accordion.Body itemId="m-2">Content for reviews.</Accordion.Body>
  </Accordion.Item>
</Accordion>`,
      description: "An accordion allowing multiple sections to remain open.",
    },
  },
  doNot: [
    {
      rule: "Do not use Accordion.Header or Body outside of an Accordion.Item",
      category: "nesting",
      why: "These components rely on the AccordionContext provided by the root Accordion component.",
    },
    {
      rule: "Do not duplicate itemId values within the same Accordion group",
      category: "api",
      why: "Duplicate IDs will break the internal state logic and accessibility relationships (aria-controls).",
    },
    {
      rule: "Do not omit itemId from any part",
      category: "api",
      why: "The itemId is required on Item, Header, and Body to synchronize state.",
    },
  ],
};