// ============================================================
// Component: AccordionItem
// Purpose: Individual accordion item with expand/collapse functionality
// ============================================================

"use client";

import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import React, { useCallback, useId, useState } from "react";

import type { AccordionItemProps } from "@/types";

import { AccordionContent } from "@/components";

// ============================================================
// Component Definition
// ============================================================

/**
 * AccordionItem component renders an individual accordion item.
 * Features expand/collapse functionality, accessibility, and smooth animations.
 *
 * @param props - Component props
 * @param props.heading - Main heading text
 * @param props.subheading - Subheading text
 * @param props.meta - Meta information
 * @param props.content - Main content text
 * @param props.index - Item index for unique IDs
 * @param props.isFirstItem - Whether this is the first item (defaults to open)
 * @returns Accordion item component
 */
const AccordionItem: React.FC<AccordionItemProps> = ({
    heading,
    subheading,
    meta,
    content,
    index,
    isFirstItem = false,
    ...props
}) => {
    // ============================================================
    // State & IDs
    // ============================================================

    const [isOpen, setIsOpen] = useState(isFirstItem);

    const baseId = useId();
    const panelId = `accordion-panel-${index}-${baseId}`;
    const buttonId = `accordion-header-${index}-${baseId}`;

    // ============================================================
    // Event Handlers
    // ============================================================

    const toggleAccordion = useCallback(() => {
        setIsOpen((prevState) => !prevState);
    }, []);

    // ============================================================
    // Render
    // ============================================================

    return (
        <div
            className={
                isFirstItem ? "accordion-item" : "accordion-item-subsequent"
            }
            data-testid="accordion-item"
            {...props}
        >
            <h6
                className={clsx(
                    isOpen
                        ? "accordion-item-header-open"
                        : "accordion-item-header-closed",
                    "m-0! accordion-item-header"
                )}
                onClick={toggleAccordion}
            >
                <button
                    id={buttonId}
                    type="button"
                    className="w-full text-left text-inverse! block cursor-pointer relative"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    data-testid="accordion-item-button"
                >
                    {heading}
                </button>
            </h6>

            {/* Accordion Content */}
            <AnimatePresence>
                {(isOpen || isFirstItem) && (
                    <AccordionContent
                        isOpen={isOpen}
                        subheading={subheading}
                        meta={meta}
                        content={content}
                        panelId={panelId}
                        labelledById={buttonId}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

AccordionItem.displayName = "AccordionItem";

export default AccordionItem;
