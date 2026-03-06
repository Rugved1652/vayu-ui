"use client"
import { Modal } from "vayu-ui";
import { useState } from "react";

export default function ModalDemo() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDangerOpen, setIsDangerOpen] = useState(false);

    const buttonClass = "inline-flex items-center justify-center rounded font-secondary text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none focus-visible:ring-offset-ground-100 dark:focus-visible:ring-offset-ground-900 bg-primary-500 text-ground-900 hover:bg-primary-600 h-10 py-2 px-4";
    const dangerButtonClass = "inline-flex items-center justify-center rounded font-secondary text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none focus-visible:ring-offset-ground-100 dark:focus-visible:ring-offset-ground-900 bg-error-500 text-ground-900 hover:bg-error-600 h-10 py-2 px-4";
    const outlineButtonClass = "inline-flex items-center justify-center rounded font-secondary text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none focus-visible:ring-offset-ground-100 dark:focus-visible:ring-offset-ground-900 border-2 border-ground-300 hover:bg-ground-200 hover:text-ground-900 h-10 py-2 px-4 dark:border-ground-700 dark:hover:bg-ground-800 dark:hover:text-ground-50";

    return (
        <div className="w-full max-w-md not-prose">
            <h2 id="modal-demo-label" className="text-h4 font-primary font-semibold mb-4">
                Modal Example
            </h2>

            <div className="flex flex-wrap gap-4">
                {/* Default Modal */}
                <button onClick={() => setIsOpen(true)} className={buttonClass}>
                    Open Modal
                </button>

                {/* Danger Modal */}
                <button onClick={() => setIsDangerOpen(true)} className={dangerButtonClass}>
                    Delete Account
                </button>
            </div>

            {/* Default Modal */}
            <Modal open={isOpen} onOpenChange={setIsOpen}>
                <Modal.Content className="sm:max-w-[425px]">
                    <Modal.Header>
                        <Modal.Title>Edit Profile</Modal.Title>
                        <Modal.Description>
                            Make changes to your profile here. Click save when you're done.
                        </Modal.Description>
                    </Modal.Header>
                    <Modal.Body className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="name" className="text-right text-sm font-medium">
                                Name
                            </label>
                            <input
                                id="name"
                                defaultValue="Pedro Duarte"
                                className="col-span-3 flex h-10 w-full rounded border-2 border-ground-300 bg-transparent px-3 py-2 text-sm font-secondary placeholder:text-ground-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-ground-700 dark:text-ground-50"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="username" className="text-right text-sm font-medium">
                                Username
                            </label>
                            <input
                                id="username"
                                defaultValue="@peduarte"
                                className="col-span-3 flex h-10 w-full rounded border-2 border-ground-300 bg-transparent px-3 py-2 text-sm font-secondary placeholder:text-ground-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-ground-700 dark:text-ground-50"
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={() => setIsOpen(false)} className={outlineButtonClass}>Cancel</button>
                        <button onClick={() => setIsOpen(false)} className={buttonClass}>Save changes</button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            {/* Danger Modal */}
            <Modal open={isDangerOpen} onOpenChange={setIsDangerOpen} variant="danger">
                <Modal.Content>
                    <Modal.Header>
                        <Modal.Title>Delete Account</Modal.Title>
                        <Modal.Description>
                            Are you sure you want to delete your account?
                        </Modal.Description>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="text-para font-secondary text-ground-500 dark:text-ground-400">
                            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={() => setIsDangerOpen(false)} className={outlineButtonClass}>Cancel</button>
                        <button onClick={() => setIsDangerOpen(false)} className={dangerButtonClass}>Delete</button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </div>
    );
}