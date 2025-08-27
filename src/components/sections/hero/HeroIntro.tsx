"use client"

import React from "react";
import { motion } from "framer-motion";

import AnimatedTextCharacter from "@/components/ui/AnimatedTextCharacter";

import { useHeroAnimationContext } from "@/context/HeroAnimationContext";

import { HeroIntroProps, AnimationVariants } from "@/types";

import { data } from "@/data/data";

const containerVariants: AnimationVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
} as const;

const itemVariants: AnimationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.75 }
    }
} as const;

const nameVariants: AnimationVariants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            delayChildren: 0.2
        }
    }
} as const;

const HeroIntro: React.FC<HeroIntroProps> = () => {
    const { profile } = data;
    const { timeline } = useHeroAnimationContext();

    const nameWords = profile.name.split(" ");
    const firstName = nameWords[0];
    const restOfName = nameWords.slice(1);

    return (
        <motion.div className={"hero-intro-container"} variants={containerVariants} initial={"hidden"} animate={"visible"}>
            <motion.div className={"hero-subtitle"} variants={itemVariants}>
                <span>
                    <AnimatedTextCharacter
                        text={"Hello, "}
                        baseDelay={timeline.intro?.sectionDelay || 0}
                    />
                    <b className={"text-primary"}>
                        <AnimatedTextCharacter
                            text={"my name is"}
                            baseDelay={(timeline.intro?.sectionDelay || 0) + 450}
                        />
                    </b>
                </span>
            </motion.div>
            <motion.h1 className={"hero-name-wrapper hero-title"} variants={nameVariants}>
                <span>
                    <b className={"hero-firstname"}>
                        <AnimatedTextCharacter
                            text={firstName}
                            baseDelay={(timeline.name?.sectionDelay || 0) + 200}
                        />
                    </b>
                    { restOfName.map((word, wordIndex) => (
                        <motion.span
                            key={`name-${wordIndex}`}
                            className={"hero-lastname"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                delay: ((timeline.name?.sectionDelay || 0) / 1000) + 0.3 + (wordIndex * 0.2)
                            }}
                        >
                            <AnimatedTextCharacter
                                text={word}
                                baseDelay={(timeline.name?.sectionDelay || 0) + ((wordIndex + 1) * 400)}
                            />
                        </motion.span>
                    )) }
                </span>
            </motion.h1>
            <motion.div className={"hero-subtitle"} variants={itemVariants}>
                <AnimatedTextCharacter
                    text={"I am "}
                    baseDelay={timeline.job?.sectionDelay || 0}
                />
                <motion.strong
                    className={"hero-job-title"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: ((timeline.job?.sectionDelay || 0) / 1000) + 0.2 }}
                >
                    <AnimatedTextCharacter
                        text={profile.job_title}
                        baseDelay={(timeline.job?.sectionDelay || 0) + 200}
                    />
                </motion.strong>
            </motion.div>
        </motion.div>
    );
};

export default HeroIntro;