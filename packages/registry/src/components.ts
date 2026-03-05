import type { RegistryItem } from "./index";

export const components: RegistryItem[] = [
    {
        name: "Accordion", slug: "accordion", type: "component", category: "input", since: "1.0.0",
        description: "Expandable content sections using a compound component pattern with full keyboard navigation.",
        targetPath: "src/components/ui", fileName: "accordion.tsx",
        dependencies: [], registryDependencies: [], tags: ["component"],
        composition: {
            parts: {
                "Accordion": "Root context provider — controls open/close state",
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
            managedAttrs: ["aria-expanded", "aria-controls", "aria-labelledby", "aria-hidden"],
            keyboard: {
                "Enter / Space": "Toggles the accordion item",
                "ArrowDown": "Moves focus to next header",
                "ArrowUp": "Moves focus to previous header",
                "Home": "Moves focus to first header",
                "End": "Moves focus to last header",
            },
            focusManagement: "Focus returns to header when body collapses",
        },
        props: {
            allowMultiple: { type: "boolean", required: false, default: "false", description: "Allow multiple items open simultaneously" },
            className: { type: "string", required: false, description: "Additional CSS classes on root element" },
        },
        examples: {
            default: {
                code: `<Accordion>
  <Accordion.Item itemId="1">
    <Accordion.Header itemId="1">Section 1</Accordion.Header>
    <Accordion.Body itemId="1">Content for section 1</Accordion.Body>
  </Accordion.Item>
</Accordion>`,
                description: "Basic single-open accordion."
            },
            multiple: {
                code: `<Accordion allowMultiple>
  <Accordion.Item itemId="a"><Accordion.Header itemId="a">A</Accordion.Header><Accordion.Body itemId="a">Body A</Accordion.Body></Accordion.Item>
  <Accordion.Item itemId="b"><Accordion.Header itemId="b">B</Accordion.Header><Accordion.Body itemId="b">Body B</Accordion.Body></Accordion.Item>
</Accordion>`,
                description: "Multiple items can be open at once."
            },
        },
        doNot: [
            { rule: "Don't use Accordion.Header outside Accordion.Item", category: "nesting", why: "Throws context error" },
            { rule: "Don't use the same itemId on multiple items", category: "api", why: "Causes broken open/close state" },
        ],
    },
    {
        name: "Affix", slug: "affix", type: "component", category: "layout", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "affix.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Alert", slug: "alert", type: "component", category: "feedback", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "alert.tsx",
        dependencies: [], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Animation", slug: "animation", type: "component", category: "display", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "animation.tsx",
        dependencies: [], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Aspectratio", slug: "aspectratio", type: "component", category: "layout", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "aspectratio.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Audioplayer", slug: "audioplayer", type: "component", category: "display", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "audioplayer.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Avatar", slug: "avatar", type: "component", category: "display", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "avatar.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Avatargroup", slug: "avatargroup", type: "component", category: "display", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "avatargroup.tsx",
        dependencies: ["clsx"], registryDependencies: ["avatar"], tags: ["component"],
    },
    {
        name: "Badge", slug: "badge", type: "component", category: "display", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "badge.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "BigCalendar", slug: "big-calendar", type: "component", category: "display", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "bigcalendar.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Breadcrumb", slug: "breadcrumb", type: "component", category: "navigation", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "breadcrumb.tsx",
        dependencies: ["lucide-react", "clsx", "@radix-ui/react-slot"], registryDependencies: [], tags: ["component"],
    },
    // ── Button (rich metadata) ─────────────────────────────────────────────────
    {
        name: "Button", slug: "button", type: "component", category: "action", since: "1.0.0",
        description: "Triggers an action or event. Supports variants, sizes, loading state, icons, and badges via a compound component API.",
        targetPath: "src/components/ui", fileName: "button.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component", "action", "form"],
        variants: ["primary", "secondary", "outline", "ghost", "destructive"],
        props: {
            variant: { type: '"primary" | "secondary" | "outline" | "ghost" | "destructive"', required: false, default: '"primary"', description: "Visual style of the button" },
            size: { type: '"small" | "medium" | "large"', required: false, default: '"small"', description: "Controls padding and font size" },
            loading: { type: 'Status', required: false, default: 'Status.IDLE', description: "Pass Status.PENDING to show spinner and disable interaction" },
            loadingText: { type: "string", required: false, default: '"Loading"', description: "Screen-reader text shown during loading" },
            fullWidth: { type: "boolean", required: false, default: "false", description: "Stretches button to fill its container" },
            disabled: { type: "boolean", required: false, default: "false", description: "Prevents interaction and applies muted styling" },
            type: { type: '"button" | "submit" | "reset"', required: false, default: '"button"', description: "Native HTML button type. Always set to submit inside forms" },
            children: { type: "React.ReactNode", required: true, description: "Button label content" },
            "aria-label": { type: "string", required: false, description: "Required when button has no visible text (icon-only)" },
        },
        events: {
            onClick: { signature: "(event: React.MouseEvent<HTMLButtonElement>) => void", description: "Fires on click. Not fired when disabled or loading" },
            onFocus: { signature: "(event: React.FocusEvent<HTMLButtonElement>) => void", description: "Fires when button receives focus" },
            onBlur: { signature: "(event: React.FocusEvent<HTMLButtonElement>) => void", description: "Fires when button loses focus" },
        },
        states: {
            default: { trigger: "No special props", visualChange: "Base background and text from variant" },
            hover: { trigger: "Mouse hover (CSS)", visualChange: "Background darkens by one shade" },
            focus: { trigger: "Keyboard Tab or click", visualChange: "focus-visible ring-2 ring-offset-2", ariaAttr: ":focus-visible" },
            disabled: { trigger: "disabled={true}", visualChange: "opacity-60, cursor-not-allowed, pointer-events-none", ariaAttr: 'aria-disabled="true"' },
            loading: { trigger: "loading={Status.PENDING}", visualChange: "Spinner replaces children, button implicitly disabled", ariaAttr: 'aria-busy="true"' },
        },
        examples: {
            default: { code: `<Button>Save Changes</Button>`, description: "Default primary button" },
            outline: { code: `<Button variant="outline">Cancel</Button>`, description: "Outline for secondary actions" },
            ghost: { code: `<Button variant="ghost" size="small">Clear</Button>`, description: "Ghost for low-priority tertiary actions" },
            destructive: { code: `<Button variant="destructive">Delete Account</Button>`, description: "Destructive variant for irreversible actions" },
            loading: { code: `<Button loading={Status.PENDING}>Submitting...</Button>`, description: "Loading state during async operations" },
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
            },
        },
        a11y: {
            role: "button",
            requiredAttrs: { "aria-label": "Required when button has no visible text (icon-only buttons)" },
            managedAttrs: ["aria-disabled", "aria-busy", "aria-live"],
            keyboard: { "Enter": "Activates the button", "Space": "Activates the button" },
            focusManagement: "Focus remains on button after click. Move focus manually if button triggers navigation.",
        },
        composition: {
            parts: {
                "Button": "Root — the actual <button> element",
                "Button.Icon": "Wrapper for icons (sized to match button size)",
                "Button.Text": "Truncating text wrapper",
                "Button.Badge": "Notification badge (positioned or inline)",
            },
            example: `<Button variant="primary" size="medium">
  <Button.Icon><BellIcon /></Button.Icon>
  <Button.Text>Notifications</Button.Text>
  <Button.Badge value={3} position="top-right" variant="danger" />
</Button>`,
            partsRequired: false,
        },
        tokens: [
            { var: "--color-primary-600", value: "#6366f1", controls: "primary variant background", overridable: true },
            { var: "--color-primary-700", value: "#4f46e5", controls: "primary variant hover bg", overridable: true },
            { var: "--color-error-600", value: "#dc2626", controls: "destructive variant background", overridable: true },
        ],
        darkMode: { automatic: true },
        peerComponents: ["Tooltip", "Buttongroup", "Form"],
        doNot: [
            { rule: "Don't use ghost for primary CTAs", category: "ux", why: "Low visual weight fails to draw attention" },
            { rule: "Don't nest <a> or <button> inside Button", category: "nesting", why: "Invalid HTML — causes unpredictable event behaviour" },
            { rule: "Don't omit aria-label on icon-only buttons", category: "a11y", why: "Screen readers cannot describe the button" },
            { rule: "Don't use loading + disabled simultaneously", category: "api", why: "Redundant — loading already disables interaction" },
        ],
        testing: {
            testIds: { "root element": "btn-root", "loading spinner": "btn-spinner" },
            storybookPath: "Components/Button",
        },
    },
    {
        name: "Buttongroup", slug: "buttongroup", type: "component", category: "action", since: "1.0.0",
        description: "Groups multiple <Button> elements together with connected styling.",
        targetPath: "src/components/ui", fileName: "buttongroup.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component"],
        peerComponents: ["Button"],
    },
    {
        name: "Card", slug: "card", type: "component", category: "layout", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "card.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Carousel", slug: "carousel", type: "component", category: "display", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "carousel.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Checkbox", slug: "checkbox", type: "component", category: "input", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "checkbox.tsx",
        dependencies: ["clsx", "lucide-react"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Collapsible", slug: "collapsible", type: "component", category: "input", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "collapsible.tsx",
        dependencies: ["clsx", "lucide-react"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "ColorPicker", slug: "color-picker", type: "component", category: "input", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "colorpicker.tsx",
        dependencies: ["clsx", "lucide-react"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Combobox", slug: "combobox", type: "component", category: "input", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "combobox.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Commandbox", slug: "commandbox", type: "component", category: "input", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "commandbox.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Contextmenu", slug: "contextmenu", type: "component", category: "overlay", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "contextmenu.tsx",
        dependencies: ["clsx", "lucide-react"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Datetimepicker", slug: "datetimepicker", type: "component", category: "input", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "datetimepicker.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Divider", slug: "divider", type: "component", category: "layout", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "divider.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Draggable", slug: "draggable", type: "component", category: "layout", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "draggable.tsx",
        dependencies: ["clsx", "lucide-react"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Drawer", slug: "drawer", type: "component", category: "overlay", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "drawer.tsx",
        dependencies: ["clsx", "lucide-react"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Fileupload", slug: "fileupload", type: "component", category: "input", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "fileupload.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Floatingdock", slug: "floatingdock", type: "component", category: "navigation", since: "1.0.0",
        description: "Label — displayed in the tooltip.",
        targetPath: "src/components/ui", fileName: "floatingdock.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Footer", slug: "footer", type: "component", category: "layout", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "footer.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Hook", slug: "hook", type: "component", category: "utility", since: "1.0.0",
        description: "VideoPlayer Utility Hooks",
        targetPath: "src/components/ui", fileName: "hook.ts",
        dependencies: [], registryDependencies: ["videoplayer"], tags: ["component"],
        internal: true,
    },
    {
        name: "Hovercard", slug: "hovercard", type: "component", category: "overlay", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "hovercard.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Marquee", slug: "marquee", type: "component", category: "display", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "marquee.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Menubar", slug: "menubar", type: "component", category: "navigation", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "menubar.tsx",
        dependencies: [], registryDependencies: ["use-element-position"], tags: ["component"],
    },
    // ── Modal (rich metadata) ──────────────────────────────────────────────────
    {
        name: "Modal", slug: "modal", type: "component", category: "overlay", since: "1.0.0",
        description: "Accessible dialog overlay rendered in a portal. Supports focus trap, Escape key, scroll lock, and multiple semantic variants via a compound component API.",
        targetPath: "src/components/ui", fileName: "modal.tsx",
        dependencies: ["clsx", "lucide-react"], registryDependencies: [], tags: ["component", "dialog", "overlay"],
        variants: ["default", "danger", "success", "warning", "info"],
        props: {
            open: { type: "boolean", required: false, default: "false", description: "Controls modal visibility (controlled)" },
            onOpenChange: { type: "(open: boolean) => void", required: false, description: "Called when modal should open or close", controlledBy: "open" } as any,
            variant: { type: '"default" | "danger" | "success" | "warning" | "info"', required: false, default: '"default"', description: "Semantic colour scheme applied to header and border" },
            size: { type: '"sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "full"', required: false, default: '"md"', description: "Max-width of the modal content panel" },
            closeOnOverlayClick: { type: "boolean", required: false, default: "true", description: "Close when the backdrop is clicked" },
            closeOnEscape: { type: "boolean", required: false, default: "true", description: "Close on Escape key press" },
            showCloseButton: { type: "boolean", required: false, default: "true", description: "Show built-in X close button in header" },
            centered: { type: "boolean", required: false, default: "true", description: "Vertically center the panel; false aligns to top" },
            preventScroll: { type: "boolean", required: false, default: "true", description: "Lock body scroll while modal is open" },
            initialFocus: { type: "React.RefObject<HTMLElement>", required: false, description: "Ref to focus when modal opens instead of auto-detecting first interactive" },
            restoreFocus: { type: "boolean", required: false, default: "true", description: "Restore focus to previously focused element on close" },
        },
        events: {
            onOpenChange: { signature: "(open: boolean) => void", description: "Fires when the modal requests a state change (Escape, overlay click, close button)", controlledBy: "open" },
        },
        states: {
            open: { trigger: "open={true}", visualChange: "Portal renders, backdrop fades in, panel slides up with zoom", ariaAttr: 'aria-modal="true"' },
            closed: { trigger: "open={false}", visualChange: "Portal unmounts — nothing rendered in DOM" },
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
                description: "Danger variant for destructive flows.",
            },
            noEscape: {
                code: `<Modal open={open} onOpenChange={setOpen} closeOnEscape={false} closeOnOverlayClick={false}>
  <Modal.Content>...</Modal.Content>
</Modal>`,
                description: "Force user to use explicit buttons — no escape hatch.",
            },
        },
        a11y: {
            role: "dialog",
            requiredAttrs: { "aria-labelledby": "Auto-wired via Modal.Title — do not override", "aria-describedby": "Auto-wired via Modal.Description" },
            managedAttrs: ["aria-modal", "aria-labelledby", "aria-describedby"],
            keyboard: { "Escape": "Closes the modal (when closeOnEscape is true)", "Tab": "Cycles focus within modal (focus trapped)", "Shift+Tab": "Cycles focus backwards within modal" },
            focusManagement: "On open: auto-focuses first interactive element (skipping close button). On close: restores focus to the element that triggered the modal.",
        },
        composition: {
            parts: {
                "Modal": "Root — manages state, portal, focus trap, scroll lock",
                "Modal.Content": "Panel container — sets size, variant border, and role=dialog",
                "Modal.Header": "Top section with optional variant icon and close button",
                "Modal.Title": "h2 wired to aria-labelledby",
                "Modal.Description": "Subtitle wired to aria-describedby",
                "Modal.Body": "Scrollable content area",
                "Modal.Footer": "Action bar with configurable alignment",
                "Modal.Close": "Custom close trigger (use asChild to wrap your own element)",
                "Modal.Trigger": "Optional trigger (use asChild to wrap your own button)",
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
            partsRequired: true,
        },
        doNot: [
            { rule: "Don't render Modal.Content without Modal", category: "nesting", why: "ModalContext will be undefined — throws" },
            { rule: "Don't use open without onOpenChange", category: "api", why: "Modal becomes read-only; user cannot close it" },
            { rule: "Don't put interactive elements in the backdrop layer", category: "a11y", why: "Focus trap will capture them unexpectedly" },
        ],
        peerComponents: ["Button", "Drawer"],
        testing: { testIds: { "overlay": "modal-overlay", "content panel": "modal-content", "close button": "modal-close" }, storybookPath: "Components/Modal" },
    },
    {
        name: "Navbar", slug: "navbar", type: "component", category: "navigation", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "navbar.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Otpinput", slug: "otpinput", type: "component", category: "input", since: "1.0.0",
        description: "Callback when the complete code is entered",
        targetPath: "src/components/ui", fileName: "otpinput.tsx",
        dependencies: ["clsx", "lucide-react"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Pagination", slug: "pagination", type: "component", category: "navigation", since: "1.0.0",
        description: "Pagination Component — Compound Pattern with Accessibility",
        targetPath: "src/components/ui", fileName: "pagination.tsx",
        dependencies: [], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Popover", slug: "popover", type: "component", category: "overlay", since: "1.0.0",
        description: "Export main component with sub-components",
        targetPath: "src/components/ui", fileName: "popover.tsx",
        dependencies: ["lucide-react"], registryDependencies: ["button"], tags: ["component"],
    },
    {
        name: "Qrcode", slug: "qrcode", type: "component", category: "display", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "qrcode.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "RadioGroup", slug: "radio-group", type: "component", category: "input", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "radiogroup.tsx",
        dependencies: ["clsx", "lucide-react"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Rate", slug: "rate", type: "component", category: "input", since: "1.0.0",
        description: "Rate Component — Compound Pattern with Accessibility",
        targetPath: "src/components/ui", fileName: "rate.tsx",
        dependencies: ["lucide-react"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Resizablepane", slug: "resizablepane", type: "component", category: "layout", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "resizablepane.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Richtexteditor", slug: "richtexteditor", type: "component", category: "input", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "richtexteditor.tsx",
        dependencies: [
            "clsx", "lexical",
            "@lexical/react/LexicalComposer", "@lexical/react/LexicalRichTextPlugin",
            "@lexical/react/LexicalContentEditable", "@lexical/react/LexicalHistoryPlugin",
            "@lexical/react/LexicalOnChangePlugin", "@lexical/react/LexicalComposerContext",
            "@lexical/react/LexicalErrorBoundary", "@lexical/react/LexicalListPlugin",
            "@lexical/react/LexicalLinkPlugin", "@lexical/react/LexicalMarkdownShortcutPlugin",
            "@lexical/rich-text", "@lexical/list", "@lexical/link",
            "@lexical/code", "@lexical/markdown", "@lexical/html",
        ],
        registryDependencies: [], tags: ["component"],
    },
    {
        name: "RoleProvider", slug: "role-provider", type: "component", category: "utility", since: "1.0.0",
        description: "One or more roles that grant access.",
        targetPath: "src/components/ui", fileName: "roleguard.tsx",
        dependencies: [], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Select", slug: "select", type: "component", category: "input", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "select.tsx",
        dependencies: [], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Show", slug: "show", type: "component", category: "layout", since: "1.0.0",
        description: "Conditionally renders children based on a `when` condition.",
        targetPath: "src/components/ui", fileName: "show.tsx",
        dependencies: [], registryDependencies: [], tags: ["component"],
        props: {
            when: { type: "boolean | null | undefined", required: true, description: "Condition that controls rendering" },
            fallback: { type: "React.ReactNode", required: false, description: "Rendered when condition is falsy" },
            children: { type: "React.ReactNode", required: true, description: "Rendered when condition is truthy" },
        },
        examples: {
            default: { code: `<Show when={isLoggedIn} fallback={<LoginButton />}><Dashboard /></Show>`, description: "Conditional render with fallback" },
        },
    },
    {
        name: "SidebarProvider", slug: "sidebar-provider", type: "component", category: "navigation", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "sidebar.tsx",
        dependencies: ["lucide-react", "next/link"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Skeleton", slug: "skeleton", type: "component", category: "feedback", since: "1.0.0",
        description: "Skeleton Component — Compound Pattern with Accessibility",
        targetPath: "src/components/ui", fileName: "skeleton.tsx",
        dependencies: [], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Slider", slug: "slider", type: "component", category: "input", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "slider.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Spinner", slug: "spinner", type: "component", category: "feedback", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "spinner.tsx",
        dependencies: [], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Stepper", slug: "stepper", type: "component", category: "navigation", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "stepper.tsx",
        dependencies: ["lucide-react", "clsx"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Switch", slug: "switch", type: "component", category: "input", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "switch.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Tab", slug: "tab", type: "component", category: "navigation", since: "1.0.0",
        description: "Tabs Component — Compound Pattern",
        targetPath: "src/components/ui", fileName: "tab.tsx",
        dependencies: [], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Table", slug: "table", type: "component", category: "display", since: "1.0.0",
        description: "Table Component — Compound Pattern",
        targetPath: "src/components/ui", fileName: "table.tsx",
        dependencies: [], registryDependencies: [], tags: ["component"],
    },
    {
        name: "TextArea", slug: "text-area", type: "component", category: "input", since: "1.0.0",
        description: "Export compound component",
        targetPath: "src/components/ui", fileName: "textarea.tsx",
        dependencies: ["lucide-react"], registryDependencies: [], tags: ["component"],
    },
    // ── TextInput (rich metadata) ──────────────────────────────────────────────
    {
        name: "TextInput", slug: "text-input", type: "component", category: "input", since: "1.0.0",
        description: "Fully-featured compound text input with support for text, email, password, number, tel, url, and search types. Includes label, field, error, description, and character count sub-components.",
        targetPath: "src/components/ui", fileName: "textinput.tsx",
        dependencies: [], registryDependencies: [], tags: ["component", "form", "input"],
        variants: ["default", "filled", "flushed"],
        props: {
            value: { type: "string", required: false, description: "Controlled value" },
            defaultValue: { type: "string", required: false, default: '""', description: "Uncontrolled initial value" },
            onChange: { type: "(value: string) => void", required: false, description: "Called with new value on every change" },
            inputType: { type: '"text" | "email" | "password" | "number" | "tel" | "url" | "search"', required: false, default: '"text"', description: "Underlying HTML input type" },
            size: { type: '"sm" | "md" | "lg"', required: false, default: '"md"', description: "Controls padding and font size of the field" },
            variant: { type: '"default" | "filled" | "flushed"', required: false, default: '"default"', description: "Visual style of the input container" },
            validationState: { type: '"default" | "error" | "warning" | "success"', required: false, default: '"default"', description: "Drives border color and shows/hides validation messages" },
            disabled: { type: "boolean", required: false, default: "false", description: "Prevents interaction" },
            readOnly: { type: "boolean", required: false, default: "false", description: "Prevents editing but remains focusable and copyable" },
            required: { type: "boolean", required: false, default: "false", description: "Marks field as required (adds * to label, sets aria-required)" },
            loading: { type: "boolean", required: false, default: "false", description: "Shows loading spinner inside field" },
        },
        events: {
            onChange: { signature: "(value: string) => void", description: "Fires on every keystroke with the current string value", controlledBy: "value" },
        },
        states: {
            default: { trigger: "No special props", visualChange: "Neutral border and background" },
            focus: { trigger: "Input receives focus", visualChange: "Border turns primary-400, ring-1 appears", ariaAttr: ":focus-visible on inner input" },
            disabled: { trigger: "disabled={true}", visualChange: "opacity-60, cursor-not-allowed", ariaAttr: "disabled attribute on input" },
            error: { trigger: 'validationState="error"', visualChange: "Border turns error-500, ring-4 error tint; ErrorMessage renders", ariaAttr: 'aria-invalid="true"' },
            warning: { trigger: 'validationState="warning"', visualChange: "Border turns warning-500, ring-4 warning tint; WarningMessage renders" },
            success: { trigger: 'validationState="success"', visualChange: "Border turns success-500, ring-4 success tint; SuccessMessage renders" },
            loading: { trigger: "loading={true}", visualChange: "Spinner icon appears inside field" },
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
            },
        },
        a11y: {
            requiredAttrs: {},
            managedAttrs: ["aria-labelledby", "aria-describedby", "aria-invalid", "aria-required"],
            keyboard: { "Tab": "Moves focus into/out of the input", "Enter": "Submits nearest form (default browser)" },
            focusManagement: "Focus goes directly to the <input> element. Label is linked via htmlFor.",
            liveRegion: "ErrorMessage uses role=alert + aria-live=polite for screen reader announcements.",
        },
        composition: {
            parts: {
                "TextInput.Root": "Context provider — manages value, focus, IDs, and validation state",
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
                "TextInput.Tooltip": "Inline tooltip with HelpCircle icon",
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
            partsRequired: false,
        },
        doNot: [
            { rule: "Don't use TextInput.Input outside TextInput.Root", category: "nesting", why: "Context will be undefined — throws" },
            { rule: "Don't read input value from DOM directly", category: "api", why: "Use the onChange callback; value is managed in context" },
            { rule: "Don't omit TextInput.Label", category: "a11y", why: "Without a label, screen readers cannot describe the field" },
            { rule: "Don't mix controlled and uncontrolled usage", category: "api", why: "Provide both value + onChange, or neither (use defaultValue)" },
        ],
        peerComponents: ["Button", "TextArea", "Select"],
        testing: {
            testIds: { "input element": "text-input", "label": "text-input-label", "error message": "text-input-error" },
            storybookPath: "Components/TextInput",
        },
    },
    {
        name: "Toast", slug: "toast", type: "component", category: "feedback", since: "1.0.0",
        description: "Export Compound Object",
        targetPath: "src/components/ui", fileName: "toaster.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Tooltip", slug: "tooltip", type: "component", category: "overlay", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "tooltip.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Tour", slug: "tour", type: "component", category: "overlay", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "tour.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Tree", slug: "tree", type: "component", category: "display", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "tree.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Typography", slug: "typography", type: "component", category: "display", since: "1.0.0",
        description: "Export types for use in other components",
        targetPath: "src/components/ui", fileName: "typography.tsx",
        dependencies: [], registryDependencies: [], tags: ["component"],
    },
    {
        name: "Videoplayer", slug: "videoplayer", type: "component", category: "display", since: "1.0.0",
        description: "Component from Vayu UI",
        targetPath: "src/components/ui", fileName: "videoplayer.tsx",
        dependencies: ["clsx"], registryDependencies: [], tags: ["component"],
    },
];
