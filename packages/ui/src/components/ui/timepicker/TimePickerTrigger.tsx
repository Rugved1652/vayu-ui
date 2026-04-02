// trigger.tsx
// UI: TimepickerTrigger — inline editing, keyboard navigation

'use client';

import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Clock, X, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { useTimepicker } from './TimePicker';
import type { TimeValue, TimeRange } from './types';
import {
  clampTimeSegment,
  convertTo12Hour,
  convertTo24Hour,
  isTimeDisabled,
  formatTimeValue,
} from './utils';

const TimepickerTrigger = forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => {
    const {
      open,
      setOpen,
      value,
      onValueChange,
      error,
      disabled,
      triggerRef,
      id,
      format,
      mode,
      rangePhase,
      placeholder,
      clearable,
      clearSelection,
      showApplyButton,
      disabledTimes,
      disabledHours,
      minTime,
      maxTime,
    } = useTimepicker();

    const localTriggerRef = useRef<HTMLDivElement | null>(null);
    const hourInputRef = useRef<HTMLInputElement | null>(null);
    const minuteInputRef = useRef<HTMLInputElement | null>(null);
    const periodInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (localTriggerRef.current && triggerRef) {
        (triggerRef as React.MutableRefObject<HTMLDivElement | null>).current =
          localTriggerRef.current;
      }
    }, [triggerRef]);

    useEffect(() => {
      if (localTriggerRef.current && ref) {
        if (typeof ref === 'function') ref(localTriggerRef.current);
        else
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = localTriggerRef.current;
      }
    }, [ref]);

    // --- Helpers to extract current hour/minute from the active time value ---

    const getActiveTime = useCallback((): TimeValue | null => {
      const v = value;
      if (!v) return null;
      if (mode === 'range') {
        const range = v as TimeRange;
        return rangePhase === 'start' ? range.start : range.end;
      }
      return v as TimeValue;
    }, [value, mode, rangePhase]);

    const getDisplayHour = useCallback((): string => {
      const time = getActiveTime();
      if (!time) return '';
      const h = format === '12h' ? convertTo12Hour(time.hour) : time.hour;
      return h.toString().padStart(2, '0');
    }, [getActiveTime, format]);

    const getDisplayMinute = useCallback((): string => {
      const time = getActiveTime();
      if (!time) return '';
      return time.minute.toString().padStart(2, '0');
    }, [getActiveTime]);

    const getDisplayPeriod = useCallback((): string => {
      const time = getActiveTime();
      if (!time) return '';
      return time.hour >= 12 ? 'PM' : 'AM';
    }, [getActiveTime]);

    // --- Local editing state for hour and minute inputs ---
    const [hourText, setHourText] = useState(getDisplayHour());
    const [minuteText, setMinuteText] = useState(getDisplayMinute());
    const [periodText, setPeriodText] = useState(getDisplayPeriod() || 'AM');

    // Keep local text in sync with committed value
    useEffect(() => {
      if (document.activeElement !== hourInputRef.current) {
        setHourText(getDisplayHour());
      }
    }, [getDisplayHour]);

    useEffect(() => {
      if (document.activeElement !== minuteInputRef.current) {
        setMinuteText(getDisplayMinute());
      }
    }, [getDisplayMinute]);

    useEffect(() => {
      if (document.activeElement !== periodInputRef.current) {
        setPeriodText(getDisplayPeriod() || 'AM');
      }
    }, [getDisplayPeriod]);

    // --- Commit helpers ---

    const commitTime = useCallback(
      (newHour24: number, newMinute: number) => {
        const newTime: TimeValue = { hour: newHour24, minute: newMinute };

        if (isTimeDisabled(newTime, { disabledTimes, disabledHours, minTime, maxTime })) {
          setHourText(getDisplayHour());
          setMinuteText(getDisplayMinute());
          setPeriodText(getDisplayPeriod() || 'AM');
          return;
        }

        if (mode === 'range') {
          const range = (value as TimeRange) ?? { start: null, end: null };
          const newRange: TimeRange = { ...range };
          if (rangePhase === 'start') {
            newRange.start = newTime;
          } else {
            newRange.end = newTime;
          }
          if (showApplyButton) {
            // tempValue update handled by columns
          } else {
            onValueChange(newRange);
          }
        } else {
          if (showApplyButton) {
            // tempValue update handled by columns
          } else {
            onValueChange(newTime);
          }
        }
      },
      [
        mode,
        rangePhase,
        value,
        onValueChange,
        showApplyButton,
        disabledTimes,
        disabledHours,
        minTime,
        maxTime,
        getDisplayHour,
        getDisplayMinute,
        getDisplayPeriod,
      ],
    );

    const commitHour = useCallback(
      (raw: string) => {
        const time = getActiveTime();
        const currentMinute = time?.minute ?? 0;
        const currentPeriod: 'AM' | 'PM' = time ? (time.hour >= 12 ? 'PM' : 'AM') : 'AM';

        if (raw === '') {
          setHourText(getDisplayHour());
          return;
        }

        if (format === '12h') {
          const clamped = clampTimeSegment(raw, 1, 12);
          const hour24 = convertTo24Hour(clamped, currentPeriod);
          commitTime(hour24, currentMinute);
          setHourText(clamped.toString().padStart(2, '0'));
        } else {
          const clamped = clampTimeSegment(raw, 0, 23);
          commitTime(clamped, currentMinute);
          setHourText(clamped.toString().padStart(2, '0'));
        }
      },
      [format, getActiveTime, getDisplayHour, commitTime],
    );

    const commitMinute = useCallback(
      (raw: string) => {
        const time = getActiveTime();
        const currentHour = time?.hour ?? 0;

        if (raw === '') {
          setMinuteText(getDisplayMinute());
          return;
        }

        const clamped = clampTimeSegment(raw, 0, 59);
        commitTime(currentHour, clamped);
        setMinuteText(clamped.toString().padStart(2, '0'));
      },
      [getActiveTime, getDisplayMinute, commitTime],
    );

    const commitPeriod = useCallback(
      (newPeriod: 'AM' | 'PM') => {
        const time = getActiveTime();
        const currentHour = time?.hour ?? 0;
        const currentMinute = time?.minute ?? 0;

        const displayHour12 =
          currentHour === 0 ? 12 : currentHour > 12 ? currentHour - 12 : currentHour;
        const newHour24 = convertTo24Hour(displayHour12, newPeriod);

        commitTime(newHour24, currentMinute);
        setPeriodText(newPeriod);
      },
      [getActiveTime, commitTime],
    );

    // --- Event handlers ---

    const handleClick = (e: React.MouseEvent) => {
      if (disabled) return;
      if (e.target === hourInputRef.current || e.target === minuteInputRef.current) {
        return;
      }
      setOpen(!open);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (
        e.target === hourInputRef.current ||
        e.target === minuteInputRef.current ||
        e.target === periodInputRef.current
      ) {
        return;
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpen(!open);
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      clearSelection();
    };

    const handleHourKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        commitHour(hourText);
        minuteInputRef.current?.focus();
        minuteInputRef.current?.select();
      }
      if (e.key === 'ArrowRight') {
        const target = e.target as HTMLInputElement;
        const isAtRightEdge = target.selectionStart === target.value.length;
        const isFullySelected =
          target.selectionStart === 0 && target.selectionEnd === target.value.length;
        if (isAtRightEdge || isFullySelected) {
          e.preventDefault();
          commitHour(hourText);
          minuteInputRef.current?.focus();
          minuteInputRef.current?.select();
        }
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        const time = getActiveTime();
        const currentPeriod: 'AM' | 'PM' = time ? (time.hour >= 12 ? 'PM' : 'AM') : 'AM';
        const currentMinute = time?.minute ?? 0;
        let currentDisplay = parseInt(hourText, 10);
        if (isNaN(currentDisplay)) currentDisplay = format === '12h' ? 12 : 0;

        if (e.key === 'ArrowUp') {
          currentDisplay = format === '12h' ? (currentDisplay % 12) + 1 : (currentDisplay + 1) % 24;
        } else {
          currentDisplay =
            format === '12h'
              ? ((currentDisplay - 2 + 12) % 12) + 1
              : (currentDisplay - 1 + 24) % 24;
        }
        const newText = currentDisplay.toString().padStart(2, '0');
        setHourText(newText);
        const hour24 =
          format === '12h' ? convertTo24Hour(currentDisplay, currentPeriod) : currentDisplay;
        commitTime(hour24, currentMinute);
      }
    };

    const handleMinuteKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        commitMinute(minuteText);
        minuteInputRef.current?.blur();
      }
      if (e.key === 'ArrowLeft') {
        const target = e.target as HTMLInputElement;
        const isAtLeftEdge = target.selectionStart === 0 && target.selectionEnd === 0;
        const isFullySelected =
          target.selectionStart === 0 && target.selectionEnd === target.value.length;
        if (isAtLeftEdge || isFullySelected) {
          e.preventDefault();
          commitMinute(minuteText);
          hourInputRef.current?.focus();
          hourInputRef.current?.select();
        }
      }
      if (e.key === 'ArrowRight') {
        const target = e.target as HTMLInputElement;
        const isAtRightEdge = target.selectionStart === target.value.length;
        const isFullySelected =
          target.selectionStart === 0 && target.selectionEnd === target.value.length;
        if (isAtRightEdge || isFullySelected) {
          if (format === '12h' && periodInputRef.current) {
            e.preventDefault();
            commitMinute(minuteText);
            periodInputRef.current.focus();
            periodInputRef.current.select();
          }
        }
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        const time = getActiveTime();
        const currentHour = time?.hour ?? 0;
        let currentMin = parseInt(minuteText, 10);
        if (isNaN(currentMin)) currentMin = 0;

        if (e.key === 'ArrowUp') {
          currentMin = (currentMin + 1) % 60;
        } else {
          currentMin = (currentMin - 1 + 60) % 60;
        }
        const newText = currentMin.toString().padStart(2, '0');
        setMinuteText(newText);
        commitTime(currentHour, currentMin);
      }
    };

    const handlePeriodKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        periodInputRef.current?.blur();
      }
      if (e.key === 'ArrowLeft') {
        const target = e.target as HTMLInputElement;
        const isAtLeftEdge = target.selectionStart === 0 && target.selectionEnd === 0;
        const isFullySelected =
          target.selectionStart === 0 && target.selectionEnd === target.value.length;
        if (isAtLeftEdge || isFullySelected) {
          e.preventDefault();
          minuteInputRef.current?.focus();
          minuteInputRef.current?.select();
        }
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        const newPeriod = periodText === 'AM' ? 'PM' : 'AM';
        setPeriodText(newPeriod);
        commitPeriod(newPeriod);
      }
    };

    // --- Range display ---

    const getRangeDisplayValue = (): string => {
      if (!value) return placeholder || 'Select time range';
      const range = value as TimeRange;
      if (!range.start && !range.end) return placeholder || 'Select time range';
      const startStr = range.start ? formatTimeValue(range.start, format) : '--:--';
      const endStr = range.end ? formatTimeValue(range.end, format) : '--:--';
      return `${startStr} - ${endStr}`;
    };

    const hasValue =
      mode === 'range'
        ? !!(value && ((value as TimeRange).start || (value as TimeRange).end))
        : !!value;

    return (
      <div
        ref={localTriggerRef}
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-disabled={disabled}
        aria-labelledby={id}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={clsx(
          'w-full flex items-center justify-between gap-2 px-3 py-2 text-sm rounded-control bg-surface border transition-all outline-none cursor-pointer',
          error
            ? 'border-destructive focus-within:ring-2 focus-within:ring-destructive'
            : 'border-field focus-within:border-focus focus-within:ring-2 focus-within:ring-focus',
          open && !error && 'border-focus ring-2 ring-focus',
          'text-surface-content placeholder:text-muted-content',
          'focus-within:ring-offset-2 focus-within:ring-offset-canvas',
          disabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Clock className="w-4 h-4 text-muted-content shrink-0" />
          {mode === 'range' ? (
            <span className={clsx('truncate', !hasValue && 'text-muted-content')}>
              {getRangeDisplayValue()}
            </span>
          ) : (
            <div className="flex items-center gap-0" onClick={(e) => e.stopPropagation()}>
              <input
                ref={hourInputRef}
                type="text"
                inputMode="numeric"
                aria-label="Hour"
                disabled={disabled}
                value={hourText}
                placeholder={format === '12h' ? 'HH' : 'HH'}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, '').slice(0, 2);
                  setHourText(v);
                  if (v.length === 2) {
                    commitHour(v);
                    setTimeout(() => {
                      minuteInputRef.current?.focus();
                      minuteInputRef.current?.select();
                    }, 0);
                  }
                }}
                onBlur={() => commitHour(hourText)}
                onFocus={(e) => e.target.select()}
                onKeyDown={handleHourKeyDown}
                className="w-6 bg-transparent text-center outline-none text-sm tabular-nums selection:bg-brand/20 placeholder:text-muted-content"
                maxLength={2}
              />
              <span className={clsx('text-surface-content', !hasValue && 'text-muted-content')}>
                :
              </span>
              <input
                ref={minuteInputRef}
                type="text"
                inputMode="numeric"
                aria-label="Minute"
                disabled={disabled}
                value={minuteText}
                placeholder="MM"
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, '').slice(0, 2);
                  setMinuteText(v);
                  if (v.length === 2) {
                    commitMinute(v);
                    setTimeout(() => {
                      if (format === '12h' && periodInputRef.current) {
                        periodInputRef.current.focus();
                        periodInputRef.current.select();
                      } else {
                        minuteInputRef.current?.blur();
                      }
                    }, 0);
                  }
                }}
                onBlur={() => commitMinute(minuteText)}
                onFocus={(e) => e.target.select()}
                onKeyDown={handleMinuteKeyDown}
                className="w-6 bg-transparent text-center outline-none text-sm tabular-nums selection:bg-brand/20 placeholder:text-muted-content"
                maxLength={2}
              />
              {format === '12h' && (
                <input
                  ref={periodInputRef}
                  type="text"
                  aria-label="AM/PM"
                  disabled={disabled}
                  value={periodText}
                  placeholder="AM"
                  onChange={(e) => {
                    const v = e.target.value
                      .replace(/[^APM]/gi, '')
                      .slice(0, 2)
                      .toUpperCase();
                    setPeriodText(v);
                    if (v === 'AM' || v === 'PM') {
                      commitPeriod(v);
                      setTimeout(() => periodInputRef.current?.blur(), 0);
                    } else if (v === 'A') {
                      setPeriodText('AM');
                      commitPeriod('AM');
                      setTimeout(() => periodInputRef.current?.blur(), 0);
                    } else if (v === 'P') {
                      setPeriodText('PM');
                      commitPeriod('PM');
                      setTimeout(() => periodInputRef.current?.blur(), 0);
                    }
                  }}
                  onBlur={() => {
                    setPeriodText(getDisplayPeriod() || 'AM');
                  }}
                  onFocus={(e) => e.target.select()}
                  onKeyDown={handlePeriodKeyDown}
                  className={clsx(
                    'w-7 bg-transparent text-center outline-none text-sm font-medium tabular-nums uppercase selection:bg-brand/20 ml-1 placeholder:text-muted-content placeholder:font-normal',
                    !hasValue && 'text-muted-content font-normal',
                  )}
                  maxLength={2}
                />
              )}
            </div>
          )}
        </div>
        {clearable && hasValue && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="p-0.5 rounded-sm hover:bg-muted/50 transition-colors"
            aria-label="Clear selection"
          >
            <X className="w-4 h-4 text-muted-content" />
          </button>
        )}
        <ChevronDown
          className={clsx(
            'w-4 h-4 text-muted-content transition-transform shrink-0',
            open && 'rotate-180',
          )}
        />
      </div>
    );
  },
);

TimepickerTrigger.displayName = 'Timepicker.Trigger';

export { TimepickerTrigger };
