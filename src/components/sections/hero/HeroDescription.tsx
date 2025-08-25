"use client"

import React from "react";
import { motion } from "framer-motion";

import SocialLinks from "@/components/ui/SocialLinks";
import AnimatedTextCharacter from "@/components/ui/AnimatedTextCharacter";

import { useHeroAnimationContext } from "@/context/HeroAnimationContext";

import { HeroDescriptionProps, AnimationVariants } from "@/types";

import data from "@/data/data.json";

import { generateSocialLinks } from "@/utils/socialLinks";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const HeroDescription: React.FC<HeroDescriptionProps> = () => {
    const { profile } = data;
    const { timeline } = useHeroAnimationContext();

    const prefersReducedMotion  = usePrefersReducedMotion();

    const descriptionLength = profile.description.length;
    const dynamicStagger = Math.min(0.3, descriptionLength * 0.001);

    const containerVariants: AnimationVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: dynamicStagger
            }
        }
    };

    const itemVariants: AnimationVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.75 }
        }
    };

    const socialLinks = generateSocialLinks(profile.social_links);

    return (
        <motion.div className={"hero-description"} variants={containerVariants} initial={"hidden"} animate={"visible"}>
            <motion.div variants={itemVariants}>
                <p className={"hero-description-text"}>
                    {prefersReducedMotion ? (
                        profile.description
                    ) : (
                        <AnimatedTextCharacter
                            text={profile.description}
                            baseDelay={timeline.description?.sectionDelay || 0}
                        />
                    )}
                </p>
            </motion.div>
            <motion.div variants={itemVariants} transition={{
                type: "spring",
                stiffness: 400,
                damping: 25
            }}
            >
                <SocialLinks links={socialLinks} iconSize={"size-6"} iconMargin={"mr-[15px]"} containerMargin={"mt-[30px]"} />
            </motion.div>
        </motion.div>
    );
};

export default HeroDescription;