// ============================================================
// Component: SkillCard
// Purpose: Individual skill card with experience visualization and animations
// ============================================================

"use client";

import React from "react";
import clsx from "clsx";
import CountUp from "react-countup";
import { motion } from "framer-motion";

import type { SkillCardProps } from "@/types";

import { SKILL_CARD_VARIANTS } from "@/config";

// ============================================================
// Component Definition
// ============================================================

/**
 * SkillCard component renders an individual skill with experience visualization.
 * Features animated counters, progress bars, and proper accessibility.
 *
 * @param props - Component props
 * @param props.item - Skill data object
 * @param props.variants - Animation variants
 * @returns Skill card component
 */
const SkillCard: React.FC<SkillCardProps> = ({ item, variants, ...props }) => {
    // ============================================================
    // Data Processing
    // ============================================================

    const skillName = item.name || "Skill";
    const skillDescription = item.description || "";
    const experienceYears = item.experience_years || 0;

    // ============================================================
    // Render
    // ============================================================

    return (
        <motion.article
            className="mb-[70px] relative"
            variants={variants}
            role="listitem"
            data-testid="skill-card"
            {...props}
        >
            {/* Skill Title */}
            <header>
                <h3 className="mx-[30px]! mb-[20px]! text-[21px] max-md:text-[18px] text-inverse! leading-5">
                    {skillName}
                </h3>
            </header>

            {/* Skill Description */}
            <div className="mx-[30px]! mb-[30px]!">
                <p>{skillDescription}</p>
            </div>

            {/* Experience Progress Bars */}
            <div
                className="flex gap-1"
                aria-hidden="true"
                data-testid="experience-bars"
            >
                {Array.from({ length: experienceYears }).map((_, i, arr) => (
                    <div
                        key={i}
                        className={clsx(
                            i === arr.length - 1 &&
                                "h-[4px] top-[-1px] bg-primary!",
                            "h-[2px] w-4 bg-inverse rounded relative"
                        )}
                        data-testid={`experience-bar-${i}`}
                    />
                ))}
            </div>

            {/* Experience Counter */}
            <div className="top-[-2px] right-[30px] absolute">
                <span
                    className="px-3 py-1 inline-flex items-center text-inverse bg-primary/10 font-bold rounded-full"
                    aria-label={`${experienceYears} years of experience`}
                    data-testid="experience-counter"
                >
                    <CountUp
                        end={experienceYears}
                        duration={1.2}
                        enableScrollSpy={true}
                        scrollSpyOnce={true}
                    />
                    <strong className="text-primary">+</strong>&nbsp;
                    <span className="text-primary font-medium">Years</span>
                </span>
            </div>
        </motion.article>
    );
};

SkillCard.displayName = "SkillCard";

export default SkillCard;
