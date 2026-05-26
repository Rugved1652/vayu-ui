import { ComponentRegistryEntry } from '../types.js';

export const qrCodeEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'qrcode',
  name: 'QRCode',
  type: 'component',
  category: 'data-display',

  // ── Description ───────────────────────────────────────
  description:
    'A customizable QR code generator component with size variants, color controls, error correction levels, and center logo overlay support.',
  longDescription:
    'The QRCode component renders scannable QR codes as SVG elements. It includes a built-in byte-mode encoding engine with automatic version selection, Reed-Solomon error correction, and optimal mask pattern selection. The component supports three preset sizes (sm: 128px, md: 200px, lg: 300px) or custom dimensions via qrSize. Colors default to design system tokens but can be overridden with bgColor and fgColor. A center logo overlay can be added with imageSettings, which automatically upgrades error correction to level H and excavates modules behind the logo for reliable scanning.',
  tags: [
    'qrcode',
    'qr',
    'barcode',
    'scanner',
    'encode',
    'svg',
    'data-display',
    'image',
    'logo',
    'overlay',
  ],
  useCases: [
    'Encoding URLs, Wi-Fi credentials, or contact information into scannable QR codes',
    'Displaying payment or checkout QR codes in e-commerce applications',
    'Adding branded QR codes with a center logo overlay for marketing materials',
    'Generating dynamic QR codes with adjustable size for mobile and desktop layouts',
    'Creating QR codes with high error correction for reliable scanning in poor conditions',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'QRcode',
  files: [
    {
      name: 'QRCode.tsx',
      description:
        'QR code SVG rendering component with CVA size variants, color resolution, and logo overlay support',
    },
    {
      name: 'QREncoder.ts',
      description:
        'Standalone QR code encoding engine implementing byte mode, Reed-Solomon error correction, and optimal mask selection',
    },
    {
      name: 'types.ts',
      description: 'TypeScript types for ErrorCorrectionLevel and QRCodeImageSettings',
    },
    {
      name: 'index.ts',
      description: 'Barrel export for QRCode component and all type definitions',
    },
    {
      name: 'README.md',
      description: 'Component documentation, anatomy, and use cases',
    },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'QRCode',
  subComponents: [],
  hooks: [],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'value',
      type: 'string',
      required: true,
      description: 'The string data to encode into the QR code (URL, text, etc.).',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      required: false,
      defaultValue: "'md'",
      description: 'Preset size variant: sm (128px), md (200px), lg (300px).',
      options: ['sm', 'md', 'lg'],
    },
    {
      name: 'qrSize',
      type: 'number',
      required: false,
      description: 'Explicit width and height in pixels. Overrides the size preset when provided.',
    },
    {
      name: 'level',
      type: 'ErrorCorrectionLevel',
      required: false,
      defaultValue: "'M'",
      description: 'Error correction level: L (~7%), M (~15%), Q (~25%), H (~30%).',
      options: ['L', 'M', 'Q', 'H'],
    },
    {
      name: 'bgColor',
      type: 'string',
      required: false,
      description:
        'Background color of the QR code. Defaults to CSS custom property --color-ground-50.',
    },
    {
      name: 'fgColor',
      type: 'string',
      required: false,
      description:
        'Foreground/module color of the QR code. Defaults to CSS custom property --color-ground-950.',
    },
    {
      name: 'includeMargin',
      type: 'boolean',
      required: false,
      defaultValue: 'true',
      description:
        'Whether to include the 4-cell quiet-zone margin around the QR code for reliable scanning.',
    },
    {
      name: 'imageSettings',
      type: 'QRCodeImageSettings',
      required: false,
      description:
        'Configuration for a center logo overlay: src, width, height, excavate, excavateMargin.',
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Additional CSS classes applied to the root div wrapper.',
    },
    {
      name: 'aria-label',
      type: 'string',
      required: false,
      description:
        'Accessible label for the QR code image. Defaults to "QR code for: {value}".',
    },
  ],
  rendersAs: 'div',

  // ── Variants & Sizes ──────────────────────────────────
  sizes: {
    propName: 'size',
    options: ['sm', 'md', 'lg'],
    default: 'md',
  },

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'empty',
      prop: 'value',
      isBoolean: true,
      defaultValue: 'false',
      description:
        'When value is empty or not provided, the component renders an empty-state placeholder with "No data" text instead of a QR code.',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'img',
    attributes: [
      {
        name: 'role="img"',
        description:
          'Identifies the QR code container as an image element for assistive technology.',
        managedByComponent: true,
      },
      {
        name: 'aria-label',
        description:
          'Describes the QR code content for screen readers. Defaults to "QR code for: {value}" or can be customized.',
        managedByComponent: false,
      },
    ],
    keyboardInteractions: [],
    focusManagement:
      'The QRCode container is not interactive and does not receive focus. It is a static image-like element.',
    wcagLevel: 'AA',
    notes:
      'The SVG uses shape-rendering="crispEdges" for sharp module boundaries. When a center logo is used, the component automatically upgrades error correction to level H and warns if the logo covers more than 20% of the QR area.',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [{ name: 'clsx' }, { name: 'class-variance-authority' }],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'button',
      reason:
        'QR codes are often placed near download or share buttons that trigger related actions',
    },
    {
      slug: 'card',
      reason:
        'QR codes are frequently displayed inside cards for tickets, passes, or payment information',
    },
    {
      slug: 'modal',
      reason: 'Modals can display enlarged QR codes for scanning or sharing purposes',
    },
    {
      slug: 'tooltip',
      reason:
        'Tooltips can provide additional context or instructions for scanning the QR code',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic QR Code',
      description: 'Encode a simple URL into a scannable QR code with default medium size.',
      code: `import { QRCode } from 'vayu-ui';

export default function BasicQR() {
  return <QRCode value="https://example.com" />;
}`,
      tags: ['basic', 'url'],
    },
    {
      title: 'QR Code Sizes',
      description: 'Render QR codes in small, medium, and large preset sizes.',
      code: `import { QRCode } from 'vayu-ui';

export default function QRCodeSizes() {
  return (
    <div className="flex items-center gap-6">
      <QRCode value="https://example.com" size="sm" />
      <QRCode value="https://example.com" size="md" />
      <QRCode value="https://example.com" size="lg" />
    </div>
  );
}`,
      tags: ['sizes', 'sm', 'md', 'lg'],
    },
    {
      title: 'QR Code with Logo Overlay',
      description:
        'Add a center logo with automatic excavation and error correction upgrade to level H.',
      code: `import { QRCode } from 'vayu-ui';

export default function BrandedQR() {
  return (
    <QRCode
      value="https://mybrand.com"
      size="lg"
      level="H"
      imageSettings={{
        src: '/logo.png',
        width: 64,
        height: 64,
        excavate: true,
        excavateMargin: 1,
      }}
    />
  );
}`,
      tags: ['logo', 'brand', 'overlay', 'image'],
    },
    {
      title: 'Custom Colors and Size',
      description: 'Override background and foreground colors with explicit pixel dimensions.',
      code: `import { QRCode } from 'vayu-ui';

export default function CustomQR() {
  return (
    <QRCode
      value="WIFI:S:MyNetwork;T:WPA;P:password;;"
      qrSize={256}
      bgColor="#ffffff"
      fgColor="#000000"
      includeMargin={true}
      aria-label="Wi-Fi network QR code"
    />
  );
}`,
      tags: ['custom', 'colors', 'wifi', 'size'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using a logo without level H error correction',
      bad: '<QRCode value="..." imageSettings={{ src: "/logo.png", width: 48, height: 48 }} level="M" />',
      good: '<QRCode value="..." level="H" imageSettings={{ src: "/logo.png", width: 48, height: 48 }} />',
      reason:
        'The component auto-upgrades to level H and emits a console warning, but relying on implicit behavior is fragile. Always set level="H" explicitly when using a logo overlay to ensure reliable scanning.',
    },
    {
      title: 'Covering more than 20% of the QR code with a logo',
      bad: '<QRCode value="..." size="sm" imageSettings={{ src: "/logo.png", width: 80, height: 80 }} />',
      good: '<QRCode value="..." size="lg" imageSettings={{ src: "/logo.png", width: 48, height: 48 }} />',
      reason:
        'A large logo can obscure too many data modules, making the QR code unscannable. The component warns when coverage exceeds 20%. Keep logos small relative to the QR code dimensions.',
    },
    {
      title: 'Omitting the quiet-zone margin',
      bad: '<QRCode value="..." includeMargin={false} />',
      good: '<QRCode value="..." includeMargin={true} />',
      reason:
        'The quiet-zone margin is required by the QR code specification for reliable scanning. Disabling it can cause scanners to fail, especially when the QR code is placed near other visual elements.',
    },
    {
      title: 'Using low-contrast colors',
      bad: '<QRCode value="..." bgColor="#f0f0f0" fgColor="#e0e0e0" />',
      good: '<QRCode value="..." bgColor="#ffffff" fgColor="#000000" />',
      reason:
        'Low contrast between background and foreground colors makes QR codes difficult or impossible for scanners to read. Always ensure sufficient contrast ratio.',
    },
    {
      title: 'Passing non-string values directly to the value prop',
      bad: '<QRCode value={12345} />',
      good: '<QRCode value={String(12345)} />',
      reason:
        'The value prop expects a string. Passing numbers, objects, or other types may cause unexpected encoding behavior or runtime errors. Always serialize data to a string before passing it to QRCode.',
    },
  ],
};
