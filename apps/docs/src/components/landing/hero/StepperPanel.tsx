'use client';

import { useState } from 'react';
import { Package, SlidersHorizontal, Sparkles, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge, Button, Stepper } from 'vayu-ui';

export function StepperPanel() {
  const [activeStep, setActiveStep] = useState(1);
  const steps: { icon: LucideIcon; title: string; description: string }[] = [
    { icon: SlidersHorizontal, title: 'Configure', description: 'Set up controls' },
    { icon: Sparkles, title: 'Preview', description: 'See live output' },
    { icon: Package, title: 'Ship', description: 'Export assets' },
  ];

  return (
    <div className="hero-collage-panel h-full flex flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-brand" />
          <span className="font-tertiary text-xs text-muted-content">Stepper</span>
        </div>
        <Badge variant="brand" size="sm">
          Progress
        </Badge>
      </div>

      <div className="flex-1 flex flex-col justify-between gap-4">
        <Stepper.Root activeStep={activeStep} onStepClick={setActiveStep} orientation="vertical">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Stepper.Step key={step.title}>
                <Stepper.Indicator icon={<Icon className="w-4 h-4" />} />
                <Stepper.Content>
                  <Stepper.Title>{step.title}</Stepper.Title>
                  <Stepper.Description>{step.description}</Stepper.Description>
                </Stepper.Content>
              </Stepper.Step>
            );
          })}
        </Stepper.Root>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="small"
            className="flex-1"
            disabled={activeStep === 0}
            onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
          >
            Back
          </Button>
          <Button
            variant="primary"
            size="small"
            className="flex-1"
            disabled={activeStep === steps.length - 1}
            onClick={() => setActiveStep((s) => Math.min(steps.length - 1, s + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
