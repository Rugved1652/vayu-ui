import { Children, isValidElement, ReactElement, ReactNode } from "react";

// ============================================================================
// Show Component
// ============================================================================

/**
 * Conditionally renders children based on a `when` condition.
 * Optionally renders a `fallback` when the condition is falsy.
 *
 * @example
 * <Show when={isLoggedIn} fallback={<LoginForm />}>
 *   <Dashboard />
 * </Show>
 */
interface ShowProps<T> {
    when: T | undefined | null | false;
    fallback?: ReactNode;
    children: ReactNode | ((value: T) => ReactNode);
}

function Show<T>({ when, fallback = null, children }: ShowProps<T>): ReactNode {
    if (!when) return fallback;

    if (typeof children === "function") {
        return (children as (value: T) => ReactNode)(when);
    }

    return children;
}

// ============================================================================
// SwitchCase Component
// ============================================================================

/**
 * Renders the first `Case` whose `condition` is truthy.
 * If no case matches, renders `Default` if provided.
 *
 * @example
 * <Switch>
 *   <Case condition={status === "loading"}>
 *     <Spinner />
 *   </Case>
 *   <Case condition={status === "error"}>
 *     <ErrorMessage />
 *   </Case>
 *   <Default>
 *     <Content />
 *   </Default>
 * </Switch>
 */

interface CaseProps {
    condition: boolean;
    children: ReactNode;
}

/** A single case branch inside `<Switch>`. */
function Case({ children }: CaseProps): ReactElement {
    // Case never renders on its own — Switch reads its props.
    return <>{children}</>;
}

interface DefaultProps {
    children: ReactNode;
}

/** Fallback branch inside `<Switch>` when no `Case` matches. */
function Default({ children }: DefaultProps): ReactElement {
    return <>{children}</>;
}

interface SwitchProps {
    children: ReactNode;
}

/**
 * Evaluates `Case` children in order and renders the first match.
 * Falls back to `Default` if no case matches.
 */
function Switch({ children }: SwitchProps): ReactNode {
    const childArray = Children.toArray(children);

    // Find first matching Case
    for (const child of childArray) {
        if (
            isValidElement<CaseProps>(child) &&
            child.type === Case &&
            child.props.condition
        ) {
            return child.props.children;
        }
    }

    // Fall back to Default
    for (const child of childArray) {
        if (isValidElement<DefaultProps>(child) && child.type === Default) {
            return child.props.children;
        }
    }

    return null;
}

export { Show, Switch, Case, Default };
export type { ShowProps, CaseProps, DefaultProps, SwitchProps };
