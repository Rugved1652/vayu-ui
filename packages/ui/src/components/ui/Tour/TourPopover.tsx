// popover.tsx
// UI: dialog with arrow, header, body, progress bar, footer

'use client';

import { clsx } from 'clsx';
import { Check, ChevronLeft, ChevronRight, SkipForward, Target, X } from 'lucide-react';
import React from 'react';
import type { TourStep } from './types';

interface TourPopoverProps {
  popoverRef: React.RefObject<HTMLDivElement | null>;
  popoverPosition: { top: number; left: number };
  step: TourStep;
  placement: 'top' | 'bottom' | 'left' | 'right' | 'center';
  currentStep: number;
  stepsLength: number;
  isTransitioning: boolean;
  isFirst: boolean;
  isLast: boolean;
  showProgress: boolean;
  showStepNumbers: boolean;
  dialogLabelId: string;
  onClose: () => void;
  onSkip: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const TourPopover: React.FC<TourPopoverProps> = ({
  popoverRef,
  popoverPosition,
  step,
  placement,
  currentStep,
  stepsLength,
  isTransitioning,
  isFirst,
  isLast,
  showProgress,
  showStepNumbers,
  dialogLabelId,
  onClose,
  onSkip,
  onNext,
  onPrev,
}) => {
  // Arrow CSS per placement
  const arrowStyles: Record<string, React.CSSProperties> = {
    bottom: {
      top: '-10px',
      left: '50%',
      transform: 'translateX(-50%) rotate(45deg)',
      borderBottom: 'none',
      borderRight: 'none',
    },
    top: {
      bottom: '-10px',
      left: '50%',
      transform: 'translateX(-50%) rotate(45deg)',
      borderTop: 'none',
      borderLeft: 'none',
    },
    left: {
      right: '-10px',
      top: '50%',
      transform: 'translateY(-50%) rotate(45deg)',
      borderLeft: 'none',
      borderBottom: 'none',
    },
    right: {
      left: '-10px',
      top: '50%',
      transform: 'translateY(-50%) rotate(45deg)',
      borderRight: 'none',
      borderTop: 'none',
    },
  };

  return (
    <div
      ref={popoverRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={dialogLabelId}
      className={clsx(
        'absolute bg-elevated rounded-overlay shadow-elevated',
        'border-2 border-border max-w-md w-full',
        'animate-in fade-in zoom-in-95 duration-300 transition-opacity',
        isTransitioning ? 'opacity-0' : 'opacity-100',
      )}
      style={{
        top: `${popoverPosition.top}px`,
        left: `${popoverPosition.left}px`,
        pointerEvents: 'auto',
      }}
    >
      {/* Arrow */}
      {placement !== 'center' && arrowStyles[placement] && (
        <div
          className="absolute w-4 h-4 bg-elevated border-2 border-border rotate-45"
          style={arrowStyles[placement]}
          aria-hidden="true"
        />
      )}

      {/* Header */}
      <div className="flex items-start justify-between p-6 pb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {showStepNumbers && (
              <span className="px-2 py-0.5 bg-brand/10 text-brand rounded-control text-xs font-secondary font-bold">
                {currentStep + 1} / {stepsLength}
              </span>
            )}
            <Target className="w-5 h-5 text-brand" aria-hidden="true" />
          </div>
          <h3 id={dialogLabelId} className="text-xl font-primary font-bold text-elevated-content">
            {step.title}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 p-1 rounded-control hover:bg-muted transition-colors text-muted-content"
          aria-label="Close tour"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      {/* Body */}
      <div className="px-6 pb-4">
        {typeof step.content === 'string' ? (
          <p className="font-secondary text-elevated-content/80 leading-relaxed">{step.content}</p>
        ) : (
          step.content
        )}
      </div>

      {/* Progress bar */}
      {showProgress && (
        <div
          className="px-6 pb-4"
          role="progressbar"
          aria-valuenow={currentStep + 1}
          aria-valuemin={1}
          aria-valuemax={stepsLength}
          aria-label={`Tour progress: step ${currentStep + 1} of ${stepsLength}`}
        >
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-brand to-brand/80 transition-all duration-300"
              style={{
                width: `${((currentStep + 1) / stepsLength) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between p-6 pt-0 border-t-2 border-border mt-4">
        <div className="flex items-center gap-2">
          {step.showSkip !== false && !isLast && (
            <button
              onClick={onSkip}
              className="px-3 py-1.5 text-sm font-secondary font-medium text-muted-content hover:text-elevated-content transition-colors flex items-center gap-1"
              aria-label="Skip tour"
            >
              <SkipForward className="w-4 h-4" aria-hidden="true" />
              Skip Tour
            </button>
          )}
        </div>

        {step.customButtons || (
          <div className="flex items-center gap-2">
            {!isFirst && (
              <button
                onClick={onPrev}
                className="px-4 py-2 bg-muted text-elevated-content rounded-control hover:bg-muted/80 font-secondary font-medium transition-colors flex items-center gap-1"
                aria-label={step.prevButtonText ?? 'Previous step'}
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                {step.prevButtonText ?? 'Previous'}
              </button>
            )}
            <button
              onClick={onNext}
              className="px-4 py-2 bg-brand text-brand-content rounded-control hover:bg-brand/90 font-secondary font-medium transition-colors flex items-center gap-1"
              aria-label={isLast ? 'Finish tour' : (step.nextButtonText ?? 'Next step')}
            >
              {isLast ? (
                <>
                  <Check className="w-4 h-4" aria-hidden="true" />
                  Finish
                </>
              ) : (
                <>
                  {step.nextButtonText ?? 'Next'}
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export { TourPopover };
