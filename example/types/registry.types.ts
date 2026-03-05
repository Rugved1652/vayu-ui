// ─────────────────────────────────────────────────────────────────────────────
// UI KIT MCP — Registry Type Definitions
// Every field is intentionally scoped: agents fetch only what they need.
// ─────────────────────────────────────────────────────────────────────────────

// ── Primitive helpers ─────────────────────────────────────────────────────────

/** Semantic version string e.g. "1.0.0" */
type SemVer = string;

/** ISO 8601 date string e.g. "2024-11-01" */
type ISODate = string;

/** Raw TSX/JSX string — what the agent pastes directly into code */
type TSXString = string;

/** CSS variable name e.g. "--color-primary-600" */
type CSSVar = `--${string}`;

// ─────────────────────────────────────────────────────────────────────────────
// 1. PROP
// ─────────────────────────────────────────────────────────────────────────────

export interface ComponentProp {
  /** TypeScript type expression. Use union strings for enums.
   *  e.g.  '"solid" | "outline" | "ghost"'
   *  e.g.  'string'
   *  e.g.  'React.ReactNode'
   *  e.g.  '(value: string) => void'
   */
  type: string;

  required: boolean;

  /** Stringified default value. Use undefined if truly no default.
   *  e.g.  '"solid"'   not  'solid'
   *  e.g.  'false'
   *  e.g.  'undefined'
   */
  default?: string;

  /** One line. What it controls, not how it works. */
  description: string;

  /** Mark props that still exist but should no longer be used. */
  deprecated?: {
    since:      SemVer;
    replacedBy: string;   // prop name that replaces it
    message:    string;   // e.g. "Use `color` instead"
  };
}

// ── Why keyed object not array ────────────────────────────────────────────────
// Array:  [{ name: "variant", type: "...", required: false, default: "solid" }]
//         Agent must scan every item to find one prop.
//         Every entry repeats the "name" key — wasted tokens.
//
// Object: { variant: { type: "...", required: false, default: '"solid"' } }
//         Agent looks up props.variant directly — O(1) and ~40% fewer tokens.
// ─────────────────────────────────────────────────────────────────────────────

/** Props map — keyed by prop name for direct O(1) lookup */
export type PropsMap = Record<string, ComponentProp>;

// ─────────────────────────────────────────────────────────────────────────────
// 2. EVENT
// ─────────────────────────────────────────────────────────────────────────────

export interface ComponentEvent {
  /** Full TypeScript function signature.
   *  e.g. "(value: string) => void"
   *  e.g. "(open: boolean) => void"
   *  e.g. "(event: React.MouseEvent<HTMLButtonElement>) => void"
   */
  signature: string;

  /** When this fires — one line. */
  description: string;

  /** If this is a controlled pattern event, name the matching value prop.
   *  e.g. onChange pairs with `value`, onOpenChange pairs with `open`
   */
  controlledBy?: string;
}

/** Events map — keyed by handler name e.g. "onChange", "onOpenChange" */
export type EventsMap = Record<string, ComponentEvent>;

// ─────────────────────────────────────────────────────────────────────────────
// 3. STATE
// ─────────────────────────────────────────────────────────────────────────────

export interface ComponentState {
  /** How to trigger this state — what prop or interaction causes it. */
  trigger: string;        // e.g. 'disabled={true}' or 'hover via CSS'

  /** What visually changes. */
  visualChange: string;   // e.g. 'opacity-50, cursor-not-allowed'

  /** ARIA attribute applied in this state if any. */
  ariaAttr?: string;      // e.g. 'aria-disabled="true"'
}

/** States map — keyed by state name */
export type StatesMap = Record<
  'default' | 'hover' | 'focus' | 'active' | 'disabled' | 'loading' | 'error' | 'empty' | 'checked' | 'indeterminate' | string,
  ComponentState
>;

// ─────────────────────────────────────────────────────────────────────────────
// 4. EXAMPLE
// ─────────────────────────────────────────────────────────────────────────────

export interface ComponentExample {
  /** Ready-to-paste TSX. Should compile without modification. */
  code: TSXString;

  /** One-line explanation for this example. */
  description: string;
}

// ── Why keyed object not array ────────────────────────────────────────────────
// Enables: get_component_example("Button", "loading")
// Agent fetches exactly one example, not all.
// ─────────────────────────────────────────────────────────────────────────────

/** Examples map — keyed by variant/use-case slug */
export type ExamplesMap = Record<string, ComponentExample>;

// ─────────────────────────────────────────────────────────────────────────────
// 5. A11Y
// ─────────────────────────────────────────────────────────────────────────────

export interface ComponentA11y {
  /** WAI-ARIA role applied to the root element. */
  role?: string;              // e.g. "button", "dialog", "listbox"

  /** ARIA attributes that must/should be set by consumer.
   *  Key = attr name, value = guidance string.
   *  e.g. { "aria-label": "Required when no visible text label" }
   */
  requiredAttrs?: Record<string, string>;

  /** ARIA attributes the component sets internally — consumer should NOT override. */
  managedAttrs?: string[];    // e.g. ["aria-expanded", "aria-controls"]

