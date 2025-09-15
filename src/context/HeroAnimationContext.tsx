"use client";

import React, { createContext, ReactNode, useContext } from "react";

export interface HeroTextTimeline {
    [sectionId: string]: {
        sectionDelay: number;
        charDelays: number[];
    };
}

interface HeroAnimationContextValue {
    timeline: HeroTextTimeline;
}

const HeroAnimationContext = createContext<HeroAnimationContextValue>({
    timeline: {},
});

export const HeroAnimationProvider: React.FC<{ children: ReactNode; timeline: HeroTextTimeline }> = ({ children, timeline }) => {
    return (
        <HeroAnimationContext.Provider value={{ timeline }}>
            {children}
        </HeroAnimationContext.Provider>
    );
};

export const useHeroAnimationContext = () => useContext(HeroAnimationContext);
