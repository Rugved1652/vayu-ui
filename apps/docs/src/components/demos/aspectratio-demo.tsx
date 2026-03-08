"use client";

import { AspectRatio } from "vayu-ui";
import Image from "next/image"; // Assuming Next.js usage based on 'use client'

// Helper to render a placeholder box
const Placeholder = ({ label }: { label: string }) => (
  <div className="flex items-center justify-center h-full w-full bg-gray-100 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600 rounded text-xs font-mono text-gray-500">
    {label}
  </div>
);

export default function AspectRatioDemo() {
  return (
    <div className="w-full max-w-3xl not-prose space-y-10">
      
      {/* 1. All Preset Variants */}
      <section>
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-50">
          Preset Ratios
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {/* Landscape-ish Presets */}
          <AspectRatio ratio="square" decorative>
            <Placeholder label="square (1:1)" />
          </AspectRatio>
          <AspectRatio ratio="video" decorative>
            <Placeholder label="video (16:9)" />
          </AspectRatio>
          <AspectRatio ratio="photo" decorative>
            <Placeholder label="photo (4:3)" />
          </AspectRatio>
          <AspectRatio ratio="landscape" decorative>
            <Placeholder label="landscape (3:2)" />
          </AspectRatio>
          <AspectRatio ratio="ultrawide" decorative>
            <Placeholder label="ultrawide (21:9)" />
          </AspectRatio>
          <AspectRatio ratio="cinema" decorative>
            <Placeholder label="cinema (2.39:1)" />
          </AspectRatio>

          {/* Portrait-ish Presets */}
          <AspectRatio ratio="portrait" decorative className="row-span-2">
            <Placeholder label="portrait (9:16)" />
          </AspectRatio>
          
          {/* Special Presets */}
          <AspectRatio ratio="golden" decorative>
            <Placeholder label="golden (1.618)" />
          </AspectRatio>
          <AspectRatio ratio="a4" decorative>
            <Placeholder label="a4 (√2)" />
          </AspectRatio>
        </div>
      </section>

      {/* 2. Device Specific Presets */}
      <section>
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-50">
          Device Presets
        </h2>
        <div className="flex gap-4 items-end">
          <div className="flex-1 max-w-[200px]">
            <p className="text-xs text-gray-500 mb-2 text-center">iPhone</p>
            <AspectRatio ratio="iphone" decorative>
              <Placeholder label="19.5:9" />
            </AspectRatio>
          </div>
          <div className="flex-1 max-w-[150px]">
            <p className="text-xs text-gray-500 mb-2 text-center">iPad</p>
            <AspectRatio ratio="ipad" decorative>
              <Placeholder label="4:3" />
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* 3. Custom Numeric Ratio */}
      <section>
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-50">
          Custom Numeric Ratio
        </h2>
        <div className="max-w-md">
          <p className="text-xs text-gray-500 mb-2">
            Custom ratio calculated from number (e.g., 2.5)
          </p>
          <AspectRatio ratio={2.5} decorative>
            <Placeholder label="2.5 : 1" />
          </AspectRatio>
        </div>
      </section>

      {/* 4. Object Fit Behavior */}
      <section>
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-50">
          Object Fit Options
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Cover (Default) */}
          <div>
            <p className="text-xs text-gray-500 mb-2">objectFit="cover" (Default)</p>
            <AspectRatio 
              ratio="square" 
              decorative
              className="rounded overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80"
                alt="Mountain landscape"
                className="w-full h-full"
              />
            </AspectRatio>
          </div>

          {/* Contain */}
          <div>
            <p className="text-xs text-gray-500 mb-2">objectFit="contain"</p>
            <AspectRatio 
              ratio="square" 
              objectFit="contain"
              decorative
              className="rounded bg-gray-100 dark:bg-gray-800 overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80"
                alt="Mountain landscape"
                className="w-full h-full"
              />
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* 5. Accessible Example with aria-label */}
      <section>
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-50">
          Accessibility (Named Region)
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Passing <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">aria-label</code> creates a named landmark region for screen readers.
        </p>
        <AspectRatio
          ratio="video"
          aria-label="Featured article image"
          className="rounded overflow-hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80"
            alt="Foggy mountains during sunrise"
            className="w-full h-full"
            width={800}
            height={450}
            unoptimized
          />
        </AspectRatio>
      </section>

    </div>
  );
}