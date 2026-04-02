// columns.tsx
// UI: TimeColumn, HourColumn, MinuteColumn, PeriodColumn, TimeGrid

'use client';

import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { clsx } from 'clsx';
import { useTimepicker } from './TimePicker';
import type { TimeValue, TimeRange, TimeColumnProps } from './types';
import { convertTo12Hour, convertTo24Hour, isTimeDisabled } from './utils';

// ============================================================================
// Column Navigation Helper
// ============================================================================

function focusAdjacentColumn(currentListbox: HTMLElement, direction: 'next' | 'prev'): boolean {
  const contentContainer = currentListbox.closest('[role="dialog"]');
  if (!contentContainer) return false;

  const columns = Array.from(
    contentContainer.querySelectorAll('[data-timepicker-column]'),
  ) as HTMLElement[];

  const currentIndex = columns.indexOf(currentListbox);
  if (currentIndex === -1) return false;

  const targetIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
  if (targetIndex < 0 || targetIndex >= columns.length) return false;

  const targetColumn = columns[targetIndex];
  const targetItem = (targetColumn.querySelector(
    '[role="option"][aria-selected="true"]:not([data-disabled="true"])',
  ) ||
    targetColumn.querySelector(
      '[role="option"]:not([data-disabled="true"])',
    )) as HTMLElement | null;

  if (targetItem) {
    targetItem.focus();
    targetItem.scrollIntoView({ block: 'nearest' });
    return true;
  }
  return false;
}

// ============================================================================
// Time Column Wrapper (internal)
// ============================================================================

const TimeColumn: React.FC<TimeColumnProps> = ({ label, children, className }) => {
  const listboxRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const listbox = listboxRef.current;
    if (!listbox) return;

    const items = Array.from(
      listbox.querySelectorAll('[role="option"]:not([data-disabled="true"])'),
    ) as HTMLElement[];

    if (items.length === 0) return;

    const currentIndex = items.findIndex((item) => item === document.activeElement);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
      items[nextIndex]?.focus();
      items[nextIndex]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
      items[prevIndex]?.focus();
      items[prevIndex]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      focusAdjacentColumn(listbox, 'next');
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      focusAdjacentColumn(listbox, 'prev');
    } else if (e.key === 'Home') {
      e.preventDefault();
      items[0]?.focus();
      items[0]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'End') {
      e.preventDefault();
      items[items.length - 1]?.focus();
      items[items.length - 1]?.scrollIntoView({ block: 'nearest' });
    }
  }, []);

  return (
    <div className={clsx('flex flex-col items-center', className)}>
      <span className="text-xs font-medium text-muted-content mb-1">{label}</span>
      <div
        ref={listboxRef}
        role="listbox"
        aria-label={label}
        data-timepicker-column
        onKeyDown={handleKeyDown}
        className="relative h-48 overflow-y-auto custom-scrollbar rounded-control border border-border bg-surface"
      >
        {children}
      </div>
    </div>
  );
};

// ============================================================================
// Hour Column
// ============================================================================

