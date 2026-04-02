type VayuComponentDoc = {
    component: string;
    slug: string;
    category: string;
    complexity?: 'simple' | 'compound' | 'layout';
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
        used?: {
            colors?: string[];
            radius?: string[];
            border?: string[];
            spacing?: string[];
            typography?: string[];
        };
        recommended?: {
            colors?: string[];
            radius?: string[];
            typography?: string[];
        };
        allowed?: {
            colors?: string[];
            radius?: string[];
            border?: string[];
            spacing?: string[];
            typography?: string[];
        };
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
    relationships?: {
        used_with: string[];
        often_inside: string[];
        often_contains: string[];
    };
    validation_rules: string[];
    installation: string[];
    source: {
        file: string;
        language: string;
        framework: string;
    };
    meta?: {
        doc_url: string;
        source_file: string;
        extracted: string[];
        inferred: string[];
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
