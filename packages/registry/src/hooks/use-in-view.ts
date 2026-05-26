import { HookRegistryEntry } from '../types.js';

export const useInViewEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-in-view',
  name: 'useInView',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Tracks whether a DOM element is inside the viewport using the Intersection Observer API, with configurable threshold, root margin, and one-shot or continuous observation.',
  longDescription:
    'Wraps the native IntersectionObserver API in a React-friendly hook that returns a ref to attach to a target element and a boolean indicating whether that element is currently visible in the viewport. By default, the observer disconnects after the first intersection (triggerOnce: true), making it ideal for lazy-loading, entrance animations, and one-time analytics events. Set triggerOnce to false for continuous tracking, such as pausing a video when the user scrolls it out of view. The threshold controls how much of the element must be visible before isInView becomes true, and rootMargin allows expanding or shrinking the effective viewport bounds. The hook automatically cleans up the observer on unmount and when key options change. It is SSR-safe because IntersectionObserver only runs in the browser inside a useEffect.',
  tags: [
    'intersection-observer',
    'viewport',
    'visibility',
    'scroll',
    'lazy-load',
    'animation-trigger',
    'dom',
    'performance',
    'observe',
    'ssr-safe',
  ],
  category: 'dom',
  useCases: [
    'Trigger CSS entrance animations (fade-in, slide-up) when elements scroll into view for the first time',
    'Lazy-load images, iframes, or heavy components only when they approach the viewport, reducing initial page weight',
    'Track ad impressions or content views by firing an analytics event once an element becomes visible',
    'Pause background videos or auto-playing carousels when the user scrolls them out of view to save CPU and battery',
    'Implement infinite scroll by detecting when a sentinel element at the bottom of a list enters the viewport',
    'Show or hide a sticky header, back-to-top button, or progress indicator based on the visibility of a target section',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useInView.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature:
    'function useInView<T extends HTMLElement = HTMLDivElement>(options?: UseInViewOptions): { ref: React.RefObject<T | null>; isInView: boolean }',
  typeParams: ['T extends HTMLElement = HTMLDivElement'],
  returnType: '{ ref: React.RefObject<T | null>; isInView: boolean }',
  parameters: [
    {
      name: 'options',
      type: 'UseInViewOptions',
      required: false,
      defaultValue: '{}',
      description:
        'Optional configuration object for the IntersectionObserver. Controls threshold, root margin, and whether to observe once or continuously.',
    },
    {
      name: 'options.threshold',
      type: 'number',
      required: false,
      defaultValue: '0.1',
      description:
        'A number between 0 and 1 indicating what proportion of the target element must be visible before isInView becomes true. 0 means any visible pixel triggers it; 1 means the entire element must be visible.',
    },
    {
      name: 'options.triggerOnce',
      type: 'boolean',
      required: false,
      defaultValue: 'true',
      description:
        'If true, the observer disconnects after the first time the element enters the viewport, and isInView stays true forever. Set to false for continuous visibility tracking.',
    },
    {
      name: 'options.rootMargin',
      type: 'string',
      required: false,
      defaultValue: "'0px'",
      description:
        'Margin around the root (viewport) in CSS margin syntax, e.g. "100px", "10px 20px", or "-50px". Positive values expand the detection area (pre-loading), negative values shrink it.',
    },
  ],
  returnValues: [
    {
      name: 'ref',
      type: 'React.RefObject<T | null>',
      description:
        'A React ref to attach to the target DOM element. The hook observes the element referenced by this ref. If the ref is not attached to any element, observation does not begin.',
    },
    {
      name: 'isInView',
      type: 'boolean',
      description:
        'True when the observed element intersects the viewport according to the configured threshold and rootMargin. With triggerOnce: true, it becomes true on first intersection and never reverts.',
    },
  ],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Fade-In on Scroll',
      description:
        'Elements that fade in and slide up as they scroll into view, using triggerOnce for a one-time entrance animation.',
      code: `import { useInView } from 'vayu-ui';

function FadeInSection({ children }: { children: React.ReactNode }) {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={\`transition-all duration-700 \${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }\`}
    >
      {children}
    </div>
  );
}

export default function ScrollPage() {
  return (
    <div className="space-y-24 py-12">
      {Array.from({ length: 6 }, (_, i) => (
        <FadeInSection key={i}>
          <div className="p-8 rounded-surface bg-surface text-surface-content border max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold">Section {i + 1}</h2>
            <p className="text-muted-content mt-2">
              This section fades in as it enters the viewport.
            </p>
          </div>
        </FadeInSection>
      ))}
    </div>
  );
}`,
      tags: ['fade-in', 'scroll', 'animation', 'trigger-once'],
    },
    {
      title: 'Lazy Image Loading',
      description:
        'Loads an image only when it approaches the viewport, using a rootMargin to start loading 200px before it becomes visible.',
      code: `import { useInView } from 'vayu-ui';
import { useState } from 'react';

export default function LazyImage({ src, alt }: { src: string; alt: string }) {
  const { ref, isInView } = useInView({ rootMargin: '200px', triggerOnce: true });
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      ref={ref}
      className="aspect-video rounded-surface bg-muted overflow-hidden"
    >
      {isInView ? (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={\`w-full h-full object-cover transition-opacity duration-500 \${
            loaded ? 'opacity-100' : 'opacity-0'
          }\`}
        />
      ) : (
        <div className="w-full h-full animate-pulse bg-muted" />
      )}
    </div>
  );
}`,
      tags: ['lazy-load', 'image', 'performance', 'placeholder'],
    },
    {
      title: 'Infinite Scroll Sentinel',
      description:
        'A sentinel element at the bottom of a list that triggers loading more items when it enters the viewport.',
      code: `import { useInView } from 'vayu-ui';
import { useState, useEffect, useCallback } from 'react';

export default function InfiniteList() {
  const [items, setItems] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadMore = useCallback(async () => {
    setLoading(true);
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 800));
    const newItems = Array.from({ length: 10 }, (_, i) => \`Item \${(page - 1) * 10 + i + 1}\`);
    setItems((prev) => [...prev, ...newItems]);
    setPage((p) => p + 1);
    setLoading(false);
  }, [page]);

  const { ref, isInView } = useInView({ threshold: 0, triggerOnce: false });

  useEffect(() => {
    if (isInView && !loading) {
      loadMore();
    }
  }, [isInView, loading, loadMore]);

  return (
    <div className="space-y-2 max-w-md">
      {items.map((item) => (
        <div key={item} className="px-4 py-3 rounded-control bg-surface text-surface-content border">
          {item}
        </div>
      ))}
      <div ref={ref} className="h-8" />
      {loading && <p className="text-sm text-muted-content text-center py-2">Loading...</p>}
    </div>
  );
}`,
      tags: ['infinite-scroll', 'pagination', 'list', 'sentinel'],
    },
    {
      title: 'Video Pause on Exit',
      description:
        'Continuously tracks video visibility and pauses playback when the user scrolls it out of view, resuming when it returns.',
      code: `import { useInView } from 'vayu-ui';
import { useRef, useEffect } from 'react';

export default function AutoPauseVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, isInView } = useInView({ triggerOnce: false, threshold: 0.5 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <div ref={ref} className="rounded-surface overflow-hidden border">
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        className="w-full aspect-video object-cover"
      />
      <div className="px-3 py-2 text-xs text-muted-content flex items-center gap-2">
        <span
          className={\`w-2 h-2 rounded-full \${
            isInView ? 'bg-success' : 'bg-muted'
          }\`}
        />
        {isInView ? 'Playing' : 'Paused — scroll to resume'}
      </div>
    </div>
  );
}`,
      tags: ['video', 'auto-pause', 'continuous', 'media'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Forgetting to attach the ref to a DOM element',
      bad: `const { isInView } = useInView();
// ref is never used — isInView will always be false`,
      good: `const { ref, isInView } = useInView();
return <div ref={ref}>Content</div>;`,
      reason:
        'The IntersectionObserver needs a target element to observe. If the ref is not attached to a rendered DOM node, the observer never starts, and isInView will remain false forever.',
    },
    {
      title: 'Attaching the ref to a React component instead of a DOM element',
      bad: `const { ref, isInView } = useInView();
return <MyCustomCard ref={ref} />;
// MyCustomCard may not forward the ref to a DOM node`,
      good: `const { ref, isInView } = useInView();
return (
  <div ref={ref}>
    <MyCustomCard />
  </div>
);`,
      reason:
        'React refs on custom components only work if the component correctly forwards the ref to an underlying DOM element using React.forwardRef. To avoid silent failures, wrap the ref around a native HTML element or verify the component supports ref forwarding.',
    },
    {
      title: 'Using triggerOnce: false when you only need a one-time animation',
      bad: `const { ref, isInView } = useInView({ triggerOnce: false });
// Element fades out when scrolled away, then back in`,
      good: `const { ref, isInView } = useInView({ triggerOnce: true });
// Element fades in once and stays visible`,
      reason:
        'Continuous observation (triggerOnce: false) keeps the IntersectionObserver alive and re-evaluates on every scroll. For entrance animations or one-time events, this is unnecessary overhead and can cause flickering if the element leaves and re-enters the viewport.',
    },
    {
      title: 'Observing many elements with separate hook instances',
      bad: `{items.map((item) => {
  const { ref, isInView } = useInView();
  return <div ref={ref}>{item}</div>;
})}`,
      good: `// Use a single IntersectionObserver with multiple targets
// or batch visibility tracking with a shared observer`,
      reason:
        'Creating a separate IntersectionObserver per list item is expensive for large lists. Each observer runs independently and increases memory usage. For many elements, use a single observer instance with multiple targets, or use a dedicated virtualization library.',
    },
    {
      title: 'Expecting isInView to be true during SSR or initial render',
      bad: `const { isInView } = useInView();
// isInView is false on first render — layout may shift`,
      good: `const { isInView } = useInView();
return (
  <div className={isInView ? 'opacity-100' : 'opacity-0'}>
    Content
  </div>
);`,
      reason:
        'IntersectionObserver is a browser-only API. During SSR and the initial client render, isInView is always false because observation begins inside useEffect after mount. Design animations to start from a hidden state and transition to visible, avoiding layout shift.',
    },
  ],
};
