"use client"

import clsx from "clsx";
import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

import type { SkillCardProps } from "@/types";

const SkillCard: React.FC<SkillCardProps> = ({ item, variants, prefersReducedMotion }) => {
    return (
        <motion.div className={"mb-[70px] p-[20px] relative"} variants={variants} role={"listitem"}>
            <h6 className={"mx-[30px]! mb-[20px]! text-[21px] max-md:text-[18px] text-inverse! leading-5"}>
                {item.name}
            </h6>
            <div className={"mx-[30px]! mb-[30px]!"}>
                <p>{item.description}</p>
            </div>
            <div className={"flex gap-1"} aria-hidden={"true"}>
                {Array.from({ length: item.experience_years }).map((_, i, arr) => (
                    <div key={i} className={clsx(i === arr.length - 1 && "h-[4px] top-[-1px] bg-primary!", "h-[2px] w-4 bg-inverse rounded relative")}></div>
                ))}
            </div>
            <div className={"top-0 right-[30px] absolute"}>
                <span className={"px-3 py-1 inline-flex items-center text-inverse bg-primary/10 font-bold rounded-full"}>
                    <CountUp end={item.experience_years} duration={prefersReducedMotion ? 0 : 1.2} enableScrollSpy={true} scrollSpyOnce={true} />
                    <strong className={"text-primary"}>+</strong>&nbsp;
                    <span className={"text-primary font-medium"}>Years</span>
                </span>
            </div>
        </motion.div>
    );
};

export default SkillCard;
