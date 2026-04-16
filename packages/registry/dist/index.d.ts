/** Discriminant for top-level registry entries. */
type RegistryItemType = 'component' | 'hook';
/** Component categories for filtering and grouping. */
type ComponentCategory = 'inputs' | 'feedback' | 'overlay' | 'layout' | 'data-display' | 'navigation' | 'animation' | 'utility' | 'media' | 'forms';
/** Hook categories for filtering and grouping. */
type HookCategory = 'state' | 'lifecycle' | 'dom' | 'animation' | 'sensor' | 'side-effect' | 'async' | 'input';
/** A single prop on a component, with its type information. */
interface PropDefinition {
    /** Prop name as it appears in TypeScript, e.g. "variant", "aria-label" */
    name: string;
    /** TypeScript type as a string, e.g. "'primary' | 'secondary'", "boolean" */
    type: string;
    /** Whether this prop is required */
    required: boolean;
    /** Default value as a string representation, e.g. "'primary'", "false" */
    defaultValue?: string;
    /** Human-readable description */
    description: string;
    /** Fixed set of accepted values (for variant/size/type props) */
    options?: string[];
}
/** An event handler exposed by a component. */
interface EventDefinition {
    /** Handler prop name, e.g. "onClick", "onOpenChange", "onValueChange" */
    name: string;
    /** Full TypeScript signature, e.g. "(event: React.MouseEvent<HTMLButtonElement>) => void" */
    signature: string;
    /** When this event fires */
    description: string;
}
/** An interactive or visual state of a component. */
interface StateDefinition {
    /** State name, e.g. "loading", "disabled", "open" */
    name: string;
    /** The prop that controls this state */
    prop: string;
    /** Possible values (for enum states). Omit for boolean states. */
    values?: string[];
    /** Whether this state is a boolean toggle */
    isBoolean: boolean;
    /** Default value as a string */
    defaultValue?: string;
    /** Visual or behavioral description */
    description: string;
}
/** ARIA attribute applied by the component. */
interface AriaAttribute {
    /** Attribute name, e.g. "aria-label", "aria-labelledby", "aria-modal" */
    name: string;
    /** When and how this attribute is applied */
    description: string;
    /** Whether the component manages this automatically vs. requiring a manual value */
    managedByComponent: boolean;
}
/** Keyboard interaction supported by a component. */
interface KeyboardInteraction {
    /** Key or key combination, e.g. "Escape", "Tab", "Enter", "Shift+Tab" */
    key: string;
    /** What happens when this key is pressed */
    behavior: string;
}
/** Accessibility information for a component. */
interface A11yDefinition {
    /** ARIA role, e.g. "dialog", "button", "status", "listbox" */
    role?: string;
    /** ARIA attributes applied to the root element */
    attributes: AriaAttribute[];
    /** Keyboard interactions */
    keyboardInteractions: KeyboardInteraction[];
    /** Focus management behavior */
    focusManagement?: string;
    /** WCAG compliance level */
    wcagLevel: 'AA' | 'AAA';
    /** Additional accessibility notes */
    notes?: string;
}
/** Anti-pattern rule — things NOT to do with a component. */
interface DoNotRule {
    /** Short title */
    title: string;
    /** What NOT to do */
    bad: string;
    /** What to do instead */
    good: string;
    /** Why this matters */
    reason: string;
}
/** A ready-to-paste TSX code example. */
interface CodeExample {
    /** Short title */
    title: string;
    /** What this example demonstrates */
    description: string;
    /** The TSX code */
    code: string;
    /** Tags for filtering, e.g. ["basic", "loading", "async"] */
    tags?: string[];
}
/** An NPM package dependency. */
interface NpmDependency {
    /** Package name, e.g. "clsx" */
    name: string;
    /** Version range, e.g. "^2.1.0" */
    version?: string;
}
/** A dependency on another registry item. */
interface RegistryDependency {
    /** Slug of the required registry item */
    slug: string;
    /** Why this dependency exists */
    reason: string;
}
/** A suggestion for a frequently co-used component. */
interface PeerComponentSuggestion {
    /** Slug of the peer component */
    slug: string;
    /** Why they are used together */
    reason: string;
}
/** A file that makes up a component (for CLI file copying). */
interface FileDefinition {
    /** File name within the component directory, e.g. "Button.tsx", "types.ts" */
    name: string;
    /** Purpose of this file */
    description: string;
    /** Whether this file is optional */
    optional?: boolean;
}
/** A sub-component in the compound component pattern. */
interface SubComponentDefinition {
    /** Sub-component name as used in compound pattern: Button.Icon => "Icon" */
    name: string;
    /** File name within the component directory, e.g. "ButtonIcon.tsx" */
    fileName: string;
    /** What this sub-component renders or does */
    description: string;
    /** Props specific to this sub-component */
    props: PropDefinition[];
    /** Whether this sub-component supports the asChild pattern */
    supportsAsChild?: boolean;
}
/** Named visual variant definition (e.g. primary/secondary/outline). */
interface VariantDefinition {
    /** The prop name controlling variants, usually "variant" */
    propName: string;
    /** Available variant values */
    options: string[];
    /** Default variant */
    default: string;
}
/** Size options definition. */
interface SizeDefinition {
    /** The prop name controlling sizes, usually "size" */
    propName: string;
    /** Available size values */
    options: string[];
    /** Default size */
    default: string;
}
/** A parameter of a hook function. */
interface HookParameter {
    /** Parameter name */
    name: string;
    /** TypeScript type as a string, e.g. "string", "RefObject<T>" */
    type: string;
    /** Whether this parameter is required */
    required: boolean;
    /** Description */
    description: string;
    /** Default value as a string */
    defaultValue?: string;
}
/** A value returned by a hook (for destructured returns). */
interface HookReturnValue {
    /** Name, e.g. "storedValue", "setStoredValue", "ref" */
    name: string;
    /** TypeScript type as a string */
    type: string;
    /** Description */
    description: string;
}
/** Complete metadata for a registered UI component. */
interface ComponentRegistryEntry {
    /** Unique kebab-case identifier: vayu-ui add <slug> */
    slug: string;
    /** Display name: "Button", "TextInput", "Modal" */
    name: string;
    /** Discriminant — always "component" */
    type: 'component';
    /** Category for filtering */
    category: ComponentCategory;
    /** One-line description for listings */
    description: string;
    /** Longer description for detail views */
    longDescription?: string;
    /** Searchable keywords */
    tags: string[];
    /** Use-case descriptions for find_component search */
    useCases: string[];
    /** Directory name within packages/ui/src/components/ui/ */
    directoryName: string;
    /** All files that make up this component */
    files: FileDefinition[];
    /** Default target path in user's project */
    targetPath: string;
    /** Root component export name */
    rootComponent: string;
    /** Sub-components. Empty array for simple components. */
    subComponents: SubComponentDefinition[];
    /** Internal hooks used by this component, e.g. ["useTextInput"] */
    hooks?: string[];
    /** Props for the root component */
    rootProps: PropDefinition[];
    /** HTML element type rendered, e.g. "button", "div" */
    rendersAs?: string;
    /** Named visual variants */
    variants?: VariantDefinition;
    /** Size options */
    sizes?: SizeDefinition;
    /** Interactive and visual states */
    states: StateDefinition[];
    /** Event handlers with TypeScript signatures */
    events: EventDefinition[];
    /** ARIA roles, attributes, keyboard interactions */
    a11y: A11yDefinition;
    /** NPM packages required */
    npmDependencies: NpmDependency[];
    /** Other registry items required */
    registryDependencies: RegistryDependency[];
    /** Minimum React peer dependency version */
    reactPeerDependency?: string;
    /** Frequently co-used components */
    peerComponents: PeerComponentSuggestion[];
    /** Ready-to-paste TSX examples */
    examples: CodeExample[];
    /** Things NOT to do */
    doNot: DoNotRule[];
}
/** Complete metadata for a registered hook. */
interface HookRegistryEntry {
    /** Unique kebab-case identifier: vayu-ui add use-local-storage */
    slug: string;
    /** Exact hook export name: "useLocalStorage", "useDebounce" */
    name: string;
    /** Discriminant — always "hook" */
    type: 'hook';
    /** One-line description */
    description: string;
    /** Longer description */
    longDescription?: string;
    /** Searchable tags */
    tags: string[];
    /** Problem category */
    category: HookCategory;
    /** File name within packages/ui/src/hooks/, e.g. "useLocalStorage.ts" */
    fileName: string;
    /** Default target path in user's project */
    targetPath: string;
    /** Full TypeScript call signature as a string */
    signature: string;
    /** Generic type parameters, e.g. ["T"] */
    typeParams?: string[];
    /** Input parameters */
    parameters: HookParameter[];
    /** Return type as a string */
    returnType: string;
    /** Individual return values (for destructured returns) */
    returnValues: HookReturnValue[];
    /** NPM packages required */
    npmDependencies: NpmDependency[];
    /** Other registry items required */
    registryDependencies: RegistryDependency[];
    /** Ready-to-paste TSX examples */
    examples: CodeExample[];
    /** Things NOT to do */
    doNot: DoNotRule[];
    /** When to use this hook (for find_component search) */
    useCases: string[];
}
/** Discriminated union of all registry entries. */
type RegistryEntry = ComponentRegistryEntry | HookRegistryEntry;
/** A single CSS design token. */
interface DesignToken {
    /** Token name (CSS custom property without --), e.g. "brand", "rounded-control" */
    name: string;
    /** Tailwind utility class, e.g. "bg-brand", "text-brand-content" */
    tailwindClass: string;
    /** Light mode value, e.g. "#f4f4f5", "6px" */
    lightValue: string;
    /** Dark mode value */
    darkValue: string;
    /** What this token is for */
    description: string;
    /** Grouping: "color", "radius", "shadow", "font", "animation" */
    group: string;
    /** Related utility classes, e.g. bg-canvas pairs with text-canvas-content */
    relatedClasses?: string[];
}
/** A category of design tokens. */
interface DesignTokenCategory {
    /** Category name: "Base Layers", "Semantic Colors", "Radius", "Shadows", etc. */
    name: string;
    /** Tokens in this category */
    tokens: DesignToken[];
}
/** Response for list_components tool. */
interface ListComponentsResponse {
    components: Pick<ComponentRegistryEntry, 'slug' | 'name' | 'category' | 'description' | 'tags'>[];
    hooks: Pick<HookRegistryEntry, 'slug' | 'name' | 'category' | 'description' | 'tags'>[];
}
/** Response for find_component tool. */
interface FindComponentResponse {
    results: Array<{
        slug: string;
        name: string;
        type: RegistryItemType;
        category: string;
        description: string;
        relevanceReason: string;
    }>;
}
/** Response for get_component_props tool. */
interface ComponentPropsResponse {
    slug: string;
    name: string;
    rootProps: PropDefinition[];
    subComponentProps: Array<{
        subComponent: string;
        props: PropDefinition[];
    }>;
}
/** Response for get_component_variants tool. */
interface ComponentVariantsResponse {
    slug: string;
    name: string;
    variants?: VariantDefinition;
    sizes?: SizeDefinition;
}
/** Response for get_component_states tool. */
interface ComponentStatesResponse {
    slug: string;
    name: string;
    states: StateDefinition[];
}
/** Response for get_component_events tool. */
interface ComponentEventsResponse {
    slug: string;
    name: string;
    events: EventDefinition[];
}
/** Response for get_component_example tool. */
interface ComponentExampleResponse {
    slug: string;
    name: string;
    examples: CodeExample[];
}
/** Response for get_component_a11y tool. */
interface ComponentA11yResponse {
    slug: string;
    name: string;
    a11y: A11yDefinition;
}
/** Response for get_component_doNot tool. */
interface ComponentDoNotResponse {
    slug: string;
    name: string;
    doNot: DoNotRule[];
}
/** Response for get_component_dependencies tool. */
interface ComponentDependenciesResponse {
    slug: string;
    name: string;
    npmDependencies: NpmDependency[];
    registryDependencies: RegistryDependency[];
    reactPeerDependency?: string;
}
/** Response for get_component_peer_components tool. */
interface ComponentPeerComponentsResponse {
    slug: string;
    name: string;
    peerComponents: PeerComponentSuggestion[];
}
/** Response for get_component_composition tool. */
interface ComponentCompositionResponse {
    slug: string;
    name: string;
    rootComponent: string;
    subComponents: SubComponentDefinition[];
    hooks?: string[];
}
/** Response for scaffold_component_usage tool. */
interface ScaffoldResponse {
    slug: string;
    name: string;
    code: string;
    imports: string[];
    dependencies: NpmDependency[];
}
/** Response for get_design_tokens tool. */
interface DesignTokensResponse {
    categories: DesignTokenCategory[];
}
/** CLI configuration read from user's project. */
interface CliConfig {
    /** Where to install components relative to project root */
    componentsTargetPath: string;
    /** Where to install hooks relative to project root */
    hooksTargetPath: string;
    /** Registry base URL for fetching component files */
    registryUrl: string;
}
/** Complete VedUI registry — components, hooks, and design tokens. */
interface VedUIRegistry {
    /** All registered components */
    components: ComponentRegistryEntry[];
    /** All registered hooks */
    hooks: HookRegistryEntry[];
    /** Design token categories */
    tokens: DesignTokenCategory[];
    /** Registry version */
    version: string;
}

