import React from "react";
import Link from "next/link";

import type { ContactMethodCardProps } from "@/types";

import { CONTACT_TYPE_CONFIG, DEFAULT_CONTACT_CONFIG } from "@/config";

const ContactMethodCard: React.FC<ContactMethodCardProps> = ({
    type,
    value,
    label,
}) => {
    const key = typeof type === "string" ? type.toLowerCase() : "";
    const config = CONTACT_TYPE_CONFIG[key] || DEFAULT_CONTACT_CONFIG;

    const displayLabel =
        label ||
        config.label ||
        (typeof type === "string"
            ? type.charAt(0).toUpperCase() + type.slice(1)
            : "");

    const link = config.linkGenerator ? config.linkGenerator(value) : null;
    const Icon = config.icon;

    return (
        <div className={"contact-method-card"}>
            <div className={"contact-method-card-icon-wrapper"}>
                {Icon ? <Icon className={"size-5"} /> : <span aria-hidden />}
            </div>
            <div className={"contact-method-card-label"}>
                <span>{displayLabel}</span>
            </div>
            <div className={"opacity-80"}>
                {link ? (
                    <Link
                        href={link}
                        className={"contact-method-card-link"}
                        aria-label={`${displayLabel}: ${value}`}
                        prefetch
                    >
                        {value}
                    </Link>
                ) : (
                    <span>{value}</span>
                )}
            </div>
        </div>
    );
};

ContactMethodCard.displayName = "ContactMethodCard";

export default ContactMethodCard;
