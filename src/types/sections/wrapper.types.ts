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
    contentMaxWidth?: string;
    backgroundVariant?: "gradientUp" | "gradientDown" | "none";
    verticalRulePosition?: "left" | "right";
    hasBodyPadding?: boolean;
    resetAnimationOnView?: boolean;
    children: React.ReactNode;
}

export interface ExportWrapperProps {
    id: string;
    title: string;
    subtitle: string;
    contentMaxWidth?: string;
    backgroundVariant?: "gradientUp" | "gradientDown" | "none";
    hasBodyPadding?: boolean;
    children: React.ReactNode;
}
