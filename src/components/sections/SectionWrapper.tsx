"use client"

import clsx from "clsx";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

import VLineBlock from "@/components/ui/VLineBlock";
import WrapperHeader from "@/components/sections/wrapper/WrapperHeader";

interface SectionWrapperProps {
    title: string;
    subtitle: string;
    background?: string;
    vlinePosition?: "left" | "right";
    children: React.ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ title = "", subtitle = "", background = "", vlinePosition = "right", children }) => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    };

    const VLineBlockPosition = {
        right: {
            top: "-70px",
            right: "-100px",
            bottom: "-30px",
            left: "auto",
            shadow: "before:shadow-[-5px_-5px_0_rgb(0_0_0/0.2)] after:shadow-[-5px_-5px_0_rgb(0_0_0/0.2)]",
            className: "rotate-180 transform",
        },
        left: {
            top: "-70px",
            right: "auto",
            bottom: "-70px",
            left: "-100px",
            shadow: "before:shadow-[5px_-5px_0_rgb(0_0_0/0.2)] after:shadow-[5px_-5px_0_rgb(0_0_0/0.2)]",
            className: "rotate-180 transform -scale-x-100",
        }
    };

    const vlineProps = VLineBlockPosition[vlinePosition];

    return (
        <section ref={sectionRef} className={clsx(background, "wrapper-section bg-transparent")}>
            <motion.div className={"wrapper-section-container"} initial={"hidden"} animate={isInView ? "visible" : "hidden"} variants={containerVariants}>
                <div className={"wrapper-section-inner"}>
                    <div className={"wrapper-section-content"}>
                        <WrapperHeader title={title} subtitle={subtitle} />
                        <section className={"wrapper-section-body"}>
                            <div className={"wrapper-section-content-container"}>
                                { children }
                                <VLineBlock {...vlineProps} />
                            </div>
                        </section>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default SectionWrapper;