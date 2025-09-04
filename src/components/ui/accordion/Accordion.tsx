import React from "react";

import { AccordionProps } from "@/types";

import AccordionItem from "@/components/ui/accordion/AccordionItem";

const Accordion: React.FC<AccordionProps> = ({ items, label }) => {
    return (
        <div className={"accordion-container"}>
            <h5 className={"accordion-label"}>
                { label }
            </h5>
            <div className={"accordion-items-container"} role={"list"}>
                { items.map((item, index) => (
                    <AccordionItem
                        key={index}
                        heading={item.heading}
                        subheading={item.subheading}
                        meta={item.meta}
                        content={item.content}
                        index={index}
                        isFirstItem={index === 0}
                    />
                )) }
            </div>
        </div>
    );
};

export default Accordion;
