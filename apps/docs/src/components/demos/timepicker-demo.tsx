"use client";

import React, { useState } from "react";
import { Timepicker, TimeValue, TimeRange } from "vayu-ui";

// ============================================================================
// Basic Timepicker Demo
// ============================================================================

export function TimepickerBasicDemo() {
    const [time, setTime] = useState<TimeValue | null>(null);

    const handleValueChange = (value: TimeValue | TimeRange | null) => {
        setTime(value as TimeValue | null);
    };

    return (
        <Timepicker.Root
            value={time}
            onValueChange={handleValueChange}
            placeholder="Select time"
        >
            <Timepicker.Trigger />
            <Timepicker.Content>
                <Timepicker.TimeGrid />
                <Timepicker.Footer />
            </Timepicker.Content>
        </Timepicker.Root>
    );
}

// ============================================================================
// 24-Hour Format Demo
// ============================================================================

export function Timepicker24HourDemo() {
    const [time, setTime] = useState<TimeValue | null>(null);

    const handleValueChange = (value: TimeValue | TimeRange | null) => {
        setTime(value as TimeValue | null);
    };

    return (
        <Timepicker.Root
            value={time}
            onValueChange={handleValueChange}
            format="24h"
            placeholder="Select time (24h)"
        >
            <Timepicker.Trigger />
            <Timepicker.Content>
                <Timepicker.TimeGrid />
                <Timepicker.Footer />
            </Timepicker.Content>
        </Timepicker.Root>
    );
}

// ============================================================================
// Time Range Picker Demo
// ============================================================================

export function TimepickerRangeDemo() {
    const [range, setRange] = useState<TimeRange | null>(null);

    const handleValueChange = (value: TimeValue | TimeRange | null) => {
        setRange(value as TimeRange | null);
    };

    return (
        <Timepicker.Root
            value={range}
            onValueChange={handleValueChange}
            mode="range"
            showApplyButton
            placeholder="Select time range"
        >
            <Timepicker.Trigger />
            <Timepicker.Content>
                <Timepicker.TimeGrid />
                <Timepicker.Footer />
            </Timepicker.Content>
        </Timepicker.Root>
    );
}

// ============================================================================
// Disabled Times Demo
// ============================================================================

export function TimepickerDisabledDemo() {
    const [time, setTime] = useState<TimeValue | null>(null);

    // Disable early morning hours (0-7) and late night hours (20-23)
    const disabledHours = [0, 1, 2, 3, 4, 5, 6, 7, 20, 21, 22, 23];

    // Disable specific break times
    const disabledTimes = ["12:00", "12:30", "13:00"];

    const handleValueChange = (value: TimeValue | TimeRange | null) => {
        setTime(value as TimeValue | null);
    };

    return (
        <Timepicker.Root
            value={time}
            onValueChange={handleValueChange}
            disabledHours={disabledHours}
            disabledTimes={disabledTimes}
            placeholder="Business hours only (8AM - 8PM)"
        >
            <Timepicker.Trigger />
            <Timepicker.Content>
                <Timepicker.TimeGrid />
                <Timepicker.Footer />
            </Timepicker.Content>
        </Timepicker.Root>
    );
}

// ============================================================================
// Min/Max Time Bounds Demo
// ============================================================================

export function TimepickerMinMaxDemo() {
    const [time, setTime] = useState<TimeValue | null>(null);

    const handleValueChange = (value: TimeValue | TimeRange | null) => {
        setTime(value as TimeValue | null);
    };

    return (
        <Timepicker.Root
            value={time}
            onValueChange={handleValueChange}
            minTime="09:00"
            maxTime="17:00"
            placeholder="Work hours (9AM - 5PM)"
        >
            <Timepicker.Trigger />
            <Timepicker.Content>
                <Timepicker.TimeGrid />
                <Timepicker.Footer />
            </Timepicker.Content>
        </Timepicker.Root>
    );
}

// ============================================================================
// With Error Demo
// ============================================================================

