"use client"
import { TextInput } from "vayu-ui";
import { Mail, Lock, User, Search } from "lucide-react";
import { useState } from "react";

export default function TextInputDemo() {
    const [bioValue, setBioValue] = useState("");

    return (
        <div className="w-full max-w-md not-prose">
            <h2 id="textinput-demo-label" className="text-xl font-primary font-semibold mb-6 text-ground-900 dark:text-ground-50">
                TextInput Examples
            </h2>

            <div className="flex flex-col gap-6">
                {/* Basic Input */}
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

                {/* Password Input */}
                <TextInput.Root inputType="password">
                    <TextInput.Label>Password</TextInput.Label>
                    <TextInput.Field>
                        <TextInput.Icon>
                            <Lock className="w-4 h-4" />
                        </TextInput.Icon>
                        <TextInput.PasswordInput placeholder="Enter password" />
                    </TextInput.Field>
                </TextInput.Root>

                {/* Search Input */}
                <TextInput.Root inputType="search">
                    <TextInput.Label>Search</TextInput.Label>
                    <TextInput.Field>
                        <TextInput.SearchInput placeholder="Search..." />
                    </TextInput.Field>
                </TextInput.Root>

                {/* Error State */}
                <TextInput.Root validationState="error" defaultValue="invaliduser">
                    <TextInput.Label>Username</TextInput.Label>
                    <TextInput.Field>
                        <TextInput.Icon>
                            <User className="w-4 h-4" />
                        </TextInput.Icon>
                        <TextInput.Input />
                    </TextInput.Field>
                    <TextInput.ErrorMessage>Username already taken.</TextInput.ErrorMessage>
                </TextInput.Root>

                {/* Success State */}
                <TextInput.Root validationState="success" defaultValue="available">
                    <TextInput.Label>Username</TextInput.Label>
                    <TextInput.Field>
                        <TextInput.Icon>
                            <User className="w-4 h-4" />
                        </TextInput.Icon>
                        <TextInput.Input />
                    </TextInput.Field>
                    <TextInput.SuccessMessage>Username is available!</TextInput.SuccessMessage>
                </TextInput.Root>

                {/* Number Input */}
                <TextInput.Root inputType="number" defaultValue="1">
                    <TextInput.Label>Quantity</TextInput.Label>
                    <TextInput.Field>
                        <TextInput.NumberInput min={0} max={10} step={1} />
                    </TextInput.Field>
                    <TextInput.Description>Enter a number between 0 and 10.</TextInput.Description>
                </TextInput.Root>

                {/* With Character Count */}
                <TextInput.Root value={bioValue} onChange={setBioValue}>
                    <TextInput.Label>Bio</TextInput.Label>
                    <TextInput.Field>
                        <TextInput.Input placeholder="Tell us about yourself" maxLength={100} />
                        <TextInput.ClearButton />
                    </TextInput.Field>
                    <TextInput.CharacterCount maxLength={100} />
                </TextInput.Root>

                {/* Required Field */}
                <TextInput.Root required>
                    <TextInput.Label>Full Name</TextInput.Label>
                    <TextInput.Field>
                        <TextInput.Input placeholder="Enter your full name" />
                    </TextInput.Field>
                </TextInput.Root>

                {/* Disabled State */}
                <TextInput.Root disabled>
                    <TextInput.Label>Disabled Input</TextInput.Label>
                    <TextInput.Field>
                        <TextInput.Input placeholder="Cannot edit" />
                    </TextInput.Field>
                </TextInput.Root>
            </div>
        </div>
    );
}
