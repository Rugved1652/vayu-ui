// src/hooks.ts
var h = (name, slug, fileName, description) => ({
  name,
  slug,
  type: "hook",
  category: "utility",
  since: "1.0.0",
  description,
  targetPath: "src/hooks",
  fileName,
  dependencies: [],
  registryDependencies: [],
  tags: ["hook"]
});
var hooks = [
  h("useBatteryStatus", "use-battery-status", "useBatteryStatus.ts", "Tracks the device battery level, charging state, and charging/discharging time."),
  h("useConfirmExit", "use-confirm-exit", "useConfirmExit.ts", "Prompts the user with a confirmation dialog when they try to close or reload the tab."),
  h("useCopyToClipboard", "use-copy-to-clipboard", "useCopyToClipboard.ts", "Copies a string to the clipboard and exposes a copied state flag."),
  h("useCountdown", "use-countdown", "useCountdown.ts", "Countdown timer hook \u2014 returns remaining seconds and controls."),
  h("useDebounce", "use-debounce", "useDebounce.ts", "Debounces a value by delaying updates until after the wait period."),
  h("useDeviceOS", "use-device-os", "useDeviceOS.ts", "Detects the user's operating system from the user agent string."),
  h("useElementPosition", "use-element-position", "useElementPosition.ts", "Tracks the bounding rect position of a DOM element relative to the viewport."),
  h("useHover", "use-hover", "useHover.ts", "Returns a ref and a boolean indicating whether the element is hovered."),
  h("useIdle", "use-idle", "useIdle.ts", "Detects user inactivity after a configurable idle timeout."),
  h("useIndexedDB", "use-indexed-db", "useIndexedDB.ts", "CRUD operations on an IndexedDB object store with async state management."),
  h("useIntervalWhen", "use-interval-when", "useIntervalWhen.ts", "Runs a callback on an interval only when a condition is true."),
  h("useIsMount", "use-is-mount", "useIsMount.ts", "Returns true only on the initial render \u2014 useful for skipping effects on mount."),
  h("useKeyPress", "use-key-press", "useKeyPress.ts", "Returns true while a specific keyboard key is held down."),
  h("useList", "use-list", "useList.ts", "State hook for an array with push, remove, update, and clear helpers."),
  h("useLocalStorage", "use-local-storage", "useLocalStorage.ts", "Synced state backed by localStorage with JSON serialisation."),
  h("useLockBodyScroll", "use-lock-body-scroll", "useLockBodyScroll.ts", "Locks body scroll when active \u2014 typically used by modals and drawers."),
  h("useMap", "use-map", "useMap.ts", "State hook for a Map with set, delete, clear, and has helpers."),
  h("useMeasure", "use-measure", "useMeasure.ts", "Measures the width and height of a DOM element using ResizeObserver."),
  h("useMediaQuery", "use-media-query", "useMediaQuery.ts", "Returns true when a CSS media query matches the current viewport."),
  h("useMouseTrack", "use-mouse-track", "useMouseTrack.ts", "Tracks mouse position (x, y) relative to the window or a specific element."),
  h("useNetworkStatus", "use-network-status", "useNetworkStatus.ts", "Tracks online/offline status and network connection information."),
  h("useOnClickOutside", "use-on-click-outside", "useOnClickOutside.ts", "Fires a callback when a click is detected outside the referenced element."),
  h("usePageLeave", "use-page-leave", "usePageLeave.ts", "Fires a callback when the user's cursor leaves the browser viewport."),
  { ...h("usePermission", "use-permission", "usePermission.ts", "Queries the Permissions API for a given permission name and returns its state.") },
  { ...h("usePreviousState", "use-previous-state", "usePreviousState.ts", "Returns the previous value of a state variable or prop.") },
  h("useQueue", "use-queue", "useQueue.ts", "FIFO queue state with enqueue, dequeue, and peek helpers."),
  h("useRenderCount", "use-render-count", "useRenderCount.ts", "Returns the number of times the component has rendered \u2014 useful for debugging."),
  { ...h("useScrollPosition", "use-scroll-position", "useScrollPosition.ts", "Tracks the scroll position of the window or a specific element.") },
  h("useSet", "use-set", "useSet.ts", "State hook for a Set with add, delete, has, and clear helpers."),
  h("useThrottle", "use-throttle", "useThrottle.ts", "Throttles a value so updates fire at most once per delay period."),
  h("useTimeout", "use-timeout", "useTimeout.ts", "Runs a callback after a delay with cancel and reset controls."),
  h("useVisibilityChange", "use-visibility-change", "useVisibilityChange.ts", "Tracks document visibility \u2014 fires a callback when the tab becomes visible or hidden."),
  h("useWindowSize", "use-window-size", "useWindowSize.ts", "Tracks window width and height, updating on resize with debouncing.")
];