export function TimepickerErrorDemo() {
    const [time, setTime] = useState<TimeValue | null>(null);
    const [showError, setShowError] = useState(false);

    const handleValueChange = (value: TimeValue | TimeRange | null) => {
        setTime(value as TimeValue | null);
        setShowError(!value);
    };

    return (
        <Timepicker.Root
            value={time}
            onValueChange={handleValueChange}
            error={showError ? "Please select a time" : undefined}
            label="Required Field"
        >
            <Timepicker.Trigger />
            <Timepicker.Content>
                <Timepicker.TimeGrid />
                <Timepicker.Footer />
            </Timepicker.Content>
        </Timepicker.Root>
    );
}

// ============================================================================
// Disabled State Demo
// ============================================================================

export function TimepickerDisabledStateDemo() {
    return (
        <Timepicker.Root
            disabled
            defaultValue={{ hour: 14, minute: 30 }}
            label="Disabled Timepicker"
        >
            <Timepicker.Trigger />
        </Timepicker.Root>
    );
}

// ============================================================================
// With Label Demo
// ============================================================================

export function TimepickerWithLabelDemo() {
    const [time, setTime] = useState<TimeValue | null>(null);

    const handleValueChange = (value: TimeValue | TimeRange | null) => {
        setTime(value as TimeValue | null);
    };

    return (
        <Timepicker.Root
            value={time}
            onValueChange={handleValueChange}
            label="Meeting Time"
        >
            <Timepicker.Trigger />
            <Timepicker.Content>
                <Timepicker.TimeGrid />
                <Timepicker.Footer />
            </Timepicker.Content>
        </Timepicker.Root>
    );
}

// ============================================================================
// Custom Minute Step Demo
// ============================================================================

export function TimepickerMinuteStepDemo() {
    const [time, setTime] = useState<TimeValue | null>(null);

    const handleValueChange = (value: TimeValue | TimeRange | null) => {
        setTime(value as TimeValue | null);
    };

    return (
        <Timepicker.Root
            value={time}
            onValueChange={handleValueChange}
            minuteStep={15}
            placeholder="Select time (15-min intervals)"
        >
            <Timepicker.Trigger />
            <Timepicker.Content>
                <Timepicker.TimeGrid />
                <Timepicker.Footer />
            </Timepicker.Content>
        </Timepicker.Root>
    );
}

// ============================================================================
// React Hook Form Integration Demo
// ============================================================================

// Note: This is a demonstration of how to integrate with react-hook-form.
// In a real application, you would import these from 'react-hook-form'

interface FormData {
    appointmentTime: TimeValue | null;
}

// Mock Controller for demo purposes
// In real usage: import { Controller, useForm } from 'react-hook-form'
function MockController({
    name,
    control,
    rules,
    render,
}: {
    name: string;
    control: unknown;
    rules?: { required?: boolean | string };
    render: (props: {
        field: {
            value: TimeValue | null;
            onChange: (value: TimeValue | TimeRange | null) => void;
            onBlur: () => void;
        };
        fieldState: { error?: { message?: string } };
    }) => React.ReactNode;
}) {
    const [value, setValue] = useState<TimeValue | null>(null);
    const [error, setError] = useState<string | undefined>();

    return (
        <>
            {render({
                field: {
                    value,
                    onChange: (newValue) => {
                        setValue(newValue as TimeValue | null);
                        if (rules?.required && !newValue) {
                            setError(typeof rules.required === "string" ? rules.required : "This field is required");
                        } else {
                            setError(undefined);
                        }
                    },
                    onBlur: () => {
                        if (rules?.required && !value) {
                            setError(typeof rules.required === "string" ? rules.required : "This field is required");
                        }
                    },
                },
                fieldState: { error: error ? { message: error } : undefined },
            })}
        </>
    );
}