declare const accordionEntry: ComponentRegistryEntry;

declare const affixEntry: ComponentRegistryEntry;

declare const alertEntry: ComponentRegistryEntry;

declare const animationEntry: ComponentRegistryEntry;

declare const aspectratioEntry: ComponentRegistryEntry;

declare const avatarEntry: ComponentRegistryEntry;

declare const avatarGroupEntry: ComponentRegistryEntry;

declare const badgeEntry: ComponentRegistryEntry;

declare const breadcrumbEntry: ComponentRegistryEntry;

declare const buttonEntry: ComponentRegistryEntry;

declare const buttonGroupEntry: ComponentRegistryEntry;

declare const cardEntry: ComponentRegistryEntry;

declare const carouselEntry: ComponentRegistryEntry;

declare const checkboxEntry: ComponentRegistryEntry;

declare const collapsibleEntry: ComponentRegistryEntry;

declare const colorPickerEntry: ComponentRegistryEntry;

declare const commandBoxEntry: ComponentRegistryEntry;

declare const datePickerEntry: ComponentRegistryEntry;

declare const dividerEntry: ComponentRegistryEntry;

declare const draggableEntry: ComponentRegistryEntry;

declare const drawerEntry: ComponentRegistryEntry;

declare const fileUploadEntry: ComponentRegistryEntry;