// src/Components/accordion.registry.ts
var accordionRegistry = {
  name: "Accordion",
  slug: "accordion",
  type: "component",
  category: "layout",
  since: "1.0.0",
  description: "A vertically stacked set of interactive headings that each reveal a section of content. Built with a compound component pattern for flexibility.",
  targetPath: "src/components/ui",
  fileName: "accordion.tsx",
  dependencies: [],
  registryDependencies: [],
  tags: ["component", "disclosure", "a11y"],
  composition: {
    parts: {
      Accordion: "Root context provider \u2014 manages open/close state and keyboard navigation.",
      "Accordion.Item": "Wraps a single accordion row.",
      "Accordion.Header": "The interactive trigger button \u2014 toggles the visibility of the body.",
      "Accordion.Body": "The content panel \u2014 handles height animation and inert state."
    },
    example: `<Accordion allowMultiple>
  <Accordion.Item itemId="item-1">
    <Accordion.Header itemId="item-1">Is it accessible?</Accordion.Header>
    <Accordion.Body itemId="item-1">
      <p>Yes. It adheres to the WAI-ARIA design pattern.</p>
    </Accordion.Body>
  </Accordion.Item>
</Accordion>`,
    partsRequired: true
  },
  a11y: {
    role: "presentation (root), region (body)",
    managedAttrs: [
      "aria-expanded",
      "aria-controls",
      "aria-labelledby",
      "aria-hidden",
      "inert"
    ],
    keyboard: {
      "Enter / Space": "Toggles the accordion item when the header has focus.",
      ArrowDown: "Moves focus to the next accordion header.",
      ArrowUp: "Moves focus to the previous accordion header.",
      Home: "Moves focus to the first accordion header.",
      End: "Moves focus to the last accordion header."
    },
    focusManagement: "Focus is automatically restored to the header if the panel closes while focused internally."
  },
  props: {
    allowMultiple: {
      type: "boolean",
      required: false,
      default: "false",
      component: "Accordion",
      description: "Allows multiple accordion items to be open simultaneously."
    },
    itemId: {
      type: "string",
      required: true,
      component: "Accordion.Item, Accordion.Header, Accordion.Body",
      description: "A unique identifier used to link the Item, Header, and Body components."
    }
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
      description: "A standard accordion where only one item can be open at a time."
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
      description: "An accordion allowing multiple sections to remain open."
    }
  },
  doNot: [
    {
      rule: "Do not use Accordion.Header or Body outside of an Accordion.Item",
      category: "nesting",
      why: "These components rely on the AccordionContext provided by the root Accordion component."
    },
    {
      rule: "Do not duplicate itemId values within the same Accordion group",
      category: "api",
      why: "Duplicate IDs will break the internal state logic and accessibility relationships (aria-controls)."
    },
    {
      rule: "Do not omit itemId from any part",
      category: "api",
      why: "The itemId is required on Item, Header, and Body to synchronize state."
    }
  ]
};

// src/Components/affix.registry.ts
var affixRegistry = {
  name: "Affix",
  slug: "affix",
  type: "component",
  category: "layout",
  since: "1.0.0",
  description: "Pins content to the viewport or a specific container when scrolled past. Supports top/bottom positioning and custom scroll contexts.",
  targetPath: "src/components/ui",
  fileName: "affix.tsx",
  dependencies: ["clsx"],
  registryDependencies: [],
  tags: ["component", "sticky", "scroll", "utility"],
  composition: {
    parts: {
      Affix: "The root container that monitors scroll position and applies fixed positioning styles."
    },
    example: `<Affix offset={64} position="top" onAffixed={(isFixed) => console.log(isFixed)}>
  <div className="bg-white p-4 shadow">
    I am sticky!
  </div>
</Affix>`,
    partsRequired: false
  },
  a11y: {
    role: "None (defaults to presentation/div)",
    managedAttrs: ["data-affixed"],
    keyboard: {},
    focusManagement: "None. Component is a layout utility.",
    notes: [
      "Component relies on consumer to provide semantic structure (e.g., role='region', aria-label).",
      "data-affixed attribute is applied to the root element when active, allowing for style hooks."
    ]
  },
  props: {
    offset: {
      type: "number",
      required: false,
      default: "0",
      description: "Distance in pixels from the viewport edge when affixed."
    },
    position: {
      type: "'top' | 'bottom'",
      required: false,
      default: "'top'",
      description: "Determines which viewport edge the component pins to."
    },
    target: {
      type: "HTMLElement | null",
      required: false,
      default: "window",
      description: "Custom scroll container to observe. Defaults to the window."
    },
    zIndex: {
      type: "number",
      required: false,
      default: "100",
      description: "Z-index applied to the content when it is affixed."
    },
    onAffixed: {
      type: "(affixed: boolean) => void",
      required: false,
      description: "Callback fired when the affixed state changes."
    },
    className: {
      type: "string",
      required: false,
      description: "CSS classes applied to the wrapper div."
    }
  },
  examples: {
    default: {
      code: `<Affix offset={64}>
  <div className="bg-white shadow-md p-4 rounded">
    Sticky Navigation
  </div>
</Affix>`,
      description: "Basic usage pinning a navigation bar to the top of the viewport."
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
      description: "Affixing content to the bottom of a specific scrollable container."
    }
  },
  doNot: [
    {
      rule: "Do not use 'label' prop for accessibility",
      category: "api",
      why: "The source implementation uses standard HTML attribute spreading. Use 'aria-label' or 'aria-labelledby' props directly instead of a custom 'label' prop."
    },
    {
      rule: "Do not forget to style the affixed state",
      category: "styling",
      why: "While a shadow is applied by default, you often need visual differentiation (like background color) to prevent content transparency issues when fixed."
    }
  ]
};

