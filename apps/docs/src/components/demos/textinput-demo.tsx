"use client"
import { TextInput } from "vayu-ui";
import { Mail, Lock, User, DollarSign } from "lucide-react";
import { useState } from "react";

export default function TextInputDemo() {
    const [bioValue, setBioValue] = useState("");
    const [searchValue, setSearchValue] = useState("");

    return (
        <div className="w-full max-w-md not-prose">
            <h2 className="text-xl font-primary font-semibold mb-6 text-ground-900 dark:text-ground-50">
                TextInput Examples
            </h2>

            <div className="flex flex-col gap-8">
                {/* Basic Input */}
                <section>
                    <h3 className="text-sm font-secondary font-medium text-ground-600 dark:text-ground-400 mb-3 uppercase tracking-wide">
                        Basic Input
                    </h3>
                    <TextInput.Root>
                        <TextInput.Label>Email Address</TextInput.Label>
                        <TextInput.Field>
                            <TextInput.Icon>
                                <Mail className="w-4 h-4" />
                            </TextInput.Icon>
                            <TextInput.Input placeholder="Enter your email" />
                        </TextInput.Field>
                        <TextInput.Description>We'll never share your email.</TextInput.Description>
                    </TextInput.Root>
                </section>

                {/* Required & Optional Fields */}
                <section>
                    <h3 className="text-sm font-secondary font-medium text-ground-600 dark:text-ground-400 mb-3 uppercase tracking-wide">
                        Required & Optional Fields
                    </h3>
                    <div className="flex flex-col gap-4">
                        <TextInput.Root required>
                            <TextInput.Label>Full Name</TextInput.Label>
                            <TextInput.Field>
                                <TextInput.Icon>
                                    <User className="w-4 h-4" />
                                </TextInput.Icon>
                                <TextInput.Input placeholder="Enter your full name" />
                            </TextInput.Field>
                        </TextInput.Root>
                        <TextInput.Root>
                            <TextInput.Label optional>Nickname</TextInput.Label>
                            <TextInput.Field>
                                <TextInput.Input placeholder="What should we call you?" />
                            </TextInput.Field>
                        </TextInput.Root>
                    </div>
                </section>

                {/* Password Input with Toggle */}
                <section>
                    <h3 className="text-sm font-secondary font-medium text-ground-600 dark:text-ground-400 mb-3 uppercase tracking-wide">
                        Password (with visibility toggle)
                    </h3>
                    <TextInput.Root inputType="password">
                        <TextInput.Label>Password</TextInput.Label>
                        <TextInput.Field>
                            <TextInput.Icon>
                                <Lock className="w-4 h-4" />
                            </TextInput.Icon>
                            <TextInput.PasswordInput placeholder="Enter password" />
                        </TextInput.Field>
                        <TextInput.Description>Must be at least 8 characters.</TextInput.Description>
                    </TextInput.Root>
                </section>

                {/* Search Input with Clear */}
                <section>
                    <h3 className="text-sm font-secondary font-medium text-ground-600 dark:text-ground-400 mb-3 uppercase tracking-wide">
                        Search (with clear button)
                    </h3>
                    <TextInput.Root value={searchValue} onChange={setSearchValue}>
                        <TextInput.Label>Search</TextInput.Label>
                        <TextInput.Field>
                            <TextInput.SearchInput placeholder="Search users..." />
                        </TextInput.Field>
                    </TextInput.Root>
                </section>

                {/* Number Inputs */}
                <section>
                    <h3 className="text-sm font-secondary font-medium text-ground-600 dark:text-ground-400 mb-3 uppercase tracking-wide">
                        Number Inputs
                    </h3>
                    <div className="flex flex-col gap-4">
                        <TextInput.Root inputType="number">
                            <TextInput.Label>Age (Natural numbers only)</TextInput.Label>
                            <TextInput.Field>
                                <TextInput.NumberInput numberType="natural" placeholder="Enter your age" />
                            </TextInput.Field>
                        </TextInput.Root>
                        <TextInput.Root inputType="number">
                            <TextInput.Label>Temperature (Integer)</TextInput.Label>
                            <TextInput.Field>
                                <TextInput.NumberInput numberType="integer" placeholder="e.g., -10 or 25" />
                            </TextInput.Field>
                        </TextInput.Root>
                        <TextInput.Root inputType="number">
                            <TextInput.Label>Price (Positive decimal)</TextInput.Label>
                            <TextInput.Field>
                                <TextInput.Icon>
                                    <DollarSign className="w-4 h-4" />
                                </TextInput.Icon>
                                <TextInput.NumberInput numberType="positive" placeholder="0.00" />
                            </TextInput.Field>
                        </TextInput.Root>
                        <TextInput.Root inputType="number" defaultValue="5">
                            <TextInput.Label>Quantity (0-10)</TextInput.Label>
                            <TextInput.Field>
                                <TextInput.NumberInput numberType="natural" min={0} max={10} />
                            </TextInput.Field>
                            <TextInput.Description>Value constrained between 0 and 10 on blur.</TextInput.Description>
                        </TextInput.Root>
                    </div>
                </section>

                {/* Validation States */}
                <section>
                    <h3 className="text-sm font-secondary font-medium text-ground-600 dark:text-ground-400 mb-3 uppercase tracking-wide">
                        Validation States
                    </h3>
                    <div className="flex flex-col gap-4">
                        <TextInput.Root validationState="error" defaultValue="invalid-email">
                            <TextInput.Label>Email</TextInput.Label>
                            <TextInput.Field>
                                <TextInput.Icon>
                                    <Mail className="w-4 h-4" />
                                </TextInput.Icon>
                                <TextInput.Input />
                            </TextInput.Field>
                            <TextInput.ErrorMessage>Please enter a valid email address.</TextInput.ErrorMessage>
                        </TextInput.Root>
                        <TextInput.Root validationState="warning" defaultValue="weak">
                            <TextInput.Label>Password Strength</TextInput.Label>
                            <TextInput.Field>
                                <TextInput.Input />
                            </TextInput.Field>
                            <TextInput.WarningMessage>Password is weak. Consider adding special characters.</TextInput.WarningMessage>
                        </TextInput.Root>
                        <TextInput.Root validationState="success" defaultValue="john.doe">
                            <TextInput.Label>Username</TextInput.Label>
                            <TextInput.Field>
                                <TextInput.Icon>
                                    <User className="w-4 h-4" />
                                </TextInput.Icon>
                                <TextInput.Input />
                            </TextInput.Field>
                            <TextInput.SuccessMessage>Username is available!</TextInput.SuccessMessage>
                        </TextInput.Root>
                    </div>
                </section>

                {/* With Character Count */}
                <section>
                    <h3 className="text-sm font-secondary font-medium text-ground-600 dark:text-ground-400 mb-3 uppercase tracking-wide">
                        Character Count
                    </h3>
                    <TextInput.Root value={bioValue} onChange={setBioValue}>
                        <TextInput.Label>Bio</TextInput.Label>
                        <TextInput.Field>
                            <TextInput.Input placeholder="Tell us about yourself" maxLength={50} />
                            <TextInput.ClearButton />
                        </TextInput.Field>
                        <TextInput.CharacterCount maxLength={50} showCount="always" />
                    </TextInput.Root>
                </section>

                {/* Input Sizes */}
                <section>
                    <h3 className="text-sm font-secondary font-medium text-ground-600 dark:text-ground-400 mb-3 uppercase tracking-wide">
                        Sizes
                    </h3>
                    <div className="flex flex-col gap-4">
                        <TextInput.Root size="sm">
                            <TextInput.Label>Small</TextInput.Label>
                            <TextInput.Field>
                                <TextInput.Input placeholder="Small input" />
                            </TextInput.Field>
                        </TextInput.Root>
                        <TextInput.Root size="md">
                            <TextInput.Label>Medium (default)</TextInput.Label>
                            <TextInput.Field>
                                <TextInput.Input placeholder="Medium input" />
                            </TextInput.Field>
                        </TextInput.Root>
                        <TextInput.Root size="lg">
                            <TextInput.Label>Large</TextInput.Label>
                            <TextInput.Field>
                                <TextInput.Input placeholder="Large input" />
                            </TextInput.Field>
                        </TextInput.Root>
                    </div>
                </section>

                {/* States */}
                <section>
                    <h3 className="text-sm font-secondary font-medium text-ground-600 dark:text-ground-400 mb-3 uppercase tracking-wide">
                        States
                    </h3>
                    <div className="flex flex-col gap-4">
                        <TextInput.Root loading>
                            <TextInput.Label>Loading</TextInput.Label>
                            <TextInput.Field>
                                <TextInput.Input placeholder="Checking..." />
                                <TextInput.LoadingSpinner />
                            </TextInput.Field>
                        </TextInput.Root>
                        <TextInput.Root disabled>
                            <TextInput.Label>Disabled</TextInput.Label>
                            <TextInput.Field>
                                <TextInput.Input placeholder="Cannot edit" />
                            </TextInput.Field>
                        </TextInput.Root>
                        <TextInput.Root readOnly defaultValue="Read-only value">
                            <TextInput.Label>Read Only</TextInput.Label>
                            <TextInput.Field>
                                <TextInput.Input />
                            </TextInput.Field>
                        </TextInput.Root>
                    </div>
                </section>
            </div>
        </div>
    );
}
