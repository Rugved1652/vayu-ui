"use client";

import {
    RoleProvider,
    RoleGuard,
    RequireAuth,
    useRoles,
} from "vayu-ui";
import { useState } from "react";

type DemoRole = "admin" | "editor" | "viewer" | "guest";

const ALL_ROLES: DemoRole[] = ["admin", "editor", "viewer", "guest"];

export default function RoleGuardDemo() {
    const [activeRoles, setActiveRoles] = useState<DemoRole[]>(["viewer"]);
    const [permissions, setPermissions] = useState<string[]>(["orders:read"]);

    const toggleRole = (role: DemoRole) => {
        setActiveRoles((prev) =>
            prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
        );
    };

    const togglePerm = (perm: string) => {
        setPermissions((prev) =>
            prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
        );
    };

    return (
        <div className="flex flex-col not-prose gap-8 w-full max-w-lg">
            {/* ── Role Picker ── */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary font-medium text-ground-500 dark:text-ground-400 uppercase tracking-wider">
                    Current Roles
                </p>
                <div className="flex gap-2 flex-wrap">
                    {ALL_ROLES.map((role) => (
                        <button
                            key={role}
                            onClick={() => toggleRole(role)}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeRoles.includes(role)
                                    ? "bg-primary-500 text-white"
                                    : "bg-ground-100 dark:bg-ground-800 text-ground-600 dark:text-ground-300"
                                }`}
                        >
                            {role}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Permission Picker ── */}
            <div className="flex flex-col gap-3">
                <p className="text-xs font-secondary font-medium text-ground-500 dark:text-ground-400 uppercase tracking-wider">
                    Current Permissions
                </p>
                <div className="flex gap-2 flex-wrap">
                    {["orders:read", "orders:write", "users:manage"].map((perm) => (
                        <button
                            key={perm}
                            onClick={() => togglePerm(perm)}
                            className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors ${permissions.includes(perm)
                                    ? "bg-primary-500 text-white"
                                    : "bg-ground-100 dark:bg-ground-800 text-ground-600 dark:text-ground-300"
                                }`}
                        >
                            {perm}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Guarded Sections ── */}
            <RoleProvider roles={activeRoles} permissions={permissions}>
                <div className="flex flex-col gap-4">
                    {/* Admin only */}
                    <RoleGuard
                        allowed={["admin"]}
                        fallback={
                            <Panel color="red">
                                🔒 <strong>Admin Panel</strong> — requires <code>admin</code> role
                            </Panel>
                        }
                    >
                        <Panel color="green">
                            ✅ <strong>Admin Panel</strong> — you have access!
                        </Panel>
                    </RoleGuard>

                    {/* Editor OR Admin */}
                    <RoleGuard
                        allowed={["admin", "editor"]}
                        fallback={
                            <Panel color="red">
                                🔒 <strong>Content Editor</strong> — requires{" "}
                                <code>admin</code> or <code>editor</code>
                            </Panel>
                        }
                    >
                        <Panel color="green">
                            ✅ <strong>Content Editor</strong> — you have access!
                        </Panel>
                    </RoleGuard>

                    {/* Permission-gated */}
                    <RoleGuard
                        permissions={["orders:write"]}
                        fallback={
                            <Panel color="red">
                                🔒 <strong>Order Actions</strong> — requires{" "}
                                <code>orders:write</code> permission
                            </Panel>
                        }
                    >
                        <Panel color="green">
                            ✅ <strong>Order Actions</strong> — you can write orders!
                        </Panel>
                    </RoleGuard>

                    {/* Denied list */}
                    <RoleGuard
                        denied={["guest"]}
                        fallback={
                            <Panel color="red">
                                🔒 <strong>Members Only</strong> — <code>guest</code> role is
                                denied
                            </Panel>
                        }
                    >
                        <Panel color="green">
                            ✅ <strong>Members Only</strong> — guest role is not active.
                        </Panel>
                    </RoleGuard>

                    {/* useRoles hook */}
                    <HookDemo />
                </div>
            </RoleProvider>
        </div>
    );
}

function Panel({
    color,
    children,
}: {
    color: "green" | "red";
    children: React.ReactNode;
}) {
    return (
        <div
            className={`p-4 rounded-lg text-sm border ${color === "green"
                    ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300"
                    : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300"
                }`}
        >
            {children}
        </div>
    );
}

function HookDemo() {
    const { roles, permissions, hasRole } = useRoles();
    return (
        <div className="p-4 rounded-lg bg-ground-50 dark:bg-ground-900 border border-ground-200 dark:border-ground-800 text-sm">
            <p className="font-medium mb-2">useRoles() hook</p>
            <p className="text-ground-600 dark:text-ground-400">
                Roles: <code>{JSON.stringify(roles)}</code>
            </p>
            <p className="text-ground-600 dark:text-ground-400">
                Permissions: <code>{JSON.stringify(permissions)}</code>
            </p>
            <p className="text-ground-600 dark:text-ground-400">
                hasRole(&quot;admin&quot;):{" "}
                <code>{hasRole("admin") ? "true ✅" : "false ❌"}</code>
            </p>
        </div>
    );
}
