'use client';

import { Animation } from 'vayu-ui';
import { DataPanel } from './DataPanel';
import { DraggableTasksPanel } from './DraggableTasksPanel';
import { FormControlsPanel } from './FormControlsPanel';
import { HoverCardPanel } from './HoverCardPanel';
import { OverlayPanel } from './OverlayPanel';
import { PopoverPanel } from './PopoverPanel';
import { ProfilePanel } from './ProfilePanel';
import { ResizableLayoutPanel } from './ResizableLayoutPanel';
import { SchedulePanel } from './SchedulePanel';
import { SkeletonPanel } from './SkeletonPanel';
import { StepperPanel } from './StepperPanel';
import { TabsPanel } from './TabsPanel';

export function DocsPreview() {
  return (
    <div className="hero-collage mx-auto mt-18 max-w-6xl relative">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-info/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 relative z-10">
        {/* Row 1-2: Form Controls (2x2) */}
        <div className="md:col-span-2 xl:col-span-2 xl:row-span-2 flex flex-col">
          <Animation.Slide direction="up" duration="slow" delay="none" className="h-full group">
            <FormControlsPanel />
          </Animation.Slide>
        </div>

        {/* Row 1: Schedule (1x1) */}
        <div className="md:col-span-1 xl:col-span-1 xl:row-span-1 flex flex-col">
          <Animation.Slide direction="up" duration="slow" delay="short" className="h-full">
            <SchedulePanel />
          </Animation.Slide>
        </div>

        {/* Row 1: Profile (1x1) */}
        <div className="md:col-span-1 xl:col-span-1 xl:row-span-1 flex flex-col">
          <Animation.Slide direction="up" duration="slow" delay="medium" className="h-full">
            <ProfilePanel />
          </Animation.Slide>
        </div>

        {/* Row 2: Data (1x1) */}
        <div className="md:col-span-1 xl:col-span-1 xl:row-span-1 flex flex-col">
          <Animation.Slide direction="up" duration="slow" delay="long" className="h-full">
            <DataPanel />
          </Animation.Slide>
        </div>

        {/* Row 2: Draggable (1x1) */}
        <div className="md:col-span-1 xl:col-span-1 xl:row-span-1 flex flex-col">
          <Animation.Slide direction="up" duration="slow" delay="long" className="h-full">
            <DraggableTasksPanel />
          </Animation.Slide>
        </div>

        {/* Row 3: Overlay (1x1) */}
        <div className="md:col-span-1 xl:col-span-1 xl:row-span-1 flex flex-col">
          <Animation.Slide direction="up" duration="slow" delay="long" className="h-full">
            <OverlayPanel />
          </Animation.Slide>
        </div>

        {/* Row 3: HoverCard (1x1) */}
        <div className="md:col-span-1 xl:col-span-1 xl:row-span-1 flex flex-col">
          <Animation.Slide direction="up" duration="slow" delay="long" className="h-full">
            <HoverCardPanel />
          </Animation.Slide>
        </div>

        {/* Row 3: Resizable (2x1) */}
        <div className="md:col-span-2 xl:col-span-2 xl:row-span-1 flex flex-col">
          <Animation.Slide direction="up" duration="slow" delay="long" className="h-full">
            <ResizableLayoutPanel />
          </Animation.Slide>
        </div>

        {/* Row 4: Stepper (1x1) */}
        <div className="md:col-span-1 xl:col-span-1 xl:row-span-1 flex flex-col">
          <Animation.Slide direction="up" duration="slow" delay="long" className="h-full">
            <StepperPanel />
          </Animation.Slide>
        </div>

        {/* Row 4: Tabs + Collapsible (1x1) */}
        <div className="md:col-span-1 xl:col-span-1 xl:row-span-1 flex flex-col">
          <Animation.Slide direction="up" duration="slow" delay="long" className="h-full">
            <TabsPanel />
          </Animation.Slide>
        </div>

        {/* Row 4: Skeleton + Spinner (1x1) */}
        <div className="md:col-span-1 xl:col-span-1 xl:row-span-1 flex flex-col">
          <Animation.Slide direction="up" duration="slow" delay="long" className="h-full">
            <SkeletonPanel />
          </Animation.Slide>
        </div>

        {/* Row 4: Popover (1x1) */}
        <div className="md:col-span-1 xl:col-span-1 xl:row-span-1 flex flex-col">
          <Animation.Slide direction="up" duration="slow" delay="long" className="h-full">
            <PopoverPanel />
          </Animation.Slide>
        </div>
      </div>
    </div>
  );
}
