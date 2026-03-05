/** Semantic version string e.g. "1.0.0" */
type SemVer = string;
/** ISO 8601 date string e.g. "2024-11-01" */
type ISODate = string;
/** CSS variable name e.g. "--color-primary-600" */
type CSSVar = `--${string}`;
interface ComponentProp {
    /** TypeScript type expression e.g. '"solid" | "outline"' or 'boolean' */
    type: string;
    required: boolean;
    /** Stringified default e.g. '"solid"' or 'false' */
    default?: string;
    /** One-line description of what it controls */
    description: string;
    /** Mark props that still exist but should no longer be used */
    deprecated?: {
        since: SemVer;
        replacedBy: string;
        message: string;
    };
}
/** Props map — keyed by prop name for O(1) lookup */
type PropsMap = Record<string, ComponentProp>;
interface ComponentEvent {
    /** Full TypeScript function signature e.g. "(value: string) => void" */
    signature: string;
    /** When this fires */
    description: string;
    /** Matching controlled value prop e.g. onChange → "value" */
    controlledBy?: string;
}
/** Events map — keyed by handler name e.g. "onChange" */
type EventsMap = Record<string, ComponentEvent>;
interface ComponentState {
    /** What prop or interaction causes this state */
    trigger: string;
    /** What visually changes */
    visualChange: string;
    /** ARIA attribute applied in this state if any */
    ariaAttr?: string;
}
type StatesMap = Record<'default' | 'hover' | 'focus' | 'active' | 'disabled' | 'loading' | 'error' | 'empty' | 'checked' | 'indeterminate' | string, ComponentState>;
interface ComponentExample {
    /** Ready-to-paste TSX. Should compile without modification. */
    code: string;
    /** One-line explanation for this example */
    description: string;
}
/** Examples map — keyed by variant/use-case slug e.g. "loading", "withIcon" */
type ExamplesMap = Record<string, ComponentExample>;
interface ComponentA11y {
    /** WAI-ARIA role applied to the root element */
    role?: string;
    /** ARIA attrs the consumer must/should set. Key = attr name, value = guidance */
    requiredAttrs?: Record<string, string>;
    /** ARIA attrs managed internally — consumer should NOT override */
    managedAttrs?: string[];
    /** Keyboard interaction map. Key = key name, value = what it does */
    keyboard?: Record<string, string>;
    /** Focus management description */
    focusManagement?: string;
    /** Live region behaviour if any */
    liveRegion?: string;
}
interface DesignToken {
    var: CSSVar;
    /** Resolved value in the default theme */
    value: string;
    /** Which component visual property this token drives */
    controls: string;
    /** Whether this token is safe to override in consumer CSS */
    overridable: boolean;
}
interface ComponentComposition {
    /** Sub-components exposed on this component. Key = name, value = description */
    parts: Record<string, string>;
    /** Canonical compound usage example */
    example: string;
    /** Are parts required or can the simple API be used instead? */
    partsRequired: boolean;
}
type DoNotCategory = 'api' | 'a11y' | 'styling' | 'nesting' | 'perf' | 'ux';
interface DoNotRule {
    rule: string;
    category: DoNotCategory;
    why?: string;
}
interface DarkModeInfo {
    /** Does the component switch automatically via CSS variables? */
    automatic: boolean;
    /** If not automatic, what class does the consumer need? */
    manualClass?: string;
    /** Token pairs that swap in dark mode. Key = light token, value = dark token */
    tokenSwaps?: Record<CSSVar, CSSVar>;
}
type ChangeType = 'added' | 'changed' | 'deprecated' | 'removed' | 'fixed';
interface ChangelogEntry {
    version: SemVer;
    date: ISODate;
    type: ChangeType;
    description: string;
    breaking: boolean;
}
interface TestingInfo {
    /** data-testid values. Key = element description, value = testid string */
    testIds: Record<string, string>;
    /** Storybook story path e.g. "Components/Button/Solid" */
    storybookPath?: string;
}
type ItemType = "hook" | "component";
interface RegistryItem {
    /** PascalCase component/hook name e.g. "Button" */
    name: string;
    /** CLI identifier e.g. "button", "use-debounce" */
    slug: string;
    /** hook or component */
    type: ItemType;
    /** Grouping for list/filter */
    category: 'action' | 'input' | 'layout' | 'overlay' | 'display' | 'navigation' | 'feedback' | 'utility';
    /** One sentence — what it is and primary use case */
    description: string;
    /** Version this item was introduced */
    since: SemVer;
    /** Where the file will be written in the user's project */
    targetPath: string;
    /** The filename e.g. "button.tsx" */
    fileName: string;
    /** npm packages this item needs */
    dependencies: string[];
    /** Other items from Vayu UI this one needs */
    registryDependencies: string[];
    /** Tags for filtering/searching */
    tags: string[];
    props?: PropsMap;
    events?: EventsMap;
    variants?: string[];
    states?: StatesMap;
    examples?: ExamplesMap;
    tokens?: DesignToken[];
    darkMode?: DarkModeInfo;
    a11y?: ComponentA11y;
    composition?: ComponentComposition;
    /** Components frequently used alongside this one */
    peerComponents?: string[];
    doNot?: DoNotRule[];
    testing?: TestingInfo;
    changelog?: ChangelogEntry[];
    /** Set true to hide from list_components() and find_component() */
    internal?: boolean;
}
type Registry = Record<string, RegistryItem>;
declare function findItem(slug: string): RegistryItem | undefined;
declare function findWithDependencies(slug: string): RegistryItem[];
declare const registry: Registry;

export { type ChangeType, type ChangelogEntry, type ComponentA11y, type ComponentComposition, type ComponentEvent, type ComponentExample, type ComponentProp, type ComponentState, type DarkModeInfo, type DesignToken, type DoNotCategory, type DoNotRule, type EventsMap, type ExamplesMap, type ItemType, type PropsMap, type Registry, type RegistryItem, type StatesMap, type TestingInfo, findItem, findWithDependencies, registry };
