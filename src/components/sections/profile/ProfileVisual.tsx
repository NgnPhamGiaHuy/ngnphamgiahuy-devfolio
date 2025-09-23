"use client";

import Image from "next/image";
import React, { memo, useMemo } from "react";
import { motion, Variants } from "framer-motion";

import type { ProfileVisualProps, Profile } from "@/types";

import { processImage } from "@/utils";
import { usePrefersReducedMotion } from "@/hooks";
import { MetricCard, DecorativeLayer } from "@/components";
import { DEFAULT_PATTERN_LAYERS, DEFAULT_STATS } from "@/config";

interface ExtendedProfileVisualProps extends ProfileVisualProps {
    profile?: Profile;
}

const ProfileVisual: React.FC<ExtendedProfileVisualProps> = memo(({ className = "", profile, patternLayers = DEFAULT_PATTERN_LAYERS, variants = {}, initial = "", animate = "", transition = {} }) => {
    const prefersReducedMotion = usePrefersReducedMotion();

    const { url: profileImageUrl, alt: profileImageAlt } = processImage(
        profile?.profile_image,
        { width: 680, height: 800, fallbackImage: "/images/profile2.png" },
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
        variants && typeof variants === 'object' && Object.keys(variants).length > 0 ? variants as Variants : defaultVariants,
        [variants, defaultVariants]
    );

    return (
        <motion.div
            className={`profile-visual-container ${className}`}
            variants={mergedVariants}
            initial={initial === "" ? "hidden" : (initial as any)}
            animate={animate === "" ? "visible" : (animate as any)}
            transition={transition as any}
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
                    className={"profile-visual-image"}
                    priority
                />
            </motion.div>
            <span
                className={"profile-visual-avatar-circle"}
                role={"presentation"}
                aria-hidden={"true"}
            />
            {patternLayers.map((layer, index) => (
                <DecorativeLayer key={`layer-${index}`} {...layer} />
            ))}
            <motion.div
                className={"profile-visual-stats-container"}
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
                            <MetricCard
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

ProfileVisual.displayName = "ProfileVisual";

export default ProfileVisual;
