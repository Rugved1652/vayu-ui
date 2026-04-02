// ============================================================================
// Registry
// This is the single source of truth for all your hooks and components.
// When you add a new hook/component to your Fumadocs repo,
// you add one entry here + one template file. That's it.
// ============================================================================

export type {ItemType, RegistryItem} from 'vayu-ui-registry'
export {registry, findItem, findWithDependencies} from 'vayu-ui-registry'
