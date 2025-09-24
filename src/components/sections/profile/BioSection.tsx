"use client"

import { motion } from "framer-motion";
import React, { memo, useMemo } from "react";

import type { Profile } from "@/types";

import { generateSocialLinks } from "@/utils";
import { useHeroAnimationContext } from "@/context";
import { SocialLinks, AnimatedText } from "@/components";
import { HeroAnimationsConfig } from "@/config";

interface BioSectionProps {
    profile: Profile;
}

const BioSection: React.FC<BioSectionProps> = memo(({ profile }) => {
    const { timeline } = useHeroAnimationContext();

    const description = profile?.description || "Welcome to my portfolio website";
    const descriptionLength = description.length;

    const dynamicStagger = useMemo(() =>
        Math.min(0.3, descriptionLength * 0.001),
        [descriptionLength]
    );

    const socialLinks = useMemo(() => {
        if (!profile?.social_links) return [];
        return generateSocialLinks(profile.social_links);
    }, [profile?.social_links]);

    const containerVariants = useMemo(() => HeroAnimationsConfig.bioSection.createContainer(dynamicStagger), [dynamicStagger]);
    const itemVariants = useMemo(() => HeroAnimationsConfig.bioSection.item, []);
    const socialLinksVariants = useMemo(() => HeroAnimationsConfig.bioSection.socialLinks, []);

    return (
        <motion.div
            className={"max-w-[520px] max-xl:max-w-[400px] max-lg:mx-auto py-[40px] text-[18px]"}
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
                <p className={"opacity-80"}>
                    <AnimatedText
                        text={description}
                        baseDelay={timeline.description?.sectionDelay || 0}
                    />
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

BioSection.displayName = "BioSection";

export default BioSection;
