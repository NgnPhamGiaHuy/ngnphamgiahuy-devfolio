// ============================================================
// Component: CarouselContainer
// Purpose: Container wrapper for carousel components with animations
// ============================================================

"use client";

import React from "react";
import { motion } from "framer-motion";

import { COMMON_ANIMATIONS } from "@/config";

// ============================================================
// Types
// ============================================================

/**
 * Props for CarouselContainer component
 */
interface CarouselContainerProps {
    children: React.ReactNode;
}

// ============================================================
// Component Definition
// ============================================================

/**
 * CarouselContainer component wraps carousel content with animations.
 * Features fade-in animations, accessibility, and proper structure.
 *
 * @param props - Component props
 * @param props.children - Carousel content to wrap
 * @returns Carousel container component
 */
const CarouselContainer: React.FC<CarouselContainerProps> = ({
    children,
    ...props
}) => {
    // ============================================================
    // Animation Configuration
    // ============================================================

    const containerVariants = COMMON_ANIMATIONS.fadeIn;

    // ============================================================
    // Render
    // ============================================================

    return (
        <motion.div
            className="swiper-carousel-outer"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            role="group"
            aria-label="Carousel container"
            data-testid="carousel-container"
            {...props}
        >
            {children}
        </motion.div>
    );
};

CarouselContainer.displayName = "CarouselContainer";

export default CarouselContainer;
