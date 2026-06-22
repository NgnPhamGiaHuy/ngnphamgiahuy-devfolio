"use client";

// ============================================================
// Component: IconPicker
// Purpose: Visual icon selector for social link icons.
//   Shows current icon (if any) with a click-to-open inline picker.
//   Picker: search, category filter, scrollable grid.
//   Controlled via react-hook-form Controller.
// ============================================================
import React, { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import clsx from "clsx";

import type { SocialIconRef } from "@/shared/types";
import {
    SOCIAL_ICON_CATALOG,
    type IconEntry,
} from "@/shared/utils/icons/social-icon-catalog";
import { resolveIcon } from "@/shared/utils/icons/icon-resolver";

// ---- Types -----------------------------------------------------------------

interface IconPickerProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label?: string;
}

type CategoryFilter = "All" | "Social" | "Dev" | "General";

// ---- Sub-component: IconCell -----------------------------------------------

const IconCell: React.FC<{
    entry: IconEntry;
    selected: boolean;
    onSelect: (entry: IconEntry) => void;
}> = ({ entry, selected, onSelect }) => {
    const icon = resolveIcon(
        { library: entry.library as SocialIconRef["library"], name: entry.name },
        { className: "h-5 w-5" }
    );

    return (
        <button
            type="button"
            title={entry.label}
            onClick={() => onSelect(entry)}
            className={clsx(
                "flex flex-col items-center gap-1.5 rounded-[var(--radius-sm)] px-2 py-3 transition-colors",
                selected
                    ? "bg-[var(--color-primary)] text-white"
                    : "text-[var(--color-muted)] hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-ink)]"
            )}
        >
            {icon}
            <span className="max-w-full truncate text-[10px] leading-tight">
                {entry.label}
            </span>
        </button>
    );
};

// ---- Sub-component: CurrentIconBadge ---------------------------------------

const CurrentIconBadge: React.FC<{
    value: SocialIconRef;
    onClear: () => void;
    onClick: () => void;
}> = ({ value, onClear, onClick }) => {
    const catalogEntry = SOCIAL_ICON_CATALOG.find(
        (e) => e.library === value.library && e.name === value.name
    );
    const label = catalogEntry?.label ?? value.name;
    const icon = resolveIcon(value, { className: "h-4 w-4 shrink-0" });

    return (
        <div className="flex h-[44px] items-center gap-2">
            <button
                type="button"
                onClick={onClick}
                className="flex h-full max-w-[130px] items-center gap-1.5 whitespace-nowrap rounded-[var(--radius-sm)] border border-[var(--color-hairline)] bg-[var(--color-surface-soft)] px-2.5 text-xs text-[var(--color-ink)] transition-colors hover:border-[var(--color-primary)]/60"
            >
                {icon}
                <span className="min-w-0 truncate">{label}</span>
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="ml-1 shrink-0 text-[var(--color-muted)]"
                    aria-hidden="true"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>
            <button
                type="button"
                onClick={onClear}
                className="shrink-0 text-xs text-[var(--color-muted)] hover:text-[var(--color-error)]"
            >
                Clear
            </button>
        </div>
    );
};

// ---- Main component --------------------------------------------------------

function IconPicker<T extends FieldValues>({
    control,
    name,
    label,
}: IconPickerProps<T>) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<CategoryFilter>("All");
    const containerRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    // Close when clicking outside
    useEffect(() => {
        if (!open) return;
        const handlePointerDown = (e: PointerEvent) => {
            if (!containerRef.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("pointerdown", handlePointerDown);
        return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [open]);

    // Focus search when picker opens
    useEffect(() => {
        if (open) {
            setTimeout(() => searchRef.current?.focus(), 50);
        }
    }, [open]);

    const categories: CategoryFilter[] = ["All", "Social", "Dev", "General"];

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => {
                const current = field.value as SocialIconRef | undefined | null;

                const filteredEntries = SOCIAL_ICON_CATALOG.filter((entry) => {
                    const matchesSearch =
                        !search ||
                        entry.label.toLowerCase().includes(search.toLowerCase()) ||
                        entry.name.toLowerCase().includes(search.toLowerCase());
                    const matchesCategory =
                        category === "All" || entry.category === category;
                    return matchesSearch && matchesCategory;
                });

                const handleSelect = (entry: IconEntry) => {
                    field.onChange({ library: entry.library, name: entry.name });
                    setOpen(false);
                    setSearch("");
                };

                return (
                    <div ref={containerRef} className="relative">
                        {label && (
                            <p className="mb-1.5 text-xs font-medium text-[var(--color-ink)]">
                                {label}
                            </p>
                        )}

                        {current?.library && current?.name ? (
                            <CurrentIconBadge
                                value={current}
                                onClick={() => setOpen((v) => !v)}
                                onClear={() => field.onChange(undefined)}
                            />
                        ) : (
                            <button
                                type="button"
                                onClick={() => setOpen((v) => !v)}
                                className="flex h-[44px] items-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] border border-dashed border-[var(--color-hairline)] px-3 text-xs text-[var(--color-muted)] transition-colors hover:border-[var(--color-primary)]/60 hover:text-[var(--color-ink)]"
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    aria-hidden="true"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="16" />
                                    <line x1="8" y1="12" x2="16" y2="12" />
                                </svg>
                                Pick icon
                            </button>
                        )}

                        {open && (
                            <div className="absolute left-0 top-full z-30 mt-1.5 w-72 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-hairline)] bg-white shadow-lg">
                                {/* Search */}
                                <div className="border-b border-[var(--color-hairline)] p-2">
                                    <input
                                        ref={searchRef}
                                        type="text"
                                        placeholder="Search icons…"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full rounded-[var(--radius-xs)] border border-[var(--color-hairline)] px-2.5 py-1.5 text-sm focus:border-[var(--color-primary)] focus:outline-none"
                                    />
                                </div>

                                {/* Category tabs */}
                                <div className="flex gap-0.5 border-b border-[var(--color-hairline)] bg-[var(--color-surface-soft)] px-2 py-1.5">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => setCategory(cat)}
                                            className={clsx(
                                                "rounded-[var(--radius-xs)] px-2.5 py-1 text-xs font-medium transition-colors",
                                                category === cat
                                                    ? "bg-[var(--color-primary)] text-white"
                                                    : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                                            )}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>

                                {/* Icon grid */}
                                <div className="grid max-h-52 grid-cols-5 gap-0.5 overflow-y-auto overscroll-contain p-2">
                                    {filteredEntries.length === 0 ? (
                                        <p className="col-span-5 py-4 text-center text-xs text-[var(--color-muted)]">
                                            No icons found.
                                        </p>
                                    ) : (
                                        filteredEntries.map((entry) => {
                                            const isSelected =
                                                current?.library === entry.library &&
                                                current?.name === entry.name;
                                            return (
                                                <IconCell
                                                    key={`${entry.library}-${entry.name}`}
                                                    entry={entry}
                                                    selected={isSelected}
                                                    onSelect={handleSelect}
                                                />
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                );
            }}
        />
    );
}

IconPicker.displayName = "IconPicker";

export default IconPicker;
