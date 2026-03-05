// ============================================================================
// Vayu UI Registry (MCP)
// ----------------------------------------------------------------------------
// Reuse the canonical registry & helpers from the published registry package
// (`vayu-ui-registry`) so there is a single source of truth.
// ============================================================================

import type { RegistryItem, ItemType } from "vayu-ui-registry";
import {
  registry as cliRegistry,
  findItem as cliFindItem,
  findWithDependencies as cliFindWithDependencies,
} from "vayu-ui-registry";

export type { RegistryItem, ItemType };

export const registry: RegistryItem[] = cliRegistry;

export function findItem(slug: string): RegistryItem | undefined {
  return cliFindItem(slug);
}

export function findWithDependencies(slug: string): RegistryItem[] {
  return cliFindWithDependencies(slug);
}

