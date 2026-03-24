"use client";

import React, { useState } from "react";
import { Modal, Button, Typography, Divider } from "vayu-ui";

export default function ModalDemo() {
  const [isControlledOpen, setIsControlledOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-canvas p-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <header className="space-y-2">
          <Typography.H1>Modal Component</Typography.H1>
          <Typography.P variant="secondary">
            Accessible dialog component with focus trap, keyboard navigation,
            and compound component API.
          </Typography.P>
        </header>

        <Divider />

        {/* Example 1: Uncontrolled Modal with Trigger */}
        <section className="space-y-4">
          <div>
            <Typography.H2>1. Uncontrolled Modal</Typography.H2>
            <Typography.P variant="secondary" className="mt-1">
              State is managed internally. Use{" "}
              <Typography.Code>Modal.Trigger</Typography.Code> to open.
            </Typography.P>
          </div>

          <Modal>
            <Modal.Trigger>
              <Button variant="primary">Open Modal</Button>
            </Modal.Trigger>

            <Modal.Content>
              <Modal.Header>
                <div className="flex-1">
                  <Modal.Title>Welcome Message</Modal.Title>
                  <Modal.Description>
                    This modal manages its own open state internally.
                  </Modal.Description>
                </div>
                <Modal.Close />
              </Modal.Header>

              <Modal.Body>
                <Typography.P>
                  This is a simple modal dialog. You can close it by clicking
                  the X button, clicking outside the modal, or pressing the
                  Escape key.
                </Typography.P>
              </Modal.Body>

              <Modal.Footer>
                <Modal.Close>
                  <Button variant="secondary">Close</Button>
                </Modal.Close>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </section>

        <Divider />

        {/* Example 2: Controlled Modal */}
        <section className="space-y-4">
          <div>
            <Typography.H2>2. Controlled Modal</Typography.H2>
            <Typography.P variant="secondary" className="mt-1">
              Control the modal state externally for programmatic opening.
            </Typography.P>
          </div>

          <Button
            variant="primary"
            onClick={() => setIsControlledOpen(true)}
          >
            Open Controlled Modal
          </Button>

          <Modal open={isControlledOpen} onOpenChange={setIsControlledOpen}>
            <Modal.Content>
              <Modal.Header>
                <div className="flex-1">
                  <Modal.Title>Controlled State</Modal.Title>
                  <Modal.Description>
                    This modal is controlled by external state.
                  </Modal.Description>
                </div>
                <Modal.Close />
              </Modal.Header>

              <Modal.Body>
                <Typography.P className="mb-4">
                  The open state is managed by the parent component. This is
                  useful when you need to open the modal programmatically or
                  track the state.
                </Typography.P>
                <div className="p-4 rounded-surface bg-info/10 border border-info">
                  <Typography.P variant="info">
                    <strong>Current state:</strong>{" "}
                    {isControlledOpen ? "Open" : "Closed"}
                  </Typography.P>
                </div>
              </Modal.Body>

              <Modal.Footer>
                <Modal.Close>
                  <Button variant="secondary">Cancel</Button>
                </Modal.Close>
                <Button variant="primary" onClick={() => setIsControlledOpen(false)}>
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </section>

        <Divider />

        {/* Example 3: Form Modal */}
        <section className="space-y-4">
          <div>
            <Typography.H2>3. Form Modal</Typography.H2>
            <Typography.P variant="secondary" className="mt-1">
              Modal containing a form with proper label associations.
            </Typography.P>
          </div>

          <Modal>
            <Modal.Trigger>
              <Button variant="primary">Edit Profile</Button>
            </Modal.Trigger>

            <Modal.Content>
              <Modal.Header>
                <div className="flex-1">
                  <Modal.Title>Edit Profile</Modal.Title>
                  <Modal.Description>
                    Update your personal information below.
                  </Modal.Description>
                </div>
                <Modal.Close />
              </Modal.Header>

              <Modal.Body>
                <form className="space-y-4">
                  <div>
                    <Typography.Label
                      htmlFor="name-input"
                      className="block mb-1.5"
                    >
                      Full Name
                    </Typography.Label>
                    <input
                      type="text"
                      id="name-input"
                      placeholder="John Doe"
                      className="w-full px-3 py-2 rounded-control border border-field bg-surface text-surface-content placeholder:text-muted-content focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                    />
                  </div>

                  <div>
                    <Typography.Label
                      htmlFor="email-input"
                      className="block mb-1.5"
                    >
                      Email Address
                    </Typography.Label>
                    <input
                      type="email"
                      id="email-input"
                      placeholder="john@example.com"
                      className="w-full px-3 py-2 rounded-control border border-field bg-surface text-surface-content placeholder:text-muted-content focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                    />
                  </div>

                  <div>
                    <Typography.Label
                      htmlFor="bio-input"
                      className="block mb-1.5"
                    >
                      Bio
                    </Typography.Label>
                    <textarea
                      id="bio-input"
                      rows={3}
                      placeholder="Tell us about yourself..."
                      className="w-full px-3 py-2 rounded-control border border-field bg-surface text-surface-content placeholder:text-muted-content focus:outline-none focus-visible:ring-2 focus-visible:ring-focus resize-none"
                    />
                  </div>
                </form>
              </Modal.Body>

              <Modal.Footer>
                <Modal.Close>
                  <Button variant="secondary">Cancel</Button>
                </Modal.Close>
                <Button variant="primary">Save Changes</Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </section>

        <Divider />

        {/* Example 4: Destructive Action */}
        <section className="space-y-4">
          <div>
            <Typography.H2>4. Destructive Action</Typography.H2>
            <Typography.P variant="secondary" className="mt-1">
              Confirmation modal for destructive actions.
            </Typography.P>
          </div>

          <Button
            variant="destructive"
            onClick={() => setIsDeleteOpen(true)}
          >
            Delete Account
          </Button>

          <Modal
            open={isDeleteOpen}
            onOpenChange={setIsDeleteOpen}
            size="sm"
            closeOnOverlayClick={false}
          >
            <Modal.Content>
              <Modal.Header>
                <div className="flex-1">
                  <Modal.Title>Delete Account?</Modal.Title>
                  <Modal.Description>
                    This action cannot be undone.
                  </Modal.Description>
                </div>
                <Modal.Close />
              </Modal.Header>

              <Modal.Body>
                <div className="space-y-3">
                  <Typography.P>
                    Are you sure you want to delete your account? All of your
                    data will be permanently removed. This action cannot be
                    undone.
                  </Typography.P>
                  <div className="p-3 rounded-surface bg-destructive/10 border border-destructive">
                    <Typography.P variant="error">
                      ⚠️ Warning: This is a permanent action
                    </Typography.P>
                  </div>
                </div>
              </Modal.Body>

              <Modal.Footer>
                <Modal.Close>
                  <Button variant="secondary">Cancel</Button>
                </Modal.Close>
                <Button
                  variant="destructive"
                  onClick={() => {
                    alert("Account deleted!");
                    setIsDeleteOpen(false);
                  }}
                >
                  Delete Account
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </section>

        <Divider />

        {/* Example 5: Size Variants */}
        <section className="space-y-4">
          <div>
            <Typography.H2>5. Size Options</Typography.H2>
            <Typography.P variant="secondary" className="mt-1">
              Different modal sizes for different content needs.
            </Typography.P>
          </div>

          <div className="flex flex-wrap gap-3">
            {(["sm", "md", "lg", "xl", "full"] as const).map((size) => (
              <Modal key={size} size={size}>
                <Modal.Trigger>
                  <Button variant="outline">{size.toUpperCase()}</Button>
                </Modal.Trigger>

                <Modal.Content>
                  <Modal.Header>
                    <div className="flex-1">
                      <Modal.Title>{size.toUpperCase()} Modal</Modal.Title>
                      <Modal.Description>
                        This modal uses the {size} size variant.
                      </Modal.Description>
                    </div>
                    <Modal.Close />
                  </Modal.Header>

                  <Modal.Body>
                    <Typography.P>
                      This modal demonstrates the{" "}
                      <strong>{size}</strong> size option.
                      {size === "full" &&
                        " It takes up almost the entire viewport width."}
                    </Typography.P>
                  </Modal.Body>

                  <Modal.Footer>
                    <Modal.Close>
                      <Button variant="secondary">Close</Button>
                    </Modal.Close>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>
            ))}
          </div>
        </section>

        <Divider />

        {/* Example 6: Configuration Options */}
        <section className="space-y-4">
          <div>
            <Typography.H2>6. Configuration Options</Typography.H2>
            <Typography.P variant="secondary" className="mt-1">
              Disable overlay click or escape key closing.
            </Typography.P>
          </div>

          <div className="flex flex-wrap gap-3">
            <Modal closeOnOverlayClick={false}>
              <Modal.Trigger>
                <Button variant="outline">No Overlay Close</Button>
              </Modal.Trigger>

              <Modal.Content>
                <Modal.Header>
                  <div className="flex-1">
                    <Modal.Title>Important Notice</Modal.Title>
                    <Modal.Description>
                      This modal cannot be closed by clicking outside.
                    </Modal.Description>
                  </div>
                  <Modal.Close />
                </Modal.Header>

                <Modal.Body>
                  <Typography.P>
                    You must explicitly close this modal using the X button or
                    the close button below. Clicking the overlay won't work.
                  </Typography.P>
                </Modal.Body>

                <Modal.Footer>
                  <Modal.Close>
                    <Button variant="primary">Got it</Button>
                  </Modal.Close>
                </Modal.Footer>
              </Modal.Content>
            </Modal>

            <Modal closeOnEscape={false}>
              <Modal.Trigger>
                <Button variant="outline">No Escape Close</Button>
              </Modal.Trigger>

              <Modal.Content>
                <Modal.Header>
                  <div className="flex-1">
                    <Modal.Title>No Escape Key</Modal.Title>
                    <Modal.Description>
                      Pressing Escape won't close this modal.
                    </Modal.Description>
                  </div>
                  <Modal.Close />
                </Modal.Header>

                <Modal.Body>
                  <Typography.P>
                    The Escape key is disabled for this modal. Use the close
                    buttons instead.
                  </Typography.P>
                </Modal.Body>

                <Modal.Footer>
                  <Modal.Close>
                    <Button variant="primary">Close</Button>
                  </Modal.Close>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </div>
        </section>
      </div>
    </div>
  );
}
