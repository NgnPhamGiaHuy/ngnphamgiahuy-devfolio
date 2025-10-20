"use client";

import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import React, { useCallback, useId, useState } from "react";

import type { AccordionItemProps } from "@/types";

import { AccordionContent } from "@/components";

const AccordionItem: React.FC<AccordionItemProps> = ({
    heading,
    subheading,
    meta,
    content,
    index,
    isFirstItem = false,
}) => {
    const [isOpen, setIsOpen] = useState(isFirstItem);

    const baseId = useId();
    const panelId = `accordion-panel-${index}-${baseId}`;
    const buttonId = `accordion-header-${index}-${baseId}`;

    const toggleAccordion = useCallback(() => {
        setIsOpen((prevState) => !prevState);
    }, []);

    return (
        <div
            className={
                isFirstItem ? "accordion-item" : "accordion-item-subsequent"
            }
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
                    type={"button"}
                    className={
                        "w-full text-left text-inverse! block cursor-pointer relative"
                    }
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                >
                    {heading}
                </button>
            </h6>
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
