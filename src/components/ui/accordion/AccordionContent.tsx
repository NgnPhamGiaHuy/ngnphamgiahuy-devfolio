"use client"

import { motion, Variants } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import { AccordionContentProps } from "@/types";

const AccordionContent: React.FC<AccordionContentProps> = ({ isOpen, subheading, meta, content }) => {
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
            transition: {
                height: { duration: 0.4, ease: [0.3, 0, 0.3, 1] as any },
                opacity: { duration: 0.3, delay: 0.15 }
            }
        },
        closed: {
            height: 1,
            opacity: 0,
            transition: {
                height: { duration: 0.4, ease: [0.3, 0, 0.3, 1] as any },
                opacity: { duration: 0.2 }
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