const HourColumn: React.FC<{ className?: string }> = ({ className }) => {
  const {
    format,
    tempValue,
    setTempValue,
    mode,
    rangePhase,
    disabledHours,
    minTime,
    maxTime,
    disabledTimes,
    minuteStep,
    showApplyButton,
    onValueChange,
  } = useTimepicker();

  const selectedItemRef = useRef<HTMLDivElement>(null);

  const hours = useMemo(() => {
    if (format === '12h') {
      return Array.from({ length: 12 }, (_, i) => i + 1);
    }
    return Array.from({ length: 24 }, (_, i) => i);
  }, [format]);

  const getCurrentHour = (): number => {
    if (!tempValue) return format === '12h' ? 12 : 0;

    if (mode === 'range') {
      const range = tempValue as TimeRange;
      const time = rangePhase === 'start' ? range.start : range.end;
      if (!time) return format === '12h' ? 12 : 0;
      return format === '12h' ? convertTo12Hour(time.hour) : time.hour;
    }

    const time = tempValue as TimeValue;
    return format === '12h' ? convertTo12Hour(time.hour) : time.hour;
  };

  const getCurrentPeriod = (): 'AM' | 'PM' => {
    if (!tempValue) return 'AM';

    if (mode === 'range') {
      const range = tempValue as TimeRange;
      const time = rangePhase === 'start' ? range.start : range.end;
      if (!time) return 'AM';
      return time.hour >= 12 ? 'PM' : 'AM';
    }

    const time = tempValue as TimeValue;
    return time.hour >= 12 ? 'PM' : 'AM';
  };

  const isHourDisabled = (displayHour: number): boolean => {
    let hour24: number;
    if (format === '12h') {
      hour24 = convertTo24Hour(displayHour, getCurrentPeriod());
    } else {
      hour24 = displayHour;
    }

    if (disabledHours?.includes(hour24)) return true;

    const currentTime = getCurrentMinute();
    if (minTime || maxTime) {
      const testTime: TimeValue = { hour: hour24, minute: currentTime };
      if (isTimeDisabled(testTime, { minTime, maxTime, disabledTimes: [], disabledHours: [] })) {
        const allMinutesDisabled = Array.from({ length: 60 }, (_, m) => m)
          .filter((m) => m % minuteStep === 0)
          .every((m) => {
            const time: TimeValue = { hour: hour24, minute: m };
            return isTimeDisabled(time, { minTime, maxTime });
          });
        if (allMinutesDisabled) return true;
      }
    }

    return false;
  };

  const getCurrentMinute = (): number => {
    if (!tempValue) return 0;

    if (mode === 'range') {
      const range = tempValue as TimeRange;
      const time = rangePhase === 'start' ? range.start : range.end;
      return time?.minute ?? 0;
    }

    return (tempValue as TimeValue).minute;
  };

  const handleHourSelect = (displayHour: number) => {
    if (isHourDisabled(displayHour)) return;

    let hour24: number;
    if (format === '12h') {
      hour24 = convertTo24Hour(displayHour, getCurrentPeriod());
    } else {
      hour24 = displayHour;
    }

    const minute = getCurrentMinute();

    if (mode === 'range') {
      const range = tempValue as TimeRange;
      const newRange: TimeRange = { ...range };
      if (rangePhase === 'start') {
        newRange.start = { hour: hour24, minute };
      } else {
        newRange.end = { hour: hour24, minute };
      }
      setTempValue(newRange);
      if (!showApplyButton) onValueChange(newRange);
    } else {
      const newTime = { hour: hour24, minute };
      setTempValue(newTime);
      if (!showApplyButton) onValueChange(newTime);
    }
  };

  const currentHour = getCurrentHour();

  useEffect(() => {
    if (selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [currentHour, rangePhase]);

  return (
    <TimeColumn label="Hour" className={className}>
      <div className="py-1">
        {hours.map((hour) => {
          const isSelected = hour === currentHour;
          const isDisabled = isHourDisabled(hour);

          return (
            <div
              key={hour}
              ref={isSelected ? selectedItemRef : undefined}
              role="option"
              tabIndex={isDisabled ? -1 : 0}
              aria-selected={isSelected}
              aria-disabled={isDisabled}
              data-disabled={isDisabled}
              onClick={() => handleHourSelect(hour)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleHourSelect(hour);
                  const listbox = (e.target as HTMLElement).closest(
                    '[data-timepicker-column]',
                  ) as HTMLElement | null;
                  if (listbox) {
                    requestAnimationFrame(() => focusAdjacentColumn(listbox, 'next'));
                  }
                }
              }}
              className={clsx(
                'flex items-center justify-center px-3 py-1.5 text-sm cursor-default select-none transition-colors',
                isSelected
                  ? 'bg-brand text-brand-content font-medium'
                  : 'text-elevated-content hover:bg-brand/90 hover:text-brand-content focus:bg-brand/90 focus:text-brand-content',
                isDisabled && 'opacity-50 pointer-events-none',
              )}
            >
              {hour.toString().padStart(2, '0')}
            </div>
          );
        })}
      </div>
    </TimeColumn>
  );
};

