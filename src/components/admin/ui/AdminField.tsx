"use client";

// ============================================================
// Component: AdminField
// Purpose: Labeled text / textarea / number field for admin editors. Reuses
//          the public `.form-input-field` styling (coral focus ring) but drops
//          FormInput's hardcoded maxLength/size/required asterisk.
// ============================================================
import React from "react";
import clsx from "clsx";
import type { UseFormRegisterReturn } from "react-hook-form";

interface AdminFieldProps {
    id: string;
    label: string;
    type?: string;
    /** Hints the mobile soft keyboard (e.g. "email", "url", "tel", "numeric"). */
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
    autoComplete?: string;
    multiline?: boolean;
    rows?: number;
    placeholder?: string;
    hint?: string;
    error?: string;
    mono?: boolean;
    registration: UseFormRegisterReturn;
}

const AdminField: React.FC<AdminFieldProps> = ({
    id,
    label,
    type = "text",
    inputMode,
    autoComplete,
    multiline = false,
    rows = 4,
    placeholder,
    hint,
    error,
    mono = false,
    registration,
}) => {
    const describedBy = error
        ? `${id}-error`
        : hint
          ? `${id}-hint`
          : undefined;

    return (
        <div className="mb-5">
            <label
                htmlFor={id}
                className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]"
            >
                {label}
            </label>
            {multiline ? (
                <textarea
                    id={id}
                    rows={rows}
                    placeholder={placeholder}
                    className={clsx(
                        "form-input-textarea w-full",
                        mono && "font-mono",
                        error && "form-input-textarea-error"
                    )}
                    aria-invalid={Boolean(error)}
                    aria-describedby={describedBy}
                    {...registration}
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    inputMode={inputMode}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    className={clsx(
                        "form-input-field w-full",
                        mono && "font-mono",
                        error && "form-input-field-error"
                    )}
                    aria-invalid={Boolean(error)}
                    aria-describedby={describedBy}
                    {...registration}
                />
            )}
            {hint && !error && (
                <p id={`${id}-hint`} className="mt-1 text-xs text-[var(--color-muted)]">
                    {hint}
                </p>
            )}
            {error && (
                <p
                    id={`${id}-error`}
                    role="alert"
                    className="mt-1 text-xs text-[var(--color-error)]"
                >
                    {error}
                </p>
            )}
        </div>
    );
};

AdminField.displayName = "AdminField";

export default AdminField;
