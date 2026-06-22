"use client";

// ============================================================
// Component: EditorScaffold + SaveBar
// Purpose: Shared editor page frame (serif title, description, content width)
//          and a save row with status + submit button.
// ============================================================
import React from "react";
import clsx from "clsx";

interface EditorScaffoldProps {
    title: string;
    description?: string;
    actions?: React.ReactNode;
    children: React.ReactNode;
}

export const EditorScaffold: React.FC<EditorScaffoldProps> = ({
    title,
    description,
    actions,
    children,
}) => (
    <div className="px-4 py-8 sm:px-6 sm:py-10 md:px-10">
        <div className="mx-auto max-w-[760px]">
            <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                    <h1 className="font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-[var(--color-ink)]">
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-1 text-sm text-[var(--color-body)]">
                            {description}
                        </p>
                    )}
                </div>
                {actions}
            </div>
            {children}
        </div>
    </div>
);

interface SaveBarProps {
    saving: boolean;
    dirty?: boolean;
    status?: { type: "success" | "error"; message: string } | null;
    label?: string;
}

export const SaveBar: React.FC<SaveBarProps> = ({
    saving,
    dirty = false,
    status,
    label = "Save",
}) => (
    <div className="mt-6 flex items-center gap-4 border-t border-[var(--color-hairline)] pt-5">
        <button type="submit" disabled={saving} aria-busy={saving}>
            <span className="primary-button">
                {saving ? "Saving…" : label}
            </span>
        </button>
        {dirty && !saving && (
            <span className="font-mono text-xs text-[var(--color-muted)]">
                ● Unsaved changes
            </span>
        )}
        {status && (
            <span
                className={clsx(
                    "text-sm",
                    status.type === "success"
                        ? "text-[var(--color-success)]"
                        : "text-[var(--color-error)]"
                )}
                role="alert"
            >
                {status.message}
            </span>
        )}
    </div>
);
