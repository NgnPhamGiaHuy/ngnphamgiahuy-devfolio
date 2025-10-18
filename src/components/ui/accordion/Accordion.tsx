import React from "react";

import type { AccordionProps } from "@/types";

import { AccordionItem } from "@/components";

const Accordion = <T,>({ items, label, fieldMapping }: AccordionProps<T>) => {
    return (
        <div className={"w-full"}>
            <h5 className={"accordion-label"}>{label}</h5>
            <div className={"accordion-items-container"} role={"list"}>
                {items.map((item, index) => {
                    const mappedItem = {
                        heading: String(item[fieldMapping.heading]),
                        subheading: String(item[fieldMapping.subheading]),
                        meta: String(item[fieldMapping.meta]),
                        content: String(item[fieldMapping.content]),
                    };

                    return (
                        <AccordionItem
                            key={index}
                            heading={mappedItem.heading}
                            subheading={mappedItem.subheading}
                            meta={mappedItem.meta}
                            content={mappedItem.content}
                            index={index}
                            isFirstItem={index === 0}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Accordion;
