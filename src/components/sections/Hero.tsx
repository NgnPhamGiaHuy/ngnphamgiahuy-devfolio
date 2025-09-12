"use client";

import { motion } from "framer-motion";
import React, { useMemo, memo } from "react";

import { data } from "@/data"
import { Profile } from "@/types";
import { StandardAnimations } from "@/config";
import { HeroAnimationProvider } from "@/context";
import { usePrefersReducedMotion, useDynamicTextAnimation } from "@/hooks";
import { VLineBlock, BackgroundText, HeroIntro, DownloadCVButton, HeroDescription, HeroProfileBlock } from "@/components";

interface HeroProps {
    profile?: Profile;
}

const Hero: React.FC<HeroProps> = memo(({ profile }) => {
    const { createTypingTimeline } = useDynamicTextAnimation();
    const prefersReducedMotion = usePrefersReducedMotion();

    const profileData = useMemo(() => profile || data.profile, [profile]);

    const heroTextTimeline = useMemo(() => {
        const textSections = [
            { id: "intro", text: "Hello, my name is" },
            { id: "name", text: profileData.name },
            { id: "job", text: `I am ${profileData.job_title}` },
            { id: "description", text: profileData.description }
        ];

        return createTypingTimeline(textSections);
    }, [createTypingTimeline, profileData]);

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
                                        <HeroIntro profile={profileData} />
                                        <HeroDescription profile={profileData} />
                                        <DownloadCVButton cvLink={profileData.cv_link} />
                                    </motion.div>
                                    <HeroProfileBlock
                                        profile={profileData}
                                        variants={profileBlockVariants}
                                        initial={"hidden"}
                                        animate={"visible"}
                                    />
                                    <VLineBlock
                                        top={"-70px"}
                                        bottom={"-70px"}
                                        left={"-100px"}
                                        shadow={"before:shadow-[5px_-5px_0_rgb(0_0_0/0.2)] after:shadow-[5px_-5px_0_rgb(0_0_0/0.2)]"}
                                        className={"rotate-180 transform -scale-x-100"}
                                    />
                                </div>
                            </div>
                            <BackgroundText text={profileData.job_title} bottom={"-100px"} />
                        </div>
                    </div>
                </div>
            </section>
        </HeroAnimationProvider>
    );
});

Hero.displayName = "Hero";

export default Hero;