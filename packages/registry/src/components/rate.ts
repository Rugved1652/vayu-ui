import { ComponentRegistryEntry } from '../types.js';

export const rateEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'rate',
  name: 'Rate',
  type: 'component',
  category: 'inputs',

  // ── Description ───────────────────────────────────────
  description:
    'A star rating component with half-star precision, custom icons, text labels, and WCAG 2.2 AA accessibility using the compound component pattern.',
  longDescription:
    'The Rate component provides interactive star ratings with support for half-star precision, configurable star counts, custom empty/filled/half icons, text labels per rating level, and read-only display mode. It uses the compound component pattern (Rate.Label, Rate.Stars, Rate.Value, Rate.TextLabel, Rate.Description, Rate.Container, Rate.ErrorText) for flexible composition. Controlled and uncontrolled modes are supported, with keyboard navigation (Arrow keys, Home/End) and full ARIA slider semantics on the stars container.',
  tags: [
    'rate',
    'rating',
    'star',
    'review',
    'feedback',
    'score',
    'input',
    'form',
    'interactive',
  ],
  useCases: [
    'Product or content rating inputs where users select a score from 1 to N stars',
    'Read-only rating display showing an average or user-submitted score',
    'Review forms with labels like "Poor", "Fair", "Good" mapped to each star level',
    'Half-star precision ratings for finer-grained feedback',
    'Custom icon ratings using any SVG (hearts, thumbs-up, etc.) instead of stars',
    'Form validation with error states when a required rating is missing',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Rate',
  files: [
    {
      name: 'Rate.tsx',
      description:
        'Root component providing the RateContext provider, internal state management, default star SVG, and size class mappings',
    },
    {
      name: 'RateStars.tsx',
      description:
        'Stars container with ARIA slider role and keyboard navigation, plus individual star rendering with fill percentages and hover zones',
    },
    {
      name: 'RateLabel.tsx',
      description:
        'Label element linked to the stars container via htmlFor, scaling with the active size',
    },
    {
      name: 'RateDescription.tsx',
      description:
        'Descriptive text rendered below the label for helper text or instructions',
    },
    {
      name: 'RateValue.tsx',
      description:
        'Numeric value display (e.g. "3.5 / 5") and text label display mapped from the labels array',
    },
    {
      name: 'RateContainer.tsx',
      description:
        'Flex layout container for composing Label, Stars, Value, and TextLabel in a horizontal row',
    },
    {
      name: 'RateErrorText.tsx',
      description:
        'Error message text that renders only when the error prop is true, with role="alert"',
    },
    {
      name: 'hooks.ts',
      description:
        'RateContext creation and useRate hook for accessing rating state from compound sub-components',
    },
    {
      name: 'types.ts',
      description:
        'TypeScript type definitions for all Rate props, context, and sub-component prop interfaces',
    },
    {
      name: 'index.ts',
      description:
        'Barrel export file assembling the compound component (Rate.Label, Rate.Stars, etc.) and re-exporting all types',
    },
  ],
  targetPath: 'src/components/ui',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Rate',
  subComponents: [
    {
      name: 'Label',
      fileName: 'RateLabel.tsx',
      description:
        'Renders a label element linked to the stars container via htmlFor, scaling font size with the active rate size',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Label text content',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the label element',
        },
      ],
    },
    {
      name: 'Description',
      fileName: 'RateDescription.tsx',
      description:
        'Renders helper or instructional text below the label in a muted, smaller font',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Description text content',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the description element',
        },
        {
          name: 'id',
          type: 'string',
          required: false,
          description: 'HTML id attribute for the description element',
        },
      ],
    },
    {
      name: 'Stars',
      fileName: 'RateStars.tsx',
      description:
        'Renders the interactive star row with ARIA slider role, keyboard navigation, hover preview, and click selection',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the stars container',
        },
        {
          name: 'aria-label',
          type: 'string',
          required: false,
          defaultValue: "'Rating'",
          description:
            'Accessible label for the stars slider; defaults to "Rating" if not provided',
        },
      ],
    },
    {
      name: 'Star',
      fileName: 'RateStars.tsx',
      description:
        'Renders a single star with layered empty/filled icons and half-star hover zones. Not typically used directly — Stars renders Star instances automatically.',
      props: [
        {
          name: 'index',
          type: 'number',
          required: true,
          description: '1-based index of this star within the rating row',
        },
      ],
    },
    {
      name: 'Value',
      fileName: 'RateValue.tsx',
      description:
        'Displays the current numeric rating value, optionally with a "/ total" suffix',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the value span',
        },
        {
          name: 'showTotal',
          type: 'boolean',
          required: false,
          defaultValue: 'true',
          description: 'When true, appends "/ {count}" after the numeric value',
        },
        {
          name: 'decimals',
          type: 'number',
          required: false,
          description:
            'Number of decimal places to display. Defaults to 1 when allowHalf is true, 0 otherwise.',
        },
      ],
    },
    {
      name: 'TextLabel',
      fileName: 'RateValue.tsx',
      description:
        'Displays the text label from the labels array corresponding to the current rating value, with role="status" for live announcements',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the text label span',
        },
      ],
    },
    {
      name: 'Container',
      fileName: 'RateContainer.tsx',
      description:
        'Flex layout container for arranging Label, Stars, Value, and TextLabel in a horizontal row with gap spacing',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Sub-components to lay out in the container',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the container div',
        },
      ],
    },
    {
      name: 'ErrorText',
      fileName: 'RateErrorText.tsx',
      description:
        'Conditionally renders an error message when the error state is active, with role="alert" and aria-live="polite"',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Error message text content',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the error text element',
        },
        {
          name: 'id',
          type: 'string',
          required: false,
          description: 'HTML id attribute for the error text element',
        },
      ],
    },
  ],
  hooks: ['useRate'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'count',
      type: 'number',
      required: false,
      defaultValue: '5',
      description: 'Number of stars to render',
    },
    {
      name: 'value',
      type: 'number',
      required: false,
      description:
        'Controlled rating value. When provided, the component operates in controlled mode.',
    },
    {
      name: 'defaultValue',
      type: 'number',
      required: false,
      defaultValue: '0',
      description: 'Initial rating value for uncontrolled mode',
    },
    {
      name: 'onChange',
      type: '(value: number) => void',
      required: false,
      description: 'Callback fired when the user selects a new rating value',
    },
    {
      name: 'readOnly',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description:
        'When true, the rating is displayed as read-only with no interaction or hover effects',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Disables all interaction and reduces opacity to 50%',
    },
    {
      name: 'allowHalf',
      type: 'boolean',
      required: false,
      defaultValue: 'true',
      description:
        'When true, enables half-star selection by clicking the left or right half of a star',
    },
    {
      name: 'allowClear',
      type: 'boolean',
      required: false,
      defaultValue: 'true',
      description:
        'When true, clicking the already-selected value resets the rating to 0',
    },
    {
      name: 'size',
      type: "RateSize",
      required: false,
      defaultValue: "'md'",
      description: 'Size of the stars and associated text',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    {
      name: 'icon',
      type: 'React.ReactElement',
      required: false,
      description:
        'Custom empty icon element. Defaults to an outlined star SVG. Receives injected size, className, and strokeWidth props via cloneElement.',
    },
    {
      name: 'filledIcon',
      type: 'React.ReactElement',
      required: false,
      description:
        'Custom filled icon element. Falls back to the icon prop if not provided.',
    },
    {
      name: 'halfIcon',
      type: 'React.ReactElement',
      required: false,
      description:
        'Custom half-filled icon element. Falls back to filledIcon, then icon if not provided.',
    },
    {
      name: 'error',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description:
        'When true, activates error styling (destructive color on filled stars) and makes ErrorText visible',
    },
    {
      name: 'labels',
      type: 'string[]',
      required: false,
      description:
        'Array of text labels for each rating level (e.g. ["Poor", "Fair", "Good", "Very Good", "Excellent"]), displayed by Rate.TextLabel',
    },
    {
      name: 'id',
      type: 'string',
      required: false,
      description:
        'HTML id for the stars container element. Auto-generated via useId() if not provided.',
    },
    {
      name: 'aria-label',
      type: 'string',
      required: false,
      description: 'Accessible label for the root rating group element',
    },
    {
      name: 'aria-labelledby',
      type: 'string',
      required: false,
      description:
        'ID of an element that labels the root rating group, applied as aria-labelledby on the group container',
    },
  ],
  rendersAs: 'div',

  // ── Variants & Sizes ──────────────────────────────────
  sizes: {
    propName: 'size',
    options: ['sm', 'md', 'lg', 'xl'],
    default: 'md',
  },

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'disabled',
      prop: 'disabled',
      isBoolean: true,
      defaultValue: 'false',
      description:
        'Disables pointer and keyboard interaction. Stars become non-focusable, cursor changes to not-allowed, and opacity is reduced to 50%.',
    },
    {
      name: 'readOnly',
      prop: 'readOnly',
      isBoolean: true,
      defaultValue: 'false',
      description:
        'Displays the rating as read-only. Stars render at full opacity but all interaction (click, hover, keyboard) is disabled. Sets aria-readonly on the slider.',
    },
    {
      name: 'error',
      prop: 'error',
      isBoolean: true,
      defaultValue: 'false',
      description:
        'Activates error styling — filled stars use destructive colors instead of warning. Also gates the visibility of Rate.ErrorText.',
    },
    {
      name: 'hover',
      prop: 'hoverValue',
      isBoolean: false,
      defaultValue: 'null',
      description:
        'Internal hover preview state. When the user hovers over a star, the preview value updates to show what the rating would be if clicked. Resets to null on mouse leave.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onChange',
      signature: '(value: number) => void',
      description:
        'Fired when the user selects a new rating by clicking a star or pressing a keyboard key. Receives the new numeric value (0 when cleared).',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'group',
    attributes: [
      {
        name: 'aria-labelledby (root)',
        description:
          'Applied to the root group container from the aria-labelledby prop, linking it to an external label element.',
        managedByComponent: false,
      },
      {
        name: 'role="slider" (Stars)',
        description:
          'The stars container has role="slider", making it recognized as a range input by screen readers.',
        managedByComponent: true,
      },
      {
        name: 'aria-valuemin',
        description:
          'Applied to the stars slider element, always set to 0.',
        managedByComponent: true,
      },
      {
        name: 'aria-valuemax',
        description:
          'Applied to the stars slider element, reflecting the count prop (number of stars).',
        managedByComponent: true,
      },
      {
        name: 'aria-valuenow',
        description:
          'Applied to the stars slider element, reflecting the current rating value.',
        managedByComponent: true,
      },
      {
        name: 'aria-readonly',
        description:
          'Applied to the stars slider element when the readOnly prop is true.',
        managedByComponent: true,
      },
      {
        name: 'aria-disabled',
        description:
          'Applied to the stars slider element when the disabled prop is true or when readOnly is true.',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Stars)',
        description:
          'Applied to the stars slider element from the Stars aria-label prop, defaulting to "Rating".',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden (Star)',
        description:
          'Each individual star rendering element is marked aria-hidden="true" since the slider role on the container already conveys the value.',
        managedByComponent: true,
      },
      {
        name: 'role="alert" (ErrorText)',
        description:
          'The error text element uses role="alert" with aria-live="polite" so screen readers announce validation errors when they appear.',
        managedByComponent: true,
      },
      {
        name: 'role="status" (TextLabel)',
        description:
          'The text label element uses role="status" with aria-live="polite" so screen readers announce label changes as the user hovers or selects.',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'ArrowRight / ArrowUp',
        behavior:
          'Increases the rating by the current step (1 for full-star, 0.5 for half-star mode)',
      },
      {
        key: 'ArrowLeft / ArrowDown',
        behavior:
          'Decreases the rating by the current step (1 for full-star, 0.5 for half-star mode)',
      },
      {
        key: 'Home',
        behavior: 'Resets the rating to 0',
      },
      {
        key: 'End',
        behavior: 'Sets the rating to the maximum (count)',
      },
    ],
    focusManagement:
      'The stars container is focusable with tabIndex=0 (or -1 when disabled/readOnly). Keyboard focus shows a visible focus ring (ring-2 ring-focus ring-offset-2) on the star matching the current value. Focus and blur state are tracked to conditionally render the ring.',
    wcagLevel: 'AA',
    notes:
      'The Rate component follows the WAI-ARIA slider design pattern for the stars container. Individual stars are aria-hidden since the slider role on the container exposes the value through aria-valuenow. The Rate.Label uses htmlFor linked to the auto-generated stars container ID. Error messages use role="alert" for immediate screen reader announcement, and text labels use role="status" for polite announcements.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'text-input',
      reason:
        'Commonly paired in review forms where a text input collects a written review alongside the star rating',
    },
    {
      slug: 'textarea',
      reason:
        'Used together in feedback forms where a textarea collects detailed comments alongside the numeric rating',
    },
    {
      slug: 'button',
      reason:
        'Submit and reset buttons are needed in rating forms to send or clear the selected rating',
    },
    {
      slug: 'card',
      reason:
        'Cards frequently display ratings in product listings, reviews, or feedback summaries',
    },
    {
      slug: 'tooltip',
      reason:
        'Tooltips can show the exact numeric value or label description on star hover for additional context',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Controlled Rating',
      description:
        'A controlled star rating with external state management, displaying the current value.',
      code: `import { Rate } from 'vayu-ui';
import React, { useState } from 'react';

export default function BasicRate() {
  const [value, setValue] = useState(3);

  return (
    <div className="space-y-2">
      <Rate value={value} onChange={setValue} />
      <p>Current value: {value}</p>
    </div>
  );
}`,
      tags: ['basic', 'controlled', 'state'],
    },
    {
      title: 'Read-Only Display',
      description:
        'A read-only rating that displays a value without allowing user interaction.',
      code: `import { Rate } from 'vayu-ui';

export default function ReadOnlyRate() {
  return <Rate defaultValue={3.5} readOnly />;
}`,
      tags: ['read-only', 'display', 'uncontrolled'],
    },
    {
      title: 'All Sizes',
      description:
        'The Rate component in all four sizes: sm (16px), md (24px), lg (32px), xl (40px).',
      code: `import { Rate } from 'vayu-ui';

export default function RateSizes() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm w-12">Small</span>
        <Rate defaultValue={3} size="sm" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm w-12">Medium</span>
        <Rate defaultValue={3} size="md" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm w-12">Large</span>
        <Rate defaultValue={3} size="lg" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm w-12">XLarge</span>
        <Rate defaultValue={3} size="xl" />
      </div>
    </div>
  );
}`,
      tags: ['sizes', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'With Labels and Container',
      description:
        'A fully composed rating with label, description, text label mapping, and layout container.',
      code: `import { Rate } from 'vayu-ui';

export default function RateWithLabels() {
  return (
    <Rate defaultValue={3} labels={['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']}>
      <Rate.Container>
        <Rate.Label>Product Rating</Rate.Label>
        <Rate.Stars />
        <Rate.TextLabel />
      </Rate.Container>
      <Rate.Description>Rate the product quality.</Rate.Description>
    </Rate>
  );
}`,
      tags: ['labels', 'compound', 'container', 'description'],
    },
    {
      title: 'With Value Display',
      description:
        'Rating with a numeric value display showing the current and total stars.',
      code: `import { Rate } from 'vayu-ui';

export default function RateWithValue() {
  return (
    <Rate defaultValue={3.5}>
      <Rate.Container>
        <Rate.Stars />
        <Rate.Value />
      </Rate.Container>
    </Rate>
  );
}`,
      tags: ['value', 'display', 'compound'],
    },
    {
      title: 'Custom Icons',
      description:
        'Rating with custom empty, filled, and half-filled icons from Lucide.',
      code: `import { Rate } from 'vayu-ui';
import { Star, StarHalf } from 'lucide-react';

export default function CustomIconsRate() {
  return (
    <Rate
      defaultValue={3.5}
      allowHalf
      icon={<Star className="text-muted-content" />}
      filledIcon={<Star className="fill-warning text-warning" strokeWidth={0} />}
      halfIcon={<StarHalf className="fill-warning text-warning" strokeWidth={0} />}
    />
  );
}`,
      tags: ['custom', 'icons', 'lucide', 'half'],
    },
    {
      title: 'Error State',
      description:
        'Rating with validation error styling and error message text.',
      code: `import { Rate } from 'vayu-ui';

export default function ErrorRate() {
  return (
    <Rate defaultValue={0} error>
      <Rate.Label>Rating Required</Rate.Label>
      <Rate.Stars />
      <Rate.ErrorText>Please select a rating</Rate.ErrorText>
    </Rate>
  );
}`,
      tags: ['error', 'validation', 'form'],
    },
    {
      title: 'Half Star vs Full Star Only',
      description:
        'Comparison of half-star mode (default) and full-star-only mode.',
      code: `import { Rate } from 'vayu-ui';

export default function HalfVsFull() {
  return (
    <div className="space-y-4">
      <Rate defaultValue={3.5} allowHalf />
      <Rate defaultValue={3} allowHalf={false} />
    </div>
  );
}`,
      tags: ['half', 'full', 'allow-half'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using sub-components outside Rate',
      bad: '<Rate.Label>Rating</Rate.Label><Rate.Stars />',
      good: '<Rate defaultValue={3}><Rate.Label>Rating</Rate.Label><Rate.Stars /></Rate>',
      reason:
        'All Rate sub-components depend on the RateContext provided by the root Rate component. Rendering them outside Rate throws a "must be used within Rate" error.',
    },
    {
      title: 'Passing a non-ReactElement as icon',
      bad: '<Rate icon="star" />',
      good: '<Rate icon={<StarIcon />} />',
      reason:
        'The icon, filledIcon, and halfIcon props expect ReactElement (not a string or component). The component uses React.cloneElement to inject size, className, and strokeWidth props into the provided element.',
    },
    {
      title: 'Using both value and defaultValue',
      bad: '<Rate value={3} defaultValue={3} onChange={handleChange} />',
      good: '<Rate value={3} onChange={handleChange} />',
      reason:
        'When value is provided the component is in controlled mode and defaultValue is ignored. Passing both is misleading — pick one pattern.',
    },
    {
      title: 'Omitting aria-label on standalone Rate',
      bad: '<Rate defaultValue={3} />',
      good: '<Rate defaultValue={3} aria-label="Product rating" />',
      reason:
        'Without an aria-label or Rate.Label, the stars slider falls back to a generic "Rating" label. Every rating should have a descriptive label so screen reader users understand what is being rated.',
    },
    {
      title: 'Using onChange for read-only display',
      bad: '<Rate value={avgRating} readOnly onChange={handleChange} />',
      good: '<Rate value={avgRating} readOnly />',
      reason:
        'When readOnly is true, interaction is disabled and onChange will never fire. Including it is misleading and suggests the component is interactive when it is not.',
    },
  ],
};
