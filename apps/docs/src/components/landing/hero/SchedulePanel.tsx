'use client';

import { useState } from 'react';
import { ArrowRight, Calendar, Info } from 'lucide-react';
import { Alert, Badge, Button, DatePicker, Divider, Switch, Timepicker } from 'vayu-ui';

export function SchedulePanel() {
  const [allDay, setAllDay] = useState(false);

  return (
    <div className="hero-collage-panel hero-collage-panel-soft h-full flex flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-brand" />
          <span className="font-tertiary text-xs text-muted-content">Schedule</span>
        </div>
        <Badge variant="info" size="sm">
          Pickers
        </Badge>
      </div>

      <div className="flex-1 flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-4">
          <DatePicker.Root mode="single">
            <DatePicker.Trigger placeholder="Pick a date" />
            <DatePicker.Calendar>
              <DatePicker.Calendar.Footer />
            </DatePicker.Calendar>
          </DatePicker.Root>

          <Divider spacing="sm">
            <Divider.Line variant="dashed" />
            <Divider.Label>Time</Divider.Label>
            <Divider.Line variant="dashed" />
          </Divider>

          <Timepicker format="12h">
            <Timepicker.Trigger />
            <Timepicker.Content>
              <Timepicker.TimeGrid />
              <Timepicker.Footer />
            </Timepicker.Content>
          </Timepicker>

          <Switch
            label="All-day event"
            description="Disable time selection"
            checked={allDay}
            onCheckedChange={setAllDay}
          />
          <Button variant="primary" size="medium">
            Generate
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <Alert variant="info">
          <Alert.Icon variant="info">
            <Info className="w-4 h-4" />
          </Alert.Icon>
          <Alert.Content>
            <Alert.Title>Schedule saved</Alert.Title>
            <Alert.Description>Your event preferences are stored locally.</Alert.Description>
          </Alert.Content>
        </Alert>
      </div>
    </div>
  );
}
