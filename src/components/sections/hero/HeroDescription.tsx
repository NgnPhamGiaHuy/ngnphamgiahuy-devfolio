"use client";

import React, { memo, useMemo } from "react";
import { motion, Variants } from "framer-motion";

import { data } from "@/data/data";
import { HeroDescriptionProps } from "@/types";
import { generateSocialLinks } from "@/utils/socialLinks";
import { useHeroAnimationContext } from "@/context/HeroAnimationContext";

import SocialLinks from "@/components/ui/SocialLinks";
import AnimatedTextCharacter from "@/components/ui/AnimatedTextCharacter";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const HeroDescription: React.FC<HeroDescriptionProps> = memo(() => {
    const { profile } = data;
    const { timeline } = useHeroAnimationContext();
    const prefersReducedMotion = usePrefersReducedMotion();

    const descriptionLength = profile.description.length;
    const dynamicStagger = useMemo(() =>
        prefersReducedMotion ? 0 : Math.min(0.3, descriptionLength * 0.001),
        [descriptionLength, prefersReducedMotion]
    );

    const socialLinks = useMemo(() =>
        generateSocialLinks(profile.social_links),
        [profile.social_links]
    );

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: prefersReducedMotion ? 0 : 0.2,
                staggerChildren: dynamicStagger,
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
                duration: prefersReducedMotion ? 0.1 : 1.75,
                ease: prefersReducedMotion ? "easeOut" : "easeInOut"
            }
        }
    };

    const socialLinksVariants: Variants = {
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: prefersReducedMotion ? "tween" : "spring",
                stiffness: prefersReducedMotion ? 0 : 400,
                damping: prefersReducedMotion ? 0 : 25,
                duration: prefersReducedMotion ? 0.1 : 0.6
            }
        }
    };

    return (
        <motion.div
            className={"hero-description"}
            variants={containerVariants}
            initial={"hidden"}
            animate={"visible"}
            role={"group"}
            aria-label={"Personal description and social links"}
        >
            <motion.div
                variants={itemVariants}
                role={"text"}
                aria-label={"Professional description"}
            >
                <p className={"hero-description-text"}>
                    { prefersReducedMotion ? (
                        profile.description
                    ) : (
                        <AnimatedTextCharacter
                            text={profile.description}
                            baseDelay={timeline.description?.sectionDelay || 0}
                        />
                    ) }
                </p>
            </motion.div>
            <motion.div
                variants={socialLinksVariants}
                role={"navigation"}
                aria-label={"Social media links"}
            >
                <SocialLinks
                    links={socialLinks}
                    iconSize={"size-6"}
                    iconMargin={"mr-[15px]"}
                    containerMargin={"mt-[30px]"}
                />
            </motion.div>
        </motion.div>
    );
});

HeroDescription.displayName = "HeroDescription";

export default HeroDescription;