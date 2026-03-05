"use client";
import { Modal } from "vayu-ui";
import { useState } from "react";

export default function ModalDemo() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDangerOpen, setIsDangerOpen] = useState(false);

    const buttonClass = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-slate-900 text-white hover:bg-slate-900/90 h-10 py-2 px-4 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90";
    const dangerButtonClass = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-red-500 text-white hover:bg-red-500/90 h-10 py-2 px-4";
    const outlineButtonClass = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-slate-100 hover:text-slate-900 h-10 py-2 px-4 dark:border-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-50";

    return (
        <div className="flex flex-wrap gap-4">
            {/* Default Modal */}
            <button onClick={() => setIsOpen(true)} className={buttonClass}>
                Open Modal
            </button>

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
                                className="col-span-3 flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="username" className="text-right text-sm font-medium">
                                Username
                            </label>
                            <input
                                id="username"
                                defaultValue="@peduarte"
                                className="col-span-3 flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50"
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
            <button onClick={() => setIsDangerOpen(true)} className={dangerButtonClass}>
                Delete Account
            </button>

            <Modal open={isDangerOpen} onOpenChange={setIsDangerOpen} variant="danger">
                <Modal.Content>
                    <Modal.Header>
                        <Modal.Title>Delete Account</Modal.Title>
                        <Modal.Description>
                            Are you sure you want to delete your account?
                        </Modal.Description>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
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
