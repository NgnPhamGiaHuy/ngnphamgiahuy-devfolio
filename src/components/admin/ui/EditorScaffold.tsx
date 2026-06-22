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
    /** Optional discard handler — renders a "Discard" button beside Save. */
    onDiscard?: () => void;
}

/**
 * Sticky action bar. On mobile it pins to the bottom of the viewport (full-bleed,
 * honouring the home-indicator safe area) so Save is always one tap away while
 * editing a long form. On sm+ it relaxes back into an inline footer row.
 */
export const SaveBar: React.FC<SaveBarProps> = ({
    saving,
    dirty = false,
    status,
    label = "Save",
    onDiscard,
}) => (
    <div
        className={clsx(
            "sticky bottom-0 z-20 -mx-4 mt-6 flex items-center gap-3 border-t border-[var(--color-hairline)]",
            "bg-[var(--background)]/95 px-4 py-3 backdrop-blur-sm",
            "[padding-bottom:max(0.75rem,env(safe-area-inset-bottom))]",
            "sm:static sm:mx-0 sm:gap-4 sm:bg-transparent sm:px-0 sm:py-0 sm:pt-5 sm:backdrop-blur-none"
        )}
    >
        <button
            type="submit"
            disabled={saving}
            aria-busy={saving}
            className="flex-1 sm:flex-initial"
        >
            <span className="primary-button w-full sm:w-auto">
                {saving ? "Saving…" : label}
            </span>
        </button>
        {onDiscard && dirty && !saving && (
            <button
                type="button"
                onClick={onDiscard}
                className="secondary-button shrink-0"
            >
                Discard
            </button>
        )}
        {dirty && !saving && !onDiscard && (
            <span className="hidden font-mono text-xs text-[var(--color-muted)] sm:inline">
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
