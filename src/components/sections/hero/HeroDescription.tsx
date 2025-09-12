"use client";

import React, { memo, useMemo } from "react";
import { motion, Variants } from "framer-motion";

import { Profile } from "@/types";
import { generateSocialLinks } from "@/utils";
import { usePrefersReducedMotion } from "@/hooks";
import { useHeroAnimationContext } from "@/context";
import { SocialLinks, AnimatedTextCharacter } from "@/components";

interface HeroDescriptionProps {
    profile?: Profile;
}

const HeroDescription: React.FC<HeroDescriptionProps> = memo(({ profile }) => {
    const { timeline } = useHeroAnimationContext();
    const prefersReducedMotion = usePrefersReducedMotion();

    const description = profile?.description || "Welcome to my portfolio website";
    const descriptionLength = description.length;

    const dynamicStagger = useMemo(() =>
        prefersReducedMotion ? 0 : Math.min(0.3, descriptionLength * 0.001),
        [descriptionLength, prefersReducedMotion]
    );

    const socialLinks = useMemo(() => {
        if (!profile?.social_links) return [];
        return generateSocialLinks(profile.social_links);
    }, [profile?.social_links]);

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
                    {prefersReducedMotion ? (
                        description
                    ) : (
                        <AnimatedTextCharacter
                            text={description}
                            baseDelay={timeline.description?.sectionDelay || 0}
                        />
                    )}
                </p>
            </motion.div>
            {socialLinks.length > 0 && (
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
            )}
        </motion.div>
    );
});

HeroDescription.displayName = "HeroDescription";

export default HeroDescription;