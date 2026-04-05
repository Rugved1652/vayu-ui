import {
  Brain,
  Code2,
  Terminal,
  Layers,
  ShieldCheck,
  Palette,
} from 'lucide-react';
import { Badge } from 'vayu-ui';

const features = [
  {
    icon: Brain,
    title: 'AI-Readable Architecture',
    description:
      'Components use predictable patterns and structured documentation that AI coding agents understand natively.',
  },
  {
    icon: Code2,
    title: 'Own Your Code',
    description:
      'Components live in your codebase. No vendor lock-in, no forced upgrades, no runtime dependencies.',
  },
  {
    icon: Terminal,
    title: 'CLI + MCP Server',
    description:
      'Scaffold with npx vayu-ui add. AI tools integrate via the MCP server for context-aware generation.',
    badges: ['CLI', 'MCP'],
  },
  {
    icon: Layers,
    title: '50+ Components, 35+ Hooks',
    description:
      'Buttons, cards, modals, tables, forms, navigation, data display — plus reusable logic patterns.',
  },
  {
    icon: ShieldCheck,
    title: 'WCAG 2.2 AA Accessible',
    description:
      'Every component meets accessibility standards. Keyboard navigation, screen reader support, and focus management built in.',
  },
  {
    icon: Palette,
    title: 'Tailwind CSS v4',
    description:
      'Design tokens that auto-switch between light and dark mode. Customize everything from a single CSS file.',
  },
];

export function WhyVedUI() {
  return (
    <section className="bg-canvas px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="font-primary text-3xl sm:text-4xl font-bold text-canvas-content">
            Why VedUI
          </h2>
          <p className="mt-4 text-lg font-secondary text-surface-content">
            Structured for AI. Built for humans.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
          {features.map(({ icon: Icon, title, description, badges }) => (
            <div key={title} className="flex gap-4">
              <div className="shrink-0 mt-0.5">
                <Icon className="w-5 h-5 text-brand" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-primary font-semibold text-base text-canvas-content">
                    {title}
                  </h3>
                  {badges?.map((badge) => (
                    <Badge key={badge} variant="muted" size="sm">
                      {badge}
                    </Badge>
                  ))}
                </div>
                <p className="mt-1 text-sm font-secondary text-muted-content leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
