"use client";

import React from "react";
import { motion } from "framer-motion";

import type { ProfileType } from "@/schemas";

import { HeroAnimationsConfig } from "@/infrastructure/config";
import {
    AnimatedText,
    SocialLinks,
    useHeroAnimationContext,
} from "@/components";
import { generateSocialLinks } from "@/components/ui/social";

interface BioSectionProps {
    profile: ProfileType;
}

const BioSection: React.FC<BioSectionProps> = ({ profile }) => {
    const { timeline } = useHeroAnimationContext();

    const description =
        profile?.description || "Welcome to my portfolio website";
    const descriptionLength = description.length;

    const dynamicStagger = React.useMemo(
        () => Math.min(0.3, descriptionLength * 0.001),
        [descriptionLength]
    );

    const socialLinks = React.useMemo(() => {
        if (!profile?.social_links) return [];
        return generateSocialLinks(profile.social_links);
    }, [profile?.social_links]);

    const containerVariants =
        HeroAnimationsConfig.bioSection.createContainer(dynamicStagger);
    const itemVariants = HeroAnimationsConfig.bioSection.item;
    const socialLinksVariants = HeroAnimationsConfig.bioSection.socialLinks;

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
