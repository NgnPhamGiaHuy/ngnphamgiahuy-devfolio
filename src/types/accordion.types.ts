
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

// Generic accordion item that can map different data structures
export interface AccordionItemData {
    heading: string;
    subheading: string;
    meta: string;
    content: string;
}

// Field mapping configuration for different data types
export interface AccordionFieldMapping<T> {
    heading: keyof T;
    subheading: keyof T;
    meta: keyof T;
    content: keyof T;
}

export interface AccordionProps<T = AccordionItemData> {
    items: T[];
    label: string;
    fieldMapping: AccordionFieldMapping<T>;
}
