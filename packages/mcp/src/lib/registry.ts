import { componentEntries, hookEntries, allEntries, findEntry } from 'vayu-ui-registry';
import type {
  ComponentRegistryEntry,
  HookRegistryEntry,
  RegistryEntry,
  ComponentCategory,
  HookCategory,
} from 'vayu-ui-registry';

export type {
  ComponentRegistryEntry,
  HookRegistryEntry,
  RegistryEntry,
  ComponentCategory,
  HookCategory,
};

export function findBySlug(slug: string): RegistryEntry | undefined {
  return findEntry(slug);
}

export function findComponent(slug: string): ComponentRegistryEntry | undefined {
  const entry = findEntry(slug);
  return entry?.type === 'component' ? entry : undefined;
}

export function findHook(slug: string): HookRegistryEntry | undefined {
  const entry = findEntry(slug);
  return entry?.type === 'hook' ? entry : undefined;
}

export function filterByType(type?: 'component' | 'hook') {
  if (type === 'component')
    return { components: componentEntries, hooks: [] as HookRegistryEntry[] };
  if (type === 'hook') return { components: [] as ComponentRegistryEntry[], hooks: hookEntries };
  return { components: componentEntries, hooks: hookEntries };
}

export function filterByCategory(entries: RegistryEntry[], category?: string): RegistryEntry[] {
  if (!category) return entries;
  return entries.filter((e) => e.category === category);
}
