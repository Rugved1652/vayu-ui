"use client"
import { TextInput } from "vayu-ui";
import { Mail, Lock, User, Search } from "lucide-react";
import React, { useState } from "react";

export default function TextInputDemo() {
    const [value, setValue] = useState("");

    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl p-8 bg-neutral-100 dark:bg-neutral-900 rounded-lg">

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


            {/* Search Input with Clear Button */}
            <TextInput.Root inputType="search">
                <TextInput.Label>Search</TextInput.Label>
                <TextInput.Field>
                    <TextInput.SearchInput placeholder="Search..." />
                </TextInput.Field>
            </TextInput.Root>

            {/* Invalid State */}
            <TextInput.Root validationState="error" defaultValue="invaliduser">
                <TextInput.Label>Username</TextInput.Label>
                <TextInput.Field>
                    <TextInput.Icon>
                        <User className="w-4 h-4" />
                    </TextInput.Icon>
                    <TextInput.Input />
                    <TextInput.Icon>
                        <TextInput.LoadingSpinner />
                    </TextInput.Icon>
                </TextInput.Field>
                <TextInput.ErrorMessage>Username already taken.</TextInput.ErrorMessage>
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
            <TextInput.Root value={value} onChange={setValue}>
                <TextInput.Label>Bio</TextInput.Label>
                <TextInput.Field>
                    <TextInput.Input placeholder="Tell us about yourself" maxLength={100} />
                    <TextInput.ClearButton />
                </TextInput.Field>
                <TextInput.CharacterCount maxLength={100} />
            </TextInput.Root>

        </div>
    );
}
