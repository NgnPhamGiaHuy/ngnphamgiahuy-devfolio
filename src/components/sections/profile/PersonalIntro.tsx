"use client";

import React, { memo, useMemo } from "react";
import { motion, Variants } from "framer-motion";

import type { Profile } from "@/types";

import { AnimatedText } from "@/components";
import { usePrefersReducedMotion } from "@/hooks";
import { useHeroAnimationContext } from "@/context";

interface PersonalIntroProps {
    profile: Profile;
}

const PersonalIntro: React.FC<PersonalIntroProps> = memo(({ profile }) => {
    const { timeline } = useHeroAnimationContext();
    const prefersReducedMotion = usePrefersReducedMotion();

    const name = profile?.name || "Your Name";
    const nameWords = useMemo(() => name.split(" "), [name]);
    const firstName = nameWords[0];
    const restOfName = nameWords.slice(1);

    const jobTitle = profile?.job_title || "Developer";

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.2,
                duration: prefersReducedMotion ? 0.1 : 0.3
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: prefersReducedMotion ? 0.1 : 0.75,
                ease: prefersReducedMotion ? "easeOut" : "easeInOut"
            }
        }
    };

    const nameVariants: Variants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                duration: prefersReducedMotion ? 0.1 : 0.5,
                delayChildren: prefersReducedMotion ? 0 : 0.2
            }
        }
    };

    const nameWordVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: prefersReducedMotion ? 0.1 : 0.3,
                ease: "easeOut"
            }
        }
    };

    const jobTitleVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: prefersReducedMotion ? 0.1 : 0.4,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            className={"personal-intro-container"}
            variants={containerVariants}
            initial={"hidden"}
            animate={"visible"}
            role={"group"}
            aria-label={"Personal introduction"}
        >
            <motion.div
                className={"personal-intro-subtitle"}
                variants={itemVariants}
                role={"text"}
                aria-label={"Greeting message"}
            >
                <span>
                    <AnimatedText
                        text={"Hello, "}
                        baseDelay={timeline.intro?.sectionDelay || 0}
                    />
                    <b className={"text-primary"}>
                        <AnimatedText
                            text={"my name is"}
                            baseDelay={(timeline.intro?.sectionDelay || 0) + 450}
                        />
                    </b>
                </span>
            </motion.div>
            <motion.h1
                className={"personal-intro-title"}
                variants={nameVariants}
                role={"heading"}
                aria-level={1}
            >
                <span>
                    <b className={"personal-intro-firstname"}>
                        <AnimatedText
                            text={firstName}
                            baseDelay={(timeline.name?.sectionDelay || 0) + 200}
                        />
                    </b>
                    {restOfName.map((word, wordIndex) => (
                        <motion.span
                            key={`name-${wordIndex}`}
                            className={"personal-intro-lastname"}
                            variants={nameWordVariants}
                            initial={"hidden"}
                            animate={"visible"}
                            transition={{
                                delay: prefersReducedMotion ? 0 : ((timeline.name?.sectionDelay || 0) / 1000) + 0.3 + (wordIndex * 0.2)
                            }}
                        >
                            <AnimatedText
                                text={word}
                                baseDelay={(timeline.name?.sectionDelay || 0) + ((wordIndex + 1) * 400)}
                            />
                        </motion.span>
                    ))}
                </span>
            </motion.h1>
            <motion.div
                className={"personal-intro-subtitle"}
                variants={itemVariants}
                role={"text"}
                aria-label={"Job title introduction"}
            >
                <AnimatedText
                    text={"I am "}
                    baseDelay={timeline.job?.sectionDelay || 0}
                />
                <motion.strong
                    className={"personal-intro-job-title"}
                    variants={jobTitleVariants}
                    initial={"hidden"}
                    animate={"visible"}
                    transition={{
                        delay: prefersReducedMotion ? 0 : ((timeline.job?.sectionDelay || 0) / 1000) + 0.2
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
});

PersonalIntro.displayName = "PersonalIntro";

export default PersonalIntro;
