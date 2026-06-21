"use client";

import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    id: string;
    label: string;
    options: SelectOption[];
    registration: UseFormRegisterReturn;
    hint?: string;
    error?: string;
}

const Select: React.FC<SelectProps> = ({
    id,
    label,
    options,
    registration,
    hint,
    error,
}) => (
    <div className="mb-5">
        <label
            htmlFor={id}
            className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]"
        >
            {label}
        </label>
        <select
            id={id}
            {...registration}
            className="form-input-field w-full appearance-none"
        >
            {options.map((o) => (
                <option key={o.value} value={o.value}>
                    {o.label}
                </option>
            ))}
        </select>
        {hint && !error && (
            <p className="mt-1 text-xs text-[var(--color-muted)]">{hint}</p>
        )}
        {error && (
            <p role="alert" className="mt-1 text-xs text-[var(--color-error)]">
                {error}
            </p>
        )}
    </div>
);

Select.displayName = "Select";

export default Select;