HourColumn.displayName = 'Timepicker.HourColumn';

// ============================================================================
// Minute Column
// ============================================================================

const MinuteColumn: React.FC<{ className?: string }> = ({ className }) => {
  const {
    tempValue,
    setTempValue,
    mode,
    rangePhase,
    minuteStep,
    disabledHours,
    minTime,
    maxTime,
    disabledTimes,
    showApplyButton,
    setOpen,
    onValueChange,
  } = useTimepicker();

  const selectedItemRef = useRef<HTMLDivElement>(null);

  const minutes = useMemo(() => {
    return Array.from({ length: 60 / minuteStep }, (_, i) => i * minuteStep);
  }, [minuteStep]);

  const getCurrentHour = (): number => {
    if (!tempValue) return 0;

    if (mode === 'range') {
      const range = tempValue as TimeRange;
      const time = rangePhase === 'start' ? range.start : range.end;
      return time?.hour ?? 0;
    }

    return (tempValue as TimeValue).hour;
  };

  const getCurrentMinute = (): number => {
    if (!tempValue) return 0;

    if (mode === 'range') {
      const range = tempValue as TimeRange;
      const time = rangePhase === 'start' ? range.start : range.end;
      return time?.minute ?? 0;
    }

    return (tempValue as TimeValue).minute;
  };

  const isMinuteDisabled = (minute: number): boolean => {
    const hour = getCurrentHour();
    const time: TimeValue = { hour, minute };
    return isTimeDisabled(time, { minTime, maxTime, disabledTimes, disabledHours });
  };

  const handleMinuteSelect = (minute: number) => {
    if (isMinuteDisabled(minute)) return;

    const hour = getCurrentHour();

    if (mode === 'range') {
      const range = tempValue as TimeRange;
      const newRange: TimeRange = { ...range };
      if (rangePhase === 'start') {
        newRange.start = { hour, minute };
      } else {
        newRange.end = { hour, minute };
      }
      setTempValue(newRange);
      if (!showApplyButton) onValueChange(newRange);
    } else {
      const newTime = { hour, minute };
      setTempValue(newTime);
      if (!showApplyButton) onValueChange(newTime);
    }
  };

  const currentMinute = getCurrentMinute();

  useEffect(() => {
    if (selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [currentMinute, rangePhase]);

  return (
    <TimeColumn label="Minute" className={className}>
      <div className="py-1">
        {minutes.map((minute) => {
          const isSelected = minute === currentMinute;
          const isDisabled = isMinuteDisabled(minute);

          return (
            <div
              key={minute}
              ref={isSelected ? selectedItemRef : undefined}
              role="option"
              tabIndex={isDisabled ? -1 : 0}
              aria-selected={isSelected}
              aria-disabled={isDisabled}
              data-disabled={isDisabled}
              onClick={() => handleMinuteSelect(minute)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleMinuteSelect(minute);
                  const listbox = (e.target as HTMLElement).closest(
                    '[data-timepicker-column]',
                  ) as HTMLElement | null;
                  if (listbox) {
                    const advanced = focusAdjacentColumn(listbox, 'next');
                    if (!advanced && !showApplyButton && mode === 'single') {
                      const hour = getCurrentHour();
                      onValueChange({ hour, minute });
                      setOpen(false);
                    }
                  }
                }
              }}
              className={clsx(
                'flex items-center justify-center px-3 py-1.5 text-sm cursor-default select-none transition-colors',
                isSelected
                  ? 'bg-brand text-brand-content font-medium'
                  : 'text-elevated-content hover:bg-brand/90 hover:text-brand-content focus:bg-brand/90 focus:text-brand-content',
                isDisabled && 'opacity-50 pointer-events-none',
              )}
            >
              {minute.toString().padStart(2, '0')}
            </div>
          );
        })}
      </div>
    </TimeColumn>
  );
};

