---
name: tanstack-query-api-integration
description: >
  Enforces a strict layered architecture for API integration using Axios (or fetch) service functions
  and TanStack Query hooks. Apply this skill whenever you are adding, refactoring, or reviewing
  any data-fetching or mutation code: creating API service functions, writing TanStack Query hooks
  (useQuery, useMutation, useInfiniteQuery), defining query keys, setting up cache invalidation,
  wiring API calls into UI components, defining API request/response types, or configuring Axios
  instances and interceptors.
  Also trigger when the user mentions "API call", "fetch data", "useQuery", "useMutation", "TanStack",
  "react-query", "query key", "cache invalidation", "service layer", "API hook", "data fetching",
  "mutation hook", "axios instance", "interceptor", "API integration", or "query invalidation".
  Do NOT trigger for server actions, tRPC, GraphQL, or non-HTTP data fetching patterns.
---

# TanStack Query API Integration Patterns

This skill defines a clean layered architecture for integrating HTTP APIs into React apps. The goal: every API call flows through the same layers in the same order, every hook follows the same structure, and every cache key follows the same conventions. This makes data-fetching code predictable, testable, and easy to review.

## Architecture Overview

All API code flows through four layers, each with a single responsibility:

```
Types (contracts) -> Services (HTTP calls) -> Hooks (TanStack Query) -> UI (consumers)
```

Each layer only talks to the layer directly below it. UI never imports axios. Hooks never import axios. Services never use TanStack Query. This separation is what makes the codebase navigable — when a bug shows up in the network tab, you know to look in services; when a bug shows up in the cache, you know to look in hooks.

## Layer 1: API Client Setup

Dedicate a single file to the HTTP client instance and its interceptors. This is the only place axios (or fetch wrappers) are configured.

Typical responsibilities:
- Base URL configuration
- Auth header injection (request interceptor)
- Global error handling / token refresh (response interceptor)
- Exposing convenience methods (`get`, `post`, `put`, `patch`, `del`)

If the app talks to multiple backends (e.g., a main API and an orchestration service), define separate instances in this same file or in adjacent files — not scattered across the codebase.

**One file, one concern.** Don't mix interceptor logic with component code or hook logic.

## Layer 2: API Types

Dedicate a shared types location for all API contracts. This is the single source of truth for request shapes, response shapes, and shared parameter types.

Each feature's types should live in a dedicated file (e.g., `<feature>.api.types.ts` or `<feature>-types.ts`). UI components, hooks, and services all import from here — never redefine the same interface in multiple places.

Typical type structure per feature:
```ts
// Request/response types
export type GetFeatureListParams = { page: number; search?: string; status?: string };
export type FeatureListResponse = { data: Feature[]; total: number };
export type CreateFeaturePayload = { name: string; description?: string };
export type FeatureDetailResponse = { id: string; name: string; createdAt: string };
```

**Why this matters:** When the backend changes a contract, you update one file and TypeScript surfaces every break across hooks, services, and UI. Without a shared types location, contracts drift silently.

## Layer 3: Service Functions

Each feature gets a service file that owns the endpoint path, HTTP method, query-param mapping, and raw API function. Service functions are plain async functions that call the API client — no React, no hooks, no TanStack Query.

```ts
// featureService.ts
import { api } from "../api";
import type { GetFeatureListParams, FeatureListResponse, CreateFeaturePayload, FeatureDetailResponse } from "../../types/feature.api.types";

export const getFeatureList = (params: GetFeatureListParams) =>
  api.get<FeatureListResponse>("/features", { params });

export const getFeatureDetail = (id: string) =>
  api.get<FeatureDetailResponse>(`/features/${id}`);

export const createFeature = (data: CreateFeaturePayload) =>
  api.post<FeatureDetailResponse>("/features", data);

export const updateFeature = (id: string, data: Partial<CreateFeaturePayload>) =>
  api.patch<FeatureDetailResponse>(`/features/${id}`, data);

export const deleteFeature = (id: string) =>
  api.delete(`/features/${id}`);
```

Service files contain zero UI logic, zero state management, and zero cache concerns. They are thin wrappers over HTTP calls — the kind of file you can unit test with a mocked axios instance.

## Layer 4: TanStack Query Hooks

Each hook gets its own file. One file, one hook export. This sounds strict but it pays off: finding a hook is O(1), git diffs are clean, and code review is fast.

### Query Key Conventions

Build stable, descriptive query keys. Keys must include every parameter that affects what the server returns — if a param changes the response, it must be in the key. Missing params cause stale cache bugs that are extremely hard to track down.

```ts
// List keys include all server-impacting params
const featureKeys = {
  list: (params: GetFeatureListParams) => ["features", "list", params] as const,
  detail: (id: string) => ["features", "detail", id] as const,
};
```

Use a `queryKey` factory object per feature — it documents the key structure and prevents typos.

### Query Hooks (Fetching Data)

