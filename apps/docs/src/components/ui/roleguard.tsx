"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

// ============================================================================
// Types
// ============================================================================

export type Role = string;

export interface RoleProviderProps {
    /** Current user roles. */
    roles: Role[];
    /** Current user permissions (optional, for fine-grained control). */
    permissions?: string[];
    children: ReactNode;
}

export interface RoleGuardProps {
    /**
     * One or more roles that grant access.
     * If the user has **any** of these roles, access is granted.
     */
    allowed?: Role[];
    /**
     * Roles that explicitly deny access, even if `allowed` matches.
     */
    denied?: Role[];
    /**
     * Fine-grained permission strings (e.g. "orders:write").
     * If provided, user must hold **all** listed permissions.
     */
    permissions?: string[];
    /**
     * Match strategy for `allowed` roles.
     * - `"some"` (default) — user needs at least one matching role.
     * - `"every"` — user needs every listed role.
     */
    match?: "some" | "every";
    /**
     * URL to redirect to when access is denied.
     * Uses `window.location.replace` (client-side).
     */
    redirectTo?: string;
    /** Rendered when access is denied (and no `redirectTo`). */
    fallback?: ReactNode;
    /** Rendered while roles are being resolved (async). */
    loading?: ReactNode;
    children: ReactNode;
}

interface RoleContextValue {
    roles: Role[];
    permissions: string[];
    hasRole: (role: Role) => boolean;
    hasAnyRole: (roles: Role[]) => boolean;
    hasEveryRole: (roles: Role[]) => boolean;
    hasPermission: (permission: string) => boolean;
    hasAllPermissions: (permissions: string[]) => boolean;
}

// ============================================================================
// Context
// ============================================================================

const RoleContext = createContext<RoleContextValue | null>(null);

/**
 * Hook to access the current user's roles and permission helpers.
 *
 * @example
 * const { hasRole, hasPermission } = useRoles();
 * if (hasRole("admin")) { ... }
 */
export function useRoles(): RoleContextValue {
    const ctx = useContext(RoleContext);
    if (!ctx) {
        throw new Error("useRoles must be used within a <RoleProvider>");
    }
    return ctx;
}

// ============================================================================
// RoleProvider
// ============================================================================

/**
 * Wraps the app (or a subtree) to provide role/permission context.
 *
 * @example
 * <RoleProvider roles={["admin"]} permissions={["orders:read", "orders:write"]}>
 *   <App />
 * </RoleProvider>
 */
export function RoleProvider({ roles, permissions = [], children }: RoleProviderProps) {
    const hasRole = (role: Role) => roles.includes(role);
    const hasAnyRole = (r: Role[]) => r.some((role) => roles.includes(role));
    const hasEveryRole = (r: Role[]) => r.every((role) => roles.includes(role));
    const hasPermission = (p: string) => permissions.includes(p);
    const hasAllPermissions = (p: string[]) => p.every((perm) => permissions.includes(perm));

    return (
        <RoleContext.Provider
            value={{
                roles,
                permissions,
                hasRole,
                hasAnyRole,
                hasEveryRole,
                hasPermission,
                hasAllPermissions,
            }}
        >
            {children}
        </RoleContext.Provider>
    );
}

// ============================================================================
// RoleGuard
// ============================================================================

/**
 * Conditionally renders children based on role / permission checks.
 *
 * @example
 * <RoleGuard allowed={["admin", "manager"]} fallback={<p>No access</p>}>
 *   <AdminPanel />
 * </RoleGuard>
 *
 * @example
 * <RoleGuard allowed={["user"]} redirectTo="/login">
 *   <Dashboard />
 * </RoleGuard>
 */
export function RoleGuard({
    allowed,
    denied,
    permissions: requiredPerms,
    match = "some",
    redirectTo,
    fallback = null,
    loading = null,
    children,
}: RoleGuardProps): ReactNode {
    const ctx = useContext(RoleContext);
    const [redirecting, setRedirecting] = useState(false);

    // ── Evaluate access ──
    const evaluate = (): boolean => {
        if (!ctx) return false;

        // Denied takes priority
        if (denied && denied.length > 0) {
            if (ctx.hasAnyRole(denied)) return false;
        }

        // Check role match
        let roleMatch = true;
        if (allowed && allowed.length > 0) {
            roleMatch = match === "every"
                ? ctx.hasEveryRole(allowed)
                : ctx.hasAnyRole(allowed);
        }

        // Check permissions
        let permMatch = true;
        if (requiredPerms && requiredPerms.length > 0) {
            permMatch = ctx.hasAllPermissions(requiredPerms);
        }

        return roleMatch && permMatch;
    };

    const hasAccess = ctx ? evaluate() : false;

    // ── Redirect if needed ──
    useEffect(() => {
        if (!hasAccess && redirectTo && !redirecting) {
            setRedirecting(true);
            window.location.replace(redirectTo);
        }
    }, [hasAccess, redirectTo, redirecting]);

    // Waiting for context
    if (!ctx) return loading;

    // Redirecting
    if (redirecting) return loading;

    // Denied
    if (!hasAccess) return fallback;

    // Granted
    return children;
}

// ============================================================================
// Convenience Wrapper: RequireAuth
// ============================================================================

export interface RequireAuthProps {
    /** Redirect if not authenticated. */
    redirectTo?: string;
    fallback?: ReactNode;
    loading?: ReactNode;
    children: ReactNode;
}

/**
 * Ensures the user has *any* role at all (i.e. is authenticated).
 * This is a thin wrapper over `RoleGuard` that checks `roles.length > 0`.
 */
export function RequireAuth({
    redirectTo,
    fallback = null,
    loading = null,
    children,
}: RequireAuthProps): ReactNode {
    const ctx = useContext(RoleContext);
    const [redirecting, setRedirecting] = useState(false);

    const isAuthenticated = ctx ? ctx.roles.length > 0 : false;

    useEffect(() => {
        if (!isAuthenticated && redirectTo && !redirecting) {
            setRedirecting(true);
            window.location.replace(redirectTo);
        }
    }, [isAuthenticated, redirectTo, redirecting]);

    if (!ctx) return loading;
    if (redirecting) return loading;
    if (!isAuthenticated) return fallback;

    return children;
}
