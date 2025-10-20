import React, { useMemo } from "react";

import type { AccordionProps } from "@/types";

import { AccordionItem } from "@/components";

const Accordion = <T,>({ items, label, fieldMapping }: AccordionProps<T>) => {
    const mappedItems = useMemo(
        () =>
            items.map((item) => {
                const anyItem = item as unknown as { _id?: string };
                return {
                    heading: String(item[fieldMapping.heading]),
                    subheading: String(item[fieldMapping.subheading]),
                    meta: String(item[fieldMapping.meta]),
                    content: String(item[fieldMapping.content]),
                    key: anyItem?._id,
                };
            }),
        [items, fieldMapping]
    );

    return (
        <div className={"w-full"}>
            <h5 className={"accordion-label"}>{label}</h5>
            <div className={"accordion-items-container"} role={"list"}>
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
