// ============================================================
// Utility: Section Components
// Purpose: Dynamic section rendering with component mapping and data normalization
// ============================================================

import React from "react";

import type { SectionConfigItem, MockDataType } from "@/types";

import { getSectionData } from "./sectionDataHelpers";
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

/** Mapping of section IDs to their corresponding React components */
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

/** Render section options interface */
interface RenderSectionOptions {
    /** Section props containing data */
    sectionProps?: any;
    /** Fallback data for when Sanity data is unavailable */
    fallbackData?: MockDataType;
}

/** Section component props interface */
interface SectionComponentProps {
    /** Section identifier */
    id: string;
    /** Whether to reset animation on view */
    resetAnimationOnView?: boolean;
    /** Additional props passed to the component */
    [key: string]: any;
}

// ============================================================
// Utility Functions
// ============================================================

/**
 * Gets the React component for a given section ID.
 * Provides type-safe component retrieval with fallback handling.
 *
 * @param sectionId - Section identifier
 * @returns React component or null if not found
 *
 * @example
 * ```typescript
 * const HeroComponent = getSectionComponent("hero");
 * if (HeroComponent) {
 *   return <HeroComponent {...props} />;
 * }
 * ```
 */
export const getSectionComponent = (
    sectionId: string
): React.ComponentType<any> | null => {
    return SECTION_COMPONENTS[sectionId] || null;
};

/**
 * Validates if a section ID is supported.
 * Useful for runtime validation and error handling.
 *
 * @param sectionId - Section identifier to validate
 * @returns True if section is supported, false otherwise
 *
 * @example
 * ```typescript
 * if (isValidSectionId("hero")) {
 *   // Render hero section
 * }
 * ```
 */
export const isValidSectionId = (sectionId: string): boolean => {
    return sectionId in SECTION_COMPONENTS;
};

/**
 * Gets all available section IDs.
 * Useful for debugging and development tools.
 *
 * @returns Array of all supported section IDs
 *
 * @example
 * ```typescript
 * const sections = getAllSectionIds();
 * console.log(sections); // ["hero", "services", "skills", ...]
 * ```
 */
export const getAllSectionIds = (): string[] => {
    return Object.keys(SECTION_COMPONENTS);
};

// ============================================================
// Main Rendering Function
// ============================================================

/**
 * Renders a section component with normalized data and proper props.
 * Handles component resolution, data normalization, and prop passing.
 *
 * @param sectionConfig - Section configuration object
 * @param options - Rendering options
 * @returns React node or null if section cannot be rendered
 *
 * @example
 * ```typescript
 * const sectionNode = renderSection(
 *   { id: "hero", enabled: true },
 *   { sectionProps: props, fallbackData: fallbackData }
 * );
 *
 * return <div>{sectionNode}</div>;
 * ```
 */
export const renderSection = (
    sectionConfig: SectionConfigItem,
    options?: RenderSectionOptions
): React.ReactNode => {
    // Extract section configuration
    const { id: sectionId, resetAnimationOnView } = sectionConfig;

    // Validate section ID
    if (!sectionId) {
        console.warn("renderSection: Section ID is required");
        return null;
    }

    // Get section component
    const SectionComponent = getSectionComponent(sectionId);
    if (!SectionComponent) {
        console.warn(
            `renderSection: No component found for section "${sectionId}"`
        );
        return null;
    }

    // Prepare props for data normalization
    const propsToUse = options?.sectionProps || options?.fallbackData || {};

    // Normalize section data
    const normalizedData = getSectionData(
        sectionId,
        propsToUse,
        options?.fallbackData
    );

    // Build component props
    const componentProps: SectionComponentProps = {
        id: sectionId,
        key: sectionId,
        resetAnimationOnView,
        ...normalizedData,
    };

    // Render the section component
    return React.createElement(SectionComponent, componentProps);
};

// ============================================================
// Export Section Components Mapping
// ============================================================

/**
 * Exported section components mapping for external use.
 * Provides access to the component mapping for advanced use cases.
 */
export const sectionComponents = SECTION_COMPONENTS;
