'use client';

import { HoverCard } from 'vayu-ui';
import { CalendarDays, MapPin, Mail, ExternalLink } from 'lucide-react';

export default function HoverCardDemo() {
  return (
    <div className="not-prose flex flex-col gap-8 w-full max-w-lg">
      {/* Basic */}
      <div>
        <p className="text-xs font-secondary text-ground-500 dark:text-ground-400 mb-3">Basic</p>
        <HoverCard
          content={
            <div className="w-64 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-sm">
                  VU
                </div>
                <div>
                  <p className="font-semibold text-sm">Ved UI</p>
                  <p className="text-xs text-neutral-500">@vayuui</p>
                </div>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                A modern React component library with WCAG 2.2 AA compliance, compound patterns, and
                premium design.
              </p>
              <div className="flex items-center gap-3 text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  <CalendarDays className="w-3 h-3" aria-hidden="true" />
                  Joined Feb 2026
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" aria-hidden="true" />
                  Open Source
                </span>
              </div>
            </div>
          }
        >
          <button className="text-sm font-secondary text-primary-600 dark:text-primary-400 underline underline-offset-2 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
            @vayuui
          </button>
        </HoverCard>
      </div>

      {/* Sides */}
      <div>
        <p className="text-xs font-secondary text-ground-500 dark:text-ground-400 mb-3">Sides</p>
        <div className="flex flex-wrap items-center gap-4">
          {(['top', 'bottom', 'left', 'right'] as const).map((s) => (
            <HoverCard
              key={s}
              side={s}
              content={
                <p className="text-xs w-40">
                  This card appears on the <strong>{s}</strong> side.
                </p>
              }
            >
              <button className="px-3 py-1.5 text-sm font-secondary bg-ground-100 dark:bg-ground-800 text-ground-800 dark:text-ground-200 rounded-md hover:bg-ground-200 dark:hover:bg-ground-700 transition-colors capitalize">
                {s}
              </button>
            </HoverCard>
          ))}
        </div>
      </div>

      {/* Rich content */}
      <div>
        <p className="text-xs font-secondary text-ground-500 dark:text-ground-400 mb-3">
          Rich content
        </p>
        <HoverCard
          side="right"
          content={
            <div className="w-56 space-y-3">
              <p className="text-sm font-semibold">Contact Info</p>
              <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                <p className="flex items-center gap-2">
                  <Mail className="w-3 h-3 shrink-0" aria-hidden="true" />
                  hello@vayuui.dev
                </p>
                <p className="flex items-center gap-2">
                  <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
                  vayu.design
                </p>
              </div>
              <button className="w-full px-3 py-1.5 text-xs font-secondary bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                Send Message
              </button>
            </div>
          }
        >
          <button className="px-4 py-2 text-sm font-secondary bg-ground-100 dark:bg-ground-800 text-ground-800 dark:text-ground-200 rounded-md hover:bg-ground-200 dark:hover:bg-ground-700 transition-colors">
            Hover for contact
          </button>
        </HoverCard>
      </div>
    </div>
  );
}