  /** Keyboard interaction map.
   *  Key = key name, value = what it does.
   *  e.g. { "Escape": "Closes the popover", "Tab": "Moves focus to next item" }
   */
  keyboard?: Record<string, string>;

  /** Focus management description. */
  focusManagement?: string;   // e.g. "Focus moves to first focusable child on open"

  /** Live region behaviour if any. */
  liveRegion?: string;        // e.g. "aria-live=polite announces item count changes"
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. DESIGN TOKEN
// ─────────────────────────────────────────────────────────────────────────────

export interface DesignToken {
  /** CSS variable name. */
  var: CSSVar;              // e.g. "--color-emerald-600"

  /** Resolved value in the default theme. */
  value: string;            // e.g. "#059669"

  /** Which component visual property this token drives. */
  controls: string;         // e.g. "background on solid variant"

  /** Whether this token is safe to override in consumer CSS. */
  overridable: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. COMPOSITION (Compound Component Pattern)
// ─────────────────────────────────────────────────────────────────────────────

export interface ComponentComposition {
  /** Sub-components exposed on this component.
   *  e.g. { "Root": "Wrapper providing context", "Trigger": "The toggle element" }
   */
  parts: Record<string, string>;

  /** The canonical compound usage example. */
  example: TSXString;

  /** Are parts required or can the simple API be used instead? */
  partsRequired: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. DO-NOT RULE
// ─────────────────────────────────────────────────────────────────────────────

export type DoNotCategory =
  | 'api'        // Wrong prop usage
  | 'a11y'       // Accessibility violation
  | 'styling'    // CSS / token override mistake
  | 'nesting'    // Invalid DOM nesting
  | 'perf'       // Performance pitfall
  | 'ux';        // UX anti-pattern

export interface DoNotRule {
  rule:     string;           // Short imperative: "Don't use ghost for primary CTA"
  category: DoNotCategory;
  why?:     string;           // Optional one-line reason
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. CHANGELOG ENTRY
// ─────────────────────────────────────────────────────────────────────────────

export type ChangeType = 'added' | 'changed' | 'deprecated' | 'removed' | 'fixed';

export interface ChangelogEntry {
  version:     SemVer;
  date:        ISODate;
  type:        ChangeType;
  description: string;        // e.g. "Renamed `color` prop to `variant`"
  breaking:    boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. DARK MODE
// ─────────────────────────────────────────────────────────────────────────────

export interface DarkModeInfo {
  /** Does the component switch automatically via CSS variables? */
  automatic: boolean;

  /** If not automatic, what does the consumer need to add? */
  manualClass?: string;       // e.g. "dark" class on a parent

  /** Token pairs that swap in dark mode.
   *  Key = light token, value = dark token.
   */
  tokenSwaps?: Record<CSSVar, CSSVar>;
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. TESTING
// ─────────────────────────────────────────────────────────────────────────────

export interface TestingInfo {
  /** data-testid values available on this component's DOM elements.
   *  Key = element description, value = testid string.
   *  e.g. { "root button": "btn-root", "loading spinner": "btn-spinner" }
   */
  testIds: Record<string, string>;

  /** Storybook story path e.g. "Components/Button/Solid" */
  storybookPath?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 12. REGISTRY ITEM — the complete component definition
// ─────────────────────────────────────────────────────────────────────────────

export interface RegistryItem {
  // ── Identity ───────────────────────────────────────────────────────────────

  /** PascalCase component name. */
  name: string;                           // e.g. "Button"

  /** Grouping for list/filter. */
  category: 'action' | 'input' | 'layout' | 'overlay' | 'display' | 'navigation' | 'feedback';

  /** One sentence. What it is and primary use case. */
  description: string;

  /** Version this component was introduced. */
  since: SemVer;

  /** Import statement — ready to paste. */
  importPath: string;                     // e.g. "import { Button } from '@mykit/ui'"

  // ── Props & Events ─────────────────────────────────────────────────────────

  props?:     PropsMap;
  events?:    EventsMap;

  // ── Variants & States ──────────────────────────────────────────────────────

  /** Visual variant names — agent fetches details via get_component_variants(). */
  variants?:  string[];

  states?:    StatesMap;

  // ── Examples ───────────────────────────────────────────────────────────────

  /** Keyed by slug. Agent fetches one at a time via get_component_example(). */
  examples?:  ExamplesMap;

  // ── Design & Tokens ────────────────────────────────────────────────────────

  tokens?:    DesignToken[];
  darkMode?:  DarkModeInfo;

  // ── Accessibility ──────────────────────────────────────────────────────────

  a11y?:      ComponentA11y;

  // ── Compound Pattern ───────────────────────────────────────────────────────

  /** Only present if this component has a compound/compound-component API. */
  composition?: ComponentComposition;

  // ── Relationships ──────────────────────────────────────────────────────────

  /** Internal components this component renders — for dependency awareness. */
  dependencies?: string[];                // e.g. ["Popover", "Command"]

  /** Components frequently used alongside this one. */
  peerComponents?: string[];              // e.g. ["Label", "FormError"]

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
// 13. REGISTRY — top-level store
// ─────────────────────────────────────────────────────────────────────────────

export type Registry = Record<string, RegistryItem>;
