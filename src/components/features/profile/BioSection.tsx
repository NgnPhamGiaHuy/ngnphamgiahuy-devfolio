// ============================================================
// Component: BioSection
// Purpose: Personal description and social links with animations
// ============================================================

"use client";

import { motion } from "framer-motion";
import React from "react";

import type { Profile } from "@/types";

import { generateSocialLinks } from "@/utils";
import { HeroAnimationsConfig } from "@/config";
import { useHeroAnimationContext } from "@/components";
import { SocialLinks, AnimatedText } from "@/components";

// ============================================================
// Types
// ============================================================

interface BioSectionProps {
    profile: Profile;
}

// ============================================================
// Component Definition
// ============================================================

/**
 * BioSection component renders personal description and social links.
 * Features animated text and social media links with dynamic stagger timing.
 *
 * @param props - Component props
 * @param props.profile - Profile data object
 * @returns Bio section component
 */
const BioSection: React.FC<BioSectionProps> = ({ profile }) => {
    // ============================================================
    // Animation Context
    // ============================================================

    const { timeline } = useHeroAnimationContext();

    // ============================================================
    // Data Processing
    // ============================================================

    const description =
        profile?.description || "Welcome to my portfolio website";
    const descriptionLength = description.length;

    // Calculate dynamic stagger based on description length
    const dynamicStagger = React.useMemo(
        () => Math.min(0.3, descriptionLength * 0.001),
        [descriptionLength]
    );

    // Generate social links from profile data
    const socialLinks = React.useMemo(() => {
        if (!profile?.social_links) return [];
        return generateSocialLinks(profile.social_links);
    }, [profile?.social_links]);

    // ============================================================
    // Animation Configuration
    // ============================================================

    // Remove unnecessary useMemo - animation variants are static objects
    const containerVariants =
        HeroAnimationsConfig.bioSection.createContainer(dynamicStagger);
    const itemVariants = HeroAnimationsConfig.bioSection.item;
    const socialLinksVariants = HeroAnimationsConfig.bioSection.socialLinks;

    // ============================================================
    // Render
    // ============================================================

    return (
        <motion.div
            className="max-w-[520px] max-xl:max-w-[400px] max-lg:mx-auto py-[40px] text-[18px]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            role="group"
            aria-label="Personal description and social links"
            data-testid="bio-section"
        >
            {/* Description */}
            <motion.div
                variants={itemVariants}
                role="text"
                aria-label="Professional description"
            >
                <p className="opacity-80">
                    <AnimatedText
                        text={description}
                        baseDelay={timeline.description?.sectionDelay || 0}
                    />
                </p>
            </motion.div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
                <motion.div
                    variants={socialLinksVariants}
                    role="navigation"
                    aria-label="Social media links"
                    data-testid="social-links"
                >
                    <SocialLinks
                        links={socialLinks}
                        iconSize="size-6"
                        iconMargin="mr-[15px]"
                        containerMargin="mt-[30px]"
                    />
                </motion.div>
            )}
        </motion.div>
    );
};

BioSection.displayName = "BioSection";

export default BioSection;