export function TimepickerReactHookFormDemo() {
    // In real usage:
    // const { control, handleSubmit } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log("Form submitted:", data);
        alert(`Selected time: ${data.appointmentTime?.hour}:${data.appointmentTime?.minute}`);
    };

    return (
        <div className="space-y-4">
            <form onSubmit={(e) => {
                e.preventDefault();
                // In real usage: handleSubmit(onSubmit)()
                const formData: FormData = {
                    appointmentTime: null, // Would come from form state
                };
                onSubmit(formData);
            }} className="space-y-4">
                <MockController
                    name="appointmentTime"
                    control={{}}
                    rules={{ required: "Appointment time is required" }}
                    render={({ field, fieldState }) => (
                        <Timepicker.Root
                            value={field.value}
                            onValueChange={field.onChange}
                            error={fieldState.error?.message}
                            label="Appointment Time"
                        >
                            <Timepicker.Trigger />
                            <Timepicker.Content>
                                <Timepicker.TimeGrid />
                                <Timepicker.Footer />
                            </Timepicker.Content>
                        </Timepicker.Root>
                    )}
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-brand text-brand-content rounded-control font-medium hover:bg-brand/90 transition-colors"
                >
                    Submit
                </button>
            </form>
            <p className="text-xs text-muted-content">
                Note: This demo uses a mock Controller. In production, use
                react-hook-form&apos;s Controller component.
            </p>
        </div>
    );
}

// ============================================================================
// Complete Example - All Features
// ============================================================================

export function TimepickerCompleteDemo() {
    const [time, setTime] = useState<TimeValue | null>(null);
    const [range, setRange] = useState<TimeRange | null>(null);

    const handleTimeChange = (value: TimeValue | TimeRange | null) => {
        setTime(value as TimeValue | null);
    };

    const handleRangeChange = (value: TimeValue | TimeRange | null) => {
        setRange(value as TimeRange | null);
    };

    return (
        <div className="space-y-8">
            {/* Basic 12h */}
            <div>
                <h4 className="text-sm font-medium mb-2 text-surface-content">
                    Basic (12h format)
                </h4>
                <Timepicker.Root
                    value={time}
                    onValueChange={handleTimeChange}
                    placeholder="Select time"
                >
                    <Timepicker.Trigger />
                    <Timepicker.Content>
                        <Timepicker.TimeGrid />
                        <Timepicker.Footer />
                    </Timepicker.Content>
                </Timepicker.Root>
            </div>

            {/* 24h format */}
            <div>
                <h4 className="text-sm font-medium mb-2 text-surface-content">
                    24-Hour Format
                </h4>
                <Timepicker.Root
                    value={time}
                    onValueChange={handleTimeChange}
                    format="24h"
                    placeholder="Select time (24h)"
                >
                    <Timepicker.Trigger />
                    <Timepicker.Content>
                        <Timepicker.TimeGrid />
                        <Timepicker.Footer />
                    </Timepicker.Content>
                </Timepicker.Root>
            </div>

            {/* Time Range */}
            <div>
                <h4 className="text-sm font-medium mb-2 text-surface-content">
                    Time Range
                </h4>
                <Timepicker.Root
                    value={range}
                    onValueChange={handleRangeChange}
                    mode="range"
                    showApplyButton
                    placeholder="Select time range"
                >
                    <Timepicker.Trigger />
                    <Timepicker.Content>
                        <Timepicker.TimeGrid />
                        <Timepicker.Footer />
                    </Timepicker.Content>
                </Timepicker.Root>
            </div>

            {/* With constraints */}
            <div>
                <h4 className="text-sm font-medium mb-2 text-surface-content">
                    With Constraints (9AM - 5PM)
                </h4>
                <Timepicker.Root
                    value={time}
                    onValueChange={handleTimeChange}
                    minTime="09:00"
                    maxTime="17:00"
                    placeholder="Work hours only"
                >
                    <Timepicker.Trigger />
                    <Timepicker.Content>
                        <Timepicker.TimeGrid />
                        <Timepicker.Footer />
                    </Timepicker.Content>
                </Timepicker.Root>
            </div>
        </div>
    );
}

// ============================================================================
// Default Export - Main Demo
// ============================================================================

export default function TimepickerDemo() {
    return <TimepickerCompleteDemo />;
}