declare const floatingDockEntry: ComponentRegistryEntry;

declare const footerEntry: ComponentRegistryEntry;

declare const gridLayoutEntry: ComponentRegistryEntry;

declare const hoverCardEntry: ComponentRegistryEntry;

declare const marqueeEntry: ComponentRegistryEntry;

declare const menubarEntry: ComponentRegistryEntry;

declare const modalEntry: ComponentRegistryEntry;

declare const navbarEntry: ComponentRegistryEntry;

declare const otpInputEntry: ComponentRegistryEntry;

declare const paginationEntry: ComponentRegistryEntry;

declare const popoverEntry: ComponentRegistryEntry;

declare const radioGroupEntry: ComponentRegistryEntry;

declare const rateEntry: ComponentRegistryEntry;

declare const resizablePaneEntry: ComponentRegistryEntry;

declare const sidebarEntry: ComponentRegistryEntry;

declare const skeletonEntry: ComponentRegistryEntry;

declare const sliderEntry: ComponentRegistryEntry;

declare const spinnerEntry: ComponentRegistryEntry;

declare const stepperEntry: ComponentRegistryEntry;

declare const switchEntry: ComponentRegistryEntry;

declare const tabEntry: ComponentRegistryEntry;

declare const tableEntry: ComponentRegistryEntry;

