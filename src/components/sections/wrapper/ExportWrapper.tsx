"use client";

import clsx from "clsx";
import { motion, useInView } from "framer-motion";
import React, { useMemo, useRef } from "react";

import type { ExportWrapperProps } from "@/types";

import { WrapperHeader } from "@/components";
import { backgroundByName, containerVariants } from "@/config";

const ExportWrapper: React.FC<ExportWrapperProps> = ({
    id,
    title = "",
    subtitle = "",
    backgroundVariant = "gradientUp",
    contentMaxWidth = "1300px",
    hasBodyPadding = true,
    children,
}) => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const isInView = useInView(sectionRef, {
        once: true,
        amount: 0.1,
    });

    const backgroundClass = useMemo(
        () => backgroundByName[backgroundVariant],
        [backgroundVariant]
    );

    return (
        <section
            id={id}
            ref={sectionRef}
            className={clsx(backgroundClass, "export-wrapper bg-transparent")}
        >
            <motion.div
                className={"container-full"}
                initial={"hidden"}
                animate={isInView ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <div className={"flex-full"}>
                    <div className={"flex-wrap-start"}>
                        <WrapperHeader
                            title={title}
                            subtitle={subtitle}
                            isInView={isInView}
                        />
                        <section
                            className={clsx(
                                hasBodyPadding &&
                                    "max-md:px-[10px] max-lg:px-[20px]",
                                "w-full relative"
                            )}
                        >
                            <div
                                className={"container-full"}
                                style={{ maxWidth: contentMaxWidth }}
                            >
                                {children}
                            </div>
                        </section>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

ExportWrapper.displayName = "ExportWrapper";

export default ExportWrapper;
