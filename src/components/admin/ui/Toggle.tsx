"use client";

import React from "react";
import clsx from "clsx";

interface ToggleProps {
    checked: boolean;
    onChange: (next: boolean) => void;
    label: string;
    hint?: string;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label, hint }) => (
    <div className="mb-5 flex items-start justify-between gap-4">
        <div>
            <p className="text-sm font-medium text-[var(--color-ink)]">
                {label}
            </p>
            {hint && (
                <p className="mt-0.5 text-xs text-[var(--color-muted)]">
                    {hint}
                </p>
            )}
        </div>

        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            onClick={() => onChange(!checked)}
            className={clsx(
                // track
                "relative h-[26px] w-[46px] shrink-0 rounded-full",
                "transition-colors duration-200 ease-in-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
                checked
                    ? "bg-[var(--color-primary)]"
                    : "bg-[var(--color-hairline)] shadow-inner"
            )}
        >
            {/* knob */}
            <span
                className={clsx(
                    "absolute left-[3px] top-[3px] size-5 rounded-full bg-white",
                    "shadow-[0_1px_3px_rgba(0,0,0,0.18),0_1px_2px_rgba(0,0,0,0.12)]",
                    "transition-transform duration-200 ease-in-out",
                    checked ? "translate-x-[20px]" : "translate-x-0"
                )}
            />
        </button>
    </div>
);

Toggle.displayName = "Toggle";

export default Toggle;
