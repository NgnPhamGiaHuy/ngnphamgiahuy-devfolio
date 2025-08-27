"use client"

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { AccordionItemProps } from "@/types";
import AccordionContent from "@/components/ui/accordion/AccordionContent";
import clsx from "clsx";

const AccordionItem: React.FC<AccordionItemProps> = ({ heading, subheading, meta, content, index, isFirstItem = false }) => {
    const [isOpen, setIsOpen] = useState(isFirstItem);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={isFirstItem ? "accordion-item" : "accordion-item-subsequent"}>
            <h6 className={clsx(isOpen ? "accordion-item-header-open" : "accordion-item-header-closed", "!m-0 accordion-item-header")} onClick={toggleAccordion}>
                { heading }
            </h6>
            <AnimatePresence>
                { (isOpen || isFirstItem) && (
                    <AccordionContent
                        isOpen={isOpen}
                        subheading={subheading}
                        meta={meta}
                        content={content}
                    />
                ) }
            </AnimatePresence>
        </div>
    );
};

export default AccordionItem;
