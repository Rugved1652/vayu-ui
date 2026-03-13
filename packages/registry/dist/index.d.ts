type VayuComponentDoc = {
    component: string;
    slug: string;
    category: string;
    description: string;
    ai_summary: string;
    intent: string[];
    ai_keywords: string[];
    when_to_use: string[];
    when_not_to_use: string[];
    composition: {
        root: string;
        slots: string[];
        structure: string[];
        rules: string[];
    };
    props: Record<string, ComponentProp[]>;
    variants: ComponentVariant[];
    states: string[];
    responsive: {
        allowed: boolean;
        patterns: string[];
    };
    design_tokens: {
        colors?: string[];
        radius?: string[];
        border?: string[];
        spacing?: string[];
        typography?: string[];
    };
    examples: ComponentExample[];
    accessibility: {
        pattern: string;
        standards: string[];
        keyboard_support: string[];
        aria_attributes: string[];
    };
    anti_patterns: string[];
    dependencies: {
        icons?: string[];
        utilities?: string[];
        components?: string[];
    };
    related_components: string[];
    validation_rules: string[];
    installation: string[];
    source: {
        file: string;
        language: string;
        framework: string;
    };
};
type ComponentProp = {
    name: string;
    type: string;
    required?: boolean;
    default?: unknown;
    description?: string;
};
type ComponentVariant = {
    name: string;
    values: string[];
    default?: string;
    description?: string;
};
type ComponentExample = {
    name: string;
    description?: string;
    code: string;
};
type Registry = Record<string, VayuComponentDoc>;
declare function findItem(slug: string): VayuComponentDoc | undefined;
declare function findWithDependencies(slug: string): VayuComponentDoc[];
declare const registry: Registry;

export { type ComponentExample, type ComponentProp, type ComponentVariant, type Registry, type VayuComponentDoc, findItem, findWithDependencies, registry };
