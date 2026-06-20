"use client";

import React from "react";

import { Reveal } from "@/components/motion";

interface SectionProps {
    id?: string;
    eyebrow?: string;
    title?: React.ReactNode;
    intro?: React.ReactNode;
    /** Heading level for the title (h1 for the page lead, h2 elsewhere). */
    as?: "h1" | "h2";
    /** Extra node under the intro (e.g. the graph's mono counter). */
    meta?: React.ReactNode;
    /** Surface elevation tier for section-contrast banding. */
    tone?: "default" | "panel" | "sunken" | "dark";
    className?: string;
    headerClassName?: string;
    "aria-label"?: string;
    children?: React.ReactNode;
}

/**
 * Section — the single section primitive. Guarantees one vertical rhythm
 * (--section-pad), one max-width container, and one header pattern
 * (eyebrow + display title + intro) across every section, so the page reads
 * as one site instead of a stack of mismatched blocks. Header reveals on view.
 */
const Section: React.FC<SectionProps> = ({
    id,
    eyebrow,
    title,
    intro,
    as = "h2",
    meta,
    tone = "default",
    className,
    headerClassName,
    children,
    ...rest
}) => {
    const Heading = as;
    const hasHeader = eyebrow || title || intro;
    const toneClass =
        tone === "panel"
            ? "section-shell--panel"
            : tone === "sunken"
              ? "section-shell--sunken"
              : tone === "dark"
                ? "section-shell--dark"
                : "";

    return (
        <section
            id={id}
            className={`section-shell ${toneClass} ${className ?? ""}`}
            aria-label={rest["aria-label"]}
        >
            <div className="section-inner">
                {hasHeader && (
                    <Reveal
                        as="div"
                        className={`mb-10 max-w-3xl ${headerClassName ?? ""}`}
                    >
                        {eyebrow && (
                            <p className="eyebrow mb-4">{eyebrow}</p>
                        )}
                        {title && (
                            <Heading
                                className={`${as === "h2" ? "section-heading-fluid" : "display-fluid"} mb-5`}
                            >
                                {title}
                            </Heading>
                        )}
                        {intro && (
                            <div className="measure text-body text-lg leading-relaxed">
                                {intro}
                            </div>
                        )}
                        {meta}
                    </Reveal>
                )}
                {children}
            </div>
        </section>
    );
};

Section.displayName = "Section";

export default Section;
