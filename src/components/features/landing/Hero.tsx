// ============================================================
// Component: Hero
// Purpose: Main hero section with animated text, profile, and visual elements
// ============================================================

"use client";

import React from "react";
import { motion } from "framer-motion";

import type { HeroSectionProps } from "@/types";

import { useDynamicTextAnimation } from "@/hooks";
import { HeroAnimationsConfig, vlinePositions } from "@/config";
import {
    VerticalRule,
    BackdropText,
    BioSection,
    DownloadResumeButton,
    PersonalIntro,
    ProfileVisual,
    HeroAnimationProvider,
} from "@/components";

// ============================================================
// Component Definition
// ============================================================

/**
 * Hero component renders the main hero section with animated text and profile.
 * Features typing animation, profile visualization, and interactive elements.
 *
 * @param props - Component props
 * @param props.id - Unique identifier for the section
 * @param props.profile - Profile data object
 * @param props.projects - Array of project data
 * @returns Hero section component
 */
const Hero: React.FC<HeroSectionProps> = ({
    id,
    profile,
    projects,
    verticalRulePosition,
}) => {
    // ============================================================
    // Animation Configuration
    // ============================================================

    const { createTypingTimeline } = useDynamicTextAnimation();

    // Remove unnecessary useMemo - animation variants are static objects
    const containerVariants = HeroAnimationsConfig.container;
    const profileBlockVariants = HeroAnimationsConfig.profileBlock;

    // ============================================================
    // Text Animation Timeline
    // ============================================================

    // Create typing timeline for animated text sections
    const heroTextTimeline = React.useMemo(() => {
        const textSections = [
            { id: "intro", text: "Hello, my name is" },
            { id: "name", text: profile.name },
            { id: "job", text: `I am ${profile.job_title}` },
            { id: "description", text: profile.description },
        ];

        return createTypingTimeline(textSections);
    }, [
        createTypingTimeline,
        profile.name,
        profile.job_title,
        profile.description,
    ]);

    // ============================================================
    // Render
    // ============================================================

    return (
        <HeroAnimationProvider timeline={heroTextTimeline}>
            <section
                id={id}
                className="hero-section hero-elementor-section"
                role="banner"
                aria-label="Hero section with introduction and profile"
                data-testid="hero-section"
            >
                <div className="min-h-screen max-lg:min-h-0 items-center container-1300">
                    <div className="flex-full">
                        <div className="p-[10px] flex-wrap-center">
                            <div className="w-full mb-5 relative">
                                <div className="relative z-2">
                                    {/* Main Content Container */}
                                    <motion.div
                                        className="hero-content-container"
                                        initial="hidden"
                                        animate="visible"
                                        variants={containerVariants}
                                        data-testid="hero-content"
                                    >
                                        <PersonalIntro profile={profile} />
                                        <BioSection profile={profile} />
                                        <DownloadResumeButton
                                            cvLink={profile.cv_link}
                                        />
                                    </motion.div>

                                    {/* Profile Visual */}
                                    <ProfileVisual
                                        profile={profile}
                                        projects={projects}
                                        variants={profileBlockVariants}
                                        initial="hidden"
                                        animate="visible"
                                    />

                                    {/* Vertical Rule */}
                                    <VerticalRule
                                        {...vlinePositions[
                                            verticalRulePosition ||
                                                ("left" as keyof typeof vlinePositions)
                                        ]}
                                    />
                                </div>
                            </div>

                            {/* Decorative Backdrop Text */}
                            <BackdropText
                                text={profile.job_title}
                                bottom="-100px"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </HeroAnimationProvider>
    );
};

Hero.displayName = "Hero";

export default Hero;
