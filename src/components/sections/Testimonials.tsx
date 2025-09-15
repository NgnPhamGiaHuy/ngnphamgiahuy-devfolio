"use client"

import React from "react";
import dynamic from "next/dynamic";

import type { Testimonial, TestimonialsSectionProps } from "@/types";

import { Wrapper, BackdropText, TestimonialCard } from "@/components";

const ContentCarousel = dynamic(() => import("@/components").then(mod => ({ default: mod.ContentCarousel })), {
    ssr: false,
    loading: () => <div className="swiper-container-outer"><div className="swiper-container">Loading...</div></div>
}) as React.ComponentType<{ items: Testimonial[]; spaceBetween?: number; renderItem: (item: Testimonial, index: number) => React.ReactNode }>;

const Testimonials: React.FC<TestimonialsSectionProps> = ({ testimonials, resetAnimationOnView }) => {
    return (
        <Wrapper title={"Testimonials"} subtitle={"What Customers Say"} background={"none"} vlinePosition={"right"} resetAnimationOnView={resetAnimationOnView}>
            <div className={"items-wrapper"}>
                <div className={"items-content-wrapper"}>
                    <ContentCarousel
                        items={testimonials}
                        spaceBetween={40}
                        renderItem={(item, index) => (
                            <TestimonialCard key={index} item={item} />
                        )}
                    />
                    <BackdropText text={"Reviews"} />
                </div>
            </div>
        </Wrapper>
    );
};

export default Testimonials;
