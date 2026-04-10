import { ComponentRegistryEntry } from '../types.js';

export const sliderEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'slider',
  name: 'Slider',
  type: 'component',
  category: 'inputs',

  // ── Description ───────────────────────────────────────
  description:
    'A range slider component supporting single value or multi-thumb range selection with pointer drag, keyboard navigation, and WCAG 2.2 AA accessibility.',
  longDescription:
    'The Slider component provides single value or range (multiple thumbs) selection within a configurable min/max range. It supports controlled and uncontrolled modes, custom step intervals, form submission via hidden inputs, pointer capture for smooth dragging, and comprehensive keyboard navigation (Arrow keys, Page Up/Down, Home/End). Built with compound component sub-components Slider.Track and Slider.Thumb for visual customization.',
  tags: [
    'slider',
    'range',
    'input',
    'value',
    'thumb',
    'track',
    'drag',
    'form',
    'accessible',
    'volume',
    'brightness',
  ],
  useCases: [
    'Volume, brightness, or opacity controls where the user picks a single numeric value from a range',
    'Price range or date range filters with two thumbs selecting a minimum and maximum',
    'Form inputs that need a visual alternative to number text fields',
    'Settings panels with stepped increments (e.g. font size, zoom level)',
    'Progress indicators that allow the user to scrub to a specific position',
    'Any UI where the user adjusts a continuous or stepped numeric value',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Slider',
  files: [
    {
      name: 'Slider.tsx',
      description:
        'Root slider component that composes Track and Thumb, manages drag state via useSliderDrag hook, and renders hidden form inputs',
    },
    {
      name: 'SliderTrack.tsx',
      description: 'Track bar with range fill visualization for single value and range modes',
    },
    {
      name: 'SliderThumb.tsx',
      description:
        'Individual thumb element with keyboard navigation, ARIA slider role, and drag feedback',
    },
    { name: 'types.ts', description: 'TypeScript type definitions for SliderProps' },
    {
      name: 'hooks.ts',
      description:
        'useSliderDrag hook managing pointer capture, value clamping, step snapping, and controlled/uncontrolled state',
    },
    {
      name: 'index.ts',
      description: 'Barrel export file re-exporting Slider component and SliderProps type',
    },
  ],
  targetPath: 'src/components/ui',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Slider',
  subComponents: [
    {
      name: 'Track',
      fileName: 'SliderTrack.tsx',
      description:
        'Renders the horizontal track bar with a colored range fill between thumb positions, hidden from assistive technology via aria-hidden',
      props: [
        {
          name: 'min',
          type: 'number',
          required: true,
          description: 'Minimum value of the slider range',
        },
        {
          name: 'max',
          type: 'number',
          required: true,
          description: 'Maximum value of the slider range',
        },
        {
          name: 'values',
          type: 'number[]',
          required: true,
          description:
            'Current thumb values used to calculate the range fill position',
        },
      ],
    },
    {
      name: 'Thumb',
      fileName: 'SliderThumb.tsx',
      description:
        'Renders a draggable thumb with full keyboard navigation, ARIA slider role, and visual scale feedback during drag',
      props: [
        {
          name: 'value',
          type: 'number',
          required: true,
          description: 'Current numeric value of this thumb',
        },
        {
          name: 'min',
          type: 'number',
          required: true,
          description: 'Minimum allowed value',
        },
        {
          name: 'max',
          type: 'number',
          required: true,
          description: 'Maximum allowed value',
        },
        {
          name: 'step',
          type: 'number',
          required: true,
          description: 'Stepping interval for keyboard increments',
        },
        {
          name: 'disabled',
          type: 'boolean',
          required: true,
          description: 'Whether the thumb is disabled and non-interactive',
        },
        {
          name: 'sliderId',
          type: 'string',
          required: true,
          description: 'ID of the parent slider, used to generate unique thumb IDs',
        },
        {
          name: 'index',
          type: 'number',
          required: true,
          description: 'Zero-based index of this thumb within the slider',
        },
        {
          name: 'totalThumbs',
          type: 'number',
          required: true,
          description:
            'Total number of thumbs, used for multi-thumb ARIA labels',
        },
        {
          name: 'label',
          type: 'string',
          required: false,
          description:
            'Accessible label for the slider, included in aria-valuetext',
        },
        {
          name: 'isDragging',
          type: 'boolean',
          required: true,
          description: 'Whether any thumb is currently being dragged',
        },
        {
          name: 'isActive',
          type: 'boolean',
          required: true,
          description: 'Whether this specific thumb is the one being dragged',
        },
        {
          name: 'onValueChange',
          type: '(values: number[]) => void',
          required: true,
          description:
            'Callback fired when the value changes during drag or keyboard interaction',
        },
        {
          name: 'onValueCommit',
          type: '(values: number[]) => void',
          required: true,
          description:
            'Callback fired when the value change is committed (drag end or key release)',
        },
        {
          name: 'values',
          type: 'number[]',
          required: true,
          description:
            'Full array of all thumb values, used to update the correct thumb on interaction',
        },
      ],
    },
  ],
  hooks: ['useSliderDrag'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'value',
      type: 'number[]',
      required: false,
      description:
        'Controlled value(s). Pass an array with one element for single thumb, or two elements for a range slider.',
    },
    {
      name: 'defaultValue',
      type: 'number[]',
      required: false,
      defaultValue: '[0]',
      description:
        'Initial value(s) when uncontrolled. Defaults to [0] for a single thumb at the minimum.',
    },
    {
      name: 'min',
      type: 'number',
      required: false,
      defaultValue: '0',
      description: 'Minimum value of the slider range',
    },
    {
      name: 'max',
      type: 'number',
      required: false,
      defaultValue: '100',
      description: 'Maximum value of the slider range',
    },
    {
      name: 'step',
      type: 'number',
      required: false,
      defaultValue: '1',
      description:
        'Stepping interval. Values snap to multiples of this value within the min-max range.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Disables all interaction and reduces opacity to 50%',
    },
    {
      name: 'name',
      type: 'string',
      required: false,
      description:
        'Name attribute for hidden inputs, enabling the slider value to be submitted in forms. For multi-thumb sliders, the name is suffixed with "[]".',
    },
    {
      name: 'label',
      type: 'string',
      required: false,
      description:
        'Accessible label for the slider group. Used as aria-label on the root and in thumb aria-valuetext.',
    },
    {
      name: 'onValueChange',
      type: '(value: number[]) => void',
      required: false,
      description:
        'Callback fired on every value change during drag or keyboard interaction',
    },
    {
      name: 'onValueCommit',
      type: '(value: number[]) => void',
      required: false,
      description:
        'Callback fired when a value change is committed (on pointer up or keyboard release)',
    },
  ],
  rendersAs: 'div',

  // ── Variants & Sizes ──────────────────────────────────
  // Slider has no variant or size props

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'disabled',
      prop: 'disabled',
      isBoolean: true,
      defaultValue: 'false',
      description:
        'Disables pointer and keyboard interaction. Thumbs become non-focusable, the root gets aria-disabled, and opacity is reduced to 50%.',
    },
    {
      name: 'dragging',
      prop: 'isDragging',
      isBoolean: true,
      defaultValue: 'false',
      description:
        'Internal state activated during pointer drag. The active thumb scales up (scale-110) for visual feedback. Managed automatically by the useSliderDrag hook.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onValueChange',
      signature: '(value: number[]) => void',
      description:
        'Fired on every value change — during pointer drag, pointer down, and keyboard arrow/page/home/end key presses',
    },
    {
      name: 'onValueCommit',
      signature: '(value: number[]) => void',
      description:
        'Fired when the value change is committed — on pointer up (drag end) and keyboard key release. Use this for form submissions or API calls to avoid firing on every intermediate value.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'group',
    attributes: [
      {
        name: 'aria-label',
        description:
          'Applied to the root group element using the label prop, or falls back to "Slider". Provides the accessible name for the entire slider group.',
        managedByComponent: true,
      },
      {
        name: 'aria-disabled',
        description:
          'Applied to the root group element when the disabled prop is true, signaling the inactive state to assistive technology.',
        managedByComponent: true,
      },
      {
        name: 'role="slider" (Thumb)',
        description:
          'Each thumb element has role="slider", making it recognized as a range input by screen readers.',
        managedByComponent: true,
      },
      {
        name: 'aria-valuemin',
        description:
          'Applied to each thumb, reflecting the minimum allowed value.',
        managedByComponent: true,
      },
      {
        name: 'aria-valuemax',
        description:
          'Applied to each thumb, reflecting the maximum allowed value.',
        managedByComponent: true,
      },
      {
        name: 'aria-valuenow',
        description:
          'Applied to each thumb, reflecting its current numeric value.',
        managedByComponent: true,
      },
      {
        name: 'aria-valuetext',
        description:
          'Applied to each thumb with a human-readable string combining the label and value (e.g. "Volume: 50"). Falls back to the raw value string when no label is provided.',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Thumb)',
        description:
          'Each thumb gets a label: for multi-thumb sliders it is "{label} {index+1} of {total}", for single thumb it is the label or "Slider value".',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden (Track)',
        description:
          'The track element is marked aria-hidden="true" since the thumbs already convey the value information to assistive technology.',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'ArrowRight / ArrowUp',
        behavior: 'Increases the active thumb value by one step',
      },
      {
        key: 'ArrowLeft / ArrowDown',
        behavior: 'Decreases the active thumb value by one step',
      },
      {
        key: 'PageUp',
        behavior: 'Increases the active thumb value by 10 steps',
      },
      {
        key: 'PageDown',
        behavior: 'Decreases the active thumb value by 10 steps',
      },
      {
        key: 'Home',
        behavior: 'Moves the active thumb to the minimum value',
      },
      {
        key: 'End',
        behavior: 'Moves the active thumb to the maximum value',
      },
      {
        key: 'Tab',
        behavior:
          'Moves focus between thumbs (when multiple) and other focusable elements',
      },
    ],
    focusManagement:
      'Each thumb is individually focusable with tabIndex=0 (or -1 when disabled). Keyboard focus shows a visible ring (focus-visible:ring-2 with ring-offset). During drag, the active thumb gets visual scale feedback.',
    wcagLevel: 'AA',
    notes:
      'The slider follows the WAI-ARIA slider design pattern. The root has role="group" with an aria-label, while each thumb has role="slider" with full ARIA value attributes. Hidden form inputs are rendered when the name prop is provided, enabling value submission without JavaScript. Multi-thumb sliders sort values so thumbs never cross each other.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [{ name: 'clsx' }],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'text-input',
      reason:
        'Sliders and text inputs are commonly paired in settings forms where the slider provides visual adjustment and the input shows the exact value',
    },
    {
      slug: 'button',
      reason:
        'Used alongside sliders for reset, apply, or submit actions in controlled slider scenarios',
    },
    {
      slug: 'tooltip',
      reason:
        'Tooltips can display the current slider value on thumb hover, providing precise numeric feedback',
    },
    {
      slug: 'popover',
      reason:
        'Sliders are often placed inside popovers for compact filter UIs like price range selectors',
    },
    {
      slug: 'card',
      reason:
        'Cards frequently contain slider controls in settings panels, audio players, or product configurators',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Single Value Slider',
      description:
        'A basic volume slider with a single thumb, displaying the current value alongside the slider.',
      code: `import { Slider, Typography } from 'vayu-ui';
import { useState } from 'react';

const { Label } = Typography;

export default function VolumeSlider() {
  const [volume, setVolume] = useState([50]);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label>Volume</Label>
        <span className="font-tertiary tabular-nums text-muted-content">{volume[0]}%</span>
      </div>
      <Slider defaultValue={[50]} max={100} step={1} label="Volume" onValueChange={setVolume} />
    </div>
  );
}`,
      tags: ['single', 'volume', 'default-value', 'uncontrolled'],
    },
    {
      title: 'Range Slider',
      description:
        'A two-thumb range slider for selecting a minimum and maximum value, such as a price range filter.',
      code: `import { Slider, Typography } from 'vayu-ui';
import { useState } from 'react';

const { Label } = Typography;

export default function PriceRangeSlider() {
  const [range, setRange] = useState([20, 80]);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label>Price Range</Label>
        <span className="font-tertiary tabular-nums text-muted-content">
          \${range[0]} - \${range[1]}
        </span>
      </div>
      <Slider
        defaultValue={[20, 80]}
        min={0}
        max={100}
        step={5}
        label="Price range"
        onValueChange={setRange}
      />
    </div>
  );
}`,
      tags: ['range', 'multi-thumb', 'price', 'filter'],
    },
    {
      title: 'Controlled Slider',
      description:
        'A fully controlled slider with external state management and a reset button.',
      code: `import { Slider, Typography, Button } from 'vayu-ui';
import { useState } from 'react';

const { Label } = Typography;

export default function ControlledSlider() {
  const [brightness, setBrightness] = useState([75]);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label>Brightness</Label>
        <span className="font-tertiary tabular-nums text-muted-content">{brightness[0]}%</span>
      </div>
      <Slider
        value={brightness}
        max={100}
        step={1}
        label="Brightness"
        onValueChange={setBrightness}
      />
      <Button variant="ghost" size="small" onClick={() => setBrightness([75])}>
        Reset to 75%
      </Button>
    </div>
  );
}`,
      tags: ['controlled', 'value', 'reset', 'external-state'],
    },
    {
      title: 'Disabled Slider',
      description:
        'A slider in the disabled state with reduced opacity and no interaction.',
      code: `import { Slider, Typography } from 'vayu-ui';

const { Label } = Typography;

export default function DisabledSlider() {
  return (
    <div className="space-y-3">
      <Label>Disabled</Label>
      <Slider defaultValue={[25]} disabled label="Disabled slider" />
    </div>
  );
}`,
      tags: ['disabled', 'state'],
    },
    {
      title: 'Custom Step Slider',
      description:
        'A slider with a custom step interval of 25, snapping to discrete values with labeled tick marks.',
      code: `import { Slider, Typography } from 'vayu-ui';

const { Label } = Typography;

export default function StepSlider() {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label>Custom Step (25)</Label>
      </div>
      <Slider defaultValue={[50]} max={100} step={25} label="Step slider" />
      <div className="flex justify-between font-tertiary text-muted-content px-1">
        <span>0</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span>100</span>
      </div>
    </div>
  );
}`,
      tags: ['step', 'discrete', 'custom-interval', 'ticks'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using a single number instead of an array for value/defaultValue',
      bad: '<Slider defaultValue={50} />',
      good: '<Slider defaultValue={[50]} />',
      reason:
        'The value and defaultValue props expect number[] (an array), even for single-thumb sliders. Passing a bare number causes a TypeScript error and the slider will not render correctly.',
    },
    {
      title: 'Omitting the label prop',
      bad: '<Slider defaultValue={[50]} max={100} />',
      good: '<Slider defaultValue={[50]} max={100} label="Volume" />',
      reason:
        'Without a label, the slider falls back to a generic "Slider" aria-label. Every slider should have a descriptive label so screen reader users understand what the value represents.',
    },
    {
      title: 'Using onChange instead of onValueChange',
      bad: '<Slider defaultValue={[50]} onChange={handleChange} />',
      good: '<Slider defaultValue={[50]} onValueChange={handleChange} />',
      reason:
        'The Slider component deliberately omits the native onChange prop to avoid confusion with the HTML input change event. Use onValueChange for real-time updates and onValueCommit for committed changes.',
    },
    {
      title: 'Setting min greater than max or negative step',
      bad: '<Slider min={100} max={0} step={-1} />',
      good: '<Slider min={0} max={100} step={1} />',
      reason:
        'The slider assumes min < max and a positive step value. Inverting the range or using a negative step produces incorrect positioning and broken keyboard navigation.',
    },
    {
      title: 'Using onValueChange for expensive operations',
      bad: '<Slider onValueChange={(v) => fetchResults(v)} />',
      good: '<Slider onValueChange={setRange} onValueCommit={(v) => fetchResults(v)} />',
      reason:
        'onValueChange fires on every pixel of drag movement. For API calls, database writes, or other expensive operations, use onValueCommit which fires only when the user releases the thumb.',
    },
  ],
};
