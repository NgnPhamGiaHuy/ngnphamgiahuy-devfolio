"use client"

import clsx from "clsx";
import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

import type { SkillCardProps } from "@/types";

const SkillCard: React.FC<SkillCardProps> = ({ item, variants, prefersReducedMotion }) => {
    return (
        <motion.div className={"skill-card"} variants={variants} role={"listitem"}>
            <h6 className={"skill-title"}>
                {item.name}
            </h6>
            <div className={"skill-desc"}>
                <p>{item.description}</p>
            </div>
            <div className={"skill-bars"} aria-hidden={"true"}>
                {Array.from({ length: item.experience_years }).map((_, i, arr) => (
                    <div key={i} className={clsx(i === arr.length - 1 && "h-[4px] top-[-1px] bg-primary!", "skill-bar")}></div>
                ))}
            </div>
            <div className={"skill-badge"}>
                <span className={"skill-badge-inner"}>
                    <CountUp end={item.experience_years} duration={prefersReducedMotion ? 0 : 1.2} enableScrollSpy={true} scrollSpyOnce={true} />
                    <strong className={"text-primary"}>+</strong>&nbsp;
                    <span className={"skill-badge-years"}>Years</span>
                </span>
            </div>
        </motion.div>
    );
};

export default SkillCard;
