import { clsx } from "clsx";
import { forwardRef, HTMLAttributes } from "react";

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
 *
 * @example
 * <ButtonGroup>
 *   <Button variant="outline"><Button.Text>Left</Button.Text></Button>
 *   <Button variant="outline"><Button.Text>Center</Button.Text></Button>
 *   <Button variant="outline"><Button.Text>Right</Button.Text></Button>
 * </ButtonGroup>
 */
const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
    (
        {
            orientation = "horizontal",
            fullWidth = false,
            className,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                role="group"
                className={clsx(
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
                        "[&>*:hover]:z-10 [&>*:focus-visible]:z-10",
                    ],

                    // ── Vertical: join top/bottom borders ──
                    orientation === "vertical" && [
                        "[&>*:not(:first-child):not(:last-child)]:rounded-none",
                        "[&>*:first-child]:rounded-b-none",
                        "[&>*:last-child]:rounded-t-none",
                        "[&>*:not(:first-child)]:-mt-px",
                        "[&>*:hover]:z-10 [&>*:focus-visible]:z-10",
                    ],

                    // Full width children
                    fullWidth && "*:flex-1",

                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };
