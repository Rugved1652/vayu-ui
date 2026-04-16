import { HookRegistryEntry } from '../types.js';

export const useMouseTrackEntry: HookRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'use-mouse-track',
  name: 'useMouseTrack',
  type: 'hook',

  // ── Description ───────────────────────────────────────
  description:
    'Tracks the mouse cursor position relative to the viewport in real time, returning the current clientX and clientY coordinates.',
  longDescription:
    'Subscribes to the native window "mousemove" event via a React useEffect and exposes the cursor\'s viewport coordinates as reactive state. Every time the pointer moves, the hook updates the returned { x, y } object — where x is clientX and y is clientY — causing a re-render of the consuming component. The event listener is registered once on mount (empty dependency array) and cleaned up on unmount, preventing memory leaks. Because the hook attaches to the window object, it captures mouse movement anywhere on the page regardless of which element is hovered. The initial value is { x: 0, y: 0 } until the first mousemove event fires. On the server, the useEffect does not run, so the hook returns { x: 0, y: 0 } safely without hydration mismatches. Choose this hook over manually wiring window.addEventListener when you need declarative, cleanup-free access to cursor position for visual effects, custom cursors, parallax, or interactive gradients. For element-relative coordinates, pair with a ref and getBoundingClientRect instead of using this hook directly.',
  tags: [
    'mouse',
    'position',
    'cursor',
    'coordinates',
    'tracking',
    'viewport',
    'mousemove',
    'pointer',
    'parallax',
    'interactive',
  ],
  category: 'sensor',
  useCases: [
    'Build a custom cursor that follows the native pointer with additional visual effects like trailing glow, magnetic snap, or morphing shapes',
    'Create parallax or tilt effects on cards and images that respond to mouse movement across the viewport',
    'Implement a spotlight or radial gradient overlay that follows the cursor to reveal hidden content or add depth to the UI',
    'Display real-time coordinate readouts for debugging layouts, building design tools, or creating educational geometry demos',
    'Drive interactive data visualizations where the mouse position maps to chart crosshairs, tooltips, or highlighted data points',
    'Build a magnetic button effect where UI elements subtly shift toward the cursor as it approaches, creating playful micro-interactions',
  ],

  // ── File & CLI ────────────────────────────────────────
  fileName: 'useMouseTrack.ts',
  targetPath: 'src/hooks',

  // ── Signature ─────────────────────────────────────────
  signature: 'function useMouseTrack(): { x: number; y: number }',
  typeParams: [],
  parameters: [],
  returnType: '{ x: number; y: number }',
  returnValues: [
    {
      name: 'x',
      type: 'number',
      description:
        'The horizontal distance in CSS pixels from the left edge of the viewport to the cursor position (MouseEvent.clientX). Ranges from 0 to window.innerWidth. Starts at 0 until the first mousemove event fires.',
    },
    {
      name: 'y',
      type: 'number',
      description:
        'The vertical distance in CSS pixels from the top edge of the viewport to the cursor position (MouseEvent.clientY). Ranges from 0 to window.innerHeight. Starts at 0 until the first mousemove event fires.',
    },
  ],

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Custom Cursor Follower',
      description:
        'A glowing circle that follows the mouse cursor with a smooth CSS transition, creating a custom cursor effect overlaid on the page.',
      code: `'use client';
import { useMouseTrack } from 'vayu-ui';

export default function CustomCursor() {
  const { x, y } = useMouseTrack();

  return (
    <div className="relative w-full h-64 rounded-surface border bg-surface overflow-hidden">
      <p className="absolute top-3 left-3 text-xs text-muted-content font-mono">
        Move your mouse anywhere on this card
      </p>
      <div
        className="pointer-events-none absolute w-8 h-8 rounded-full bg-brand/40 blur-sm transition-transform duration-75"
        style={{ transform: \`translate(\${x - 16}px, \${y - 16}px)\` }}
      />
      <div
        className="pointer-events-none absolute w-3 h-3 rounded-full bg-brand transition-transform duration-75"
        style={{ transform: \`translate(\${x - 6}px, \${y - 6}px)\` }}
      />
    </div>
  );
}`,
      tags: ['cursor', 'follower', 'visual-effect', 'animation'],
    },
    {
      title: 'Spotlight Card Effect',
      description:
        'A card that reveals a radial gradient spotlight effect wherever the mouse moves over it, simulating a flashlight illuminating the surface.',
      code: `'use client';
import { useMouseTrack } from 'vayu-ui';

export default function SpotlightCard() {
  const { x, y } = useMouseTrack();

  return (
    <div
      className="relative w-full max-w-md rounded-surface border bg-surface p-6 overflow-hidden text-surface-content"
      style={{
        background: \`radial-gradient(600px circle at \${x}px \${y}px, rgba(59, 130, 246, 0.08), transparent 40%), var(--color-surface)\`,
      }}
    >
      <h3 className="text-lg font-semibold">Spotlight Effect</h3>
      <p className="mt-2 text-sm text-muted-content">
        Move your cursor to see the spotlight follow your mouse across the page.
        The gradient center tracks your pointer in real time.
      </p>
      <div className="mt-4 flex gap-2">
        <span className="px-3 py-1 rounded-control bg-brand text-brand-content text-xs font-medium">
          Interactive
        </span>
        <span className="px-3 py-1 rounded-control bg-muted text-muted-content text-xs">
          Mouse-driven
        </span>
      </div>
    </div>
  );
}`,
      tags: ['spotlight', 'gradient', 'card', 'visual-effect'],
    },
    {
      title: 'Parallax Tilt Card',
      description:
        'A card that tilts toward the mouse position using CSS perspective and rotate transforms, creating a 3D parallax depth illusion.',
      code: `'use client';
import { useMouseTrack } from 'vayu-ui';
import { useMemo } from 'react';

export default function ParallaxTiltCard() {
  const { x, y } = useMouseTrack();

  const tiltStyle = useMemo(() => {
    const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
    const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;
    const rotateY = ((x - centerX) / centerX) * 12;
    const rotateX = ((centerY - y) / centerY) * 12;

    return {
      transform: \`perspective(600px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`,
      transition: 'transform 0.15s ease-out',
    };
  }, [x, y]);

  return (
    <div className="flex items-center justify-center w-full h-72">
      <div
        className="w-64 h-40 rounded-surface border bg-elevated shadow-elevated p-5 flex flex-col justify-between"
        style={tiltStyle}
      >
        <h4 className="text-sm font-semibold text-elevated-content">Parallax Card</h4>
        <p className="text-xs text-muted-content">
          Moves with your cursor to create a 3D tilt effect.
        </p>
      </div>
    </div>
  );
}`,
      tags: ['parallax', 'tilt', '3d', 'transform', 'card'],
    },
    {
      title: 'Live Coordinate Display',
      description:
        'A debug-style panel that displays the current mouse coordinates in real time, useful for layout debugging or educational tools.',
      code: `'use client';
import { useMouseTrack } from 'vayu-ui';

export default function CoordinateDisplay() {
  const { x, y } = useMouseTrack();

  return (
    <div className="w-full max-w-sm rounded-surface border bg-surface p-4 space-y-3">
      <p className="text-xs font-semibold text-muted-content uppercase tracking-wider">
        Cursor Position
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-control bg-muted/30 p-3 text-center">
          <p className="text-xs text-muted-content mb-1">X</p>
          <p className="text-lg font-mono font-semibold text-surface-content">
            {x}px
          </p>
        </div>
        <div className="rounded-control bg-muted/30 p-3 text-center">
          <p className="text-xs text-muted-content mb-1">Y</p>
          <p className="text-lg font-mono font-semibold text-surface-content">
            {y}px
          </p>
        </div>
      </div>
      <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
        <div
          className="h-full bg-brand rounded-full transition-all duration-100"
          style={{ width: \`\${(x / (typeof window !== 'undefined' ? window.innerWidth : 1)) * 100}%\` }}
        />
      </div>
    </div>
  );
}`,
      tags: ['coordinates', 'debug', 'display', 'real-time'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using viewport coordinates for element-relative positioning',
      bad: `const { x, y } = useMouseTrack();
// Assuming x, y are relative to a specific element
<div style={{ transform: \`translate(\${x}px, \${y}px)\` }} />`,
      good: `// For element-relative coordinates, use a ref + getBoundingClientRect
const ref = useRef<HTMLDivElement>(null);
const { x, y } = useMouseTrack();
const [local, setLocal] = useState({ x: 0, y: 0 });

useEffect(() => {
  const rect = ref.current?.getBoundingClientRect();
  if (rect) setLocal({ x: x - rect.left, y: y - rect.top });
}, [x, y]);`,
      reason:
        'useMouseTrack returns clientX/clientY, which are relative to the viewport top-left corner — not to any specific element. If you position a child element using these values directly, it will be offset by the element\'s own position on the page. Subtract getBoundingClientRect().left/top to convert to element-local coordinates.',
    },
    {
      title: 'Ignoring performance with unthrottled re-renders',
      bad: `// Re-renders on every single pixel of mouse movement
const { x, y } = useMouseTrack();
return <div style={{ transform: \`translate(\${x}px, \${y}px)\` }}>Heavy content</div>;`,
      good: `// Throttle or debounce the position for expensive renders
const { x, y } = useMouseTrack();
const throttledX = useThrottle(x, 16); // ~60fps
const throttledY = useThrottle(y, 16);
return <div style={{ transform: \`translate(\${throttledX}px, \${throttledY}px)\` }}>Heavy content</div>;`,
      reason:
        'The mousemove event fires at the display refresh rate (often 60-120+ times per second). Each event triggers a setState and a re-render. If your component has expensive rendering logic, this can cause frame drops. Pair with useThrottle or useDebounce for heavy components, or use requestAnimationFrame-based throttling.',
    },
    {
      title: 'Expecting coordinates during server-side rendering',
      bad: `const { x, y } = useMouseTrack();
// Using x, y for initial layout calculations on the server
const initialAngle = Math.atan2(y, x);`,
      good: `const { x, y } = useMouseTrack();
// x and y are 0 on the server — handle the default state
const angle = x === 0 && y === 0 ? 0 : Math.atan2(y, x);`,
      reason:
        'During SSR, useEffect does not run, so the hook returns { x: 0, y: 0 } — the default state. If you use the coordinates for layout calculations, math operations, or conditional rendering that differs from the client, you will get hydration mismatches. Always account for the zero-default state in your logic.',
    },
    {
      title: 'Calling the hook conditionally',
      bad: `if (isActive) {
  const { x, y } = useMouseTrack();
}`,
      good: `const { x, y } = useMouseTrack();
// Use the values conditionally instead
const effectiveX = isActive ? x : 0;`,
      reason:
        'React hooks must be called unconditionally at the top level of a component. Calling useMouseTrack inside a conditional, loop, or nested function violates the Rules of Hooks and will cause crashes or stale state. Always call the hook at the top level and use the returned values conditionally.',
    },
    {
      title: 'Confusing clientX/clientY with pageX/pageY or screenX/screenY',
      bad: `const { x, y } = useMouseTrack();
// Expecting coordinates relative to the full document (including scroll)
window.scrollTo(x, y);`,
      good: `// useMouseTrack gives viewport coordinates (clientX/clientY)
// For document-relative coords, add scroll offsets:
const docX = x + window.scrollX;
const docY = y + window.scrollY;`,
      reason:
        'The hook returns clientX and clientY, which are relative to the viewport and ignore page scroll. If you need document-relative coordinates (equivalent to pageX/pageY), you must manually add window.scrollX and window.scrollY. If you need screen-relative coordinates, use screenX/screenY from a raw event listener instead.',
    },
  ],
};
