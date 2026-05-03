---
name: rhf-zod-form-validation
description: >
  Enforces strict implementation patterns for forms built with React Hook Form, Zod schemas,
  and TanStack Query mutations. Apply this skill whenever you encounter any of the following:
  building or refactoring form components (modals, pages, dialogs), creating or editing Zod
  validation schemas, wiring up react-hook-form with zodResolver, writing submit handlers
  that call POST/PUT/PATCH endpoints, implementing mutation hooks for API writes, mapping
  form data to API payloads, setting up query invalidation after writes, adding toast/error
  feedback for form submissions, or handling edit-mode prefill behavior.
  Also trigger when the user mentions "form validation", "RHF", "react-hook-form", "zod schema",
  "form submission", "mutation", "form POST", "form modal", "create form", "edit form",
  "add form", or asks about form best practices in a React context.
  Do NOT trigger for simple form layout/UI questions that don't involve validation or submission logic.
---

# React Hook Form + Zod Validation Patterns

This skill defines the canonical patterns for building validated, mutation-backed forms. The goal is consistency across every form in the codebase — every form validates the same way, submits the same way, and handles success/error the same way. This makes forms predictable, testable, and easy to review.

## When This Applies

Use these patterns for any form component that:
- Uses `react-hook-form` for state management
- Uses `zod` + `@hookform/resolvers/zod` for validation
- Submits data via TanStack Query mutations (POST/PUT/PATCH)
- Lives in a modal, page, drawer, or dialog

If a form only does client-side filtering or doesn't submit to an API, most of these patterns still apply (schema, resolver, controlled inputs) — just skip the mutation sections.

## Core Principles

**Schema is the single source of truth.** Every validation rule lives in the Zod schema. There are no ad-hoc `required` props, no manual `if (!value)` checks in submit handlers, no duplicate TypeScript interfaces that drift from the actual validation. If it needs validating, it goes in the schema.

**Form type is always inferred, never handwritten.** Using `z.infer<typeof schema>` means the form type can never disagree with the validation rules. If the schema changes, the type changes automatically.

**UI state never reaches the API raw.** The form manages its own model. Before calling the mutation, map form values to the exact API contract — trim strings, convert dates, pick only the fields the endpoint expects. This separation prevents coupling UI concerns to backend contracts.

## Implementation Steps

### 1. Define Schema + Infer Type

Place the schema near the form component. If multiple forms share the same shape, extract to a shared file.

```ts
const formSchema = z.object({
  name: z.string({ message: "Name is required." })
    .min(1, { message: "Name is required." }),
  email: z.string({ message: "Email is required." })
    .email({ message: "Enter a valid email address." }),
  role: z.nativeEnum(Role, { message: "Please select a role." }),
});

type FormData = z.infer<typeof formSchema>;
```

Every required field must have a user-facing error message. This is what users see in the UI — make it specific and helpful. For optional fields, use `.optional()` or `.default(...)` explicitly so intent is clear.

For arrays (e.g., a list of tags):
```ts
tags: z.array(z.string().min(1, { message: "Tag cannot be empty." }))
  .min(1, { message: "Add at least one tag." }),
```

For conditional fields (e.g., required only when another field has a certain value):
```ts
z.object({
  type: z.enum(["email", "sms"]),
  phoneNumber: z.string().optional(),
}).refine(
  (data) => data.type !== "sms" || data.phoneNumber?.length > 0,
  { message: "Phone number is required for SMS.", path: ["phoneNumber"] }
);
```

### 2. Set Up useForm

Always pass `resolver: zodResolver(schema)` and explicit `defaultValues` for every field. Missing defaults cause uncontrolled/controlled component warnings and make edit-mode prefill unreliable.

```ts
const {
  handleSubmit,
  control,
  reset,
  formState: { errors, isSubmitting },
} = useForm<FormData>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    name: "",
    email: "",
    role: undefined,
  },
});
```

For select/enum fields, initialize intentionally — `undefined` for "nothing selected" or a specific default value. Avoid `null` unless the API contract expects it.

### 3. Wire Up Controlled Inputs

Use `Controller` from react-hook-form for any custom UI component (selects, date pickers, toggles, radio groups). For native inputs (`<input>`, `<textarea>`), `register` is fine.

```tsx
<Controller
  name="role"
  control={control}
  render={({ field }) => (
    <SelectComponent
      value={field.value}
      onValueChange={field.onChange}
      onBlur={field.onBlur}
    />
  )}
/>
```

Always surface validation errors. Each field should display its error state from `formState.errors.fieldName?.message`. Hiding validation errors from the user defeats the purpose of having a schema.

When `isPending` (from mutation) is true, disable or visually guard all inputs and the submit button to prevent duplicate submissions.

### 4. Define the Mutation

Create a mutation hook that handles success and error consistently.

