"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

import type { CarouselContainerProps } from "@/types";

import { COMMON_ANIMATIONS } from "@/config";

const CarouselContainer: React.FC<CarouselContainerProps> = ({ children }) => {
    const containerVariants = useMemo(() => COMMON_ANIMATIONS.fadeIn, []);

    return (
        <motion.div
            className="swiper-carousel-outer"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            role={"group"}
            aria-label={"Carousel container"}
        >
            {children}
        </motion.div>
    );
};

CarouselContainer.displayName = "CarouselContainer";

export default CarouselContainer;
