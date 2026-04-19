import type { RegistryEntry, ComponentRegistryEntry, HookRegistryEntry, NpmDependency } from 'vayu-ui-registry';

interface ScaffoldOptions {
  variant?: string;
  size?: string;
  features?: string[];
}

interface ScaffoldResult {
  code: string;
  imports: string[];
  dependencies: NpmDependency[];
}

export function scaffoldComponent(
  entry: RegistryEntry,
  options: ScaffoldOptions,
): ScaffoldResult {
  if (entry.type === 'hook') {
    return scaffoldHook(entry, options);
  }
  return scaffoldComponentEntry(entry, options);
}

function scaffoldHook(
  entry: HookRegistryEntry,
  _options: ScaffoldOptions,
): ScaffoldResult {
  const deps = [...entry.npmDependencies];

  // Build a basic usage example from the first example or from the signature
  const code = entry.examples.length > 0
    ? entry.examples[0].code
    : `import { ${entry.name} } from 'vayu-ui';\n\nconst result = ${entry.signature.replace(/^function /, '')};`;

  return {
    code,
    imports: [`import { ${entry.name} } from 'vayu-ui';`],
    dependencies: deps,
  };
}

function scaffoldComponentEntry(
  entry: ComponentRegistryEntry,
  options: ScaffoldOptions,
): ScaffoldResult {
  const deps = [...entry.npmDependencies];
  const imports = new Set<string>();
  const name = entry.rootComponent;
  imports.add(`import { ${name} } from 'vayu-ui';`);

  const variant = options.variant || entry.variants?.default || 'primary';
  const size = options.size || entry.sizes?.default || 'medium';
  const features = options.features || [];

  // Check if we have a specialized scaffolder
  const specialized = getSpecializedScaffold(entry.slug, { variant, size, features, name, imports, deps });
  if (specialized) return specialized;

  // Generic scaffold for compound components
  if (entry.subComponents.length > 0) {
    return scaffoldCompoundComponent(entry, { variant, size, features, name, imports, deps });
  }

  // Simple component scaffold
  const variantProp = entry.variants ? `variant="${variant}"` : '';
  const sizeProp = entry.sizes ? `size="${size}"` : '';
  const props = [variantProp, sizeProp].filter(Boolean).join(' ');

  const code = `${Array.from(imports).join('\n')}

export default function ${name}Example() {
  return (
    <${name} ${props}>
      ${name}
    </${name}>
  );
}`;

  return { code, imports: Array.from(imports), dependencies: deps };
}

function scaffoldCompoundComponent(
  entry: ComponentRegistryEntry,
  ctx: { variant: string; size: string; features: string[]; name: string; imports: Set<string>; deps: NpmDependency[] },
): ScaffoldResult {
  const { variant, size, features, name, imports, deps } = ctx;

  const variantProp = entry.variants ? `variant="${variant}"` : '';
  const sizeProp = entry.sizes ? `size="${size}"` : '';
  const rootProps = [variantProp, sizeProp].filter(Boolean).join(' ');

  // Build children from sub-components
  const children: string[] = [];

  for (const sub of entry.subComponents) {
    const included = features.length === 0 || features.some(
      (f) => sub.name.toLowerCase().includes(f.toLowerCase()),
    );
    if (!included) continue;

    switch (sub.name.toLowerCase()) {
      case 'icon':
        imports.add("import { Mail } from 'lucide-react';");
        children.push(`      <${name}.Icon>\n        <Mail />\n      </${name}.Icon>`);
        break;
      case 'text':
        children.push(`      <${name}.Text>${name}</${name}.Text>`);
        break;
      case 'badge':
        children.push(`      <${name}.Badge value={3} variant="danger" />`);
        break;
      case 'title':
        children.push(`      <${name}.Title>Title</${name}.Title>`);
        break;
      case 'description':
        children.push(`      <${name}.Description>Description text</${name}.Description>`);
        break;
      case 'content':
        children.push(`      <${name}.Content>\n        {/* Content here */}\n      </${name}.Content>`);
        break;
      case 'trigger':
        children.push(`      <${name}.Trigger>Open</${name}.Trigger>`);
        break;
      case 'dismiss':
        children.push(`      <${name}.Dismiss />`);
        break;
      default:
        children.push(`      <${name}.${sub.name} />`);
    }
  }

  // If no features matched, include a basic default
  if (children.length === 0) {
    children.push(`      ${name}`);
  }

  const code = `${Array.from(imports).join('\n')}

export default function ${name}Example() {
  return (
    <${name} ${rootProps}>
${children.join('\n')}
    </${name}>
  );
}`;

  return { code, imports: Array.from(imports), dependencies: deps };
}

type ScaffoldContext = {
  variant: string;
  size: string;
  features: string[];
  name: string;
  imports: Set<string>;
  deps: NpmDependency[];
};

function getSpecializedScaffold(
  slug: string,
  ctx: ScaffoldContext,
): ScaffoldResult | null {
  const { variant, size, features, name, imports, deps } = ctx;

  switch (slug) {
    case 'button': {
      imports.add("import { Mail } from 'lucide-react';");
      let hasLoading = false;

      if (features.includes('loading')) {
        imports.add("import { Status } from 'vayu-ui';");
        hasLoading = true;
      }

      const children: string[] = [];

      if (features.includes('icon') || features.length === 0) {
        children.push(`        <Button.Icon>\n          <Mail />\n        </Button.Icon>`);
      }
      if (features.includes('text') || features.includes('label') || features.length === 0) {
        children.push(`        <Button.Text>Click me</Button.Text>`);
      }
      if (features.includes('badge')) {
        children.push(`        <Button.Badge value={5} variant="danger" />`);
      }

      const loadingProps = hasLoading ? ' loading={Status.PENDING} loadingText="Saving..."' : '';
      const disabledProp = features.includes('disabled') ? ' disabled' : '';

      return {
        code: `${Array.from(imports).join('\n')}

export default function ButtonExample() {
  return (
    <Button variant="${variant}" size="${size}"${loadingProps}${disabledProp}>
${children.join('\n')}
    </Button>
  );
}`,
        imports: Array.from(imports),
        dependencies: deps,
      };
    }

    case 'modal': {
      imports.add("import { useState } from 'react';");
      return {
        code: `${Array.from(imports).join('\n')}

export default function ModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
          <Modal.Description>Modal description text.</Modal.Description>
        </Modal.Header>
        <Modal.Body>
          <p>Modal content goes here.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}`,
        imports: Array.from(imports),
        dependencies: deps,
      };
    }

    case 'alert': {
      return {
        code: `${Array.from(imports).join('\n')}

export default function AlertExample() {
  return (
    <Alert variant="info">
      <Alert.Icon variant="info"><Info /></Alert.Icon>
      <Alert.Content>
        <Alert.Title>Information</Alert.Title>
        <Alert.Description>This is an informational alert.</Alert.Description>
      </Alert.Content>
    </Alert>
  );
}`,
        imports: Array.from(imports),
        dependencies: deps,
      };
    }

    case 'tooltip': {
      return {
        code: `${Array.from(imports).join('\n')}

export default function TooltipExample() {
  return (
    <Tooltip content="This is a tooltip">
      <button>Hover me</button>
    </Tooltip>
  );
}`,
        imports: Array.from(imports),
        dependencies: deps,
      };
    }

    default:
      return null;
  }
}
