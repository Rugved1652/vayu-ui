import { ComponentRegistryEntry } from '../types.js';

export const alertEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'alert',
  name: 'Alert',
  type: 'component',
  category: 'feedback',

  // ── Description ───────────────────────────────────────
  description:
    'A contextual feedback banner that communicates status, validation results, or important messages to users.',
  longDescription:
    'The Alert component uses the compound component pattern (Alert.Icon, Alert.Title, Alert.Description, Alert.Content, Alert.Dismiss) to create accessible status banners. It supports four semantic variants — info, success, warning, and error — each with appropriate ARIA live regions and roles. Warning and error variants use role="alert" with aria-live="assertive" for immediate screen reader announcement, while info and success use role="status" with aria-live="polite".',
  tags: [
    'alert',
    'notification',
    'feedback',
    'status',
    'banner',
    'toast',
    'message',
    'validation',
    'info',
    'warning',
    'error',
    'success',
  ],
  useCases: [
    'Displaying form validation errors after a failed submission',
    'Showing success confirmation after a user action like saving or deleting',
    'Warning users about potential issues like expiring sessions or unsaved changes',
    'Providing contextual informational hints within a page or form',
    'Displaying dismissible notifications at the top of a page section',
    'Communicating system status changes like maintenance windows or service degradation',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'Alert',
  files: [
    { name: 'Alert.tsx', description: 'Root component with variant styling, ARIA roles, and compound component assembly' },
    { name: 'AlertIcon.tsx', description: 'Icon container with variant-aware color styling and aria-hidden' },
    { name: 'AlertTitle.tsx', description: 'Heading element for the alert message title, renders as h5' },
    { name: 'AlertDescription.tsx', description: 'Descriptive body text for the alert message details' },
    { name: 'AlertContent.tsx', description: 'Layout wrapper that groups Title and Description with flex spacing' },
    { name: 'AlertDismiss.tsx', description: 'Close button with variant-aware focus ring, dynamic aria-label, and X icon' },
    { name: 'types.ts', description: 'TypeScript type definitions for AlertVariant and all component props' },
    { name: 'index.ts', description: 'Barrel export file re-exporting the compound component and types' },
    { name: 'README.md', description: 'Component documentation and usage guidelines' },
  ],
  targetPath: 'src/components/ui',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'Alert',
  subComponents: [
    {
      name: 'Icon',
      fileName: 'AlertIcon.tsx',
      description: 'Renders a decorative icon with variant-aware color. Must wrap an icon element (e.g. from lucide-react).',
      props: [
        {
          name: 'variant',
          type: "AlertVariant",
          required: false,
          defaultValue: "'info'",
          description: 'Controls the icon color. Should match the parent Alert variant for consistent styling.',
          options: ['info', 'success', 'warning', 'error'],
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Icon element to display, typically an SVG icon from lucide-react or a similar library.',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the icon container div.',
        },
      ],
    },
    {
      name: 'Title',
      fileName: 'AlertTitle.tsx',
      description: 'Renders the alert heading as an h5 element with semibold styling.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Title text or inline content for the alert heading.',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the h5 element.',
        },
      ],
    },
    {
      name: 'Description',
      fileName: 'AlertDescription.tsx',
      description: 'Renders the alert body text with comfortable reading line height.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Descriptive text content explaining the alert message.',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the description div.',
        },
      ],
    },
    {
      name: 'Content',
      fileName: 'AlertContent.tsx',
      description: 'Flex layout wrapper that groups Title and Description, with right padding to avoid the dismiss button.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Alert.Title and Alert.Description sub-components.',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the content wrapper div.',
        },
      ],
    },
    {
      name: 'Dismiss',
      fileName: 'AlertDismiss.tsx',
      description: 'Positioned close button with an X icon, variant-aware focus ring, and dynamically generated aria-label.',
      props: [
        {
          name: 'variant',
          type: "AlertVariant",
          required: false,
          defaultValue: "'info'",
          description: 'Controls the dismiss button color and focus ring. Should match the parent Alert variant.',
          options: ['info', 'success', 'warning', 'error'],
        },
        {
          name: 'alertTitle',
          type: 'string',
          required: false,
          description: 'Optional alert title included in the auto-generated aria-label for better screen reader context (e.g. "Dismiss success alert: Saved").',
        },
        {
          name: 'onClick',
          type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
          required: false,
          description: 'Click handler for the dismiss button. Typically used to hide the alert via state.',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes applied to the dismiss button element.',
        },
      ],
    },
  ],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'variant',
      type: "AlertVariant",
      required: false,
      defaultValue: "'info'",
      description: 'Semantic variant controlling background, border, and text colors, as well as the ARIA role and live region behavior.',
      options: ['info', 'success', 'warning', 'error'],
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Alert sub-components: Icon, Content (Title + Description), and optionally Dismiss.',
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Additional CSS classes applied to the root alert container div.',
    },
  ],
  rendersAs: 'div',

  // ── Variants ──────────────────────────────────────────
  variants: {
    propName: 'variant',
    options: ['info', 'success', 'warning', 'error'],
    default: 'info',
  },

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'variant',
      prop: 'variant',
      isBoolean: false,
      values: ['info', 'success', 'warning', 'error'],
      defaultValue: "'info'",
      description: 'Controls the visual and semantic style. Info and success use role="status" with aria-live="polite"; warning and error use role="alert" with aria-live="assertive".',
    },
    {
      name: 'visible',
      prop: 'parent-controlled (conditional rendering)',
      isBoolean: true,
      defaultValue: 'true',
      description: 'Alert visibility is managed by the parent via conditional rendering. Typically toggled by the Dismiss onClick handler.',
    },
    {
      name: 'disabled',
      prop: 'disabled (on Dismiss)',
      isBoolean: true,
      defaultValue: 'false',
      description: 'When disabled is passed to Alert.Dismiss, the button becomes non-interactive via native HTMLButtonElement disabled attribute.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onClick',
      signature: '(event: React.MouseEvent<HTMLButtonElement>) => void',
      description: 'Fired when the Dismiss button is clicked. Typically used to set visibility state and hide the alert.',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    attributes: [
      {
        name: 'role',
        description: 'Set to "status" for info/success variants and "alert" for warning/error variants, matching the urgency of the message.',
        managedByComponent: true,
      },
      {
        name: 'aria-live',
        description: 'Set to "polite" for info/success variants (announced when idle) and "assertive" for warning/error variants (announced immediately).',
        managedByComponent: true,
      },
      {
        name: 'aria-atomic',
        description: 'Always "true" — ensures screen readers announce the entire alert content as a single unit.',
        managedByComponent: true,
      },
      {
        name: 'data-variant',
        description: 'Set to the current variant value for styling and testing purposes.',
        managedByComponent: true,
      },
      {
        name: 'aria-hidden',
        description: 'Applied to the Icon container div, always "true" since icons are decorative and the meaning is conveyed by the variant role and text content.',
        managedByComponent: true,
      },
      {
        name: 'aria-label',
        description: 'Applied to the Dismiss button. Dynamically generated: "Dismiss {variant} alert" or "Dismiss {variant} alert: {alertTitle}" when alertTitle is provided.',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Tab',
        behavior: 'Moves focus to the Dismiss button if present. The Dismiss button is the only focusable element inside the alert.',
      },
      {
        key: 'Enter',
        behavior: 'Activates the focused Dismiss button, triggering the onClick handler to hide the alert.',
      },
      {
        key: 'Space',
        behavior: 'Activates the focused Dismiss button, triggering the onClick handler to hide the alert.',
      },
    ],
    focusManagement:
      'The Dismiss button is positioned absolutely and receives visible focus via focus-visible:ring-2 with variant-aware ring color. Focus ring uses ring-offset-surface for contrast.',
    wcagLevel: 'AA',
    notes:
      'Warning and error alerts use role="alert" with aria-live="assertive" per WCAG 2.2 guidelines for urgent messages. Info and success alerts use role="status" with aria-live="polite" for non-urgent announcements. The Title renders as an h5 for heading semantics.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'button',
      reason: 'Used alongside alerts for "try again" or "reset" actions after error or warning states',
    },
    {
      slug: 'typography',
      reason: 'Commonly used for page headings or section labels above alert groups',
    },
    {
      slug: 'divider',
      reason: 'Used between stacked alerts to provide visual separation',
    },
    {
      slug: 'card',
      reason: 'Alerts are often placed inside Card containers for grouped form feedback',
    },
    {
      slug: 'text-input',
      reason: 'Alerts commonly display validation errors from form inputs like TextInput',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Info Alert',
      description: 'Basic informational alert using the default variant with an icon, title, and description.',
      code: `import { Alert } from 'vayu-ui';
import { Info } from 'lucide-react';

export default function InfoAlert() {
  return (
    <Alert variant="info">
      <Alert.Icon variant="info">
        <Info className="w-5 h-5" />
      </Alert.Icon>
      <Alert.Content>
        <Alert.Title>Information</Alert.Title>
        <Alert.Description>
          This is an informational alert to highlight something important.
        </Alert.Description>
      </Alert.Content>
    </Alert>
  );
}`,
      tags: ['basic', 'info', 'default'],
    },
    {
      title: 'Dismissible Success Alert',
      description: 'Success alert with a dismiss button that hides the alert on click using React state.',
      code: `import { useState } from 'react';
import { Alert } from 'vayu-ui';
import { CheckCircle } from 'lucide-react';

export default function DismissibleAlert() {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <Alert variant="success">
      <Alert.Icon variant="success">
        <CheckCircle className="w-5 h-5" />
      </Alert.Icon>
      <Alert.Content>
        <Alert.Title>Success</Alert.Title>
        <Alert.Description>Your changes have been successfully saved.</Alert.Description>
      </Alert.Content>
      <Alert.Dismiss
        variant="success"
        alertTitle="Success"
        onClick={() => setShow(false)}
      />
    </Alert>
  );
}`,
      tags: ['dismissible', 'success', 'interactive'],
    },
    {
      title: 'Error Alert with Dismiss',
      description: 'Error alert with dismiss functionality for displaying form validation or API errors.',
      code: `import { useState } from 'react';
import { Alert } from 'vayu-ui';
import { XCircle } from 'lucide-react';

export default function ErrorAlert() {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <Alert variant="error">
      <Alert.Icon variant="error">
        <XCircle className="w-5 h-5" />
      </Alert.Icon>
      <Alert.Content>
        <Alert.Title>Error</Alert.Title>
        <Alert.Description>
          There was an error processing your request. Please try again.
        </Alert.Description>
      </Alert.Content>
      <Alert.Dismiss
        variant="error"
        alertTitle="Error"
        onClick={() => setShow(false)}
      />
    </Alert>
  );
}`,
      tags: ['error', 'dismissible', 'validation'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Mismatched variant on Icon or Dismiss',
      bad: '<Alert variant="error"><Alert.Icon variant="info"><XCircle /></Alert.Icon>...</Alert>',
      good: '<Alert variant="error"><Alert.Icon variant="error"><XCircle /></Alert.Icon>...</Alert>',
      reason: 'The Icon and Dismiss variant must match the root Alert variant. Mismatched variants produce inconsistent colors — the icon or dismiss button will have a different color than the alert background and border.',
    },
    {
      title: 'Using Dismiss outside Alert',
      bad: '<div><Alert.Dismiss variant="error" onClick={handleClose} /></div>',
      good: '<Alert variant="error">...<Alert.Dismiss variant="error" onClick={handleClose} /></Alert>',
      reason: 'Alert.Dismiss is absolutely positioned (top-4 right-4) relative to the Alert container. Using it outside Alert breaks positioning and it loses its visual context.',
    },
    {
      title: 'Hardcoding colors instead of using variants',
      bad: '<Alert className="bg-red-100 border-red-500 text-red-900">...</Alert>',
      good: '<Alert variant="error">...</Alert>',
      reason: 'Hardcoding Tailwind colors bypasses the semantic design tokens (destructive, info, success, warning) and breaks dark mode support. Always use the variant prop.',
    },
    {
      title: 'Wrapping Title or Description in interactive elements',
      bad: '<Alert.Title><a href="/help">Learn more</a></Alert.Title>',
      good: '<Alert.Title>Error</Alert.Title><Alert.Description>See the <a href="/help">help docs</a> for details.</Alert.Description>',
      reason: 'Alerts use aria-live regions that announce changes to screen readers. Embedding interactive elements inside the Title or inside the live region can cause confusing repeated announcements and breaks the expected alert pattern.',
    },
  ],
};
