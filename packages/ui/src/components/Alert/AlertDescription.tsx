// AlertDescription.tsx
// UI: presentational
import { forwardRef } from 'react';
import { cn } from '../../utils';

export const AlertDescription = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('font-secondary text-para leading-relaxed', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
AlertDescription.displayName = 'Alert.Description';
