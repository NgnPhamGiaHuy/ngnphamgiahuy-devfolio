// ============================================================
// Component: Section Renderer
// Purpose: Dynamic section rendering with component mapping and data normalization
// ============================================================

// ============================================================
// Imports
// ============================================================
import React from "react";

import type { SectionConfigItem, MockDataType } from "@/types";

import { getSectionData } from "@/utils/sections";
import Hero from "@/components/features/landing/Hero";
import Certificates from "@/components/features/certificate/Certificates";
import Services from "@/components/features/service/Services";
import Skills from "@/components/features/skill/Skills";
import Portfolios from "@/components/features/project/Portfolios";
import Resume from "@/components/features/profile/Resume";
import Testimonials from "@/components/features/testimonial/Testimonials";
import Pricing from "@/components/features/pricing/Pricing";
import Blog from "@/components/features/blog/Blog";
import Contact from "@/components/features/contact/Contact";
import Map from "@/components/features/contact/Map";

// ============================================================
// Constants
// ============================================================
const SECTION_COMPONENTS: Record<string, React.ComponentType<any>> = {
    hero: Hero,
    certificates: Certificates,
    services: Services,
    skills: Skills,
    portfolios: Portfolios,
    resume: Resume,
    testimonials: Testimonials,
    pricing: Pricing,
    blog: Blog,
    contact: Contact,
    map: Map,
} as const;

// ============================================================
// Types
// ============================================================
interface RenderSectionOptions {
    sectionProps?: any;
    fallbackData?: MockDataType;
}

interface SectionComponentProps {
    id: string;
    resetAnimationOnView?: boolean;
    [key: string]: any;
}

// ============================================================
// Public API
// ============================================================
/**
 * getSectionComponent returns the React component mapped to a section ID.
 * @param sectionId - Section identifier matching SECTION_COMPONENTS keys
 * @returns A React component or null if unmapped
 */
export const getSectionComponent = (
    sectionId: string
): React.ComponentType<any> | null => {
    return SECTION_COMPONENTS[sectionId] || null;
};

/**
 * renderSection composes a mapped section component with normalized props.
 * Warns and returns null for missing IDs or unmapped sections.
 *
 * @param sectionConfig - Section config item from settings
 * @param options - Optional props and fallback data for normalization
 * @returns Rendered section element or null
 */
export const renderSection = (
    sectionConfig: SectionConfigItem,
    options?: RenderSectionOptions
): React.ReactNode => {
    const { id: sectionId, resetAnimationOnView } = sectionConfig;

    if (!sectionId) {
        console.warn("renderSection: Section ID is required");
        return null;
    }

    const SectionComponent = getSectionComponent(sectionId);
    if (!SectionComponent) {
        console.warn(
            `renderSection: No component found for section "${sectionId}"`
        );
        return null;
    }

    const propsToUse = options?.sectionProps || options?.fallbackData || {};

    const normalizedData = getSectionData(
        sectionId,
        propsToUse,
        options?.fallbackData
    );

    const componentProps: SectionComponentProps = {
        id: sectionId,
        key: sectionId,
        resetAnimationOnView,
        ...normalizedData,
    };

    return React.createElement(SectionComponent, componentProps);
};
