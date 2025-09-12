"use client";

import Image from "next/image";
import React, { memo, useMemo } from "react";
import { motion, Variants } from "framer-motion";

import { usePrefersReducedMotion } from "@/hooks";
import { StatCard, HeroLayer } from "@/components";
import { HeroProfileBlockProps, Profile } from "@/types";
import { DEFAULT_PATTERN_LAYERS, DEFAULT_STATS } from "@/config";
import { processImage } from "@/utils";

interface ExtendedHeroProfileBlockProps extends HeroProfileBlockProps {
    profile?: Profile;
}

const HeroProfileBlock: React.FC<ExtendedHeroProfileBlockProps> = memo(({ className = "", profile, patternLayers = DEFAULT_PATTERN_LAYERS, variants = {}, initial = "", animate = "", transition = {} }) => {
    const prefersReducedMotion = usePrefersReducedMotion();

    const { url: profileImageUrl, alt: profileImageAlt } = processImage(
        profile?.profile_image,
        { width: 600, height: 600, fallbackImage: "/images/profile2.png" },
        "Professional profile picture"
    );

    const stats = useMemo(() => {
        if (!profile) return DEFAULT_STATS;

        return [
            {
                value: profile.experience_years ? profile.experience_years.toString() : "0",
                label: "Years of Experience",
                highlight: "+",
                margin: "mt-[160px] ml-[100px]"
            },
            {
                value: profile.completed_projects ? profile.completed_projects.toString() : "0",
                label: "Projects Completed",
                margin: "mt-[-30px] ml-[520px]"
            }
        ];
    }, [profile]);

    const defaultVariants: Variants = useMemo(() => ({
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: prefersReducedMotion ? "tween" : "spring",
                stiffness: prefersReducedMotion ? 0 : 160,
                damping: prefersReducedMotion ? 0 : 80,
                duration: prefersReducedMotion ? 0.2 : 0.8
            }
        }
    }), [prefersReducedMotion]);

    const imageVariants: Variants = useMemo(() => ({
        hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delay: prefersReducedMotion ? 0 : 0.2,
                duration: prefersReducedMotion ? 0.1 : 0.6,
                ease: "easeOut"
            }
        }
    }), [prefersReducedMotion]);

    const statsVariants: Variants = useMemo(() => ({
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: prefersReducedMotion ? 0 : 0.4,
                staggerChildren: prefersReducedMotion ? 0 : 0.1,
                duration: prefersReducedMotion ? 0.1 : 0.3
            }
        }
    }), [prefersReducedMotion]);

    const statItemVariants: Variants = useMemo(() => ({
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: prefersReducedMotion ? 0.1 : 0.4,
                ease: "easeOut"
            }
        }
    }), [prefersReducedMotion]);

    const mergedVariants = useMemo(() =>
        Object.keys(variants).length > 0 ? variants : defaultVariants,
        [variants, defaultVariants]
    );

    return (
        <motion.div
            className={`hero-profile-container ${className}`}
            variants={mergedVariants}
            initial={initial === "" ? "hidden" : initial}
            animate={animate === "" ? "visible" : animate}
            transition={transition}
            role={"img"}
            aria-label={"Profile image with professional statistics"}
        >
            <motion.div
                className={"flex items-center justify-center"}
                variants={imageVariants}
                initial={"hidden"}
                animate={"visible"}
            >
                <Image
                    src={profileImageUrl}
                    alt={profileImageAlt}
                    width={680}
                    height={800}
                    className={"hero-profile-image"}
                    priority
                />
            </motion.div>
            <span
                className={"avatar-circle"}
                role={"presentation"}
                aria-hidden={"true"}
            />
            {patternLayers.map((layer, index) => (
                <HeroLayer key={`layer-${index}`} {...layer} />
            ))}
            <motion.div
                className={"hero-stats-container"}
                variants={statsVariants}
                initial={"hidden"}
                animate={"visible"}
                role={"group"}
                aria-label={"Professional statistics"}
            >
                <ul role={"list"}>
                    {stats.map((stat, index) => (
                        <motion.li
                            key={`stat-${index}`}
                            variants={statItemVariants}
                            role={"listitem"}
                        >
                            <StatCard
                                value={stat.value}
                                margin={stat.margin}
                                label={stat.label}
                                highlight={stat.highlight}
                            />
                        </motion.li>
                    ))}
                </ul>
            </motion.div>
        </motion.div>
    );
});

HeroProfileBlock.displayName = "HeroProfileBlock";

export default HeroProfileBlock;