```ts
// useGetFeatureList.ts
import { useQuery } from "@tanstack/react-query";
import { getFeatureList } from "../services/featureService";
import { featureKeys } from "./queryKeys";

export function useGetFeatureList(params: GetFeatureListParams) {
  return useQuery({
    queryKey: featureKeys.list(params),
    queryFn: () => getFeatureList(params),
    refetchOnWindowFocus: false,
  });
}

// useGetFeatureDetail.ts
export function useGetFeatureDetail(id: string) {
  return useQuery({
    queryKey: featureKeys.detail(id),
    queryFn: () => getFeatureDetail(id),
    enabled: !!id,  // don't fetch if no id yet
  });
}
```

The `enabled` option is essential for detail queries that depend on an id that may not be available on first render (e.g., waiting for a user to select a row). Without it, the query fires with `undefined` and either fails or returns wrong data.

Use `refetchOnWindowFocus: false` by default. Only opt in when the feature explicitly needs real-time refresh on tab switch.

### Mutation Hooks (Writing Data)

Mutations must invalidate only the relevant query keys. Over-invalidating (e.g., `queryClient.invalidateQueries()`) causes unnecessary refetches across the entire app.

```ts
// useCreateFeature.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFeature } from "../services/featureService";
import { featureKeys } from "./queryKeys";

export function useCreateFeature() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFeature,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["features", "list"] });
    },
  });
}

// useUpdateFeature.ts
export function useUpdateFeature() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateFeaturePayload> }) =>
      updateFeature(id, data),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["features", "list"] });
      await queryClient.invalidateQueries({ queryKey: featureKeys.detail(variables.id) });
    },
  });
}
```

After a create, invalidate the list. After an update, invalidate both the list and the specific detail. After a delete, invalidate the list. This precision keeps the cache fresh without wasting network requests.

## Layer 5: UI Consumption

UI components consume hooks only. They never import axios, never call service functions directly, and never construct query keys manually.

```tsx
function FeatureList() {
  const { data, isLoading, error } = useGetFeatureList({ page: 1 });

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorState error={error} />;
  if (!data.data.length) return <EmptyState />;

  return <List items={data.data} />;
}
```

Always handle all four states: **loading**, **error**, **empty**, and **success**. Missing any of these creates a broken UX for real users.

Keep UI logic to view-specific concerns — formatting, display mapping, interaction handlers. Data fetching and caching logic belongs in the hook layer.

## Naming Conventions

Consistent naming makes codebase navigation fast:

| Artifact | Pattern | Example |
|---|---|---|
| Service file | `<feature>Service.ts` | `featureService.ts` |
| Get list function | `get<FeaturePlural>` | `getFeatures` |
| Get detail function | `get<Feature>Detail` | `getFeatureDetail` |
| Create function | `create<Feature>` | `createFeature` |
| Update function | `update<Feature>` | `updateFeature` |
| Delete function | `delete<Feature>` | `deleteFeature` |
| Hook file (query) | `useGet<FeaturePlural>.ts` | `useGetFeatures.ts` |
| Hook file (detail) | `useGet<Feature>Detail.ts` | `useGetFeatureDetail.ts` |
| Hook file (create) | `useCreate<Feature>.ts` | `useCreateFeature.ts` |
| Hook file (update) | `useUpdate<Feature>.ts` | `useUpdateFeature.ts` |
| Types file | `<feature>.api.types.ts` | `feature.api.types.ts` |

## Error Handling Strategy

Two levels, each with a clear boundary:

**Global (interceptor level):** Handles cross-cutting concerns — 401 redirects to login, 403 shows forbidden page, 500 shows generic error. This lives in the API client setup file.

**Feature (hook level):** Hooks expose `error` state. UI components decide how to display it — inline message, toast, error boundary. Avoid duplicate handling: if the interceptor already shows a toast for a status code, don't add another one in the hook's `onError`.

## Anti-Patterns

These consistently cause bugs and should be avoided:

- **Defining API types in component or hook files.** Types drift from the actual contract and you get silent mismatches.
- **Multiple hooks in one file.** Makes code search harder, git diffs noisier, and code review slower.
- **Calling the HTTP client directly from UI.** Breaks the layer boundary — the UI now knows about transport details it shouldn't care about.
- **Omitting params from query keys.** The most common source of stale cache bugs. If a param affects the server response, it must be in the key.
- **Over-invalidating after mutations.** `invalidateQueries()` with no filter refetches everything. Be specific.
- **Fetching without `enabled` guard for detail queries.** Fires a request with `undefined` id on first render.

## PR Checklist

- [ ] HTTP client changes isolated to the client setup file
- [ ] API types in the shared types location, not in component/hook files
- [ ] Service functions in service files, no UI logic
- [ ] One hook per file
- [ ] Query keys include all server-impacting params
- [ ] Mutations invalidate only related keys
- [ ] Detail queries use `enabled` guard
- [ ] UI handles loading, error, empty, and success states
- [ ] No direct HTTP client usage in UI or hook files
