"use client";

import {
    Stepper,
    Step,
    StepIndicator,
    StepContent,
    StepTitle,
    StepDescription,
} from "vayu-ui";
import { useState } from "react";
import { User, MapPin, CreditCard, CheckCircle } from "lucide-react";
import { Button } from "vayu-ui";

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
        <div className="flex flex-col gap-12 w-full max-w-3xl">
            {/* ── Horizontal ── */}
            <div className="flex flex-col gap-6 p-6 border rounded-xl bg-white dark:bg-ground-900 border-ground-200 dark:border-ground-800">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Checkout Flow</h3>
                    <div className="flex gap-2">
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
                            disabled={activeStep === steps.length}
                            onClick={() => setActiveStep((p) => Math.min(steps.length, p + 1))}
                        >
                            Next
                        </Button>
                    </div>
                </div>

                <Stepper activeStep={activeStep}>
                    {steps.map((step, index) => (
                        <Step key={step.title} onClick={() => setActiveStep(index)}>
                            <StepIndicator icon={step.icon} />
                            <StepContent>
                                <StepTitle>{step.title}</StepTitle>
                                <StepDescription>{step.description}</StepDescription>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </div>

            {/* ── Vertical ── */}
            <div className="flex flex-col gap-6 p-6 border rounded-xl bg-white dark:bg-ground-900 border-ground-200 dark:border-ground-800">
                <h3 className="font-semibold text-lg">Timeline View</h3>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.title} onClick={() => setActiveStep(index)}>
                            <StepIndicator>{index + 1}</StepIndicator>
                            <StepContent>
                                <StepTitle>{step.title}</StepTitle>
                                <StepDescription>
                                    This step requires you to enter details for {step.title.toLowerCase()}.
                                    <br />
                                    <span className="opacity-60 text-[10px]">Updated 2 mins ago</span>
                                </StepDescription>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </div>
        </div>
    );
}
