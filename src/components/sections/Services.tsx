"use client"

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

import data from "@/data/data.json";

import ServicesHeader from "@/components/sections/services/ServicesHeader";
import ServicesContent from "@/components/sections/services/ServicesContent";

const Services = () => {
    const { services } = data;

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

    return (
        <section ref={sectionRef} className={"services-section bg-transparent bg-[linear-gradient(rgb(255,255,255)_0%_0%,rgb(240,235,227)_100%)]"}>
            <motion.div className={"services-container"} initial={"hidden"} animate={isInView ? "visible" : "hidden"} variants={containerVariants}>
                <div className={"services-wrapper"}>
                    <div className={"services-content-wrapper"}>
                        <ServicesHeader />
                        <ServicesContent services={services} />
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Services;