declare const textAreaEntry: ComponentRegistryEntry;

declare const textInputEntry: ComponentRegistryEntry;

declare const toasterEntry: ComponentRegistryEntry;

declare const tooltipEntry: ComponentRegistryEntry;

declare const tourEntry: ComponentRegistryEntry;

declare const typographyEntry: ComponentRegistryEntry;

declare const useBatteryStatusEntry: HookRegistryEntry;

declare const useConfirmExitEntry: HookRegistryEntry;

declare const useCopyToClipboardEntry: HookRegistryEntry;

declare const useDebounceEntry: HookRegistryEntry;

declare const useDeviceOSEntry: HookRegistryEntry;

declare const useElementPositionEntry: HookRegistryEntry;

declare const useHoverEntry: HookRegistryEntry;

declare const useIdleEntry: HookRegistryEntry;

declare const useIndexedDBEntry: HookRegistryEntry;

declare const useIntervalWhenEntry: HookRegistryEntry;

declare const useKeyPressEntry: HookRegistryEntry;

declare const useListEntry: HookRegistryEntry;

declare const useLockBodyScrollEntry: HookRegistryEntry;

declare const useLocalStorageEntry: HookRegistryEntry;

declare const useMapEntry: HookRegistryEntry;

declare const useMeasureEntry: HookRegistryEntry;

