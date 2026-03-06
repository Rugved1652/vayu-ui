"use client";
import { clsx } from "clsx";
import { forwardRef, HTMLAttributes, createContext, useContext } from "react";

// ============================================================================
// Types
// ============================================================================

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
    /** Stack buttons vertically instead of horizontally. */
    orientation?: "horizontal" | "vertical";
    /** Apply the same size to all child buttons via CSS scoping. */
    size?: "small" | "medium" | "large";
    /** Make the group span the full width of its container. */
    fullWidth?: boolean;
    /** Accessible label for the button group. */
    "aria-label"?: string;
    /** ID of an element that labels this button group. */
    "aria-labelledby"?: string;
}

export interface ButtonGroupRootProps extends ButtonGroupProps {}

// ============================================================================
// Context
// ============================================================================

interface ButtonGroupContextValue {
    orientation: "horizontal" | "vertical";
    size: "small" | "medium" | "large";
    fullWidth: boolean;
}

const ButtonGroupContext = createContext<ButtonGroupContextValue | null>(null);

/**
 * Hook to access ButtonGroup context from child components.
 */
function useButtonGroup(): ButtonGroupContextValue | null {
    return useContext(ButtonGroupContext);
}

// ============================================================================
// Component
// ============================================================================

/**
 * Groups multiple `<Button>` elements together with connected styling.
 *
 * - Joins borders between siblings (no double-borders).
 * - Rounds only the outer edges of the first and last child.
 * - Supports horizontal (default) and vertical orientation.
 * - Provides context for child buttons to inherit size and orientation.
 *
 * @example
 * <ButtonGroup.Root aria-label="Text alignment options">
 *   <Button variant="outline"><Button.Text>Left</Button.Text></Button>
 *   <Button variant="outline"><Button.Text>Center</Button.Text></Button>
 *   <Button variant="outline"><Button.Text>Right</Button.Text></Button>
 * </ButtonGroup.Root>
 *
 * @example
 * // Vertical orientation
 * <ButtonGroup.Root orientation="vertical" aria-label="Actions">
 *   <Button variant="outline"><Button.Text>Edit</Button.Text></Button>
 *   <Button variant="outline"><Button.Text>Delete</Button.Text></Button>
 * </ButtonGroup.Root>
 */
const ButtonGroupRoot = forwardRef<HTMLDivElement, ButtonGroupRootProps>(
    (
        {
            orientation = "horizontal",
            size = "medium",
            fullWidth = false,
            className,
            children,
            "aria-label": ariaLabel,
            "aria-labelledby": ariaLabelledby,
            ...props
        },
        ref
    ) => {
        const contextValue: ButtonGroupContextValue = {
            orientation,
            size,
            fullWidth,
        };

        return (
            <ButtonGroupContext.Provider value={contextValue}>
                <div
                    ref={ref}
                    role="group"
                    aria-label={ariaLabel}
                    aria-labelledby={ariaLabelledby}
                    className={clsx(
                        // Base layout
                        "inline-flex",
                        orientation === "vertical" ? "flex-col" : "flex-row",
                        fullWidth && "w-full",

                        // ── Horizontal: join left/right borders ──
                        orientation === "horizontal" && [
                            // Remove inner border-radius
                            "[&>*:not(:first-child):not(:last-child)]:rounded-none",
                            "[&>*:first-child]:rounded-r-none",
                            "[&>*:last-child]:rounded-l-none",
                            // Collapse duplicate borders
                            "[&>*:not(:first-child)]:-ml-px",
                            // Raise focused/hovered item above siblings
                            "[&>*:hover]:z-10",
                            "[&>*:focus-visible]:z-10",
                            "[&>*:focus-visible]:ring-2",
                            "[&>*:focus-visible]:ring-primary-500",
                            "[&>*:focus-visible]:ring-offset-1",
                        ],

                        // ── Vertical: join top/bottom borders ──
                        orientation === "vertical" && [
                            "[&>*:not(:first-child):not(:last-child)]:rounded-none",
                            "[&>*:first-child]:rounded-b-none",
                            "[&>*:last-child]:rounded-t-none",
                            "[&>*:not(:first-child)]:-mt-px",
                            "[&>*:hover]:z-10",
                            "[&>*:focus-visible]:z-10",
                            "[&>*:focus-visible]:ring-2",
                            "[&>*:focus-visible]:ring-primary-500",
                            "[&>*:focus-visible]:ring-offset-1",
                        ],

                        // Full width children
                        fullWidth && "*:flex-1",

                        className
                    )}
                    {...props}
                >
                    {children}
                </div>
            </ButtonGroupContext.Provider>
        );
    }
);

ButtonGroupRoot.displayName = "ButtonGroup.Root";

// ============================================================================
// Exports
// ============================================================================

/**
 * ButtonGroup component namespace following the compound component pattern.
 *
 * @example
 * import { ButtonGroup } from "vayu-ui";
 *
 * <ButtonGroup.Root aria-label="Actions">
 *   <Button><Button.Text>Save</Button.Text></Button>
 *   <Button><Button.Text>Cancel</Button.Text></Button>
 * </ButtonGroup.Root>
 */
export const ButtonGroup = {
    Root: ButtonGroupRoot,
};

export { useButtonGroup };