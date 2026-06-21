"use client";

// ============================================================
// Component: StatusScreen
// Purpose: Minimal centered message for the loading + unconfigured states.
// ============================================================
import React from "react";

import AdminShell from "./AdminShell";

interface StatusScreenProps {
    eyebrow: string;
    title: string;
    message: React.ReactNode;
}

const StatusScreen: React.FC<StatusScreenProps> = ({
    eyebrow,
    title,
    message,
}) => (
    <AdminShell eyebrow={eyebrow}>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-[var(--color-ink)]">
            {title}
        </h1>
        <p className="mt-2 text-sm text-[var(--color-body)]">{message}</p>
    </AdminShell>
);

StatusScreen.displayName = "StatusScreen";

export default StatusScreen;
