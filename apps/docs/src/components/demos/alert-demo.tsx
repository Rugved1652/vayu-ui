"use client";

import { useState } from "react";
import { Alert } from "vayu-ui";
import { Info, CheckCircle, TriangleAlert, XCircle } from "lucide-react";

export default function AlertDemo() {
    const [showSuccess, setShowSuccess] = useState(true);
    const [showError, setShowError] = useState(true);

    return (
        <div className="w-full max-w-md not-prose">
            <h2 id="alert-demo-label" className="text-xl font-primary font-semibold mb-4">
                Alert Example
            </h2>

            <div className="flex flex-col gap-4">
                {/* Info Alert */}
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

                {/* Success Alert with Dismiss */}
                {showSuccess && (
                    <Alert variant="success">
                        <Alert.Icon variant="success">
                            <CheckCircle className="w-5 h-5" />
                        </Alert.Icon>
                        <Alert.Content>
                            <Alert.Title>Success</Alert.Title>
                            <Alert.Description>
                                Your changes have been successfully saved.
                            </Alert.Description>
                        </Alert.Content>
                        <Alert.Dismiss variant="success" alertTitle="Success" onClick={() => setShowSuccess(false)} />
                    </Alert>
                )}

                {/* Warning Alert */}
                <Alert variant="warning">
                    <Alert.Icon variant="warning">
                        <TriangleAlert className="w-5 h-5" />
                    </Alert.Icon>
                    <Alert.Content>
                        <Alert.Title>Warning</Alert.Title>
                        <Alert.Description>
                            Your account is about to expire. Please renew your subscription.
                        </Alert.Description>
                    </Alert.Content>
                </Alert>

                {/* Error Alert with Dismiss */}
                {showError && (
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
                        <Alert.Dismiss variant="error" alertTitle="Error" onClick={() => setShowError(false)} />
                    </Alert>
                )}

                {(!showSuccess || !showError) && (
                    <button
                        onClick={() => { setShowSuccess(true); setShowError(true); }}
                        className="mt-2 font-secondary text-para text-ground-500 hover:text-ground-900 dark:hover:text-ground-100 hover:underline transition-colors"
                    >
                        Reset Alerts
                    </button>
                )}
            </div>
        </div>
    );
}