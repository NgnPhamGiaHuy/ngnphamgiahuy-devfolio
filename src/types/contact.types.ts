import { ContactItem } from "./sanity.types";

export interface ContactItemProps {
    contact: ContactItem;
}

export interface ContactSectionProps {
    contacts: ContactItem[];
    resetAnimationOnView?: boolean;
}