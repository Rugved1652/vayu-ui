'use client';

import { useState } from 'react';
import { BigCalendar, CalendarEvent, Typography } from 'vayu-ui';

function sampleEvents(): CalendarEvent[] {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const d = now.getDate();

  return [
    {
      id: 1,
      title: 'Team Standup',
      start: new Date(y, m, d, 9, 0),
      end: new Date(y, m, d, 9, 30),
      color: 'blue',
    },
    {
      id: 2,
      title: 'Design Review',
      start: new Date(y, m, d, 14, 0),
      end: new Date(y, m, d, 15, 30),
      color: 'purple',
    },
    {
      id: 3,
      title: 'Sprint Planning',
      start: new Date(y, m, d + 1, 10, 0),
      end: new Date(y, m, d + 1, 11, 0),
      color: 'green',
    },
    {
      id: 4,
      title: 'Client Call',
      start: new Date(y, m, d + 2, 16, 0),
      end: new Date(y, m, d + 2, 17, 0),
      color: 'amber',
    },
    {
      id: 5,
      title: 'Hackathon',
      start: new Date(y, m, d + 3),
      end: new Date(y, m, d + 3, 23, 59),
      allDay: true,
      color: 'red',
    },
    {
      id: 6,
      title: 'Lunch with Alex',
      start: new Date(y, m, d, 12, 0),
      end: new Date(y, m, d, 13, 0),
      color: 'pink',
    },
    {
      id: 7,
      title: 'Weekly Sync',
      start: new Date(y, m, d - 1, 11, 0),
      end: new Date(y, m, d - 1, 11, 45),
      color: 'primary',
    },
    {
      id: 8,
      title: 'Code Freeze',
      start: new Date(y, m, d + 5, 9, 0),
      end: new Date(y, m, d + 5, 10, 0),
      color: 'red',
    },
  ];
}

export default function BigCalendarDemo() {
  const [events, setEvents] = useState(sampleEvents());

  return (
    <div className="flex flex-col not-prose gap-4 w-full">
      <Typography.H5>Big Calendar</Typography.H5>
      <BigCalendar
        events={events}
        onEventClick={(e) => alert(`Clicked: ${e.title}`)}
        onDateClick={(d) => alert(`Date clicked: ${d.toLocaleString()}`)}
        onEventRemove={(e) => {
          setEvents((prev) => prev.filter((ev) => ev.id !== e.id));
        }}
        className="min-h-[600px]"
      />
    </div>
  );
}
