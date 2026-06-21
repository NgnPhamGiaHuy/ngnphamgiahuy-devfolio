"use client";

// ============================================================
// Component: AccessDenied
// Purpose: Signed in with a valid Firebase account, but the UID is not on the
//          allowlist. Even bypassing this screen writes nothing — the rules
//          reject the UID server-side.
// ============================================================
import React from "react";

import { useAuth } from "@/components/providers/AuthProvider";
import AdminShell from "./AdminShell";

const AccessDenied: React.FC = () => {
    const { user, signOut } = useAuth();

    return (
        <AdminShell eyebrow="access denied">
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-[var(--color-ink)]">
                Not authorized
            </h1>
            <p className="mt-2 text-sm text-[var(--color-body)]">
                {user?.email ? (
                    <>
                        <span className="font-mono">{user.email}</span> isn’t an
                        authorized admin account.
                    </>
                ) : (
                    <>This account isn’t an authorized admin.</>
                )}
            </p>
            <button
                type="button"
                onClick={() => void signOut()}
                className="mt-6"
            >
                <span className="secondary-button">Sign out</span>
            </button>
        </AdminShell>
    );
};

AccessDenied.displayName = "AccessDenied";

export default AccessDenied;
