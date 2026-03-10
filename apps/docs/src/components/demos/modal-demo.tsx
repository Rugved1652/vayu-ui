"use client";

import React, { useState } from "react";
import { Modal } from "vayu-ui";

export default function ModalDemo() {
  const [isControlledOpen, setIsControlledOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ground-50 dark:bg-ground-950 p-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-4xl font-bold text-ground-900 dark:text-ground-100">
            Modal Component
          </h1>
          <p className="text-lg text-ground-600 dark:text-ground-400">
            Accessible dialog component with focus trap, keyboard navigation,
            and compound component API.
          </p>
        </header>

        {/* Example 1: Uncontrolled Modal with Trigger */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-ground-900 dark:text-ground-100">
              1. Uncontrolled Modal
            </h2>
            <p className="mt-1 text-ground-600 dark:text-ground-400">
              State is managed internally. Use{" "}
              <code className="px-1.5 py-0.5 rounded bg-ground-200 dark:bg-ground-800 text-sm">
                Modal.Trigger
              </code>{" "}
              to open.
            </p>
          </div>

          <Modal>
            <Modal.Trigger className="px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 transition-colors">
              Open Modal
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
                <p className="text-ground-700 dark:text-ground-300">
                  This is a simple modal dialog. You can close it by clicking
                  the X button, clicking outside the modal, or pressing the
                  Escape key.
                </p>
              </Modal.Body>

              <Modal.Footer>
                <Modal.Close className="px-4 py-2 rounded-md bg-ground-200 dark:bg-ground-700 text-ground-900 dark:text-ground-100 hover:bg-ground-300 dark:hover:bg-ground-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors">
                  Close
                </Modal.Close>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </section>

        {/* Example 2: Controlled Modal */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-ground-900 dark:text-ground-100">
              2. Controlled Modal
            </h2>
            <p className="mt-1 text-ground-600 dark:text-ground-400">
              Control the modal state externally for programmatic opening.
            </p>
          </div>

          <button
            onClick={() => setIsControlledOpen(true)}
            className="px-4 py-2 rounded-md bg-success-600 text-white hover:bg-success-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-success-500 focus-visible:ring-offset-2 transition-colors"
          >
            Open Controlled Modal
          </button>

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
                <p className="text-ground-700 dark:text-ground-300 mb-4">
                  The open state is managed by the parent component. This is
                  useful when you need to open the modal programmatically or
                  track the state.
                </p>
                <div className="p-4 rounded-md bg-info-100 dark:bg-info-950 border border-info-200 dark:border-info-800">
                  <p className="text-sm text-info-900 dark:text-info-100">
                    <strong>Current state:</strong>{" "}
                    {isControlledOpen ? "Open" : "Closed"}
                  </p>
                </div>
              </Modal.Body>

              <Modal.Footer>
                <Modal.Close className="px-4 py-2 rounded-md bg-ground-200 dark:bg-ground-700 text-ground-900 dark:text-ground-100 hover:bg-ground-300 dark:hover:bg-ground-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors">
                  Cancel
                </Modal.Close>
                <button
                  onClick={() => setIsControlledOpen(false)}
                  className="px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors"
                >
                  Confirm
                </button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </section>

        {/* Example 3: Form Modal */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-ground-900 dark:text-ground-100">
              3. Form Modal
            </h2>
            <p className="mt-1 text-ground-600 dark:text-ground-400">
              Modal containing a form with proper label associations.
            </p>
          </div>

          <Modal>
            <Modal.Trigger className="px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 transition-colors">
              Edit Profile
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
                    <label
                      htmlFor="name-input"
                      className="block text-sm font-medium text-ground-700 dark:text-ground-300 mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name-input"
                      placeholder="John Doe"
                      className="w-full px-3 py-2 rounded-md border border-ground-300 dark:border-ground-600 bg-ground-50 dark:bg-ground-900 text-ground-900 dark:text-ground-100 placeholder:text-ground-400 dark:placeholder:text-ground-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email-input"
                      className="block text-sm font-medium text-ground-700 dark:text-ground-300 mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email-input"
                      placeholder="john@example.com"
                      className="w-full px-3 py-2 rounded-md border border-ground-300 dark:border-ground-600 bg-ground-50 dark:bg-ground-900 text-ground-900 dark:text-ground-100 placeholder:text-ground-400 dark:placeholder:text-ground-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="bio-input"
                      className="block text-sm font-medium text-ground-700 dark:text-ground-300 mb-1.5"
                    >
                      Bio
                    </label>
                    <textarea
                      id="bio-input"
                      rows={3}
                      placeholder="Tell us about yourself..."
                      className="w-full px-3 py-2 rounded-md border border-ground-300 dark:border-ground-600 bg-ground-50 dark:bg-ground-900 text-ground-900 dark:text-ground-100 placeholder:text-ground-400 dark:placeholder:text-ground-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 resize-none"
                    />
                  </div>
                </form>
              </Modal.Body>

              <Modal.Footer>
                <Modal.Close className="px-4 py-2 rounded-md bg-ground-200 dark:bg-ground-700 text-ground-900 dark:text-ground-100 hover:bg-ground-300 dark:hover:bg-ground-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors">
                  Cancel
                </Modal.Close>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors"
                >
                  Save Changes
                </button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </section>

        {/* Example 4: Destructive Action */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-ground-900 dark:text-ground-100">
              4. Destructive Action
            </h2>
            <p className="mt-1 text-ground-600 dark:text-ground-400">
              Confirmation modal for destructive actions.
            </p>
          </div>

          <button
            onClick={() => setIsDeleteOpen(true)}
            className="px-4 py-2 rounded-md bg-error-600 text-white hover:bg-error-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-error-500 focus-visible:ring-offset-2 transition-colors"
          >
            Delete Account
          </button>

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
                  <p className="text-ground-700 dark:text-ground-300">
                    Are you sure you want to delete your account? All of your
                    data will be permanently removed. This action cannot be
                    undone.
                  </p>
                  <div className="p-3 rounded-md bg-error-100 dark:bg-error-950 border border-error-200 dark:border-error-800">
                    <p className="text-sm text-error-900 dark:text-error-100 font-medium">
                      ⚠️ Warning: This is a permanent action
                    </p>
                  </div>
                </div>
              </Modal.Body>

              <Modal.Footer>
                <Modal.Close className="px-4 py-2 rounded-md bg-ground-200 dark:bg-ground-700 text-ground-900 dark:text-ground-100 hover:bg-ground-300 dark:hover:bg-ground-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors">
                  Cancel
                </Modal.Close>
                <button
                  onClick={() => {
                    alert("Account deleted!");
                    setIsDeleteOpen(false);
                  }}
                  className="px-4 py-2 rounded-md bg-error-600 text-white hover:bg-error-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-error-500 transition-colors"
                >
                  Delete Account
                </button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </section>

        {/* Example 5: Size Variants */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-ground-900 dark:text-ground-100">
              5. Size Options
            </h2>
            <p className="mt-1 text-ground-600 dark:text-ground-400">
              Different modal sizes for different content needs.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {(["sm", "md", "lg", "xl", "full"] as const).map((size) => (
              <Modal key={size} size={size}>
                <Modal.Trigger className="px-4 py-2 rounded-md border border-ground-300 dark:border-ground-600 text-ground-700 dark:text-ground-300 hover:bg-ground-100 dark:hover:bg-ground-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 transition-colors">
                  {size.toUpperCase()}
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
                    <p className="text-ground-700 dark:text-ground-300">
                      This modal demonstrates the{" "}
                      <strong>{size}</strong> size option.
                      {size === "full" &&
                        " It takes up almost the entire viewport width."}
                    </p>
                  </Modal.Body>

                  <Modal.Footer>
                    <Modal.Close className="px-4 py-2 rounded-md bg-ground-200 dark:bg-ground-700 text-ground-900 dark:text-ground-100 hover:bg-ground-300 dark:hover:bg-ground-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors">
                      Close
                    </Modal.Close>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>
            ))}
          </div>
        </section>

        {/* Example 6: Configuration Options */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-ground-900 dark:text-ground-100">
              6. Configuration Options
            </h2>
            <p className="mt-1 text-ground-600 dark:text-ground-400">
              Disable overlay click or escape key closing.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Modal closeOnOverlayClick={false}>
              <Modal.Trigger className="px-4 py-2 rounded-md border border-ground-300 dark:border-ground-600 text-ground-700 dark:text-ground-300 hover:bg-ground-100 dark:hover:bg-ground-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 transition-colors">
                No Overlay Close
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
                  <p className="text-ground-700 dark:text-ground-300">
                    You must explicitly close this modal using the X button or
                    the close button below. Clicking the overlay won't work.
                  </p>
                </Modal.Body>

                <Modal.Footer>
                  <Modal.Close className="px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors">
                    Got it
                  </Modal.Close>
                </Modal.Footer>
              </Modal.Content>
            </Modal>

            <Modal closeOnEscape={false}>
              <Modal.Trigger className="px-4 py-2 rounded-md border border-ground-300 dark:border-ground-600 text-ground-700 dark:text-ground-300 hover:bg-ground-100 dark:hover:bg-ground-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 transition-colors">
                No Escape Close
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
                  <p className="text-ground-700 dark:text-ground-300">
                    The Escape key is disabled for this modal. Use the close
                    buttons instead.
                  </p>
                </Modal.Body>

                <Modal.Footer>
                  <Modal.Close className="px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors">
                    Close
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
