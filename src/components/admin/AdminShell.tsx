"use client";

// ============================================================
// Component: AdminShell (centered chrome for auth/empty states)
// Purpose: Shared canvas wrapper so login / denied / splash screens read as
//          the same product (canvas background, serif heading, mono caption).
// ============================================================
import React from "react";

interface AdminShellProps {
    children: React.ReactNode;
    /** mono caption above the card (e.g. "control center") */
    eyebrow?: string;
}

const AdminShell: React.FC<AdminShellProps> = ({
    children,
    eyebrow = "control center",
}) => (
    <main className="min-h-screen flex items-center justify-center bg-[var(--background)] px-6 py-16">
        <div className="w-full max-w-[420px]">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
                {eyebrow}
            </p>
            <div className="rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-surface-card)] p-8">
                {children}
            </div>
        </div>
    </main>
);

AdminShell.displayName = "AdminShell";

export default AdminShell;
