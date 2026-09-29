// AlertContent.tsx
// UI: presentational
import { forwardRef } from 'react';
import { cn } from '../../utils';

export const AlertContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('min-w-0 flex-1', className)} {...props}>
        {children}
      </div>
    );
  },
);
AlertContent.displayName = 'Alert.Content';
