'use client';

import { useState } from 'react';
import { DatePicker, DateRange } from 'vayu-ui';
import { Card, CardContent, CardHeader } from 'vayu-ui';
import { Badge } from 'vayu-ui';
import { Divider } from 'vayu-ui';

export default function DatePickerDemo() {
  // ========================================
  // 1. Basic Single Date Selection
  // ========================================
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // ========================================
  // 2. Date Range Selection
  // ========================================
  const [dateRange, setDateRange] = useState<DateRange | null>(null);

  // ========================================
  // 3. With Disabled Weekdays (No Weekends)
  // ========================================
  const [weekdayDate, setWeekdayDate] = useState<Date | null>(null);

  // ========================================
  // 4. With Disabled Specific Dates
  // ========================================
  const [holidayDate, setHolidayDate] = useState<Date | null>(null);

  // Calculate some disabled dates (holidays)
  const today = new Date();
  const disabledDates = [
    new Date(today.getFullYear(), today.getMonth(), 15), // 15th of current month
    new Date(today.getFullYear(), today.getMonth(), 20), // 20th of current month
    new Date(today.getFullYear(), today.getMonth() + 1, 1), // 1st of next month
  ];

  // Format date for display
  const formatDate = (date: Date | null): string => {
    if (!date) return 'none';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Format range for display
  const formatRange = (range: DateRange | null): string => {
    if (!range) return 'none';
    if (!range.startDate) return 'none';
    if (!range.endDate) return `${formatDate(range.startDate)} - Select end`;
    return `${formatDate(range.startDate)} - ${formatDate(range.endDate)}`;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            DatePicker Component
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            WCAG 2.2 AA Compliant • Keyboard Navigation • Range Selection • Disabled Dates
          </p>
        </div>

        <div className="grid gap-6">
          {/* Basic Single Date Selection */}
          <Card>
            <CardHeader
              title="Single Date Selection"
              subtitle="Select a single date from the calendar"
              action={<Badge variant="brand">Basic</Badge>}
            />
            <CardContent>
              <DatePicker.Root
                value={selectedDate}
                onChange={(value) => setSelectedDate(value as Date | null)}
                placeholder="Pick a date"
              >
                <DatePicker.Trigger />
                <DatePicker.Calendar>
                  <DatePicker.Calendar.Footer />
                </DatePicker.Calendar>
              </DatePicker.Root>
              <p className="mt-3 text-sm text-muted-content">
                Selected:{' '}
                <code className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  {formatDate(selectedDate)}
                </code>
              </p>
            </CardContent>
          </Card>

          {/* Date Range Selection */}
          <Card>
            <CardHeader
              title="Date Range Selection"
              subtitle="Select a start and end date"
              action={<Badge variant="success">Range</Badge>}
            />
            <CardContent>
              <DatePicker.Root
                mode="range"
                value={dateRange}
                onChange={(value) => setDateRange(value as DateRange | null)}
                placeholder="Select date range"
              >
                <DatePicker.Trigger />
                <DatePicker.Calendar>
                  <DatePicker.Calendar.Footer />
                </DatePicker.Calendar>
              </DatePicker.Root>
              <p className="mt-3 text-sm text-muted-content">
                Range:{' '}
                <code className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  {formatRange(dateRange)}
                </code>
              </p>
            </CardContent>
          </Card>

          <Divider />

          {/* Disabled Weekdays */}
          <Card>
            <CardHeader
              title="Disabled Weekdays"
              subtitle="Disable weekends (Saturdays & Sundays)"
              action={<Badge variant="warning">No Weekends</Badge>}
            />
            <CardContent>
              <DatePicker.Root
                value={weekdayDate}
                onChange={(value) => setWeekdayDate(value as Date | null)}
                disabledWeekdays={[0, 6]} // 0 = Sunday, 6 = Saturday
                placeholder="Select a weekday"
              >
                <DatePicker.Trigger />
                <DatePicker.Calendar>
                  <DatePicker.Calendar.Footer />
                </DatePicker.Calendar>
              </DatePicker.Root>
              <p className="mt-3 text-sm text-muted-content">
                Selected:{' '}
                <code className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  {formatDate(weekdayDate)}
                </code>
              </p>
              <p className="mt-2 text-xs text-muted-content">
                Note: Weekends are shown with strikethrough and cannot be selected
              </p>
            </CardContent>
          </Card>

          {/* Disabled Specific Dates */}
          <Card>
            <CardHeader
              title="Disabled Specific Dates"
              subtitle="Block specific dates (holidays, blocked days)"
              action={<Badge variant="destructive">Blocked</Badge>}
            />
            <CardContent>
              <DatePicker.Root
                value={holidayDate}
                onChange={(value) => setHolidayDate(value as Date | null)}
                disabledDates={disabledDates}
                placeholder="Select a date"
              >
                <DatePicker.Trigger />
                <DatePicker.Calendar>
                  <DatePicker.Calendar.Footer />
                </DatePicker.Calendar>
              </DatePicker.Root>
              <p className="mt-3 text-sm text-muted-content">
                Selected:{' '}
                <code className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  {formatDate(holidayDate)}
                </code>
              </p>
              <p className="mt-2 text-xs text-muted-content">
                Blocked dates: 15th, 20th of this month, and 1st of next month
              </p>
            </CardContent>
          </Card>

          <Divider />

          {/* Accessibility Info */}
          <Card className="border-brand/50">
            <CardHeader
              title="Keyboard Navigation"
              subtitle="Full keyboard support for accessibility"
              action={<Badge variant="brand">WCAG 2.2 AA</Badge>}
            />
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-surface-content">Navigation</h4>
                    <ul className="space-y-1 text-muted-content">
                      <li>
                        <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">←</kbd> Previous day
                      </li>
                      <li>
                        <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">→</kbd> Next day
                      </li>
                      <li>
                        <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">↑</kbd> Previous
                        week
                      </li>
                      <li>
                        <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">↓</kbd> Next week
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-surface-content">Actions</h4>
                    <ul className="space-y-1 text-muted-content">
                      <li>
                        <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">Enter</kbd> Select
                        date
                      </li>
                      <li>
                        <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">Escape</kbd> Close
                        calendar
                      </li>
                      <li>
                        <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">Home</kbd> First day
                        of month
                      </li>
                      <li>
                        <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">End</kbd> Last day
                        of month
                      </li>
                      <li>
                        <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">PgUp/PgDn</kbd>{' '}
                        Prev/Next month
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Range with Disabled Days */}
          <Card>
            <CardHeader
              title="Range with Disabled Weekends"
              subtitle="Range selection that skips weekends"
              action={<Badge variant="info">Combined</Badge>}
            />
            <CardContent>
              <DatePicker.Root
                mode="range"
                disabledWeekdays={[0, 6]}
                placeholder="Select weekday range"
              >
                <DatePicker.Trigger />
                <DatePicker.Calendar>
                  <DatePicker.Calendar.Footer />
                </DatePicker.Calendar>
              </DatePicker.Root>
              <p className="mt-2 text-xs text-muted-content">
                Range selection with weekends disabled - useful for booking business days
              </p>
            </CardContent>
          </Card>

          {/* Disabled State */}
          <Card>
            <CardHeader title="Disabled State" />
            <CardContent>
              <DatePicker.Root disabled placeholder="Cannot select">
                <DatePicker.Trigger />
              </DatePicker.Root>
              <p className="mt-2 text-xs text-muted-content">
                The entire date picker can be disabled
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
