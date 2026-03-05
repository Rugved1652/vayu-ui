"use client";

import { useState } from "react";
import { DateTimePicker } from "vayu-ui";

export default function DateTimePickerDemo() {
    const [date, setDate] = useState<Date | null>(null);
    const [datetime, setDatetime] = useState<Date | null>(null);
    const [time, setTime] = useState<Date | null>(null);

    return (
        <div className="not-prose flex flex-col gap-8 w-full max-w-md">
            {/* Date only */}
            <div className="space-y-2">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    Date only
                </p>
                <DateTimePicker
                    value={date}
                    onChange={setDate}
                    mode="date"
                    placeholder="Pick a date"
                >
                    <DateTimePicker.Trigger />
                    <DateTimePicker.Content>
                        <DateTimePicker.Calendar />
                    </DateTimePicker.Content>
                </DateTimePicker>
            </div>

            {/* Date + Time */}
            <div className="space-y-2">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    Date &amp; time
                </p>
                <DateTimePicker
                    value={datetime}
                    onChange={setDatetime}
                    mode="datetime"
                    placeholder="Pick date & time"
                >
                    <DateTimePicker.Trigger />
                    <DateTimePicker.Content>
                        <DateTimePicker.Calendar />
                        <DateTimePicker.TimePicker />
                    </DateTimePicker.Content>
                </DateTimePicker>
            </div>

            {/* Time only */}
            <div className="space-y-2">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    Time only (24h)
                </p>
                <DateTimePicker
                    value={time}
                    onChange={setTime}
                    mode="time"
                    use24Hour
                    placeholder="Pick a time"
                >
                    <DateTimePicker.Trigger />
                    <DateTimePicker.Content>
                        <DateTimePicker.TimePicker />
                    </DateTimePicker.Content>
                </DateTimePicker>
            </div>

            {/* With min/max */}
            <div className="space-y-2">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    Constrained (today ± 7 days)
                </p>
                <DateTimePicker
                    value={null}
                    onChange={() => { }}
                    mode="date"
                    min={new Date(Date.now() - 7 * 86400000)}
                    max={new Date(Date.now() + 7 * 86400000)}
                    placeholder="Limited range"
                >
                    <DateTimePicker.Trigger />
                    <DateTimePicker.Content>
                        <DateTimePicker.Calendar />
                    </DateTimePicker.Content>
                </DateTimePicker>
            </div>
        </div>
    );
}
