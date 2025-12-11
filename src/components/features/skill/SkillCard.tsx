"use client";

import clsx from "clsx";
import React from "react";
import CountUp from "react-countup";
import { motion, Variants } from "framer-motion";

import type { SkillType } from "@/schemas";

const SkillCard = ({
    item,
    variants,
    ...props
}: {
    item: SkillType;
    variants: Variants;
}) => {
    const skillName = item.name || "Skill";
    const skillDescription = item.description || "";
    const experienceYears = item.experience_years || 0;

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
