import React from "react";
import Link from "next/link";

import type { ContactItem as ContactItemType } from "@/data/data";
import { CONTACT_TYPE_CONFIG, DEFAULT_CONTACT_CONFIG } from "@/config/contact.config";

interface ContactItemProps {
    contact: ContactItemType;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact }) => {
    const config = CONTACT_TYPE_CONFIG[contact.type.toLowerCase()] || DEFAULT_CONTACT_CONFIG;

    const displayLabel = config.label || contact.type.charAt(0).toUpperCase() + contact.type.slice(1);

    const link = config.linkGenerator ? config.linkGenerator(contact.value) : null;

    const Icon = config.icon;

    return (
        <div className={"contact-item"}>
            <div className={"contact-item-icon-wrapper"}>
                <Icon className={"size-5"} />
            </div>
            <div className={"contact-item-label"}>
                <span>{ displayLabel }</span>
            </div>
            <div className={"contact-item-value"}>
                { link ? (
                    <Link href={link} className={"contact-item-link"}>{ contact.value }</Link>
                ) : (
                    <span>{ contact.value }</span>
                ) }
            </div>
        </div>
    );
};

export default ContactItem;