// ============================================================
// Component: AccordionContent
// Purpose: Accordion content panel with smooth height animations
// ============================================================

"use client";

import { motion, Variants } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import type { AccordionContentProps } from "@/types";

// ============================================================
// Component Definition
// ============================================================

/**
 * AccordionContent component renders the expandable content panel.
 * Features smooth height animations, accessibility, and responsive design.
 *
 * @param props - Component props
 * @param props.isOpen - Whether the accordion is open
 * @param props.subheading - Subheading text
 * @param props.meta - Meta information
 * @param props.content - Main content text
 * @param props.panelId - Unique panel ID for accessibility
 * @param props.labelledById - ID of the button that controls this panel
 * @returns Accordion content component
 */
const AccordionContent: React.FC<AccordionContentProps> = ({
    isOpen,
    subheading,
    meta,
    content,
    panelId,
    labelledById,
    ...props
}) => {
    // ============================================================
    // State & Refs
    // ============================================================

    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    // ============================================================
    // Effects
    // ============================================================

    useEffect(() => {
        if (!contentRef.current) return;

        const element = contentRef.current;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.target instanceof HTMLElement) {
                    const naturalHeight = entry.target.scrollHeight;
                    // Cap height to prevent extremely tall content
                    setHeight(Math.min(naturalHeight, 1000));
                }
            }
        });

        observer.observe(element);

        return () => observer.disconnect();
    }, [subheading, meta, content]);

    // ============================================================
    // Animation Configuration
    // ============================================================

    // Remove unnecessary useMemo - animation variants are static objects
    const variants: Variants = {
        open: {
            height,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                height: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.25, delay: 0.12 },
                filter: { duration: 0.25, delay: 0.12 },
            },
        },
        closed: {
            height: 1,
            opacity: 0,
            filter: "blur(1px)",
            transition: {
                height: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.2 },
                filter: { duration: 0.2 },
            },
        },
    };

    // ============================================================
    // Render
    // ============================================================

    return (
        <motion.div
            ref={contentRef}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            exit="closed"
            variants={variants}
            className="accordion-content"
            role="region"
            id={panelId}
            aria-labelledby={labelledById}
            data-testid="accordion-content"
            {...props}
        >
            {/* Subheading */}
            <div className="accordion-content-subheading">
                <span data-testid="accordion-content-subheading">
                    {subheading}
                </span>
            </div>

            {/* Meta Information */}
            <div className="accordion-content-meta">
                <span data-testid="accordion-content-meta">{meta}</span>
            </div>

            {/* Main Content */}
            <div className="accordion-content-description">
                <p data-testid="accordion-content-description">{content}</p>
            </div>
        </motion.div>
    );
};

AccordionContent.displayName = "AccordionContent";

export default AccordionContent;
