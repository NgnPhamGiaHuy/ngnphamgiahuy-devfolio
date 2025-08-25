"use client"

import React, { useMemo } from "react";
import { motion } from "framer-motion";

import VLineBlock from "@/components/ui/VLineBlock";
import BackgroundText from "@/components/ui/BackgroundText";
import HeroIntro from "@/components/sections/hero/HeroIntro";
import HeroDescription from "@/components/sections/hero/HeroDescription";
import HeroProfileBlock from "@/components/sections/hero/HeroProfileBlock";
import DownloadCVButton from "@/components/ui/DownloadCVButton";

import { HeroAnimationProvider } from "@/context/HeroAnimationContext";

import data from "@/data/data.json";

import useDynamicTextAnimation from "@/hooks/animation/useDynamicTextAnimation";

import { AnimationVariants } from "@/types";

const Hero = () => {
    const { createTypingTimeline } = useDynamicTextAnimation();

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

    const containerVariants: AnimationVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.3,
                duration: 0.3,
            }
        }
    };

    const profileBlockVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 160,
                damping: 80,
                duration: 0.8
            }
        }
    };

    return (
        <HeroAnimationProvider timeline={heroTextTimeline}>
            <section className={"hero-section elementor-section"}>
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
};

export default Hero;