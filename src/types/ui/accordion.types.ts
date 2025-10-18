export interface AccordionProps<T = AccordionItemData> {
    items: T[];
    label: string;
    fieldMapping: AccordionFieldMapping<T>;
}

export interface AccordionContentProps {
    isOpen: boolean;
    subheading: string;
    meta: string;
    content: string;
    panelId?: string;
    labelledById?: string;
}

export interface AccordionItemProps {
    index: number;
    meta: string;
    content: string;
    heading: string;
    subheading: string;
    isFirstItem?: boolean;
}

export interface AccordionItemData {
    meta: string;
    content: string;
    heading: string;
    subheading: string;
}

export interface AccordionFieldMapping<T> {
    meta: keyof T;
    content: keyof T;
    heading: keyof T;
    subheading: keyof T;
}
