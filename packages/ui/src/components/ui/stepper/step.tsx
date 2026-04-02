// step.tsx
// UI: individual step with connectors, layout, and keyboard handling

'use client';

import { Children, forwardRef, isValidElement, useCallback } from 'react';
import { clsx } from 'clsx';
import { useStepperContext, useStepIndexContext, getStatus } from './hooks';
import { StepIndicator } from './StepperIndicator';
import { StepStatusContext } from './hooks';
import type { StepProps } from './types';

export const Step = forwardRef<HTMLDivElement, StepProps>(
  ({ status: propStatus, className, children, onClick, onKeyDown, ...props }, ref) => {
    const { index, isFirst, isLast } = useStepIndexContext();
    const { activeStep, orientation, onStepClick, totalSteps } = useStepperContext();

    const status = getStatus(activeStep, index, propStatus);
    const isClickable = !!onStepClick;

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (onStepClick) onStepClick(index);
        onClick?.(e);
      },
      [onStepClick, index, onClick],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!isClickable) {
          onKeyDown?.(e);
          return;
        }

        const container = e.currentTarget.parentElement;
        const clickableSteps = container?.querySelectorAll('[role="listitem"][tabindex="0"]') || [];
        const currentIndex = Array.from(clickableSteps).indexOf(e.currentTarget);

        switch (e.key) {
          case 'Enter':
          case ' ':
            e.preventDefault();
            onStepClick(index);
            break;
          case 'ArrowLeft':
            if (orientation === 'horizontal' && currentIndex > 0) {
              e.preventDefault();
              (clickableSteps[currentIndex - 1] as HTMLElement)?.focus();
            }
            break;
          case 'ArrowRight':
            if (orientation === 'horizontal' && currentIndex < clickableSteps.length - 1) {
              e.preventDefault();
              (clickableSteps[currentIndex + 1] as HTMLElement)?.focus();
            }
            break;
          case 'ArrowUp':
            if (orientation === 'vertical' && currentIndex > 0) {
              e.preventDefault();
              (clickableSteps[currentIndex - 1] as HTMLElement)?.focus();
            }
            break;
          case 'ArrowDown':
            if (orientation === 'vertical' && currentIndex < clickableSteps.length - 1) {
              e.preventDefault();
              (clickableSteps[currentIndex + 1] as HTMLElement)?.focus();
            }
            break;
          case 'Home':
            e.preventDefault();
            (clickableSteps[0] as HTMLElement)?.focus();
            break;
          case 'End':
            e.preventDefault();
            (clickableSteps[clickableSteps.length - 1] as HTMLElement)?.focus();
            break;
        }
        onKeyDown?.(e);
      },
      [isClickable, onStepClick, index, orientation, onKeyDown],
    );

    // Connector color logic
    const isCompleted = status === 'completed' || status === 'active';
    const leftConnectorActive = index > 0 && activeStep >= index;
    const rightConnectorActive = isCompleted;

    const horizontalConnectorClasses = (isActive: boolean) =>
      clsx('h-0.5 flex-1 transition-colors duration-300', isActive ? 'bg-brand' : 'bg-border');

    const verticalConnectorClasses = clsx(
      'w-0.5 flex-1 min-h-[24px] transition-colors duration-300',
      isCompleted ? 'bg-brand' : 'bg-border',
    );

    return (
      <StepStatusContext.Provider value={{ status }}>
        <div
          ref={ref}
          role="listitem"
          className={clsx(
            'group relative',
            orientation === 'horizontal' && 'flex flex-col items-center flex-1 min-w-0',
            orientation === 'vertical' && 'flex flex-row',
            isClickable && 'cursor-pointer',
            className,
          )}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          tabIndex={isClickable ? 0 : -1}
          aria-current={status === 'active' ? 'step' : undefined}
          aria-posinset={index + 1}
          aria-setsize={totalSteps}
          {...props}
        >
          {/* Screen reader announcement */}
          <span className="sr-only">
            Step {index + 1} of {totalSteps}, {status}.
          </span>

          {orientation === 'horizontal' ? (
            <>
              <div className="flex items-center w-full mb-3">
                {isFirst ? (
                  <div className="flex-1" />
                ) : (
                  <div className={horizontalConnectorClasses(leftConnectorActive)} />
                )}

                <div className="relative z-10 shrink-0">
                  {Children.map(children, (child) =>
                    isValidElement(child) && child.type === StepIndicator ? child : null,
                  )}
                </div>

                {isLast ? (
                  <div className="flex-1" />
                ) : (
                  <div className={horizontalConnectorClasses(rightConnectorActive)} />
                )}
              </div>

              <div className="w-full">
                {Children.map(children, (child) =>
                  isValidElement(child) && child.type !== StepIndicator ? child : null,
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center shrink-0">
                {Children.map(children, (child) =>
                  isValidElement(child) && child.type === StepIndicator ? child : null,
                )}

                {!isLast && <div className={verticalConnectorClasses} />}
              </div>

              <div className="flex-1">
                {Children.map(children, (child) =>
                  isValidElement(child) && child.type !== StepIndicator ? child : null,
                )}
              </div>
            </>
          )}
        </div>
      </StepStatusContext.Provider>
    );
  },
);
Step.displayName = 'Stepper.Step';
