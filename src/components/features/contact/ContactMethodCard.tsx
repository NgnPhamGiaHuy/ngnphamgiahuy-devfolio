import React from "react";
import Link from "next/link";

import type { ContactItemProps } from "@/types";

import { CONTACT_TYPE_CONFIG, DEFAULT_CONTACT_CONFIG } from "@/config";

const ContactMethodCard: React.FC<ContactItemProps> = ({ contact }) => {
    const config =
        CONTACT_TYPE_CONFIG[contact.type.toLowerCase()] ||
        DEFAULT_CONTACT_CONFIG;

    const displayLabel =
        config.label ||
        contact.type.charAt(0).toUpperCase() + contact.type.slice(1);

    const link = config.linkGenerator
        ? config.linkGenerator(contact.value)
        : null;

    const Icon = config.icon;

    return (
        <div className={"contact-method-card"}>
            <div className={"contact-method-card-icon-wrapper"}>
                <Icon className={"size-5"} />
            </div>
            <div className={"contact-method-card-label"}>
                <span>{displayLabel}</span>
            </div>
            <div className={"opacity-80"}>
                {link ? (
                    <Link href={link} className={"contact-method-card-link"}>
                        {contact.value}
                    </Link>
                ) : (
                    <span>{contact.value}</span>
                )}
            </div>
        </div>
    );
};

export default ContactMethodCard;
