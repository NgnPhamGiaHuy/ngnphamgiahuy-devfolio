import React from "react";

export interface SectionConfig {
    id: string;
    enabled: boolean;
    resetAnimationOnView?: boolean;
}

export interface SectionWrapperProps {
    title: string;
    subtitle: string;
    sectionContentMaxWidth?: string;
    background?: "gradientUp" | "gradientDown" | "none";
    vlinePosition?: "left" | "right";
    hasSectionBodyPadding?: boolean;
    resetAnimationOnView?: boolean;
    children: React.ReactNode;
}