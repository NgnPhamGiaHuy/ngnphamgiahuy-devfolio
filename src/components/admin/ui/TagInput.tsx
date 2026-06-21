"use client";

import React, { useState } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

// ---- Tag chip field (controlled, no RHF dependency) -----------------------

interface TagFieldProps {
    value: string[];
    onChange: (v: string[]) => void;
    label: string;
    hint?: string;
    placeholder?: string;
}

const TagField: React.FC<TagFieldProps> = ({
    value,
    onChange,
    label,
    hint,
    placeholder,
}) => {
    const [input, setInput] = useState("");

    const add = () => {
        const v = input.trim();
        if (v && !value.includes(v)) onChange([...value, v]);
        setInput("");
    };

    return (
        <div className="mb-5">
            <p className="mb-1.5 text-sm font-medium text-[var(--color-ink)]">
                {label}
            </p>

            {value.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-1.5">
                    {value.map((tag, i) => (
                        <span
                            key={i}
                            className="flex items-center gap-1 rounded-full border border-[var(--color-hairline)] bg-[var(--color-surface-card)] px-2.5 py-0.5 font-mono text-xs text-[var(--color-ink)]"
                        >
                            {tag}
                            <button
                                type="button"
                                aria-label={`Remove ${tag}`}
                                onClick={() =>
                                    onChange(value.filter((_, j) => j !== i))
                                }
                                className="ml-0.5 text-[var(--color-muted)] hover:text-[var(--color-error)]"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            )}

            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            add();
                        }
                    }}
                    placeholder={placeholder ?? "Type and press Enter"}
                    className="form-input-field flex-1 font-mono"
                />
                <button
                    type="button"
                    onClick={add}
                    className="rounded-md border border-[var(--color-hairline)] px-3 py-2 text-sm text-[var(--color-body)] hover:text-[var(--color-ink)]"
                >
                    Add
                </button>
            </div>

            {hint && (
                <p className="mt-1 text-xs text-[var(--color-muted)]">{hint}</p>
            )}
        </div>
    );
};

// ---- Generic RHF wrapper --------------------------------------------------

interface TagInputProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    hint?: string;
    placeholder?: string;
}

function TagInput<T extends FieldValues>({
    control,
    name,
    label,
    hint,
    placeholder,
}: TagInputProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <TagField
                    value={(field.value as string[]) ?? []}
                    onChange={field.onChange}
                    label={label}
                    hint={hint}
                    placeholder={placeholder}
                />
            )}
        />
    );
}

TagInput.displayName = "TagInput";

export default TagInput;
