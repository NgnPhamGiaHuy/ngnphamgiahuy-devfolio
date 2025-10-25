// ============================================================
// Component: TestimonialCard
// Purpose: Individual testimonial card with image, quote, and author info
// ============================================================

import Image from "next/image";
import React from "react";

import type { TestimonialCardProps } from "@/types";

import { processImage } from "@/utils";

// ============================================================
// Constants
// ============================================================

const IMAGE_WIDTH = 600;
const IMAGE_HEIGHT = 400;
const FALLBACK_IMAGE = "/images/profile2.png";

// ============================================================
// Component Definition
// ============================================================

/**
 * TestimonialCard component renders an individual testimonial.
 * Features customer image, quote, author information, and proper accessibility.
 *
 * @param props - Component props
 * @param props.item - Testimonial data object
 * @returns Testimonial card component
 */
const TestimonialCard: React.FC<TestimonialCardProps> = ({
    item,
    ...props
}) => {
    // ============================================================
    // Data Processing
    // ============================================================

    // Process image data - lightweight operation that doesn't need memoization
    const { url: imageUrl, alt: imageAlt } = processImage(
        item.image,
        {
            width: IMAGE_WIDTH,
            height: IMAGE_HEIGHT,
            fallbackImage: FALLBACK_IMAGE,
        },
        { fallbackAlt: item.name || "testimonial image" }
    );

    // Testimonial metadata with fallback values
    const customerName = item.name || "Anonymous";
    const customerPosition = item.position || "";
    const testimonialQuote = item.quote || "";

    // ============================================================
    // Render
    // ============================================================

    return (
        <article
            className="w-full h-auto flex-center shrink-0 transition-transform transform translate-z-0 backface-hidden box-border relative"
            data-testid="testimonial-card"
            {...props}
        >
            <div className="w-full py-[30px] px-[35px] bg-card-inverse rounded-[18px] overflow-hidden relative">
                {/* Customer Image */}
                <div className="w-full mb-[30px] block relative">
                    <Image
                        src={imageUrl}
                        alt={imageAlt}
                        width={IMAGE_WIDTH}
                        height={IMAGE_HEIGHT}
                        className="max-w-full w-full h-[180px] rounded-[18px] object-center object-cover border-none shadow-none relative"
                        sizes="(max-width: 768px) 100vw, 600px"
                        loading="lazy"
                        decoding="async"
                        fetchPriority="auto"
                    />

                    {/* Quote Icon */}
                    <div className="top-0 left-0 size-[66px] bg-card-inverse rounded-br-[18px] absolute">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 320"
                            className="w-[44px] h-[44px] stroke-black stroke-12 fill-primary"
                            aria-hidden="true"
                        >
                            <path d="M239.64 74.01c-32.16-.89-59.56 23.76-61.9 55.85-2.59 35.43 25.38 64.97 60.26 64.97 0 0 0 15.82-10.97 34.02-5.9 9.79 4.91 21.1 15.04 15.8 30.22-15.81 62.45-48.71 56.36-110.25-3.24-32.64-26.45-59.5-58.79-60.39zm-156.74 0c-32.16-.89-59.56 23.76-61.9 55.85-2.59 35.43 25.38 64.97 60.26 64.97 0 0 0 15.82-10.97 34.02-5.9 9.79 4.91 21.1 15.04 15.8 30.22-15.81 62.45-48.71 56.36-110.25-3.25-32.64-26.45-59.5-58.79-60.39z" />
                        </svg>
                    </div>
                </div>

                {/* Testimonial Quote */}
                <blockquote className="min-h-[110px] opacity-80">
                    <p data-testid="testimonial-quote">{testimonialQuote}</p>
                </blockquote>

                {/* Author Information */}
                <footer className="mt-[30px]">
                    <h3 className="m-0! text-[24px] max-md:text-[18px] text-inverse!">
                        <span data-testid="testimonial-author">
                            {customerName}
                        </span>
                    </h3>
                    <div>
                        <span data-testid="testimonial-position">
                            {customerPosition}
                        </span>
                    </div>
                </footer>

                {/* Decorative Pattern */}
                <div className="card-pattern" aria-hidden="true" />
            </div>
        </article>
    );
};

TestimonialCard.displayName = "TestimonialCard";

export default TestimonialCard;
