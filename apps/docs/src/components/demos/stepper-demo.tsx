"use client";

import { Stepper, Button } from "vayu-ui";
import { useState } from "react";
import { User, MapPin, CreditCard, CheckCircle, Loader2, AlertCircle } from "lucide-react";

export default function StepperDemo() {
    const [activeStep, setActiveStep] = useState(1);

    const steps = [
        {
            title: "Account",
            description: "Create your account",
            icon: <User className="w-5 h-5" />,
        },
        {
            title: "Address",
            description: "Enter your address",
            icon: <MapPin className="w-5 h-5" />,
        },
        {
            title: "Payment",
            description: "Add payment method",
            icon: <CreditCard className="w-5 h-5" />,
        },
        {
            title: "Confirm",
            description: "Review and order",
            icon: <CheckCircle className="w-5 h-5" />,
        },
    ];

    return (
        <div className="w-full max-w-3xl not-prose space-y-12">
            {/* Horizontal Stepper */}
            <div className="space-y-6">
                <h3 className="text-sm font-primary font-medium text-ground-700 dark:text-ground-300 uppercase tracking-wide">
                    Horizontal Stepper
                </h3>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="small"
                        disabled={activeStep === 0}
                        onClick={() => setActiveStep((p) => Math.max(0, p - 1))}
                    >
                        Back
                    </Button>
                    <Button
                        size="small"
                        disabled={activeStep === steps.length - 1}
                        onClick={() => setActiveStep((p) => Math.min(steps.length - 1, p + 1))}
                    >
                        Next
                    </Button>
                </div>

                <Stepper.Root activeStep={activeStep} onStepClick={setActiveStep}>
                    {steps.map((step) => (
                        <Stepper.Step key={step.title}>
                            <Stepper.Indicator icon={step.icon} />
                            <Stepper.Content>
                                <Stepper.Title>{step.title}</Stepper.Title>
                                <Stepper.Description>{step.description}</Stepper.Description>
                            </Stepper.Content>
                        </Stepper.Step>
                    ))}
                </Stepper.Root>
            </div>

            {/* Vertical Stepper */}
            <div className="space-y-6">
                <h3 className="text-sm font-primary font-medium text-ground-700 dark:text-ground-300 uppercase tracking-wide">
                    Vertical Stepper
                </h3>

                <Stepper.Root activeStep={activeStep} orientation="vertical" onStepClick={setActiveStep}>
                    {steps.map((step, index) => (
                        <Stepper.Step key={step.title}>
                            <Stepper.Indicator>{index + 1}</Stepper.Indicator>
                            <Stepper.Content>
                                <Stepper.Title>{step.title}</Stepper.Title>
                                <Stepper.Description>
                                    Complete the {step.title.toLowerCase()} step to continue.
                                </Stepper.Description>
                            </Stepper.Content>
                        </Stepper.Step>
                    ))}
                </Stepper.Root>
            </div>

            {/* With Icons */}
            <div className="space-y-6">
                <h3 className="text-sm font-primary font-medium text-ground-700 dark:text-ground-300 uppercase tracking-wide">
                    With Custom Icons
                </h3>

                <Stepper.Root activeStep={activeStep}>
                    {steps.map((step) => (
                        <Stepper.Step key={step.title}>
                            <Stepper.Indicator icon={step.icon} />
                            <Stepper.Content>
                                <Stepper.Title>{step.title}</Stepper.Title>
                            </Stepper.Content>
                        </Stepper.Step>
                    ))}
                </Stepper.Root>
            </div>

            {/* Loading and Error States */}
            <div className="space-y-6">
                <h3 className="text-sm font-primary font-medium text-ground-700 dark:text-ground-300 uppercase tracking-wide">
                    Loading & Error States
                </h3>

                <Stepper.Root activeStep={1}>
                    <Stepper.Step>
                        <Stepper.Indicator icon={<CheckCircle className="w-5 h-5" />} />
                        <Stepper.Content>
                            <Stepper.Title>Completed</Stepper.Title>
                        </Stepper.Content>
                    </Stepper.Step>
                    <Stepper.Step status="loading">
                        <Stepper.Indicator icon={<Loader2 className="w-5 h-5 animate-spin" />} />
                        <Stepper.Content>
                            <Stepper.Title>Loading</Stepper.Title>
                        </Stepper.Content>
                    </Stepper.Step>
                    <Stepper.Step status="error">
                        <Stepper.Indicator icon={<AlertCircle className="w-5 h-5" />} />
                        <Stepper.Content>
                            <Stepper.Title>Error</Stepper.Title>
                        </Stepper.Content>
                    </Stepper.Step>
                    <Stepper.Step>
                        <Stepper.Indicator>4</Stepper.Indicator>
                        <Stepper.Content>
                            <Stepper.Title>Pending</Stepper.Title>
                        </Stepper.Content>
                    </Stepper.Step>
                </Stepper.Root>
            </div>

            {/* Non-clickable */}
            <div className="space-y-6">
                <h3 className="text-sm font-primary font-medium text-ground-700 dark:text-ground-300 uppercase tracking-wide">
                    Non-Clickable (Display Only)
                </h3>

                <Stepper.Root activeStep={2}>
                    {steps.map((step, index) => (
                        <Stepper.Step key={step.title}>
                            <Stepper.Indicator>{index + 1}</Stepper.Indicator>
                            <Stepper.Content>
                                <Stepper.Title>{step.title}</Stepper.Title>
                            </Stepper.Content>
                        </Stepper.Step>
                    ))}
                </Stepper.Root>
            </div>
        </div>
    );
}
