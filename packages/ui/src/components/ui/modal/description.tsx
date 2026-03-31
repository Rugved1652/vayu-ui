// description.tsx
// UI: presentational

"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "../utils";
import { useModal } from "./modal";

const ModalDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { descriptionId } = useModal();
  return (
    <p
      id={descriptionId}
      ref={ref}
      className={cn(
        "text-sm font-secondary text-muted-content mt-1",
        className
      )}
      {...props}
    />
  );
});
ModalDescription.displayName = "Modal.Description";

export { ModalDescription };
