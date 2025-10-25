// ============================================================
// Component: Testimonials
// Purpose: Display testimonials section with carousel layout
// ============================================================

"use client";

import React from "react";
import dynamic from "next/dynamic";

import type { Testimonial, TestimonialsSectionProps } from "@/types";

import { Wrapper, BackdropText, TestimonialCard } from "@/components";

// ============================================================
// Dynamic Imports
// ============================================================

const ContentCarousel = dynamic(
    () =>
        import("@/components").then((mod) => ({
            default: mod.ContentCarousel,
        })),
    {
        ssr: false,
        loading: () => (
            <div className="swiper-carousel-outer">
                <div className="swiper-carousel">Loading...</div>
            </div>
        ),
    }
) as React.ComponentType<{
    items: Testimonial[];
    spaceBetween?: number;
    renderItem: (
        item: Testimonial,
        index: number,
        isActive?: boolean
    ) => React.ReactNode;
}>;

// ============================================================
// Component Definition
// ============================================================

/**
 * Testimonials component renders a section displaying customer testimonials.
 * Features carousel layout, smooth animations, and responsive design.
 *
 * @param props - Component props
 * @param props.id - Unique identifier for the section
 * @param props.testimonials - Array of testimonial data
 * @param props.resetAnimationOnView - Whether to reset animations on view
 * @returns Testimonials section component
 */
const Testimonials: React.FC<TestimonialsSectionProps> = ({
    id,
    testimonials,
    resetAnimationOnView,
    verticalRulePosition,
}) => {
    // ============================================================
    // Render
    // ============================================================

    return (
        <Wrapper
            id={id}
            title="Testimonials"
            subtitle="What Customers Say"
            backgroundVariant="none"
            verticalRulePosition={verticalRulePosition}
            resetAnimationOnView={resetAnimationOnView}
        >
            <div className="flex-full">
                <div className="p-[10px] flex-wrap-start">
                    {/* Testimonials Carousel */}
                    <ContentCarousel
                        items={testimonials}
                        spaceBetween={40}
                        renderItem={(testimonial, index) => (
                            <TestimonialCard
                                key={
                                    (testimonial as any)._id ||
                                    `${testimonial.name}-${index}`
                                }
                                item={testimonial}
                                data-testid={`testimonial-card-${index}`}
                            />
                        )}
                    />

                    {/* Decorative backdrop text */}
                    <BackdropText text="Reviews" />
                </div>
            </div>
        </Wrapper>
    );
};

Testimonials.displayName = "Testimonials";

export default Testimonials;
