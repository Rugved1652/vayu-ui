// ─────────────────────────────────────────────────────────────────────────────
// Vayu UI Registry — Type Definitions
// Every field is intentionally scoped: agents fetch only what they need.
// ─────────────────────────────────────────────────────────────────────────────

// ── Primitive helpers ─────────────────────────────────────────────────────────

/** Semantic version string e.g. "1.0.0" */
type SemVer = string;

/** ISO 8601 date string e.g. "2024-11-01" */
type ISODate = string;

/** CSS variable name e.g. "--color-primary-600" */
type CSSVar = `--${string}`;

// ─────────────────────────────────────────────────────────────────────────────
// 1. PROP
// ─────────────────────────────────────────────────────────────────────────────

export interface ComponentProp {
    /** TypeScript type expression e.g. '"solid" | "outline"' or 'boolean' */
    type: string;
    required: boolean;
    /** Stringified default e.g. '"solid"' or 'false' */
    default?: string;
    /** One-line description of what it controls */
    description: string;
    /** Which sub-component(s) this prop applies to (for compound components) */
    component?: string;
    /** Mark props that still exist but should no longer be used */
    deprecated?: {
        since: SemVer;
        replacedBy: string;
        message: string;
    };
}

/** Props map — keyed by prop name for O(1) lookup */
export type PropsMap = Record<string, ComponentProp>;

// ─────────────────────────────────────────────────────────────────────────────
// 2. EVENT
// ─────────────────────────────────────────────────────────────────────────────

export interface ComponentEvent {
    /** Full TypeScript function signature e.g. "(value: string) => void" */
    signature: string;
    /** When this fires */
    description: string;
    /** Matching controlled value prop e.g. onChange → "value" */
    controlledBy?: string;
}

/** Events map — keyed by handler name e.g. "onChange" */
export type EventsMap = Record<string, ComponentEvent>;

// ─────────────────────────────────────────────────────────────────────────────
// 3. STATE
// ─────────────────────────────────────────────────────────────────────────────

export interface ComponentState {
    /** What prop or interaction causes this state */
    trigger: string;
    /** What visually changes */
    visualChange: string;
    /** ARIA attribute applied in this state if any */
    ariaAttr?: string;
}

export type StatesMap = Record<
    'default' | 'hover' | 'focus' | 'active' | 'disabled' | 'loading' | 'error' | 'empty' | 'checked' | 'indeterminate' | string,
    ComponentState
>;

// ─────────────────────────────────────────────────────────────────────────────
// 4. EXAMPLE
// ─────────────────────────────────────────────────────────────────────────────

export interface ComponentExample {
    /** Ready-to-paste TSX. Should compile without modification. */
    code: string;
    /** One-line explanation for this example */
    description: string;
}

/** Examples map — keyed by variant/use-case slug e.g. "loading", "withIcon" */
export type ExamplesMap = Record<string, ComponentExample>;

// ─────────────────────────────────────────────────────────────────────────────
// 5. A11Y
// ─────────────────────────────────────────────────────────────────────────────

