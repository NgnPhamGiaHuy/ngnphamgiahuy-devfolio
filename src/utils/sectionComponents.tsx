import React from "react";
import { SectionConfig } from "@/types";

// Import all section components
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Skills from "@/components/sections/Skills";
import Work from "@/components/sections/Work";
import Resume from "@/components/sections/Resume";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Map from "@/components/sections/Map";

/**
 * Map of section IDs to their corresponding React components
 * This allows us to dynamically render sections based on configuration
 */
export const sectionComponents: Record<string, React.ComponentType<any>> = {
    hero: Hero,
    services: Services,
    skills: Skills,
    work: Work,
    resume: Resume,
    testimonials: Testimonials,
    pricing: Pricing,
    blog: Blog,
    contact: Contact,
    map: Map,
};

/**
 * Renders a section component based on its configuration
 * @param sectionConfig - The section configuration containing id, enabled, and resetAnimationOnView
 * @returns The rendered section component or null if not found
 */
export const renderSection = (sectionConfig: SectionConfig): React.ReactNode => {
    const { id: sectionId, resetAnimationOnView } = sectionConfig;
    const SectionComponent = sectionComponents[sectionId];

    if (!SectionComponent) {
        console.warn(`Section component with ID "${sectionId}" not found`);
        return null;
    }

    // Pass resetAnimationOnView as a prop to the section component
    // The section components will need to be updated to accept and use this prop
    return <SectionComponent key={sectionId} resetAnimationOnView={resetAnimationOnView} />;
};
