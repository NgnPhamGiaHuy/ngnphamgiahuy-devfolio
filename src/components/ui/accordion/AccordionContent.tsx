"use client"

import { motion, Variants } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import type { AccordionContentProps } from "@/types";

const AccordionContent: React.FC<AccordionContentProps> = ({ isOpen, subheading, meta, content, panelId, labelledById }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (!contentRef.current) return;

        const element = contentRef.current;

        const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
                if (entry.target instanceof HTMLElement) {
                    const naturalHeight = entry.target.scrollHeight;
                    setHeight(Math.min(naturalHeight, 1000));
                }
            }
        });

        observer.observe(element);

        return () => observer.disconnect();
    }, [subheading, meta, content]);

    const variants: Variants = {
        open: {
            height,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                height: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.25, delay: 0.12 },
                filter: { duration: 0.25, delay: 0.12 }
            }
        },
        closed: {
            height: 1,
            opacity: 0,
            filter: "blur(1px)",
            transition: {
                height: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.2 },
                filter: { duration: 0.2 }
            }
        }
    };

    return (
        <motion.div
            ref={contentRef}
            initial={"closed"}
            animate={isOpen ? "open" : "closed"}
            exit={"closed"}
            variants={variants}
            className={"accordion-content"}
            role={"region"}
            id={panelId}
            aria-labelledby={labelledById}
        >
            <div className={"accordion-content-subheading"}>
                <span>{subheading}</span>
            </div>
            <div className={"accordion-content-meta"}>
                <span>{meta}</span>
            </div>
            <div className={"accordion-content-description"}>
                <p>
                    {content}
                </p>
            </div>
        </motion.div>
    );
};

export default AccordionContent;
