// -----------------------------------------------------------------------------
// Accordion-related Types
// -----------------------------------------------------------------------------

export interface AccordionContentProps {
    isOpen: boolean;
    subheading: string;
    meta: string;
    content: string;
    panelId?: string;
    labelledById?: string;
}

export interface AccordionItemProps {
    heading: string;
    subheading: string;
    meta: string;
    content: string;
    index: number;
    isFirstItem?: boolean;
}

export interface AccordionProps {
    items: Array<{
        heading: string;
        subheading: string;
        meta: string;
        content: string;
    }>;
    label: string;
}
