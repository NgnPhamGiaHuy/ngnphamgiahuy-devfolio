import React from "react";

import { getSectionData } from "./sectionDataHelpers";
import { SectionConfig, MockDataType } from "@/types";
import { Hero, Services, Skills, Portfolios, Resume, Testimonials, Pricing, Blog, Contact, Map } from "@/components";

export const sectionComponents: Record<string, React.ComponentType<any>> = {
    hero: Hero,
    services: Services,
    skills: Skills,
    work: Portfolios,
    resume: Resume,
    testimonials: Testimonials,
    pricing: Pricing,
    blog: Blog,
    contact: Contact,
    map: Map,
};

export const renderSection = (
    sectionConfig: SectionConfig,
    data?: MockDataType,
    sectionProps?: any
): React.ReactNode => {
    const { id: sectionId, resetAnimationOnView } = sectionConfig;
    const SectionComponent = sectionComponents[sectionId];

    if (!SectionComponent) {
        console.warn(`Section component with ID "${sectionId}" not found`);
        return null;
    }

    const propsToUse = sectionProps || data || {};

    const normalizedData = getSectionData(sectionId, propsToUse, data);

    return (
        <SectionComponent
            key={sectionId}
            resetAnimationOnView={resetAnimationOnView}
            {...normalizedData}
        />
    );
};