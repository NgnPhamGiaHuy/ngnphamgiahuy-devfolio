"use client"

import React from "react";
import { motion } from "framer-motion";

import { data } from "@/data/data";
import { StandardAnimations } from "@/config/animation.config";

import Wrapper from "@/components/sections/wrapper/Wrapper";
import SkillCard from "@/components/ui/cards/SkillCard";
import BackgroundText from "@/components/ui/BackgroundText";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

interface SkillsProps {
    resetAnimationOnView?: boolean;
}

const Skills: React.FC<SkillsProps> = ({ resetAnimationOnView }) => {
    const { skills } = data;
    const prefersReducedMotion = usePrefersReducedMotion();

    const itemVariants = StandardAnimations.springUp(prefersReducedMotion, 30);
    const containerVariants = StandardAnimations.fadeInUp(prefersReducedMotion, 15);

    return (
        <Wrapper title={"Professional Skills"} subtitle={"My Talent"} background={"none"} hasSectionBodyPadding={false} sectionContentMaxWidth={"1320px"} vlinePosition={"left"} resetAnimationOnView={resetAnimationOnView}>
            <motion.div
                className={"skills-grid"}
                variants={containerVariants}
                initial={"hidden"}
                whileInView={"visible"}
                viewport={{ once: true, amount: 0.15 }}
                role={"list"}
                aria-label={"List of professional skills"}
            >
                { skills.map((item, index) => (
                    <SkillCard key={index} item={item} variants={itemVariants} prefersReducedMotion={prefersReducedMotion} />
                )) }
            </motion.div>
            <BackgroundText text={"Skills"} />
        </Wrapper>
    );
};

export default Skills;