import React from "react";

import { SectionConfig } from "@/types";

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

export const renderSection = (sectionConfig: SectionConfig, data?: any): React.ReactNode => {
    const { id: sectionId, resetAnimationOnView } = sectionConfig;
    const SectionComponent = sectionComponents[sectionId];

    if (!SectionComponent) {
        console.warn(`Section component with ID "${sectionId}" not found`);
        return null;
    }

    let sectionData = {};

    if (data) {
        switch (sectionId) {
            case "hero":
                sectionData = { profile: data.profile };
                break;
            case "services":
                sectionData = { services: data.services };
                break;
            case "skills":
                sectionData = { skills: data.skills };
                break;
            case "work":
                sectionData = { projects: data.projects };
                break;
            case "resume":
                sectionData = {
                    experience: data.experience,
                    education: data.education
                };
                break;
            case "testimonials":
                sectionData = { testimonials: data.testimonials };
                break;
            case "pricing":
                sectionData = { pricing: data.pricing };
                break;
            case "blog":
                sectionData = { blogs: data.blogs };
                break;
            case "contact":
                sectionData = { contacts: data.contacts };
                break;
            case "map":
                sectionData = {
                    contacts: data.contacts,
                    profile: data.profile
                };
                break;
            default:
                sectionData = {};
        }
    }

    return (
        <SectionComponent
            key={sectionId}
            resetAnimationOnView={resetAnimationOnView}
            {...sectionData}
        />
    );
};