declare const useMediaQueryEntry: HookRegistryEntry;

declare const useMouseTrackEntry: HookRegistryEntry;

declare const useNetworkStatusEntry: HookRegistryEntry;

declare const useOnClickOutsideEntry: HookRegistryEntry;

declare const usePageLeaveEntry: HookRegistryEntry;

declare const usePermissionEntry: HookRegistryEntry;

declare const usePreviousStateEntry: HookRegistryEntry;

declare const useQueueEntry: HookRegistryEntry;

declare const useRenderCountEntry: HookRegistryEntry;

declare const useScrollPositionEntry: HookRegistryEntry;

declare const useSetEntry: HookRegistryEntry;

declare const useThrottleEntry: HookRegistryEntry;

declare const useTimeoutEntry: HookRegistryEntry;

declare const useVisibilityChangeEntry: HookRegistryEntry;

declare const useWindowSizeEntry: HookRegistryEntry;

export { type A11yDefinition, type AriaAttribute, type CliConfig, type CodeExample, type ComponentA11yResponse, type ComponentCategory, type ComponentCompositionResponse, type ComponentDependenciesResponse, type ComponentDoNotResponse, type ComponentEventsResponse, type ComponentExampleResponse, type ComponentPeerComponentsResponse, type ComponentPropsResponse, type ComponentRegistryEntry, type ComponentStatesResponse, type ComponentVariantsResponse, type DesignToken, type DesignTokenCategory, type DesignTokensResponse, type DoNotRule, type EventDefinition, type FileDefinition, type FindComponentResponse, type HookCategory, type HookParameter, type HookRegistryEntry, type HookReturnValue, type KeyboardInteraction, type ListComponentsResponse, type NpmDependency, type PeerComponentSuggestion, type PropDefinition, type RegistryDependency, type RegistryEntry, type RegistryItemType, type ScaffoldResponse, type SizeDefinition, type StateDefinition, type SubComponentDefinition, type VariantDefinition, type VedUIRegistry, accordionEntry, affixEntry, alertEntry, animationEntry, aspectratioEntry, avatarEntry, avatarGroupEntry, badgeEntry, breadcrumbEntry, buttonEntry, buttonGroupEntry, cardEntry, carouselEntry, checkboxEntry, collapsibleEntry, colorPickerEntry, commandBoxEntry, datePickerEntry, dividerEntry, draggableEntry, drawerEntry, fileUploadEntry, floatingDockEntry, footerEntry, gridLayoutEntry, hoverCardEntry, marqueeEntry, menubarEntry, modalEntry, navbarEntry, otpInputEntry, paginationEntry, popoverEntry, radioGroupEntry, rateEntry, resizablePaneEntry, sidebarEntry, skeletonEntry, sliderEntry, spinnerEntry, stepperEntry, switchEntry, tabEntry, tableEntry, textAreaEntry, textInputEntry, toasterEntry, tooltipEntry, tourEntry, typographyEntry, useBatteryStatusEntry, useConfirmExitEntry, useCopyToClipboardEntry, useDebounceEntry, useDeviceOSEntry, useElementPositionEntry, useHoverEntry, useIdleEntry, useIndexedDBEntry, useIntervalWhenEntry, useKeyPressEntry, useListEntry, useLocalStorageEntry, useLockBodyScrollEntry, useMapEntry, useMeasureEntry, useMediaQueryEntry, useMouseTrackEntry, useNetworkStatusEntry, useOnClickOutsideEntry, usePageLeaveEntry, usePermissionEntry, usePreviousStateEntry, useQueueEntry, useRenderCountEntry, useScrollPositionEntry, useSetEntry, useThrottleEntry, useTimeoutEntry, useVisibilityChangeEntry, useWindowSizeEntry };
