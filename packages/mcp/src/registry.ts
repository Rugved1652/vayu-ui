// ============================================================================
// VedUI Registry (MCP)
// ----------------------------------------------------------------------------
// Reuse the canonical registry & helpers from the published registry package
// (`vayu-ui-registry`) so there is a single source of truth.
// ============================================================================

import type { VayuComponentDoc, Registry } from "vayu-ui-registry";
import {
  registry as cliRegistry,
  findItem as cliFindItem,
  findWithDependencies as cliFindWithDependencies,
} from "vayu-ui-registry";

export type { VayuComponentDoc, Registry };

export const registry: Registry = cliRegistry;

export function findItem(slug: string): VayuComponentDoc | undefined {
  return cliFindItem(slug);
}

export function findWithDependencies(slug: string): VayuComponentDoc[] {
  return cliFindWithDependencies(slug);
}
