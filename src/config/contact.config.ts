import React from "react";
import { MapIcon, EnvelopeIcon, PhoneIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";

export interface ContactTypeConfig {
    icon: React.ComponentType<{ className?: string }>;
    label?: string;
    linkGenerator?: (value: string) => string | null;
}

export type ContactTypeMapping = Record<string, ContactTypeConfig>;

export const CONTACT_TYPE_CONFIG: ContactTypeMapping = {
    email: {
        icon: EnvelopeIcon,
        linkGenerator: (value) => `mailto:${value}`
    },
    phone: {
        icon: PhoneIcon,
        linkGenerator: (value) => `tel:${value}`
    },
    location: {
        icon: MapIcon,
        label: "Address"
    },
    office: {
        icon: BuildingOfficeIcon
    },
};

export const DEFAULT_CONTACT_CONFIG: ContactTypeConfig = {
    icon: MapIcon
};