MinuteColumn.displayName = 'Timepicker.MinuteColumn';

// ============================================================================
// Period Column (AM/PM)
// ============================================================================

const PeriodColumn: React.FC<{ className?: string }> = ({ className }) => {
  const {
    format,
    tempValue,
    setTempValue,
    mode,
    rangePhase,
    showApplyButton,
    setOpen,
    onValueChange,
  } = useTimepicker();

  if (format === '24h') return null;

  const getCurrentHour = (): number => {
    if (!tempValue) return 0;

    if (mode === 'range') {
      const range = tempValue as TimeRange;
      const time = rangePhase === 'start' ? range.start : range.end;
      return time?.hour ?? 0;
    }

    return (tempValue as TimeValue).hour;
  };

  const getCurrentMinute = (): number => {
    if (!tempValue) return 0;

    if (mode === 'range') {
      const range = tempValue as TimeRange;
      const time = rangePhase === 'start' ? range.start : range.end;
      return time?.minute ?? 0;
    }

    return (tempValue as TimeValue).minute;
  };

  const getCurrentPeriod = (): 'AM' | 'PM' => {
    const hour = getCurrentHour();
    return hour >= 12 ? 'PM' : 'AM';
  };

  const handlePeriodSelect = (period: 'AM' | 'PM') => {
    const currentHour = getCurrentHour();
    const currentMinute = getCurrentMinute();
    const displayHour12 = convertTo12Hour(currentHour);
    const newHour24 = convertTo24Hour(displayHour12, period);

    if (mode === 'range') {
      const range = tempValue as TimeRange;
      const newRange: TimeRange = { ...range };
      if (rangePhase === 'start') {
        newRange.start = { hour: newHour24, minute: currentMinute };
      } else {
        newRange.end = { hour: newHour24, minute: currentMinute };
      }
      setTempValue(newRange);
      if (!showApplyButton) onValueChange(newRange);
    } else {
      const newTime = { hour: newHour24, minute: currentMinute };
      setTempValue(newTime);
      if (!showApplyButton) onValueChange(newTime);
    }
  };

  const currentPeriod = getCurrentPeriod();

  return (
    <TimeColumn label="Period" className={className}>
      <div className="py-1">
        {(['AM', 'PM'] as const).map((period) => {
          const isSelected = period === currentPeriod;

          return (
            <div
              key={period}
              role="option"
              tabIndex={0}
              aria-selected={isSelected}
              onClick={() => handlePeriodSelect(period)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePeriodSelect(period);
                  if (!showApplyButton && mode === 'single') {
                    const currentHour = getCurrentHour();
                    const currentMinute = getCurrentMinute();
                    const displayHour12 = convertTo12Hour(currentHour);
                    const newHour24 = convertTo24Hour(displayHour12, period);
                    onValueChange({ hour: newHour24, minute: currentMinute });
                    setOpen(false);
                  }
                }
              }}
              className={clsx(
                'flex items-center justify-center px-3 py-2 text-sm cursor-default select-none transition-colors',
                isSelected
                  ? 'bg-brand text-brand-content font-medium'
                  : 'text-elevated-content hover:bg-brand/90 hover:text-brand-content focus:bg-brand/90 focus:text-brand-content',
              )}
            >
              {period}
            </div>
          );
        })}
      </div>
    </TimeColumn>
  );
};

PeriodColumn.displayName = 'Timepicker.PeriodColumn';

// ============================================================================
// Time Grid (Combined columns layout)
// ============================================================================

const TimeGrid: React.FC<{ className?: string }> = ({ className }) => {
  const { format } = useTimepicker();

  return (
    <div className={clsx('flex gap-2', className)}>
      <HourColumn />
      <MinuteColumn />
      {format === '12h' && <PeriodColumn />}
    </div>
  );
};

TimeGrid.displayName = 'Timepicker.TimeGrid';

export { HourColumn, MinuteColumn, PeriodColumn, TimeGrid };
