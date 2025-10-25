// ============================================================
// Component: Skills
// Purpose: Display professional skills section with grid layout and animations
// ============================================================

"use client";

import React from "react";
import { motion } from "framer-motion";

import type { SkillsSectionProps } from "@/types";

import { StandardAnimations } from "@/config";
import { Wrapper, SkillCard, BackdropText } from "@/components";

// ============================================================
// Component Definition
// ============================================================

/**
 * Skills component renders a section displaying professional skills.
 * Features responsive grid layout, smooth animations, and proper accessibility.
 *
 * @param props - Component props
 * @param props.id - Unique identifier for the section
 * @param props.skills - Array of skill data
 * @param props.resetAnimationOnView - Whether to reset animations on view
 * @returns Skills section component
 */
const Skills: React.FC<SkillsSectionProps> = ({
    id,
    skills,
    resetAnimationOnView,
    verticalRulePosition,
}) => {
    // ============================================================
    // Animation Configuration
    // ============================================================

    // Remove unnecessary useMemo - animation variants are static objects
    const itemVariants = StandardAnimations.springUp(30);
    const containerVariants = StandardAnimations.fadeInUp(15);

    // ============================================================
    // Render
    // ============================================================

    return (
        <Wrapper
            id={id}
            title="Professional Skills"
            subtitle="My Talent"
            backgroundVariant="none"
            hasBodyPadding={false}
            contentMaxWidth="1320px"
            verticalRulePosition={verticalRulePosition}
            resetAnimationOnView={resetAnimationOnView}
        >
            <motion.div
                className="max-md:p-[20px] max-lg:p-[30px] p-[20px] grid-responsive"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                role="list"
                aria-label="List of professional skills"
                data-testid="skills-container"
            >
                {skills.map((item, index) => (
                    <SkillCard
                        key={(item as any)._id || `${item.name}-${index}`}
                        item={item}
                        variants={itemVariants}
                        data-testid={`skill-card-${index}`}
                    />
                ))}
            </motion.div>

            {/* Decorative backdrop text */}
            <BackdropText text="Skills" />
        </Wrapper>
    );
};

Skills.displayName = "Skills";

export default Skills;
