// ============================================================================
// VedUI MCP Server Utilities
// ============================================================================

import type { Registry, VayuComponentDoc } from "vayu-ui-registry";

// ─────────────────────────────────────────────────────────────────────────────
// Response Helpers
// ─────────────────────────────────────────────────────────────────────────────

export type McpResult = {
  content: Array<{ type: "text"; text: string }>;
  isError?: boolean;
};

/** Success response factory */
export const ok = (data: unknown): McpResult => ({
  content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
});

/** Error response factory */
export const err = (msg: string): McpResult => ({
  content: [{ type: "text", text: `ERROR: ${msg}` }],
  isError: true,
});

// ─────────────────────────────────────────────────────────────────────────────
// Component Lookup Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Case-insensitive lookup by component name */
export function resolveByName(
  registry: Registry,
  name: string
): VayuComponentDoc | null {
  const normalizedName = Object.keys(registry).find(
    (k) => k.toLowerCase() === name.toLowerCase()
  );
  return normalizedName ? registry[normalizedName] : null;
}

/** Lookup by slug */
export function resolveBySlug(
  registry: Registry,
  slug: string
): VayuComponentDoc | null {
  return Object.values(registry).find((c) => c.slug === slug) ?? null;
}

/** Unified lookup (tries name first, then slug) */
export function resolveComponent(
  registry: Registry,
  identifier: string
): { success: true; component: VayuComponentDoc } | { success: false; error: string } {
  const byName = resolveByName(registry, identifier);
  if (byName) return { success: true, component: byName };

  const bySlug = resolveBySlug(registry, identifier);
  if (bySlug) return { success: true, component: bySlug };

  return {
    success: false,
    error: `"${identifier}" not found. Use search_components() to find components.`,
  };
}

/** Filter out internal components (if any) */
export function filterPublic(items: VayuComponentDoc[]): VayuComponentDoc[] {
  return items; // All components are public in VayuComponentDoc
}
