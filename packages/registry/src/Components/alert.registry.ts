import { RegistryItem } from "..";

export const alertRegistry: RegistryItem = {
  name: "Alert",
  slug: "alert",
  type: "component",
  category: "feedback",
  since: "1.0.0",
  description:
    "Displays a contextual callout for user attention. Supports semantic variants with automatic ARIA role mapping for screen readers.",
  targetPath: "src/components/ui",
  fileName: "alert.tsx",
  dependencies: ["clsx", "tailwind-merge"],
  registryDependencies: [],
  tags: ["component", "feedback", "a11y"],
  composition: {
    parts: {
      Alert:
        "Root container — defines variant, styling, and ARIA roles (status/alert).",
      "Alert.Icon":
        "Container for the semantic icon. Hidden from screen readers.",
      "Alert.Content":
        "Flex container for text content. Adds padding to avoid overlap with the dismiss button.",
      "Alert.Title":
        "The alert heading (rendered as h5).",
      "Alert.Description":
        "The alert message body.",
      "Alert.Dismiss":
        "Optional close button. Generates a descriptive aria-label based on variant and title.",
    },
    example: `<Alert variant="success">
  <Alert.Icon variant="success"><CheckCircle className="w-5 h-5" /></Alert.Icon>
  <Alert.Content>
    <Alert.Title>Success</Alert.Title>
    <Alert.Description>Your profile has been updated.</Alert.Description>
  </Alert.Content>
</Alert>`,
    partsRequired: true,
  },
  a11y: {
    role: "status (info/success) or alert (warning/error)",
    managedAttrs: ["aria-live", "aria-atomic", "role"],
    keyboard: {
      Tab: "Moves focus to the dismiss button (if present).",
      "Enter / Space": "Triggers the dismiss button action.",
    },
    focusManagement: "None. Focus is not trapped within the alert.",
    notes: [
      "Component automatically selects 'role=alert' and 'aria-live=assertive' for warning/error variants to ensure immediate announcement.",
      "Uses 'role=status' and 'aria-live=polite' for info/success variants to avoid interrupting the user.",
      "Icons are purely decorative and hidden from screen readers.",
    ],
  },
  props: {
    variant: {
      type: "'info' | 'success' | 'warning' | 'error'",
      required: false,
      default: "'info'",
      component: "Alert, Alert.Icon, Alert.Dismiss",
      description: "Sets the visual style and ARIA importance.",
    },
    alertTitle: {
      type: "string",
      required: false,
      component: "Alert.Dismiss",
      description: "Used to generate a descriptive aria-label for the dismiss button (e.g., 'Dismiss error alert: Title').",
    },
  },
  examples: {
    default: {
      code: `<Alert variant="info">
  <Alert.Icon variant="info"><Info className="w-5 h-5" /></Alert.Icon>
  <Alert.Content>
    <Alert.Title>Update Available</Alert.Title>
    <Alert.Description>A new version of the application is ready to download.</Alert.Description>
  </Alert.Content>
</Alert>`,
      description: "A standard informational alert.",
    },
    dismissable: {
      code: `const [visible, setVisible] = useState(true);

visible && (
  <Alert variant="error">
    <Alert.Icon variant="error"><XCircle className="w-5 h-5" /></Alert.Icon>
    <Alert.Content>
      <Alert.Title>System Error</Alert.Title>
      <Alert.Description>Failed to save changes. Please try again.</Alert.Description>
    </Alert.Content>
    <Alert.Dismiss 
      variant="error" 
      alertTitle="System Error" 
      onClick={() => setVisible(false)} 
    />
  </Alert>
)`,
      description: "An error alert with a dismiss button. Note the use of alertTitle for better accessibility.",
    },
  },
  doNot: [
    {
      rule: "Do not omit the alertTitle prop on Alert.Dismiss",
      category: "a11y",
      why: "Without a title, the dismiss button label is generic ('Dismiss error alert'). Providing the title creates a specific label ('Dismiss error alert: System Error') which is clearer for screen reader users.",
    },
    {
      rule: "Do not rely on Icon alone to convey meaning",
      category: "a11y",
      why: "Icons are marked aria-hidden. The Title and Description must contain the critical information.",
    },
  ],
};