```ts
const { mutate, isPending } = useCreateEntity({
  onSuccess: async () => {
    onClose?.();              // close modal/drawer if applicable
    reset();                  // clear form state
    await queryClient.invalidateQueries({ queryKey: ["entities"] });
    toast.success("Entity created successfully!");
  },
  onError: (error) => {
    const message = error instanceof Error && error.message
      ? error.message
      : "Something went wrong. Please try again.";
    toast.error(message);
  },
});
```

The success path must:
1. Close the form container (if it's a modal/drawer)
2. Reset the form via `reset()`
3. Invalidate affected query keys so the list/table refreshes
4. Show a success toast with a specific message ("created" vs "updated")

The error path shows the server message if it's present and trustworthy, otherwise falls back to a generic message.

### 5. Submit Handler

Wrap the form's `onSubmit` with `handleSubmit` — this is what triggers Zod validation before your handler runs. If validation fails, your handler never executes.

```ts
const onSubmit = (data: FormData) => {
  const payload = {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    role: data.role,
  };
  mutate(payload);
};

<form onSubmit={handleSubmit(onSubmit)}>
```

Map form data to the API payload explicitly inside `onSubmit`. This is where you trim whitespace, normalize casing, pick only the fields the endpoint expects, and convert types. Never pass `data` directly to `mutate` unless the form model is already identical to the API contract.

### 6. Edit Mode Prefill

When the form opens in edit mode (e.g., editing an existing entity), prefill values from the existing data. Use `reset()` inside a guarded effect — this ensures the form re-initializes when the data or open state changes.

```ts
useEffect(() => {
  if (open && initialData) {
    reset({
      name: initialData.name,
      email: initialData.email,
      role: initialData.role,
    });
  }
}, [open, initialData, reset]);
```

Always guard with the open state (for modals) or a data-loaded check. Without the guard, `reset` fires on every render and wipes user input.

For data that needs to be fetched before the form opens (e.g., fetching entity details for edit), use a query hook with `enabled` to conditionally fetch:

```ts
const { data } = useEntityById(entityId, {
  enabled: open && !!entityId,
});
```

## Reference Implementation

Here's the complete pattern as a single cohesive example:

```tsx
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  name: z.string({ message: "Name is required." }).min(1, { message: "Name is required." }),
  email: z.string({ message: "Email is required." }).email({ message: "Enter a valid email." }),
  role: z.nativeEnum(Role, { message: "Please select a role." }),
});

type FormData = z.infer<typeof formSchema>;

function EntityForm({ open, onClose, initialData, entityId }: EntityFormProps) {
  const queryClient = useQueryClient();
  const isEdit = !!entityId;

  const { handleSubmit, control, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", role: undefined },
  });

  // Prefill for edit mode
  useEffect(() => {
    if (open && initialData) {
      reset({ name: initialData.name, email: initialData.email, role: initialData.role });
    }
  }, [open, initialData, reset]);

  const { mutate, isPending } = isEdit ? useUpdateEntity() : useCreateEntity({
    onSuccess: async () => {
      onClose();
      reset();
      await queryClient.invalidateQueries({ queryKey: ["entities"] });
      toast.success(isEdit ? "Updated successfully!" : "Created successfully!");
    },
    onError: () => toast.error("Something went wrong. Please try again."),
  });

  const onSubmit = (data: FormData) => {
    const payload = { name: data.name.trim(), email: data.email.trim().toLowerCase(), role: data.role };
    mutate(isEdit ? { id: entityId, ...payload } : payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller name="name" control={control} render={({ field }) => (
        <Input {...field} errorText={errors.name?.message} disabled={isPending} />
      )} />
      {/* ... other fields */}
      <button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : isEdit ? "Update" : "Create"}
      </button>
    </form>
  );
}
```

## Scope Guardrails

- Use `react-hook-form` exclusively — don't introduce Formik, final-form, or other form libraries.
- Use `zod` for all validation — no ad-hoc `validate` functions or manual checks bypassing the schema.
- Always invalidate relevant queries after write operations — stale data in the UI is a bug.
- Always display validation errors to the user — silent failures are not acceptable.
- Keep the mutation's `onSuccess` and `onError` handlers consistent across all forms in the codebase.

## PR Checklist

Use this checklist when reviewing form code:

- [ ] Zod schema exists and is the single source of validation truth
- [ ] Form type inferred via `z.infer`, not a handwritten duplicate
- [ ] `zodResolver` wired into `useForm`
- [ ] All required fields have user-facing error messages
- [ ] `defaultValues` explicit for every field
- [ ] Submit uses `handleSubmit` wrapper
- [ ] API payload explicitly mapped from form model
- [ ] `isPending` disables submit button and inputs
- [ ] Success path: closes modal, resets form, invalidates queries, shows toast
- [ ] Error path: shows toast with server message or fallback
- [ ] Edit mode: prefill via `reset()` in guarded effect
- [ ] Query hooks use `enabled` when state-dependent
