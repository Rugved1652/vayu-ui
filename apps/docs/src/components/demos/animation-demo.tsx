"use client";

import { Animation, Button } from "vayu-ui";
import { RefreshCcw, Accessibility } from "lucide-react";
import { useState } from "react";

// Helper component to render a consistent card for each animation
const AnimationCard = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 min-h-35 justify-center">
    <div className="h-16 w-16 flex items-center justify-center">{children}</div>
    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
      {label}
    </span>
  </div>
);

export default function AnimationDemo() {
  // Key state is used to force a re-render of the grid, replaying all animations
  const [key, setKey] = useState(0);

  const replay = () => setKey((prev) => prev + 1);

  return (
    <div className="w-full not-prose space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="small" onClick={replay}>
            <RefreshCcw className="w-4 h-4 mr-2" />
            Replay All
          </Button>
        </div>
        
        {/* Accessibility Notice */}
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 max-w-md">
          <Accessibility className="w-4 h-4 shrink-0" />
          <span>
            <strong>WCAG Compliant:</strong> Animations are automatically disabled if &quot;Reduce Motion&quot; is enabled in your OS settings.
          </span>
        </div>
      </div>

      {/* 
        key={key} forces the entire grid to remount when the key changes, 
        triggering the entrance animations again.
      */}
      <div
        key={key}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        role="region"
        aria-label="Animation examples showcase"
      >
        {/* ============================================== */}
        {/* Fade Variants */}
        {/* ============================================== */}
        <AnimationCard label="Fade (Default)">
          <Animation.Fade>
            <div className="w-14 h-14 bg-indigo-500 rounded-md shadow-lg flex items-center justify-center text-white font-bold text-sm">
              Fade
            </div>
          </Animation.Fade>
        </AnimationCard>

        <AnimationCard label="Fade (Delay: Long)">
          <Animation.Fade delay="long">
            <div className="w-14 h-14 bg-indigo-400 rounded-md shadow-lg flex items-center justify-center text-white font-bold text-sm">
              Delay
            </div>
          </Animation.Fade>
        </AnimationCard>

        {/* ============================================== */}
        {/* Slide Variants (Directions) */}
        {/* ============================================== */}
        <AnimationCard label="Slide Left">
          <Animation.Slide direction="left">
            <div className="w-14 h-14 bg-blue-500 rounded-md shadow-lg flex items-center justify-center text-white font-bold text-xs">
              Left
            </div>
          </Animation.Slide>
        </AnimationCard>

        <AnimationCard label="Slide Right">
          <Animation.Slide direction="right">
            <div className="w-14 h-14 bg-blue-500 rounded-md shadow-lg flex items-center justify-center text-white font-bold text-xs">
              Right
            </div>
          </Animation.Slide>
        </AnimationCard>

        <AnimationCard label="Slide Up">
          <Animation.Slide direction="up">
            <div className="w-14 h-14 bg-blue-600 rounded-md shadow-lg flex items-center justify-center text-white font-bold text-xs">
              Up
            </div>
          </Animation.Slide>
        </AnimationCard>

        <AnimationCard label="Slide Down">
          <Animation.Slide direction="down">
            <div className="w-14 h-14 bg-blue-600 rounded-md shadow-lg flex items-center justify-center text-white font-bold text-xs">
              Down
            </div>
          </Animation.Slide>
        </AnimationCard>

        {/* ============================================== */}
        {/* Zoom Variants (Scales) */}
        {/* ============================================== */}
        <AnimationCard label="Zoom (Small)">
          <Animation.Zoom scale="small">
            <div className="w-14 h-14 bg-green-500 rounded-full shadow-lg flex items-center justify-center text-white font-bold text-xs">
              Sm
            </div>
          </Animation.Zoom>
        </AnimationCard>

        <AnimationCard label="Zoom (Medium)">
          <Animation.Zoom scale="medium">
            <div className="w-14 h-14 bg-green-500 rounded-full shadow-lg flex items-center justify-center text-white font-bold text-xs">
              Md
            </div>
          </Animation.Zoom>
        </AnimationCard>

        <AnimationCard label="Zoom (Large)">
          <Animation.Zoom scale="large">
            <div className="w-14 h-14 bg-green-500 rounded-full shadow-lg flex items-center justify-center text-white font-bold text-xs">
              Lg
            </div>
          </Animation.Zoom>
        </AnimationCard>

        {/* ============================================== */}
        {/* Bounce Variants */}
        {/* ============================================== */}
        <AnimationCard label="Bounce (Small)">
          <Animation.Bounce scale="small">
            <div className="w-14 h-14 bg-yellow-500 rounded-md shadow-lg flex items-center justify-center text-black font-bold text-xs">
              Bnc
            </div>
          </Animation.Bounce>
        </AnimationCard>

        <AnimationCard label="Bounce (Large)">
          <Animation.Bounce scale="large">
            <div className="w-14 h-14 bg-yellow-500 rounded-md shadow-lg flex items-center justify-center text-black font-bold text-xs">
              Bnc
            </div>
          </Animation.Bounce>
        </AnimationCard>

        {/* ============================================== */}
        {/* Flip Variants */}
        {/* ============================================== */}
        <AnimationCard label="Flip Up (X-Axis)">
          <Animation.Flip direction="up">
            <div className="w-14 h-14 bg-purple-500 rounded-md shadow-lg flex items-center justify-center text-white font-bold text-xs">
              Flip
            </div>
          </Animation.Flip>
        </AnimationCard>

        <AnimationCard label="Flip Left (Y-Axis)">
          <Animation.Flip direction="left">
            <div className="w-14 h-14 bg-purple-600 rounded-md shadow-lg flex items-center justify-center text-white font-bold text-xs">
              Flip
            </div>
          </Animation.Flip>
        </AnimationCard>

        {/* ============================================== */}
        {/* Rotate & Special Variants */}
        {/* ============================================== */}
        <AnimationCard label="Rotate (180°)">
          <Animation.Rotate degrees={180}>
            <div className="w-14 h-14 bg-red-500 rounded-md shadow-lg flex items-center justify-center text-white font-bold text-xs">
              180°
            </div>
          </Animation.Rotate>
        </AnimationCard>

        <AnimationCard label="Rotate (-200°)">
          <Animation.Rotate degrees={-200}>
            <div className="w-14 h-14 bg-red-600 rounded-md shadow-lg flex items-center justify-center text-white font-bold text-xs">
              -200°
            </div>
          </Animation.Rotate>
        </AnimationCard>

        <AnimationCard label="Roll Left">
          <Animation.Roll direction="left">
            <div className="w-14 h-14 bg-pink-500 rounded-md shadow-lg flex items-center justify-center text-white font-bold text-xs">
              Roll
            </div>
          </Animation.Roll>
        </AnimationCard>

        <AnimationCard label="Roll Right">
          <Animation.Roll direction="right">
            <div className="w-14 h-14 bg-pink-600 rounded-md shadow-lg flex items-center justify-center text-white font-bold text-xs">
              Roll
            </div>
          </Animation.Roll>
        </AnimationCard>

        {/* ============================================== */}
        {/* Special Animations */}
        {/* ============================================== */}
        <AnimationCard label="JackInTheBox">
          <Animation.JackInTheBox>
            <div className="w-14 h-14 bg-teal-500 rounded-md shadow-lg flex items-center justify-center text-white font-bold text-[8px] text-center leading-tight">
              Jack In
            </div>
          </Animation.JackInTheBox>
        </AnimationCard>

        <AnimationCard label="Hinge">
          <Animation.Hinge duration="slower">
            <div className="w-14 h-14 bg-orange-500 rounded-md shadow-lg flex items-center justify-center text-white font-bold text-xs">
              Hinge
            </div>
          </Animation.Hinge>
        </AnimationCard>

        {/* ============================================== */}
        {/* Iteration Example */}
        {/* ============================================== */}
        <AnimationCard label="Infinite Loop">
          <Animation.Bounce iteration="infinite">
            <div className="w-14 h-14 bg-cyan-500 rounded-full shadow-lg flex items-center justify-center text-white font-bold text-xs">
              Loop
            </div>
          </Animation.Bounce>
        </AnimationCard>
      </div>
    </div>
  );
}