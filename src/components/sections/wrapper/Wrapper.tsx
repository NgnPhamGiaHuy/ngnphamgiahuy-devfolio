"use client"

import clsx from "clsx";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

import VLineBlock from "@/components/ui/VLineBlock";
import WrapperHeader from "@/components/sections/wrapper/WrapperHeader";

import { SectionWrapperProps } from "@/types";
import { containerVariants, backgroundByName, vlinePositions } from "@/config/sectionWrapper.config";

const Wrapper: React.FC<SectionWrapperProps> = ({ title = "", subtitle = "", background = "gradientUp", sectionContentMaxWidth = "1300px", hasSectionBodyPadding = true, vlinePosition = "right", children }) => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    const vlineProps = vlinePositions[vlinePosition];
    const backgroundClass = backgroundByName[background];

    return (
        <section ref={sectionRef} className={clsx(backgroundClass, "wrapper-section bg-transparent")}>
            <motion.div className={"wrapper-section-container"} initial={"hidden"} animate={isInView ? "visible" : "hidden"} variants={containerVariants}>
                <div className={"wrapper-section-inner"}>
                    <div className={"wrapper-section-content"}>
                        <WrapperHeader title={title} subtitle={subtitle} />
                        <section className={clsx(hasSectionBodyPadding && "max-md:px-[10px] max-lg:px-[20px]", "wrapper-section-body")}>
                            <div className={"wrapper-section-content-container"} style={{ maxWidth: sectionContentMaxWidth }}>
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

export default Wrapper;