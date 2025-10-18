import React from "react";
import Link from "next/link";

import type { ContactMethodCardProps } from "@/types";

import { CONTACT_TYPE_CONFIG, DEFAULT_CONTACT_CONFIG } from "@/config";

const ContactMethodCard: React.FC<ContactMethodCardProps> = ({
    type,
    value,
    label,
}) => {
    const config =
        CONTACT_TYPE_CONFIG[type.toLowerCase()] || DEFAULT_CONTACT_CONFIG;

    const displayLabel =
        label || config.label || type.charAt(0).toUpperCase() + type.slice(1);

    const link = config.linkGenerator ? config.linkGenerator(value) : null;

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
                        {value}
                    </Link>
                ) : (
                    <span>{value}</span>
                )}
            </div>
        </div>
    );
};

export default ContactMethodCard;
