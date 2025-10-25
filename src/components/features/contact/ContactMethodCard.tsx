// ============================================================
// Component: ContactMethodCard
// Purpose: Individual contact method card with icon, label, and value
// ============================================================

import React from "react";
import Link from "next/link";

import type { ContactMethodCardProps } from "@/types";

import { CONTACT_TYPE_CONFIG, DEFAULT_CONTACT_CONFIG } from "@/config";

// ============================================================
// Component Definition
// ============================================================

/**
 * ContactMethodCard component renders an individual contact method card.
 * Displays contact type icon, label, and value with appropriate linking.
 *
 * @param props - Component props
 * @param props.type - Type of contact method (email, phone, etc.)
 * @param props.value - Contact value (email address, phone number, etc.)
 * @param props.label - Display label for the contact method
 * @returns Contact method card component
 */
const ContactMethodCard: React.FC<ContactMethodCardProps> = ({
    type,
    value,
    label,
    ...props
}) => {
    // ============================================================
    // Data Processing
    // ============================================================

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

    // ============================================================
    // Render
    // ============================================================

    return (
        <div
            className="contact-method-card"
            data-testid="contact-method-card"
            {...props}
        >
            {/* Icon */}
            <div className="contact-method-card-icon-wrapper">
                {Icon ? (
                    <Icon className="size-5" aria-hidden="true" />
                ) : (
                    <span aria-hidden="true" />
                )}
            </div>

            {/* Label */}
            <div className="contact-method-card-label">
                <span>{displayLabel}</span>
            </div>

            {/* Value */}
            <div className="opacity-80">
                {link ? (
                    <Link
                        href={link}
                        className="contact-method-card-link"
                        aria-label={`${displayLabel}: ${value}`}
                        prefetch={false}
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
