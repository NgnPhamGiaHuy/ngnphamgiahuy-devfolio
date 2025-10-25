// ============================================================
// Component: PersonalIntro
// Purpose: Animated personal introduction with name and job title
// ============================================================

"use client";

import { motion } from "framer-motion";
import React from "react";

import type { Profile } from "@/types";

import { AnimatedText } from "@/components";
import { HeroAnimationsConfig } from "@/config";
import { useHeroAnimationContext } from "@/components";

// ============================================================
// Types
// ============================================================

interface PersonalIntroProps {
    profile: Profile;
}

// ============================================================
// Component Definition
// ============================================================

/**
 * PersonalIntro component renders an animated personal introduction.
 * Features typing animation for greeting, name, and job title.
 *
 * @param props - Component props
 * @param props.profile - Profile data object
 * @returns Personal introduction component
 */
const PersonalIntro: React.FC<PersonalIntroProps> = ({ profile }) => {
    // ============================================================
    // Animation Context
    // ============================================================

    const { timeline } = useHeroAnimationContext();

    // ============================================================
    // Data Processing
    // ============================================================

    const name = profile?.name || "Your Name";
    const nameWords = React.useMemo(() => name.split(" "), [name]);
    const firstName = nameWords[0];
    const restOfName = nameWords.slice(1);

    const jobTitle = profile?.job_title || "Developer";

    // ============================================================
    // Animation Configuration
    // ============================================================

    // Remove unnecessary useMemo - animation variants are static objects
    const containerVariants = HeroAnimationsConfig.personalIntro.container;
    const itemVariants = HeroAnimationsConfig.personalIntro.item;
    const nameVariants = HeroAnimationsConfig.personalIntro.name;
    const nameWordVariants = HeroAnimationsConfig.personalIntro.nameWord;
    const jobTitleVariants = HeroAnimationsConfig.personalIntro.jobTitle;

    // ============================================================
    // Render
    // ============================================================

    return (
        <motion.div
            className="personal-intro-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            role="group"
            aria-label="Personal introduction"
            data-testid="personal-intro"
        >
            {/* Greeting Message */}
            <motion.div
                className="personal-intro-subtitle"
                variants={itemVariants}
                role="text"
                aria-label="Greeting message"
            >
                <span>
                    <AnimatedText
                        text="Hello, "
                        baseDelay={timeline.intro?.sectionDelay || 0}
                    />
                    <b className="text-primary">
                        <AnimatedText
                            text="my name is"
                            baseDelay={
                                (timeline.intro?.sectionDelay || 0) + 450
                            }
                        />
                    </b>
                </span>
            </motion.div>

            {/* Name Section */}
            <motion.h1
                className="personal-intro-title"
                variants={nameVariants}
                role="heading"
                aria-level={1}
            >
                <span>
                    <b className="personal-intro-firstname">
                        <AnimatedText
                            text={firstName}
                            baseDelay={(timeline.name?.sectionDelay || 0) + 200}
                        />
                    </b>
                    {restOfName.map((word, wordIndex) => (
                        <motion.span
                            key={`name-${wordIndex}`}
                            className="personal-intro-lastname"
                            variants={nameWordVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{
                                delay:
                                    (timeline.name?.sectionDelay || 0) / 1000 +
                                    0.3 +
                                    wordIndex * 0.2,
                            }}
                        >
                            <AnimatedText
                                text={word}
                                baseDelay={
                                    (timeline.name?.sectionDelay || 0) +
                                    (wordIndex + 1) * 400
                                }
                            />
                        </motion.span>
                    ))}
                </span>
            </motion.h1>

            {/* Job Title Section */}
            <motion.div
                className="personal-intro-subtitle"
                variants={itemVariants}
                role="text"
                aria-label="Job title introduction"
            >
                <AnimatedText
                    text="I am "
                    baseDelay={timeline.job?.sectionDelay || 0}
                />
                <motion.strong
                    className="personal-intro-job-title"
                    variants={jobTitleVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        delay: (timeline.job?.sectionDelay || 0) / 1000 + 0.2,
                    }}
                >
                    <AnimatedText
                        text={jobTitle}
                        baseDelay={(timeline.job?.sectionDelay || 0) + 200}
                    />
                </motion.strong>
            </motion.div>
        </motion.div>
    );
};

PersonalIntro.displayName = "PersonalIntro";

export default PersonalIntro;
