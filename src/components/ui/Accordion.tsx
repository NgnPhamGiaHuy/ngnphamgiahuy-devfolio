// ============================================================
// Component: Accordion
// Purpose: Container component for accordion items with data mapping
// ============================================================

import React from "react";

import type { AccordionProps } from "@/types";

import { AccordionItem } from "@/components";

// ============================================================
// Component Definition
// ============================================================

/**
 * Accordion component renders a collection of accordion items.
 * Features data mapping, accessibility, and proper list structure.
 *
 * @param props - Component props
 * @param props.items - Array of data items to display
 * @param props.label - Section label/heading
 * @param props.fieldMapping - Object mapping data fields to display properties
 * @returns Accordion component
 */
const Accordion = <T,>({
    items,
    label,
    fieldMapping,
    ...props
}: AccordionProps<T>) => {
    // ============================================================
    // Data Processing
    // ============================================================

    const mappedItems = items.map((item) => {
        const anyItem = item as unknown as { _id?: string };
        return {
            heading: String(item[fieldMapping.heading]),
            subheading: String(item[fieldMapping.subheading]),
            meta: String(item[fieldMapping.meta]),
            content: String(item[fieldMapping.content]),
            key: anyItem?._id,
        };
    });

    // ============================================================
    // Render
    // ============================================================

    return (
        <div className="w-full" data-testid="accordion" {...props}>
            {/* Section Label */}
            <h5 className="accordion-label" data-testid="accordion-label">
                {label}
            </h5>

            {/* Accordion Items Container */}
            <div
                className="accordion-items-container"
                role="list"
                aria-label={`${label} accordion items`}
            >
                {mappedItems.map((mappedItem, index) => (
                    <AccordionItem
                        key={
                            mappedItem.key ??
                            `${mappedItem.heading}-${mappedItem.meta}-${index}`
                        }
                        heading={mappedItem.heading}
                        subheading={mappedItem.subheading}
                        meta={mappedItem.meta}
                        content={mappedItem.content}
                        index={index}
                        isFirstItem={index === 0}
                    />
                ))}
            </div>
        </div>
    );
};

Accordion.displayName = "Accordion";

export default Accordion;
