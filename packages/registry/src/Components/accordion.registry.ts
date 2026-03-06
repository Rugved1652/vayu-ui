import { RegistryItem } from "..";

export const accordionRegistry: RegistryItem = {
    name: "Accordion",
    slug: "accordion",
    type: "component",
    category: "layout",
    since: "1.0.0",
    description:
      "Expandable content sections using a compound component pattern with full keyboard navigation.",
    targetPath: "src/components/ui",
    fileName: "accordion.tsx",
    dependencies: [],
    registryDependencies: [],
    tags: ["component"],
    composition: {
      parts: {
        Accordion: "Root context provider — controls open/close state",
        "Accordion.Item": "Wraps a single accordion row",
        "Accordion.Header": "Trigger button — toggles the body",
        "Accordion.Body": "Animated content panel",
      },
      example: `<Accordion allowMultiple>
  <Accordion.Item itemId="faq-1">
    <Accordion.Header itemId="faq-1">What is Vayu UI?</Accordion.Header>
    <Accordion.Body itemId="faq-1">A modern React component library.</Accordion.Body>
  </Accordion.Item>
</Accordion>`,
      partsRequired: true,
    },
    a11y: {
      role: "presentation",
      managedAttrs: [
        "aria-expanded",
        "aria-controls",
        "aria-labelledby",
        "aria-hidden",
      ],
      keyboard: {
        "Enter / Space": "Toggles the accordion item",
        ArrowDown: "Moves focus to next header",
        ArrowUp: "Moves focus to previous header",
        Home: "Moves focus to first header",
        End: "Moves focus to last header",
      },
      focusManagement: "Focus returns to header when body collapses",
    },
    props: {
      allowMultiple: {
        type: "boolean",
        required: false,
        default: "false",
        description: "Allow multiple items open simultaneously",
      },
      className: {
        type: "string",
        required: false,
        description: "Additional CSS classes on root element",
      },
    },
    examples: {
      default: {
        code: `<Accordion>
  <Accordion.Item itemId="1">
    <Accordion.Header itemId="1">Section 1</Accordion.Header>
    <Accordion.Body itemId="1">Content for section 1</Accordion.Body>
  </Accordion.Item>
</Accordion>`,
        description: "Basic single-open accordion.",
      },
      multiple: {
        code: `<Accordion allowMultiple>
  <Accordion.Item itemId="a"><Accordion.Header itemId="a">A</Accordion.Header><Accordion.Body itemId="a">Body A</Accordion.Body></Accordion.Item>
  <Accordion.Item itemId="b"><Accordion.Header itemId="b">B</Accordion.Header><Accordion.Body itemId="b">Body B</Accordion.Body></Accordion.Item>
</Accordion>`,
        description: "Multiple items can be open at once.",
      },
    },
    doNot: [
      {
        rule: "Don't use Accordion.Header outside Accordion.Item",
        category: "nesting",
        why: "Throws context error",
      },
      {
        rule: "Don't use the same itemId on multiple items",
        category: "api",
        why: "Causes broken open/close state",
      },
    ],
}