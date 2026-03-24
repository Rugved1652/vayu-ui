"use client"
import { TextInput, Typography, Divider, Button } from "vayu-ui";
import { Mail, Lock, User, DollarSign, Save, Send, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function TextInputDemo() {
    const [bioValue, setBioValue] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [formValue, setFormValue] = useState("");

    return (
        <div className="w-full max-w-md not-prose">
            <Typography.H2 variant="primary">
                TextInput Examples
            </Typography.H2>

            <div className="flex flex-col gap-8 mt-6">
                {/* Basic Input */}
                <section>
                    <Typography.H5 variant="secondary" className="uppercase tracking-wide mb-3">
                        Basic Input
                    </Typography.H5>
                    <TextInput.Root>
                        <TextInput.Label>Email Address</TextInput.Label>
                        <TextInput.Field>
                            <TextInput.Icon>
                                <Mail className="w-4 h-4" />
                            </TextInput.Icon>
                            <TextInput.Input placeholder="Enter your email" />
                        </TextInput.Field>
                        <TextInput.Description>We&apos;ll never share your email.</TextInput.Description>
                    </TextInput.Root>
                </section>

                <Divider spacing="md" decorative />

                {/* Required & Optional Fields */}
                <section>
                    <Typography.H5 variant="secondary" className="uppercase tracking-wide mb-3">
                        Required & Optional Fields
                    </Typography.H5>
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

                <Divider spacing="md" decorative />

                {/* Password Input with Toggle */}
                <section>
                    <Typography.H5 variant="secondary" className="uppercase tracking-wide mb-3">
                        Password (with visibility toggle)
                    </Typography.H5>
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

                <Divider spacing="md" decorative />

                {/* Search Input with Clear */}
                <section>
                    <Typography.H5 variant="secondary" className="uppercase tracking-wide mb-3">
                        Search (with clear button)
                    </Typography.H5>
                    <TextInput.Root value={searchValue} onChange={setSearchValue}>
                        <TextInput.Label>Search</TextInput.Label>
                        <TextInput.Field>
                            <TextInput.SearchInput placeholder="Search users..." />
                            <TextInput.ClearButton />
                        </TextInput.Field>
                    </TextInput.Root>
                </section>

                <Divider spacing="md" decorative />

                {/* Number Inputs */}
                <section>
                    <Typography.H5 variant="secondary" className="uppercase tracking-wide mb-3">
                        Number Inputs
                    </Typography.H5>
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

                <Divider spacing="md" decorative />

                {/* Validation States */}
                <section>
                    <Typography.H5 variant="secondary" className="uppercase tracking-wide mb-3">
                        Validation States
                    </Typography.H5>
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

                <Divider spacing="md" decorative />

                {/* With Character Count */}
                <section>
                    <Typography.H5 variant="secondary" className="uppercase tracking-wide mb-3">
                        Character Count
                    </Typography.H5>
                    <TextInput.Root value={bioValue} onChange={setBioValue}>
                        <TextInput.Label>Bio</TextInput.Label>
                        <TextInput.Field>
                            <TextInput.Input placeholder="Tell us about yourself" maxLength={50} />
                            <TextInput.ClearButton />
                        </TextInput.Field>
                        <TextInput.CharacterCount maxLength={50} showCount="always" />
                    </TextInput.Root>
                </section>

                <Divider spacing="md" decorative />

                {/* Input Sizes */}
                <section>
                    <Typography.H5 variant="secondary" className="uppercase tracking-wide mb-3">
                        Sizes
                    </Typography.H5>
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

                <Divider spacing="md" decorative />

                {/* States */}
                <section>
                    <Typography.H5 variant="secondary" className="uppercase tracking-wide mb-3">
                        States
                    </Typography.H5>
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

                <Divider spacing="md" decorative />

                {/* With Form Actions */}
                <section>
                    <Typography.H5 variant="secondary" className="uppercase tracking-wide mb-3">
                        With Form Actions
                    </Typography.H5>
                    <div className="flex flex-col gap-4">
                        <TextInput.Root value={formValue} onChange={setFormValue}>
                            <TextInput.Label>Project Name</TextInput.Label>
                            <TextInput.Field>
                                <TextInput.Input placeholder="Enter project name" />
                            </TextInput.Field>
                            <TextInput.Description>Choose a unique name for your project.</TextInput.Description>
                        </TextInput.Root>
                        <div className="flex gap-3 mt-2">
                            <Button variant="primary" size="medium">
                                <Button.Icon size="medium">
                                    <Save className="w-5 h-5" />
                                </Button.Icon>
                                <Button.Text>Save</Button.Text>
                            </Button>
                            <Button variant="secondary" size="medium">
                                <Button.Icon size="medium">
                                    <RefreshCw className="w-5 h-5" />
                                </Button.Icon>
                                <Button.Text>Reset</Button.Text>
                            </Button>
                            <Button variant="outline" size="medium">
                                <Button.Icon size="medium">
                                    <Send className="w-5 h-5" />
                                </Button.Icon>
                                <Button.Text>Submit</Button.Text>
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
