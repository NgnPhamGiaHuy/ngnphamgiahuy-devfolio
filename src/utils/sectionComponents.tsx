import React from "react";

import type { SectionConfig, MockDataType } from "@/types";

import { getSectionData } from "./sectionDataHelpers";
import {
    Hero,
    Certificates,
    Services,
    Skills,
    Portfolios,
    Resume,
    Testimonials,
    Pricing,
    Blog,
    Contact,
    Map,
} from "@/components/sections";

export const sectionComponents: Record<string, React.ComponentType<any>> = {
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
};

type RenderSectionOptions = {
    sectionProps?: any;
    fallbackData?: MockDataType;
};

export const renderSection = (
    sectionConfig: SectionConfig,
    options?: RenderSectionOptions
): React.ReactNode => {
    const { id: sectionId, resetAnimationOnView } = sectionConfig;
    const SectionComponent = sectionComponents[sectionId];

    if (!SectionComponent) {
        console.warn(`Section component with ID "${sectionId}" not found`);
        return null;
    }

    const propsToUse = options?.sectionProps || options?.fallbackData || {};

    const normalizedData = getSectionData(
        sectionId,
        propsToUse,
        options?.fallbackData
    );

    return (
        <SectionComponent
            id={sectionId}
            key={sectionId}
            resetAnimationOnView={resetAnimationOnView}
            {...normalizedData}
        />
    );
};
