'use client';

import { AspectRatio } from 'vayu-ui';
import { Button } from 'vayu-ui';
import { Divider } from 'vayu-ui';
import { Typography } from 'vayu-ui';
import Image from 'next/image';

// Helper to render a placeholder box using semantic design tokens
const Placeholder = ({ label }: { label: string }) => (
  <div className="flex items-center justify-center h-full w-full bg-muted border border-dashed border-field rounded-surface font-tertiary text-muted-content text-sm">
    {label}
  </div>
);

export default function AspectRatioDemo() {
  return (
    <div className="w-full max-w-3xl not-prose space-y-12">
      {/* 1. All Preset Variants */}
      <section>
        <Typography.H3 className="mb-4">Preset Ratios</Typography.H3>
        <Typography.P variant="secondary" className="mb-6">
          Built-in aspect ratio presets for common use cases.
        </Typography.P>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {/* Landscape-ish Presets */}
          <AspectRatio ratio="square" decorative rounded shadow>
            <Placeholder label="square (1:1)" />
          </AspectRatio>
          <AspectRatio ratio="video" decorative rounded shadow>
            <Placeholder label="video (16:9)" />
          </AspectRatio>
          <AspectRatio ratio="photo" decorative rounded shadow>
            <Placeholder label="photo (4:3)" />
          </AspectRatio>
          <AspectRatio ratio="landscape" decorative rounded shadow>
            <Placeholder label="landscape (3:2)" />
          </AspectRatio>
          <AspectRatio ratio="ultrawide" decorative rounded shadow>
            <Placeholder label="ultrawide (21:9)" />
          </AspectRatio>
          <AspectRatio ratio="cinema" decorative rounded shadow>
            <Placeholder label="cinema (2.39:1)" />
          </AspectRatio>

          {/* Portrait-ish Presets */}
          <AspectRatio ratio="portrait" decorative rounded shadow className="row-span-2">
            <Placeholder label="portrait (9:16)" />
          </AspectRatio>

          {/* Special Presets */}
          <AspectRatio ratio="golden" decorative rounded shadow>
            <Placeholder label="golden (1.618)" />
          </AspectRatio>
          <AspectRatio ratio="a4" decorative rounded shadow>
            <Placeholder label="a4 (√2)" />
          </AspectRatio>
        </div>
      </section>

      <Divider decorative spacing="lg" />

      {/* 2. Device Specific Presets */}
      <section>
        <Typography.H3 className="mb-4">Device Presets</Typography.H3>
        <Typography.P variant="secondary" className="mb-6">
          Aspect ratios optimized for specific device screens.
        </Typography.P>
        <div className="flex gap-4 items-end">
          <div className="flex-1 max-w-50">
            <Typography.Label variant="secondary" className="block mb-2 text-center">
              iPhone
            </Typography.Label>
            <AspectRatio ratio="iphone" decorative rounded shadow>
              <Placeholder label="19.5:9" />
            </AspectRatio>
          </div>
          <div className="flex-1 max-w-37.5">
            <Typography.Label variant="secondary" className="block mb-2 text-center">
              iPad
            </Typography.Label>
            <AspectRatio ratio="ipad" decorative rounded shadow>
              <Placeholder label="4:3" />
            </AspectRatio>
          </div>
        </div>
      </section>

      <Divider decorative spacing="lg" />

      {/* 3. Custom Numeric Ratio */}
      <section>
        <Typography.H3 className="mb-4">Custom Numeric Ratio</Typography.H3>
        <Typography.P variant="secondary" className="mb-6">
          Pass any numeric value for custom aspect ratios.
        </Typography.P>
        <div className="max-w-md">
          <AspectRatio ratio={2.5} decorative rounded shadow bordered>
            <Placeholder label="2.5 : 1" />
          </AspectRatio>
        </div>
      </section>

      <Divider decorative spacing="lg" />

      {/* 4. Object Fit Behavior */}
      <section>
        <Typography.H3 className="mb-4">Object Fit Options</Typography.H3>
        <Typography.P variant="secondary" className="mb-6">
          Control how images and videos fill the container.
        </Typography.P>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cover (Default) */}
          <div>
            <Typography.Label variant="secondary" className="block mb-2">
              objectFit="cover" (Default)
            </Typography.Label>
            <AspectRatio ratio="square" decorative rounded shadow>
              <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80"
                alt="Mountain landscape"
                fill
                className="object-cover"
                unoptimized
              />
            </AspectRatio>
          </div>

          {/* Contain */}
          <div>
            <Typography.Label variant="secondary" className="block mb-2">
              objectFit="contain"
            </Typography.Label>
            <AspectRatio
              ratio="square"
              objectFit="contain"
              decorative
              rounded
              shadow
              className="bg-muted"
            >
              <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80"
                alt="Mountain landscape"
                fill
                className="object-contain"
                unoptimized
              />
            </AspectRatio>
          </div>
        </div>
      </section>

      <Divider decorative spacing="lg" />

      {/* 5. Design System Props */}
      <section>
        <Typography.H3 className="mb-4">Design System Props</Typography.H3>
        <Typography.P variant="secondary" className="mb-6">
          Built-in props for rounded corners, shadows, and borders using design tokens.
        </Typography.P>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Typography.Label variant="secondary" className="block mb-2 text-center">
              rounded
            </Typography.Label>
            <AspectRatio ratio="video" decorative rounded>
              <Placeholder label="Rounded corners" />
            </AspectRatio>
          </div>
          <div>
            <Typography.Label variant="secondary" className="block mb-2 text-center">
              shadow
            </Typography.Label>
            <AspectRatio ratio="video" decorative shadow>
              <Placeholder label="Subtle shadow" />
            </AspectRatio>
          </div>
          <div>
            <Typography.Label variant="secondary" className="block mb-2 text-center">
              bordered
            </Typography.Label>
            <AspectRatio ratio="video" decorative bordered>
              <Placeholder label="With border" />
            </AspectRatio>
          </div>
        </div>
      </section>

      <Divider decorative spacing="lg" />

      {/* 6. Accessible Example with aria-label */}
      <section>
        <Typography.H3 className="mb-4">Accessibility (Named Region)</Typography.H3>
        <Typography.P variant="secondary" className="mb-4">
          Pass an <Typography.Code codeLang="tsx">aria-label</Typography.Code> to create a named
          landmark region for screen readers.
        </Typography.P>
        <AspectRatio ratio="ultrawide" aria-label="Featured article images" rounded shadow>
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

      <Divider decorative spacing="lg" />

      {/* 7. Interactive Example */}
      <section>
        <Typography.H3 className="mb-4">Interactive Example</Typography.H3>
        <Typography.P variant="secondary" className="mb-6">
          Combine AspectRatio with other components for interactive layouts.
        </Typography.P>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <AspectRatio ratio="photo" rounded shadow bordered>
            <Image
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80"
              alt="Nature landscape"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-linear-to-t from-canvas/20 dark:from-canvas/80  to-transparent flex flex-col justify-end p-4">
              <Typography.H5 className="text-canvas-content mb-2">Mountain Vista</Typography.H5>
              <Typography.P
                variant="secondary"
                className="text-sm text-canvas-content/80 dark:text-canvas-content/80 mb-3"
              >
                Explore the beauty of nature
              </Typography.P>
              <Button variant="primary" size="small" className="w-fit">
                <Button.Text>Learn More</Button.Text>
              </Button>
            </div>
          </AspectRatio>
          <AspectRatio ratio="photo" rounded shadow bordered>
            <Image
              src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&q=80"
              alt="Waterfall landscape"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-linear-to-t from-canvas/20 dark:from-canvas/80  to-transparent flex flex-col justify-end p-4">
              <Typography.H5 className="text-canvas-content dark:text-canvas-content mb-2">
                Waterfall Wonder
              </Typography.H5>
              <Typography.P
                variant="secondary"
                className="text-sm text-canvas-content/80 dark:text-canvas-content/80 mb-3"
              >
                Discover hidden gems
              </Typography.P>
              <Button variant="primary" size="small" className="w-fit">
                <Button.Text>Explore</Button.Text>
              </Button>
            </div>
          </AspectRatio>
        </div>
      </section>
    </div>
  );
}
