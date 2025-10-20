"use client";

import Image from "next/image";
import React, { useMemo } from "react";
import { motion, Variants } from "framer-motion";

import type { ProfileVisualProps, Profile, Project } from "@/types";

import { processImage } from "@/utils";
import { MetricCard, DecorativeLayer } from "@/components";
import {
    DEFAULT_PATTERN_LAYERS,
    DEFAULT_STATS,
    HeroAnimationsConfig,
} from "@/config";

interface ExtendedProfileVisualProps extends ProfileVisualProps {
    profile?: Profile;
    projects?: Project[];
}

const IMAGE_WIDTH = 680;
const IMAGE_HEIGHT = 800;

const ProfileVisual: React.FC<ExtendedProfileVisualProps> = ({
    className = "",
    profile,
    projects = [],
    patternLayers = DEFAULT_PATTERN_LAYERS,
    variants = {},
    initial = "",
    animate = "",
    transition = {},
}) => {
    const { profileImageUrl, profileImageAlt } = useMemo(() => {
        const { url, alt } = processImage(
            profile?.profile_image,
            {
                width: IMAGE_WIDTH,
                height: IMAGE_HEIGHT,
                fallbackImage: "/images/profile2.png",
            },
            "Professional profile picture"
        );
        return { profileImageUrl: url, profileImageAlt: alt };
    }, [profile?.profile_image]);

    const stats = useMemo(() => {
        if (!profile) {
            if (Array.isArray(projects)) {
                return [
                    DEFAULT_STATS[0],
                    {
                        value: projects.length.toString(),
                        label: "Projects Completed",
                        margin: "mt-[-30px] ml-[520px]",
                    },
                ];
            }
            return DEFAULT_STATS;
        }

        return [
            {
                value: profile.experience_years
                    ? profile.experience_years.toString()
                    : "0",
                label: "Years of Experience",
                highlight: "+",
                margin: "mt-[160px] ml-[100px]",
            },
            {
                value: Array.isArray(projects)
                    ? projects.length.toString()
                    : "0",
                label: "Projects Completed",
                margin: "mt-[-30px] ml-[520px]",
            },
        ];
    }, [profile, projects]);

    const defaultVariants = useMemo(
        () => HeroAnimationsConfig.profileVisual.default,
        []
    );
    const imageVariants = useMemo(
        () => HeroAnimationsConfig.profileVisual.image,
        []
    );
    const statsVariants = useMemo(
        () => HeroAnimationsConfig.profileVisual.stats,
        []
    );
    const statItemVariants = useMemo(
        () => HeroAnimationsConfig.profileVisual.statItem,
        []
    );

    const mergedVariants = useMemo(
        () =>
            variants &&
            typeof variants === "object" &&
            Object.keys(variants).length > 0
                ? (variants as Variants)
                : defaultVariants,
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
                className={
                    "w-full h-full flex items-center justify-center relative z-10"
                }
                variants={imageVariants}
                initial={"hidden"}
                animate={"visible"}
            >
                <Image
                    src={profileImageUrl}
                    alt={profileImageAlt}
                    width={IMAGE_WIDTH}
                    height={IMAGE_HEIGHT}
                    className={"profile-visual-image"}
                    sizes="(max-width: 1024px) 100vw, 680px"
                    decoding="async"
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
};

ProfileVisual.displayName = "ProfileVisual";

export default ProfileVisual;
