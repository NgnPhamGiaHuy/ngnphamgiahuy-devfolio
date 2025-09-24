"use client"

import React from "react";
import dynamic from "next/dynamic";

import type { Testimonial, TestimonialsSectionProps } from "@/types";

import { Wrapper, BackdropText, TestimonialCard } from "@/components";

const ContentCarousel = dynamic(() => import("@/components").then(mod => ({ default: mod.ContentCarousel })), {
    ssr: false,
    loading: () => <div className={"swiper-carousel-outer"}><div className={"swiper-carousel"}>Loading...</div></div>
}) as React.ComponentType<{ items: Testimonial[]; spaceBetween?: number; renderItem: (item: Testimonial, index: number) => React.ReactNode }>;

const Testimonials: React.FC<TestimonialsSectionProps> = ({ id, testimonials, resetAnimationOnView }) => {
    return (
        <Wrapper id={id} title={"Testimonials"} subtitle={"What Customers Say"} backgroundVariant={"none"} verticalRulePosition={"right"} resetAnimationOnView={resetAnimationOnView}>
            <div className={"flex-full"}>
                <div className={"p-[10px] flex-wrap-start"}>
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
