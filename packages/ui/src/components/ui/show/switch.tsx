// switch.tsx
// Composition: Switch + Case + Default

import { Children, isValidElement, ReactElement, ReactNode } from "react";
import type { CaseProps, DefaultProps, SwitchProps } from "./types";

/** A single case branch inside `<Switch>`. */
function Case({ children }: CaseProps): ReactElement {
    return <>{children}</>;
}

/** Fallback branch inside `<Switch>` when no `Case` matches. */
function Default({ children }: DefaultProps): ReactElement {
    return <>{children}</>;
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

export { Switch, Case, Default };
