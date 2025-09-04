"use client";

import React, { useMemo, memo } from "react";
import { motion } from "framer-motion";

import { data } from "@/data/data";
import { StandardAnimations } from "@/config/animation.config";
import { HeroAnimationProvider } from "@/context/HeroAnimationContext";

import VLineBlock from "@/components/ui/VLineBlock";
import BackgroundText from "@/components/ui/BackgroundText";
import HeroIntro from "@/components/sections/hero/HeroIntro";
import DownloadCVButton from "@/components/ui/button/DownloadCVButton";
import HeroDescription from "@/components/sections/hero/HeroDescription";
import HeroProfileBlock from "@/components/sections/hero/HeroProfileBlock";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import useDynamicTextAnimation from "@/hooks/animation/useDynamicTextAnimation";

const Hero: React.FC = memo(() => {
    const { createTypingTimeline } = useDynamicTextAnimation();
    const prefersReducedMotion = usePrefersReducedMotion();

    const heroTextTimeline = useMemo(() => {
        const { profile } = data;

        const textSections = [
            { id: "intro", text: "Hello, my name is" },
            { id: "name", text: profile.name },
            { id: "job", text: `I am ${profile.job_title}` },
            { id: "description", text: profile.description }
        ];

        return createTypingTimeline(textSections);
    }, [createTypingTimeline]);

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
                                        <HeroIntro />
                                        <HeroDescription />
                                        <DownloadCVButton />
                                    </motion.div>
                                    <HeroProfileBlock
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
                            <BackgroundText text={"Web Developer"} bottom={"-100px"} />
                        </div>
                    </div>
                </div>
            </section>
        </HeroAnimationProvider>
    );
});

Hero.displayName = "Hero";

export default Hero;