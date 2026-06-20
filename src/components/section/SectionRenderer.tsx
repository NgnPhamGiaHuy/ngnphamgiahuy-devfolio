import React from "react";

import type { MockDataType, SectionConfigItemType } from "@/schemas";

import { getSectionData } from "@/shared/utils/sections";

import CareerGraph from "@/components/features/career-graph/CareerGraph";
import ProjectBento from "@/components/features/career-graph/ProjectBento";
import SkillsDependency from "@/components/features/career-graph/SkillsDependency";
import NowFocus from "@/components/features/career-graph/NowFocus";
import Blog from "@/components/features/blog/Blog";
import Contact from "@/components/features/contact/Contact";

/**
 * COMMIT HISTORY information architecture.
 *
 * The freelancer-template sections (services, pricing, testimonials, map,
 * resume, portfolios cards, certificates) are intentionally NOT registered:
 * their data now feeds the career graph instead. `hero` renders the graph,
 * `skills` renders the dependency view, `now` the current focus.
 */
const SECTION_COMPONENTS: Record<string, React.ComponentType<any>> = {
    hero: CareerGraph,
    projects: ProjectBento,
    skills: SkillsDependency,
    now: NowFocus,
    blog: Blog,
    contact: Contact,
} as const;

interface RenderSectionOptions {
    sectionProps?: any;
    fallbackData?: MockDataType;
}

interface SectionComponentProps {
    id: string;
    resetAnimationOnView?: boolean;
    [key: string]: any;
}

export const getSectionComponent = (
    sectionId: string
): React.ComponentType<any> | null => {
    return SECTION_COMPONENTS[sectionId] || null;
};

export const renderSection = (
    sectionConfig: SectionConfigItemType,
    options?: RenderSectionOptions
): React.ReactNode => {
    const { id: sectionId, resetAnimationOnView } = sectionConfig;

    if (!sectionId) {
        console.warn("renderSection: Section ID is required");
        return null;
    }

    const SectionComponent = getSectionComponent(sectionId);
    if (!SectionComponent) {
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
