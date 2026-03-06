"use client";

import { Stepper, Button } from "vayu-ui";
import { useState } from "react";
import { User, MapPin, CreditCard, CheckCircle } from "lucide-react";

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
            <div className="space-y-6">
                <h2 id="stepper-demo-label" className="font-primary text-xl font-semibold text-ground-900 dark:text-ground-100">
                    Horizontal Stepper
                </h2>

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
                    {steps.map((step, index) => (
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

            <div className="space-y-6">
                <h2 className="font-primary text-xl font-semibold text-ground-900 dark:text-ground-100">
                    Vertical Stepper
                </h2>

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
        </div>
    );
}