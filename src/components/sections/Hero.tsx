"use client";

import { motion } from "framer-motion";
import React, { useMemo, memo } from "react";

import type { HeroSectionProps } from "@/types";

import { HeroAnimationProvider } from "@/context";
import { StandardAnimations, vlinePositions } from "@/config";
import { usePrefersReducedMotion, useDynamicTextAnimation } from "@/hooks";
import { VerticalRule, BackdropText, DownloadResumeButton } from "@/components";
import { PersonalIntro, BioSection, ProfileVisual } from "@/components/sections/profile";

const Hero: React.FC<HeroSectionProps> = memo(({ profile }) => {
    const { createTypingTimeline } = useDynamicTextAnimation();
    const prefersReducedMotion = usePrefersReducedMotion();

    const heroTextTimeline = useMemo(() => {
        const textSections = [
            { id: "intro", text: "Hello, my name is" },
            { id: "name", text: profile.name },
            { id: "job", text: `I am ${profile.job_title}` },
            { id: "description", text: profile.description }
        ];

        return createTypingTimeline(textSections);
    }, [createTypingTimeline, profile]);

    const containerVariants = useMemo(() =>
        StandardAnimations.staggerChildren(prefersReducedMotion, 0.3, 0.1),
        [prefersReducedMotion]
    );

    const profileBlockVariants = useMemo(() =>
        StandardAnimations.springUp(prefersReducedMotion, 50),
        [prefersReducedMotion]
    );

    return (
        <HeroAnimationProvider timeline={heroTextTimeline}>
            <section
                className={"hero-section elementor-section"}
                role={"banner"}
                aria-label={"Hero section with introduction and profile"}
            >
                <div className={"hero-container"}>
                    <div className={"hero-wrapper"}>
                        <div className={"hero-content-wrapper"}>
                            <div className={"hero-main-content"}>
                                <div className={"hero-content-inner"}>
                                    <motion.div
                                        className={"hero-content-container"}
                                        initial={"hidden"}
                                        animate={"visible"}
                                        variants={containerVariants}
                                    >
                                        <PersonalIntro profile={profile} />
                                        <BioSection profile={profile} />
                                        <DownloadResumeButton cvLink={profile.cv_link} />
                                    </motion.div>
                                    <ProfileVisual
                                        profile={profile}
                                        variants={profileBlockVariants}
                                        initial={"hidden"}
                                        animate={"visible"}
                                    />
                                    <VerticalRule {...vlinePositions["left"]} />
                                </div>
                            </div>
                            <BackdropText text={profile.job_title} bottom={"-100px"} />
                        </div>
                    </div>
                </div>
            </section>
        </HeroAnimationProvider>
    );
});

Hero.displayName = "Hero";

export default Hero;