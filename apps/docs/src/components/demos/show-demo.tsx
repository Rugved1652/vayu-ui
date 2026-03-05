"use client";

import { Show, Switch, Case, Default } from "vayu-ui";
import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ShowDemo() {
    const [visible, setVisible] = useState(true);
    const [status, setStatus] = useState<Status>("idle");

    const statuses: Status[] = ["idle", "loading", "success", "error"];

    return (
        <div className="flex flex-col not-prose gap-10 w-full max-w-md">
            {/* ── Show / Hide ── */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    Show / Hide
                </p>
                <button
                    onClick={() => setVisible(!visible)}
                    className="px-4 py-2 rounded-md bg-primary-500 text-white text-sm font-medium w-fit"
                >
                    Toggle
                </button>

                <Show
                    when={visible}
                    fallback={
                        <div className="p-4 rounded-md bg-ground-100 dark:bg-ground-800 text-sm text-ground-500">
                            Content is hidden
                        </div>
                    }
                >
                    <div className="p-4 rounded-md bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 text-sm">
                        ✅ Content is visible!
                    </div>
                </Show>
            </div>

            {/* ── Show with render prop ── */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    Show with render prop (type-safe value)
                </p>
                <Show when={"Hello from Show!"}>
                    {(message) => (
                        <div className="p-4 rounded-md bg-ground-100 dark:bg-ground-800 text-sm font-medium">
                            {message}
                        </div>
                    )}
                </Show>
            </div>

            {/* ── Switch / Case ── */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary text-ground-500 dark:text-ground-400">
                    Switch / Case
                </p>
                <div className="flex gap-2 flex-wrap">
                    {statuses.map((s) => (
                        <button
                            key={s}
                            onClick={() => setStatus(s)}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${status === s
                                    ? "bg-primary-500 text-white"
                                    : "bg-ground-100 dark:bg-ground-800 text-ground-600 dark:text-ground-300"
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                <Switch>
                    <Case condition={status === "loading"}>
                        <div className="p-4 rounded-md bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-sm">
                            ⏳ Loading…
                        </div>
                    </Case>
                    <Case condition={status === "success"}>
                        <div className="p-4 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-sm">
                            ✅ Success!
                        </div>
                    </Case>
                    <Case condition={status === "error"}>
                        <div className="p-4 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm">
                            ❌ Something went wrong.
                        </div>
                    </Case>
                    <Default>
                        <div className="p-4 rounded-md bg-ground-100 dark:bg-ground-800 text-sm text-ground-500">
                            Idle — pick a status above.
                        </div>
                    </Default>
                </Switch>
            </div>
        </div>
    );
}