// src/components.ts
var components = [
  accordionRegistry,
  affixRegistry,
  {
    name: "Alert",
    slug: "alert",
    type: "component",
    category: "feedback",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "alert.tsx",
    dependencies: [],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Animation",
    slug: "animation",
    type: "component",
    category: "display",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "animation.tsx",
    dependencies: [],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Aspectratio",
    slug: "aspectratio",
    type: "component",
    category: "layout",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "aspectratio.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Audioplayer",
    slug: "audioplayer",
    type: "component",
    category: "display",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "audioplayer.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Avatar",
    slug: "avatar",
    type: "component",
    category: "display",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "avatar.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Avatargroup",
    slug: "avatargroup",
    type: "component",
    category: "display",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "avatargroup.tsx",
    dependencies: ["clsx"],
    registryDependencies: ["avatar"],
    tags: ["component"]
  },
  {
    name: "Badge",
    slug: "badge",
    type: "component",
    category: "display",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "badge.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "BigCalendar",
    slug: "big-calendar",
    type: "component",
    category: "display",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "bigcalendar.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Breadcrumb",
    slug: "breadcrumb",
    type: "component",
    category: "navigation",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "breadcrumb.tsx",
    dependencies: ["lucide-react", "clsx", "@radix-ui/react-slot"],
    registryDependencies: [],
    tags: ["component"]
  },
  // ── Button (rich metadata) ─────────────────────────────────────────────────
  {
    name: "Button",
    slug: "button",
    type: "component",
    category: "action",
    since: "1.0.0",
    description: "Triggers an action or event. Supports variants, sizes, loading state, icons, and badges via a compound component API.",
    targetPath: "src/components/ui",
    fileName: "button.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component", "action", "form"],
    variants: ["primary", "secondary", "outline", "ghost", "destructive"],
    props: {
      variant: {
        type: '"primary" | "secondary" | "outline" | "ghost" | "destructive"',
        required: false,
        default: '"primary"',
        description: "Visual style of the button"
      },
      size: {
        type: '"small" | "medium" | "large"',
        required: false,
        default: '"small"',
        description: "Controls padding and font size"
      },
      loading: {
        type: "Status",
        required: false,
        default: "Status.IDLE",
        description: "Pass Status.PENDING to show spinner and disable interaction"
      },
      loadingText: {
        type: "string",
        required: false,
        default: '"Loading"',
        description: "Screen-reader text shown during loading"
      },
      fullWidth: {
        type: "boolean",
        required: false,
        default: "false",
        description: "Stretches button to fill its container"
      },
      disabled: {
        type: "boolean",
        required: false,
        default: "false",
        description: "Prevents interaction and applies muted styling"
      },
      type: {
        type: '"button" | "submit" | "reset"',
        required: false,
        default: '"button"',
        description: "Native HTML button type. Always set to submit inside forms"
      },
      children: {
        type: "React.ReactNode",
        required: true,
        description: "Button label content"
      },
      "aria-label": {
        type: "string",
        required: false,
        description: "Required when button has no visible text (icon-only)"
      }
    },
    events: {
      onClick: {
        signature: "(event: React.MouseEvent<HTMLButtonElement>) => void",
        description: "Fires on click. Not fired when disabled or loading"
      },
      onFocus: {
        signature: "(event: React.FocusEvent<HTMLButtonElement>) => void",
        description: "Fires when button receives focus"
      },
      onBlur: {
        signature: "(event: React.FocusEvent<HTMLButtonElement>) => void",
        description: "Fires when button loses focus"
      }
    },
    states: {
      default: {
        trigger: "No special props",
        visualChange: "Base background and text from variant"
      },
      hover: {
        trigger: "Mouse hover (CSS)",
        visualChange: "Background darkens by one shade"
      },
      focus: {
        trigger: "Keyboard Tab or click",
        visualChange: "focus-visible ring-2 ring-offset-2",
        ariaAttr: ":focus-visible"
      },
      disabled: {
        trigger: "disabled={true}",
        visualChange: "opacity-60, cursor-not-allowed, pointer-events-none",
        ariaAttr: 'aria-disabled="true"'
      },
      loading: {
        trigger: "loading={Status.PENDING}",
        visualChange: "Spinner replaces children, button implicitly disabled",
        ariaAttr: 'aria-busy="true"'
      }
    },
    examples: {
      default: {
        code: `<Button>Save Changes</Button>`,
        description: "Default primary button"
      },
      outline: {
        code: `<Button variant="outline">Cancel</Button>`,
        description: "Outline for secondary actions"
      },
      ghost: {
        code: `<Button variant="ghost" size="small">Clear</Button>`,
        description: "Ghost for low-priority tertiary actions"
      },
      destructive: {
        code: `<Button variant="destructive">Delete Account</Button>`,
        description: "Destructive variant for irreversible actions"
      },
      loading: {
        code: `<Button loading={Status.PENDING}>Submitting...</Button>`,
        description: "Loading state during async operations"
      },
      withIcon: {
        code: `<Button>
  <Button.Icon><PlusIcon /></Button.Icon>
  <Button.Text>Add Item</Button.Text>
</Button>`,
        description: "Compound pattern with icon and text"
      },
      withBadge: {
        code: `<Button>
  Notifications
  <Button.Badge value={5} position="inline-right" />
</Button>`,
        description: "Button with inline notification badge"
      },
      formSubmit: {
        code: `<form onSubmit={handleSubmit}>
  <Button type="submit" loading={isSubmitting ? Status.PENDING : Status.IDLE} fullWidth>
    Create Account
  </Button>
</form>`,
        description: "Inside a form with submit type and loading state"
      }
    },
    a11y: {
      role: "button",
      requiredAttrs: {
        "aria-label": "Required when button has no visible text (icon-only buttons)"
      },
      managedAttrs: ["aria-disabled", "aria-busy", "aria-live"],
      keyboard: {
        Enter: "Activates the button",
        Space: "Activates the button"
      },
      focusManagement: "Focus remains on button after click. Move focus manually if button triggers navigation."
    },
    composition: {
      parts: {
        Button: "Root \u2014 the actual <button> element",
        "Button.Icon": "Wrapper for icons (sized to match button size)",
        "Button.Text": "Truncating text wrapper",
        "Button.Badge": "Notification badge (positioned or inline)"
      },
      example: `<Button variant="primary" size="medium">
  <Button.Icon><BellIcon /></Button.Icon>
  <Button.Text>Notifications</Button.Text>
  <Button.Badge value={3} position="top-right" variant="danger" />
</Button>`,
      partsRequired: false
    },
    tokens: [
      {
        var: "--color-primary-600",
        value: "#6366f1",
        controls: "primary variant background",
        overridable: true
      },
      {
        var: "--color-primary-700",
        value: "#4f46e5",
        controls: "primary variant hover bg",
        overridable: true
      },
      {
        var: "--color-error-600",
        value: "#dc2626",
        controls: "destructive variant background",
        overridable: true
      }
    ],
    darkMode: { automatic: true },
    peerComponents: ["Tooltip", "Buttongroup", "Form"],
    doNot: [
      {
        rule: "Don't use ghost for primary CTAs",
        category: "ux",
        why: "Low visual weight fails to draw attention"
      },
      {
        rule: "Don't nest <a> or <button> inside Button",
        category: "nesting",
        why: "Invalid HTML \u2014 causes unpredictable event behaviour"
      },
      {
        rule: "Don't omit aria-label on icon-only buttons",
        category: "a11y",
        why: "Screen readers cannot describe the button"
      },
      {
        rule: "Don't use loading + disabled simultaneously",
        category: "api",
        why: "Redundant \u2014 loading already disables interaction"
      }
    ],
    testing: {
      testIds: { "root element": "btn-root", "loading spinner": "btn-spinner" },
      storybookPath: "Components/Button"
    }
  },
  {
    name: "Buttongroup",
    slug: "buttongroup",
    type: "component",
    category: "action",
    since: "1.0.0",
    description: "Groups multiple <Button> elements together with connected styling.",
    targetPath: "src/components/ui",
    fileName: "buttongroup.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"],
    peerComponents: ["Button"]
  },
  {
    name: "Card",
    slug: "card",
    type: "component",
    category: "layout",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "card.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Carousel",
    slug: "carousel",
    type: "component",
    category: "display",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "carousel.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Checkbox",
    slug: "checkbox",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "checkbox.tsx",
    dependencies: ["clsx", "lucide-react"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Collapsible",
    slug: "collapsible",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "collapsible.tsx",
    dependencies: ["clsx", "lucide-react"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "ColorPicker",
    slug: "color-picker",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "colorpicker.tsx",
    dependencies: ["clsx", "lucide-react"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Combobox",
    slug: "combobox",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "combobox.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Commandbox",
    slug: "commandbox",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "commandbox.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Contextmenu",
    slug: "contextmenu",
    type: "component",
    category: "overlay",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "contextmenu.tsx",
    dependencies: ["clsx", "lucide-react"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Datetimepicker",
    slug: "datetimepicker",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "datetimepicker.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Divider",
    slug: "divider",
    type: "component",
    category: "layout",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "divider.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Draggable",
    slug: "draggable",
    type: "component",
    category: "layout",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "draggable.tsx",
    dependencies: ["clsx", "lucide-react"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Drawer",
    slug: "drawer",
    type: "component",
    category: "overlay",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "drawer.tsx",
    dependencies: ["clsx", "lucide-react"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Fileupload",
    slug: "fileupload",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "fileupload.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Floatingdock",
    slug: "floatingdock",
    type: "component",
    category: "navigation",
    since: "1.0.0",
    description: "Label \u2014 displayed in the tooltip.",
    targetPath: "src/components/ui",
    fileName: "floatingdock.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Footer",
    slug: "footer",
    type: "component",
    category: "layout",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "footer.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Hook",
    slug: "hook",
    type: "component",
    category: "utility",
    since: "1.0.0",
    description: "VideoPlayer Utility Hooks",
    targetPath: "src/components/ui",
    fileName: "hook.ts",
    dependencies: [],
    registryDependencies: ["videoplayer"],
    tags: ["component"],
    internal: true
  },
  {
    name: "Hovercard",
    slug: "hovercard",
    type: "component",
    category: "overlay",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "hovercard.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Marquee",
    slug: "marquee",
    type: "component",
    category: "display",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "marquee.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Menubar",
    slug: "menubar",
    type: "component",
    category: "navigation",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "menubar.tsx",
    dependencies: [],
    registryDependencies: ["use-element-position"],
    tags: ["component"]
  },
  // ── Modal (rich metadata) ──────────────────────────────────────────────────
  {
    name: "Modal",
    slug: "modal",
    type: "component",
    category: "overlay",
    since: "1.0.0",
    description: "Accessible dialog overlay rendered in a portal. Supports focus trap, Escape key, scroll lock, and multiple semantic variants via a compound component API.",
    targetPath: "src/components/ui",
    fileName: "modal.tsx",
    dependencies: ["clsx", "lucide-react"],
    registryDependencies: [],
    tags: ["component", "dialog", "overlay"],
    variants: ["default", "danger", "success", "warning", "info"],
    props: {
      open: {
        type: "boolean",
        required: false,
        default: "false",
        description: "Controls modal visibility (controlled)"
      },
      onOpenChange: {
        type: "(open: boolean) => void",
        required: false,
        description: "Called when modal should open or close",
        controlledBy: "open"
      },
      variant: {
        type: '"default" | "danger" | "success" | "warning" | "info"',
        required: false,
        default: '"default"',
        description: "Semantic colour scheme applied to header and border"
      },
      size: {
        type: '"sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "full"',
        required: false,
        default: '"md"',
        description: "Max-width of the modal content panel"
      },
      closeOnOverlayClick: {
        type: "boolean",
        required: false,
        default: "true",
        description: "Close when the backdrop is clicked"
      },
      closeOnEscape: {
        type: "boolean",
        required: false,
        default: "true",
        description: "Close on Escape key press"
      },
      showCloseButton: {
        type: "boolean",
        required: false,
        default: "true",
        description: "Show built-in X close button in header"
      },
      centered: {
        type: "boolean",
        required: false,
        default: "true",
        description: "Vertically center the panel; false aligns to top"
      },
      preventScroll: {
        type: "boolean",
        required: false,
        default: "true",
        description: "Lock body scroll while modal is open"
      },
      initialFocus: {
        type: "React.RefObject<HTMLElement>",
        required: false,
        description: "Ref to focus when modal opens instead of auto-detecting first interactive"
      },
      restoreFocus: {
        type: "boolean",
        required: false,
        default: "true",
        description: "Restore focus to previously focused element on close"
      }
    },
    events: {
      onOpenChange: {
        signature: "(open: boolean) => void",
        description: "Fires when the modal requests a state change (Escape, overlay click, close button)",
        controlledBy: "open"
      }
    },
    states: {
      open: {
        trigger: "open={true}",
        visualChange: "Portal renders, backdrop fades in, panel slides up with zoom",
        ariaAttr: 'aria-modal="true"'
      },
      closed: {
        trigger: "open={false}",
        visualChange: "Portal unmounts \u2014 nothing rendered in DOM"
      }
    },
    examples: {
      default: {
        code: `const [open, setOpen] = React.useState(false);
<Modal open={open} onOpenChange={setOpen}>
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Confirm Action</Modal.Title>
      <Modal.Description>This cannot be undone.</Modal.Description>
    </Modal.Header>
    <Modal.Body>Are you sure you want to proceed?</Modal.Body>
    <Modal.Footer>
      <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
      <Button>Confirm</Button>
    </Modal.Footer>
  </Modal.Content>
</Modal>`,
        description: "Standard confirmation modal."
      },
      danger: {
        code: `<Modal open={open} onOpenChange={setOpen} variant="danger">
  <Modal.Content>
    <Modal.Header><Modal.Title>Delete Account</Modal.Title></Modal.Header>
    <Modal.Body>This action is permanent.</Modal.Body>
    <Modal.Footer>
      <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="destructive">Delete</Button>
    </Modal.Footer>
  </Modal.Content>
</Modal>`,
        description: "Danger variant for destructive flows."
      },
      noEscape: {
        code: `<Modal open={open} onOpenChange={setOpen} closeOnEscape={false} closeOnOverlayClick={false}>
  <Modal.Content>...</Modal.Content>
</Modal>`,
        description: "Force user to use explicit buttons \u2014 no escape hatch."
      }
    },
    a11y: {
      role: "dialog",
      requiredAttrs: {
        "aria-labelledby": "Auto-wired via Modal.Title \u2014 do not override",
        "aria-describedby": "Auto-wired via Modal.Description"
      },
      managedAttrs: ["aria-modal", "aria-labelledby", "aria-describedby"],
      keyboard: {
        Escape: "Closes the modal (when closeOnEscape is true)",
        Tab: "Cycles focus within modal (focus trapped)",
        "Shift+Tab": "Cycles focus backwards within modal"
      },
      focusManagement: "On open: auto-focuses first interactive element (skipping close button). On close: restores focus to the element that triggered the modal."
    },
    composition: {
      parts: {
        Modal: "Root \u2014 manages state, portal, focus trap, scroll lock",
        "Modal.Content": "Panel container \u2014 sets size, variant border, and role=dialog",
        "Modal.Header": "Top section with optional variant icon and close button",
        "Modal.Title": "h2 wired to aria-labelledby",
        "Modal.Description": "Subtitle wired to aria-describedby",
        "Modal.Body": "Scrollable content area",
        "Modal.Footer": "Action bar with configurable alignment",
        "Modal.Close": "Custom close trigger (use asChild to wrap your own element)",
        "Modal.Trigger": "Optional trigger (use asChild to wrap your own button)"
      },
      example: `<Modal open={open} onOpenChange={setOpen}>
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Title</Modal.Title>
      <Modal.Description>Supporting text.</Modal.Description>
    </Modal.Header>
    <Modal.Body>Body content</Modal.Body>
    <Modal.Footer>
      <Modal.Close asChild><Button variant="outline">Cancel</Button></Modal.Close>
      <Button>Confirm</Button>
    </Modal.Footer>
  </Modal.Content>
</Modal>`,
      partsRequired: true
    },
    doNot: [
      {
        rule: "Don't render Modal.Content without Modal",
        category: "nesting",
        why: "ModalContext will be undefined \u2014 throws"
      },
      {
        rule: "Don't use open without onOpenChange",
        category: "api",
        why: "Modal becomes read-only; user cannot close it"
      },
      {
        rule: "Don't put interactive elements in the backdrop layer",
        category: "a11y",
        why: "Focus trap will capture them unexpectedly"
      }
    ],
    peerComponents: ["Button", "Drawer"],
    testing: {
      testIds: {
        overlay: "modal-overlay",
        "content panel": "modal-content",
        "close button": "modal-close"
      },
      storybookPath: "Components/Modal"
    }
  },
  {
    name: "Navbar",
    slug: "navbar",
    type: "component",
    category: "navigation",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "navbar.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Otpinput",
    slug: "otpinput",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Callback when the complete code is entered",
    targetPath: "src/components/ui",
    fileName: "otpinput.tsx",
    dependencies: ["clsx", "lucide-react"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Pagination",
    slug: "pagination",
    type: "component",
    category: "navigation",
    since: "1.0.0",
    description: "Pagination Component \u2014 Compound Pattern with Accessibility",
    targetPath: "src/components/ui",
    fileName: "pagination.tsx",
    dependencies: [],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Popover",
    slug: "popover",
    type: "component",
    category: "overlay",
    since: "1.0.0",
    description: "Export main component with sub-components",
    targetPath: "src/components/ui",
    fileName: "popover.tsx",
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    tags: ["component"]
  },
  {
    name: "Qrcode",
    slug: "qrcode",
    type: "component",
    category: "display",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "qrcode.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "RadioGroup",
    slug: "radio-group",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "radiogroup.tsx",
    dependencies: ["clsx", "lucide-react"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Rate",
    slug: "rate",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Rate Component \u2014 Compound Pattern with Accessibility",
    targetPath: "src/components/ui",
    fileName: "rate.tsx",
    dependencies: ["lucide-react"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Resizablepane",
    slug: "resizablepane",
    type: "component",
    category: "layout",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "resizablepane.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Richtexteditor",
    slug: "richtexteditor",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "richtexteditor.tsx",
    dependencies: [
      "clsx",
      "lexical",
      "@lexical/react/LexicalComposer",
      "@lexical/react/LexicalRichTextPlugin",
      "@lexical/react/LexicalContentEditable",
      "@lexical/react/LexicalHistoryPlugin",
      "@lexical/react/LexicalOnChangePlugin",
      "@lexical/react/LexicalComposerContext",
      "@lexical/react/LexicalErrorBoundary",
      "@lexical/react/LexicalListPlugin",
      "@lexical/react/LexicalLinkPlugin",
      "@lexical/react/LexicalMarkdownShortcutPlugin",
      "@lexical/rich-text",
      "@lexical/list",
      "@lexical/link",
      "@lexical/code",
      "@lexical/markdown",
      "@lexical/html"
    ],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "RoleProvider",
    slug: "role-provider",
    type: "component",
    category: "utility",
    since: "1.0.0",
    description: "One or more roles that grant access.",
    targetPath: "src/components/ui",
    fileName: "roleguard.tsx",
    dependencies: [],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Select",
    slug: "select",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "select.tsx",
    dependencies: [],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Show",
    slug: "show",
    type: "component",
    category: "layout",
    since: "1.0.0",
    description: "Conditionally renders children based on a `when` condition.",
    targetPath: "src/components/ui",
    fileName: "show.tsx",
    dependencies: [],
    registryDependencies: [],
    tags: ["component"],
    props: {
      when: {
        type: "boolean | null | undefined",
        required: true,
        description: "Condition that controls rendering"
      },
      fallback: {
        type: "React.ReactNode",
        required: false,
        description: "Rendered when condition is falsy"
      },
      children: {
        type: "React.ReactNode",
        required: true,
        description: "Rendered when condition is truthy"
      }
    },
    examples: {
      default: {
        code: `<Show when={isLoggedIn} fallback={<LoginButton />}><Dashboard /></Show>`,
        description: "Conditional render with fallback"
      }
    }
  },
  {
    name: "SidebarProvider",
    slug: "sidebar-provider",
    type: "component",
    category: "navigation",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "sidebar.tsx",
    dependencies: ["lucide-react", "next/link"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Skeleton",
    slug: "skeleton",
    type: "component",
    category: "feedback",
    since: "1.0.0",
    description: "Skeleton Component \u2014 Compound Pattern with Accessibility",
    targetPath: "src/components/ui",
    fileName: "skeleton.tsx",
    dependencies: [],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Slider",
    slug: "slider",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "slider.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Spinner",
    slug: "spinner",
    type: "component",
    category: "feedback",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "spinner.tsx",
    dependencies: [],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Stepper",
    slug: "stepper",
    type: "component",
    category: "navigation",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "stepper.tsx",
    dependencies: ["lucide-react", "clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Switch",
    slug: "switch",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "switch.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Tab",
    slug: "tab",
    type: "component",
    category: "navigation",
    since: "1.0.0",
    description: "Tabs Component \u2014 Compound Pattern",
    targetPath: "src/components/ui",
    fileName: "tab.tsx",
    dependencies: [],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Table",
    slug: "table",
    type: "component",
    category: "display",
    since: "1.0.0",
    description: "Table Component \u2014 Compound Pattern",
    targetPath: "src/components/ui",
    fileName: "table.tsx",
    dependencies: [],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "TextArea",
    slug: "text-area",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Export compound component",
    targetPath: "src/components/ui",
    fileName: "textarea.tsx",
    dependencies: ["lucide-react"],
    registryDependencies: [],
    tags: ["component"]
  },
  // ── TextInput (rich metadata) ──────────────────────────────────────────────
  {
    name: "TextInput",
    slug: "text-input",
    type: "component",
    category: "input",
    since: "1.0.0",
    description: "Fully-featured compound text input with support for text, email, password, number, tel, url, and search types. Includes label, field, error, description, and character count sub-components.",
    targetPath: "src/components/ui",
    fileName: "textinput.tsx",
    dependencies: [],
    registryDependencies: [],
    tags: ["component", "form", "input"],
    variants: ["default", "filled", "flushed"],
    props: {
      value: {
        type: "string",
        required: false,
        description: "Controlled value"
      },
      defaultValue: {
        type: "string",
        required: false,
        default: '""',
        description: "Uncontrolled initial value"
      },
      onChange: {
        type: "(value: string) => void",
        required: false,
        description: "Called with new value on every change"
      },
      inputType: {
        type: '"text" | "email" | "password" | "number" | "tel" | "url" | "search"',
        required: false,
        default: '"text"',
        description: "Underlying HTML input type"
      },
      size: {
        type: '"sm" | "md" | "lg"',
        required: false,
        default: '"md"',
        description: "Controls padding and font size of the field"
      },
      variant: {
        type: '"default" | "filled" | "flushed"',
        required: false,
        default: '"default"',
        description: "Visual style of the input container"
      },
      validationState: {
        type: '"default" | "error" | "warning" | "success"',
        required: false,
        default: '"default"',
        description: "Drives border color and shows/hides validation messages"
      },
      disabled: {
        type: "boolean",
        required: false,
        default: "false",
        description: "Prevents interaction"
      },
      readOnly: {
        type: "boolean",
        required: false,
        default: "false",
        description: "Prevents editing but remains focusable and copyable"
      },
      required: {
        type: "boolean",
        required: false,
        default: "false",
        description: "Marks field as required (adds * to label, sets aria-required)"
      },
      loading: {
        type: "boolean",
        required: false,
        default: "false",
        description: "Shows loading spinner inside field"
      }
    },
    events: {
      onChange: {
        signature: "(value: string) => void",
        description: "Fires on every keystroke with the current string value",
        controlledBy: "value"
      }
    },
    states: {
      default: {
        trigger: "No special props",
        visualChange: "Neutral border and background"
      },
      focus: {
        trigger: "Input receives focus",
        visualChange: "Border turns primary-400, ring-1 appears",
        ariaAttr: ":focus-visible on inner input"
      },
      disabled: {
        trigger: "disabled={true}",
        visualChange: "opacity-60, cursor-not-allowed",
        ariaAttr: "disabled attribute on input"
      },
      error: {
        trigger: 'validationState="error"',
        visualChange: "Border turns error-500, ring-4 error tint; ErrorMessage renders",
        ariaAttr: 'aria-invalid="true"'
      },
      warning: {
        trigger: 'validationState="warning"',
        visualChange: "Border turns warning-500, ring-4 warning tint; WarningMessage renders"
      },
      success: {
        trigger: 'validationState="success"',
        visualChange: "Border turns success-500, ring-4 success tint; SuccessMessage renders"
      },
      loading: {
        trigger: "loading={true}",
        visualChange: "Spinner icon appears inside field"
      }
    },
    examples: {
      default: {
        code: `const [val, setVal] = React.useState("");
<TextInput.Root value={val} onChange={setVal}>
  <TextInput.Label>Email</TextInput.Label>
  <TextInput.Field><TextInput.Input placeholder="you@example.com" /></TextInput.Field>
  <TextInput.Description>We'll never share your email.</TextInput.Description>
</TextInput.Root>`,
        description: "Basic controlled text input with label and description."
      },
      password: {
        code: `<TextInput.Root inputType="password">
  <TextInput.Label>Password</TextInput.Label>
  <TextInput.Field><TextInput.PasswordInput /></TextInput.Field>
</TextInput.Root>`,
        description: "Password input with built-in show/hide toggle."
      },
      search: {
        code: `<TextInput.Root inputType="search">
  <TextInput.Field><TextInput.SearchInput placeholder="Search..." /></TextInput.Field>
</TextInput.Root>`,
        description: "Search input with clear button."
      },
      withError: {
        code: `<TextInput.Root validationState="error">
  <TextInput.Label>Username</TextInput.Label>
  <TextInput.Field><TextInput.Input /></TextInput.Field>
  <TextInput.ErrorMessage>Username is already taken.</TextInput.ErrorMessage>
</TextInput.Root>`,
        description: "Error state with validation message."
      },
      withCharCount: {
        code: `<TextInput.Root>
  <TextInput.Label>Bio</TextInput.Label>
  <TextInput.Field><TextInput.Input /></TextInput.Field>
  <TextInput.CharacterCount maxLength={160} />
</TextInput.Root>`,
        description: "With character count limit indicator."
      }
    },
    a11y: {
      requiredAttrs: {},
      managedAttrs: [
        "aria-labelledby",
        "aria-describedby",
        "aria-invalid",
        "aria-required"
      ],
      keyboard: {
        Tab: "Moves focus into/out of the input",
        Enter: "Submits nearest form (default browser)"
      },
      focusManagement: "Focus goes directly to the <input> element. Label is linked via htmlFor.",
      liveRegion: "ErrorMessage uses role=alert + aria-live=polite for screen reader announcements."
    },
    composition: {
      parts: {
        "TextInput.Root": "Context provider \u2014 manages value, focus, IDs, and validation state",
        "TextInput.Label": "Accessible <label> linked to input via htmlFor",
        "TextInput.Field": "Visual container for the input and its icons",
        "TextInput.Input": "Core <input> element (standard text/email/etc.)",
        "TextInput.PasswordInput": "Input with show/hide toggle",
        "TextInput.SearchInput": "Input with clear (X) button",
        "TextInput.NumberInput": "Input with numeric validation and min/max",
        "TextInput.Description": "Helper text linked via aria-describedby",
        "TextInput.ErrorMessage": "Shown only when validationState=error",
        "TextInput.WarningMessage": "Shown only when validationState=warning",
        "TextInput.SuccessMessage": "Shown only when validationState=success",
        "TextInput.CharacterCount": "Character counter (configurable threshold)",
        "TextInput.Icon": "Decorative icon wrapper",
        "TextInput.LoadingSpinner": "Spinner shown when loading=true",
        "TextInput.Tooltip": "Inline tooltip with HelpCircle icon"
      },
      example: `<TextInput.Root value={val} onChange={setVal} required validationState={error ? "error" : "default"}>
  <TextInput.Label>Email</TextInput.Label>
  <TextInput.Field>
    <TextInput.Icon><MailIcon /></TextInput.Icon>
    <TextInput.Input placeholder="you@example.com" />
    <TextInput.LoadingSpinner />
  </TextInput.Field>
  <TextInput.ErrorMessage>Invalid email format.</TextInput.ErrorMessage>
  <TextInput.CharacterCount maxLength={254} />
</TextInput.Root>`,
      partsRequired: false
    },
    doNot: [
      {
        rule: "Don't use TextInput.Input outside TextInput.Root",
        category: "nesting",
        why: "Context will be undefined \u2014 throws"
      },
      {
        rule: "Don't read input value from DOM directly",
        category: "api",
        why: "Use the onChange callback; value is managed in context"
      },
      {
        rule: "Don't omit TextInput.Label",
        category: "a11y",
        why: "Without a label, screen readers cannot describe the field"
      },
      {
        rule: "Don't mix controlled and uncontrolled usage",
        category: "api",
        why: "Provide both value + onChange, or neither (use defaultValue)"
      }
    ],
    peerComponents: ["Button", "TextArea", "Select"],
    testing: {
      testIds: {
        "input element": "text-input",
        label: "text-input-label",
        "error message": "text-input-error"
      },
      storybookPath: "Components/TextInput"
    }
  },
  {
    name: "Toast",
    slug: "toast",
    type: "component",
    category: "feedback",
    since: "1.0.0",
    description: "Export Compound Object",
    targetPath: "src/components/ui",
    fileName: "toaster.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Tooltip",
    slug: "tooltip",
    type: "component",
    category: "overlay",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "tooltip.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Tour",
    slug: "tour",
    type: "component",
    category: "overlay",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "tour.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Tree",
    slug: "tree",
    type: "component",
    category: "display",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "tree.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Typography",
    slug: "typography",
    type: "component",
    category: "display",
    since: "1.0.0",
    description: "Export types for use in other components",
    targetPath: "src/components/ui",
    fileName: "typography.tsx",
    dependencies: [],
    registryDependencies: [],
    tags: ["component"]
  },
  {
    name: "Videoplayer",
    slug: "videoplayer",
    type: "component",
    category: "display",
    since: "1.0.0",
    description: "Component from Vayu UI",
    targetPath: "src/components/ui",
    fileName: "videoplayer.tsx",
    dependencies: ["clsx"],
    registryDependencies: [],
    tags: ["component"]
  }
];

// src/templates.ts
var templates = [
  // Add project templates here
];

// src/registryData.ts
var all = [...hooks, ...components, ...templates];
var registry = Object.fromEntries(
  all.map((item) => [item.name, item])
);

// src/index.ts
function findItem(slug) {
  return Object.values(registry).find((item) => item.slug === slug);
}
function findWithDependencies(slug) {
  const item = findItem(slug);
  if (!item) return [];
  const deps = item.registryDependencies.flatMap(
    (depSlug) => findWithDependencies(depSlug)
  );
  return [...deps, item];
}
var registry2 = registry;
export {
  findItem,
  findWithDependencies,
  registry2 as registry
};
//# sourceMappingURL=index.js.map