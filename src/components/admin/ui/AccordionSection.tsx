"use client";

// ============================================================
// Component: AccordionSection
// Purpose: Collapsible form section for long admin editors. Keeps its content
//          mounted (display:none when closed) so react-hook-form registrations
//          and field arrays survive collapse — only the visibility toggles.
//          Lets mobile users jump to the section they want instead of scrolling
//          past every field.
// ============================================================
import React, { useId, useState } from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

interface AccordionSectionProps {
    title: string;
    /** Open on first render (use for the first / most-used section). */
    defaultOpen?: boolean;
    children: React.ReactNode;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({
    title,
    defaultOpen = false,
    children,
}) => {
    const [open, setOpen] = useState(defaultOpen);
    const id = useId();

    return (
        <section className="mt-4 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-hairline)]">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls={`${id}-panel`}
                className="flex min-h-[44px] w-full items-center justify-between gap-3 bg-[var(--color-surface-soft)] px-4 py-3 text-left font-[family-name:var(--font-display)] text-base font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface-card)]"
            >
                <span>{title}</span>
                <ChevronDown
                    size={18}
                    className={clsx(
                        "shrink-0 text-[var(--color-muted)] transition-transform duration-200",
                        open && "rotate-180"
                    )}
                    aria-hidden="true"
                />
            </button>
            {/* Kept mounted; `hidden` toggles display so RHF state persists. */}
            <div
                id={`${id}-panel`}
                hidden={!open}
                className="border-t border-[var(--color-hairline)] p-4"
            >
                {children}
            </div>
        </section>
    );
};

AccordionSection.displayName = "AccordionSection";

export default AccordionSection;
