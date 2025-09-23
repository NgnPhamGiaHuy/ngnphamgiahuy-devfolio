import React from "react";

export interface WrapperHeaderProps {
    title: string;
    subtitle: string;
    isInView?: boolean;
}

export interface WrapperProps {
    id: string;
    title: string;
    subtitle: string;
    sectionContentMaxWidth?: string;
    background?: "gradientUp" | "gradientDown" | "none";
    vlinePosition?: "left" | "right";
    hasSectionBodyPadding?: boolean;
    resetAnimationOnView?: boolean;
    children: React.ReactNode;
}