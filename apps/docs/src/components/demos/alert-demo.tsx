'use client';

import { useState } from 'react';
import { Alert, Typography, Divider, Button } from 'vayu-ui';
import { Info, CheckCircle, TriangleAlert, XCircle } from 'lucide-react';

export default function AlertDemo() {
  const [showSuccess, setShowSuccess] = useState(true);
  const [showError, setShowError] = useState(true);

  return (
    <div className="w-full max-w-md m-auto not-prose">
      <Typography.H5 id="alert-demo-label" className="mb-4">
        Alert Example
      </Typography.H5>

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

        <Divider spacing="sm" />

        {/* Success Alert with Dismiss */}
        {showSuccess && (
          <Alert variant="success">
            <Alert.Icon variant="success">
              <CheckCircle className="w-5 h-5" />
            </Alert.Icon>
            <Alert.Content>
              <Alert.Title>Success</Alert.Title>
              <Alert.Description>Your changes have been successfully saved.</Alert.Description>
            </Alert.Content>
            <Alert.Dismiss
              variant="success"
              alertTitle="Success"
              onClick={() => setShowSuccess(false)}
            />
          </Alert>
        )}

        <Divider spacing="sm" />

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

        <Divider spacing="sm" />

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
          <Button
            variant="ghost"
            size="small"
            onClick={() => {
              setShowSuccess(true);
              setShowError(true);
            }}
          >
            <Button.Text>Reset Alerts</Button.Text>
          </Button>
        )}
      </div>
    </div>
  );
}