export interface ComponentA11y {
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
    /** Additional notes or guidance */
    notes?: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. DESIGN TOKEN
// ─────────────────────────────────────────────────────────────────────────────

export interface DesignToken {
    var: CSSVar;
    /** Resolved value in the default theme */
    value: string;
    /** Which component visual property this token drives */
    controls: string;
    /** Whether this token is safe to override in consumer CSS */
    overridable: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. COMPOSITION (Compound Component Pattern)
// ─────────────────────────────────────────────────────────────────────────────

export interface ComponentComposition {
    /** Sub-components exposed on this component. Key = name, value = description */
    parts: Record<string, string>;
    /** Canonical compound usage example */
    example: string;
    /** Are parts required or can the simple API be used instead? */
    partsRequired: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. DO-NOT RULE
// ─────────────────────────────────────────────────────────────────────────────

export type DoNotCategory = 'setup' | 'api' | 'a11y' | 'styling' | 'nesting' | 'perf' | 'ux';

export interface DoNotRule {
    rule: string;
    category: DoNotCategory;
    why?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. DARK MODE
// ─────────────────────────────────────────────────────────────────────────────

export interface DarkModeInfo {
    /** Does the component switch automatically via CSS variables? */
    automatic: boolean;
    /** If not automatic, what class does the consumer need? */
    manualClass?: string;
    /** Token pairs that swap in dark mode. Key = light token, value = dark token */
    tokenSwaps?: Record<CSSVar, CSSVar>;
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. CHANGELOG
// ─────────────────────────────────────────────────────────────────────────────

export type ChangeType = 'added' | 'changed' | 'deprecated' | 'removed' | 'fixed';

export interface ChangelogEntry {
    version: SemVer;
    date: ISODate;
    type: ChangeType;
    description: string;
    breaking: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. TESTING
// ─────────────────────────────────────────────────────────────────────────────

export interface TestingInfo {
    /** data-testid values. Key = element description, value = testid string */
    testIds: Record<string, string>;
    /** Storybook story path e.g. "Components/Button/Solid" */
    storybookPath?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 12. ITEM TYPE
// ─────────────────────────────────────────────────────────────────────────────

export type ItemType = "hook" | "component";

// ─────────────────────────────────────────────────────────────────────────────
// 13. REGISTRY ITEM — the complete component/hook definition
// ─────────────────────────────────────────────────────────────────────────────

export interface RegistryItem {
    // ── Identity ───────────────────────────────────────────────────────────────

    /** PascalCase component/hook name e.g. "Button" */
    name: string;
    /** CLI identifier e.g. "button", "use-debounce" */
    slug: string;
    /** hook or component */
    type: ItemType;
    /** Grouping for list/filter */
    category: 'animation' | 'action' | 'input' | 'layout' | 'overlay' | 'display' | 'navigation' | 'feedback' | 'utility';
    /** One sentence — what it is and primary use case */
    description: string;
    /** Version this item was introduced */
    since: SemVer;

    // ── File / Install ──────────────────────────────────────────────────────────

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

    // ── Props & Events ─────────────────────────────────────────────────────────

    props?: PropsMap;
    events?: EventsMap;

    // ── Variants & States ──────────────────────────────────────────────────────

    variants?: string[];
    states?: StatesMap;

    // ── Examples ───────────────────────────────────────────────────────────────

    examples?: ExamplesMap;

    // ── Design & Tokens ────────────────────────────────────────────────────────

    tokens?: DesignToken[];
    darkMode?: DarkModeInfo;

    // ── Accessibility ──────────────────────────────────────────────────────────

    a11y?: ComponentA11y;

    // ── Compound Pattern ───────────────────────────────────────────────────────

    composition?: ComponentComposition;

    // ── Relationships ──────────────────────────────────────────────────────────

    /** Components frequently used alongside this one */
    peerComponents?: string[];

    // ── Rules ──────────────────────────────────────────────────────────────────

    doNot?: DoNotRule[];

    // ── Quality & Testing ──────────────────────────────────────────────────────

    testing?: TestingInfo;

    // ── Versioning ─────────────────────────────────────────────────────────────

    changelog?: ChangelogEntry[];

    /** Set true to hide from list_components() and find_component() */
    internal?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// 14. REGISTRY — top-level store (keyed by component name)
// ─────────────────────────────────────────────────────────────────────────────

export type Registry = Record<string, RegistryItem>;

// ─────────────────────────────────────────────────────────────────────────────
// Helpers used by commands
// ─────────────────────────────────────────────────────────────────────────────

import { registry as registryData } from "./registryData";

export function findItem(slug: string): RegistryItem | undefined {
    return Object.values(registryData).find((item) => item.slug === slug);
}

export function findWithDependencies(slug: string): RegistryItem[] {
    const item = findItem(slug);
    if (!item) return [];

    const deps = item.registryDependencies.flatMap((depSlug) =>
        findWithDependencies(depSlug)
    );

    return [...deps, item];
}

export const registry = registryData;
