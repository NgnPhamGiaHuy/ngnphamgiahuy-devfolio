// ============================================================
// Component: ProfileVisual
// Purpose: Profile image with decorative elements and statistics
// ============================================================

"use client";

import Image from "next/image";
import React from "react";
import { motion, Variants } from "framer-motion";

import type { ProfileVisualProps, Profile, Project } from "@/types";

import { processImage } from "@/utils";
import { MetricCard, DecorativeLayer } from "@/components";
import {
    DEFAULT_PATTERN_LAYERS,
    DEFAULT_STATS,
    HeroAnimationsConfig,
} from "@/config";

// ============================================================
// Constants
// ============================================================

const IMAGE_WIDTH = 680;
const IMAGE_HEIGHT = 800;
const FALLBACK_IMAGE = "/images/profile2.png";

// ============================================================
// Types
// ============================================================

interface ExtendedProfileVisualProps extends ProfileVisualProps {
    profile?: Profile;
    projects?: Project[];
}

// ============================================================
// Component Definition
// ============================================================

/**
 * ProfileVisual component renders a profile image with decorative elements and statistics.
 * Features animated profile image, decorative layers, and professional metrics.
 *
 * @param props - Component props
 * @param props.profile - Profile data object
 * @param props.projects - Array of project data
 * @param props.patternLayers - Decorative pattern layers
 * @param props.variants - Animation variants
 * @param props.initial - Initial animation state
 * @param props.animate - Animation state
 * @param props.transition - Animation transition
 * @param props.className - Additional CSS classes
 * @returns Profile visual component
 */
const ProfileVisual: React.FC<ExtendedProfileVisualProps> = ({
    className = "",
    profile,
    projects = [],
    patternLayers = DEFAULT_PATTERN_LAYERS,
    variants = {},
    initial = "",
    animate = "",
    transition = {},
    ...props
}) => {
    // ============================================================
    // Data Processing
    // ============================================================

    // Process profile image - lightweight operation that doesn't need memoization
    const { url: profileImageUrl, alt: profileImageAlt } = processImage(
        profile?.profile_image,
        {
            width: IMAGE_WIDTH,
            height: IMAGE_HEIGHT,
            fallbackImage: FALLBACK_IMAGE,
        },
        { fallbackAlt: "Professional profile picture" }
    );

    // Generate statistics based on profile and projects data
    const stats = React.useMemo(() => {
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

    // ============================================================
    // Animation Configuration
    // ============================================================

    // Remove unnecessary useMemo - animation variants are static objects
    const defaultVariants = HeroAnimationsConfig.profileVisual.default;
    const imageVariants = HeroAnimationsConfig.profileVisual.image;
    const statsVariants = HeroAnimationsConfig.profileVisual.stats;
    const statItemVariants = HeroAnimationsConfig.profileVisual.statItem;

    // Merge custom variants with defaults
    const mergedVariants = React.useMemo(
        () =>
            variants &&
            typeof variants === "object" &&
            Object.keys(variants).length > 0
                ? (variants as Variants)
                : defaultVariants,
        [variants, defaultVariants]
    );

    // ============================================================
    // Render
    // ============================================================

    return (
        <motion.div
            className={`profile-visual-container ${className}`}
            variants={mergedVariants}
            initial={initial === "" ? "hidden" : (initial as any)}
            animate={animate === "" ? "visible" : (animate as any)}
            transition={transition as any}
            role="img"
            aria-label="Profile image with professional statistics"
            data-testid="profile-visual"
            {...props}
        >
            {/* Profile Image */}
            <motion.div
                className="w-full h-full flex items-center justify-center relative z-10"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
            >
                <Image
                    src={profileImageUrl}
                    alt={profileImageAlt}
                    width={IMAGE_WIDTH}
                    height={IMAGE_HEIGHT}
                    className="profile-visual-image"
                    sizes="(max-width: 1024px) 100vw, 680px"
                    decoding="async"
                    priority
                />
            </motion.div>

            {/* Decorative Avatar Circle */}
            <span
                className="profile-visual-avatar-circle"
                role="presentation"
                aria-hidden="true"
            />

            {/* Decorative Pattern Layers */}
            {patternLayers.map((layer, index) => (
                <DecorativeLayer key={`layer-${index}`} {...layer} />
            ))}

            {/* Statistics Container */}
            <motion.div
                className="profile-visual-stats-container"
                variants={statsVariants}
                initial="hidden"
                animate="visible"
                role="group"
                aria-label="Professional statistics"
                data-testid="profile-stats"
            >
                <ul role="list">
                    {stats.map((stat, index) => (
                        <motion.li
                            key={`stat-${index}`}
                            variants={statItemVariants}
                            role="listitem"
                            data-testid={`stat-${index}`}
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
