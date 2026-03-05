"use client";

import { useState } from "react";
import { Alert } from "vayu-ui";
import { Info, CheckCircle, TriangleAlert, XCircle } from "lucide-react";

export default function AlertDemo() {
    const [showSuccess, setShowSuccess] = useState(true);
    const [showError, setShowError] = useState(true);

    return (
        <div className="flex flex-col gap-4 w-full max-w-md">
            <Alert variant="info">
                <Alert.Icon>
                    <Info className="w-5 h-5" />
                </Alert.Icon>
                <Alert.Content>
                    <Alert.Title>Information</Alert.Title>
                    <Alert.Description>
                        This is an informational alert to highlight something important.
                    </Alert.Description>
                </Alert.Content>
            </Alert>

            {showSuccess && (
                <Alert variant="success">
                    <Alert.Icon>
                        <CheckCircle className="w-5 h-5" />
                    </Alert.Icon>
                    <Alert.Content>
                        <Alert.Title>Success</Alert.Title>
                        <Alert.Description>
                            Your changes have been successfully saved.
                        </Alert.Description>
                    </Alert.Content>
                    <Alert.Dismiss onClick={() => setShowSuccess(false)} />
                </Alert>
            )}

            <Alert variant="warning">
                <Alert.Icon>
                    <TriangleAlert className="w-5 h-5" />
                </Alert.Icon>
                <Alert.Content>
                    <Alert.Title>Warning</Alert.Title>
                    <Alert.Description>
                        Your account is about to expire. Please renew your subscription.
                    </Alert.Description>
                </Alert.Content>
            </Alert>

            {showError && (
                <Alert variant="error">
                    <Alert.Icon>
                        <XCircle className="w-5 h-5" />
                    </Alert.Icon>
                    <Alert.Content>
                        <Alert.Title>Error</Alert.Title>
                        <Alert.Description>
                            There was an error processing your request. Please try again.
                        </Alert.Description>
                    </Alert.Content>
                    <Alert.Dismiss onClick={() => setShowError(false)} />
                </Alert>
            )}

            {(!showSuccess || !showError) && (
                <button
                    onClick={() => { setShowSuccess(true); setShowError(true); }}
                    className="mt-4 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:underline transition-colors"
                >
                    Reset Alerts
                </button>
            )}
        </div>
    );
}
