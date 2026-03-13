// ============================================================================
// VedUI Registry Types
// Designed for AI-native UI development with 16 MCP tools
// ============================================================================

export type VayuComponentDoc = {
  // Basic metadata
  component: string;
  slug: string;
  category: string;
  complexity?: "simple" | "compound" | "layout";

  // Descriptions
  description: string;
  ai_summary: string;

  // AI-focused fields
  intent: string[];
  ai_keywords: string[];

  // Usage guidance
  when_to_use: string[];
  when_not_to_use: string[];

  // Composition (compound components)
  composition: {
    root: string;
    slots: string[];
    structure: string[];
    rules: string[];
  };

  // Props (array per key for multiple components)
  props: Record<string, ComponentProp[]>;

  // Variants
  variants: ComponentVariant[];

  // States
  states: string[];

  // Responsive
  responsive: {
    allowed: boolean;
    patterns: string[];
  };

  // Design tokens
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

  // Examples (array format)
  examples: ComponentExample[];

  // Accessibility
  accessibility: {
    pattern: string;
    standards: string[];
    keyboard_support: string[];
    aria_attributes: string[];
  };

  // Anti-patterns
  anti_patterns: string[];

  // Dependencies
  dependencies: {
    icons?: string[];
    utilities?: string[];
    components?: string[];
  };

  // Related components
  related_components: string[];

  // Relationships
  relationships?: {
    used_with: string[];
    often_inside: string[];
    often_contains: string[];
  };

  // Validation
  validation_rules: string[];

  // Installation
  installation: string[];

  // Source info
  source: {
    file: string;
    language: string;
    framework: string;
  };

  // Meta
  meta?: {
    doc_url: string;
    source_file: string;
    extracted: string[];
    inferred: string[];
  };
};

export type ComponentProp = {
  name: string;
  type: string;
  required?: boolean;
  default?: unknown;
  description?: string;
};

export type ComponentVariant = {
  name: string;
  values: string[];
  default?: string;
  description?: string;
};

export type ComponentExample = {
  name: string;
  description?: string;
  code: string;
};

// Registry type
export type Registry = Record<string, VayuComponentDoc>;

// ============================================================================
// Registry Data & Helpers
// ============================================================================

import { registry as registryData } from "./registryData";

export function findItem(slug: string): VayuComponentDoc | undefined {
  return Object.values(registryData).find((item) => item.slug === slug);
}

export function findWithDependencies(slug: string): VayuComponentDoc[] {
  const item = findItem(slug);
  if (!item) return [];

  const deps = (item.dependencies?.components ?? []).flatMap((depSlug) =>
    findWithDependencies(depSlug)
  );

  return [...deps, item];
}

export const registry = registryData;
