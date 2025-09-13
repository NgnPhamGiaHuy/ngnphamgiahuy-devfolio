"use client"

import React, { useMemo } from "react";

import { data } from "@/data";
import { Testimonial } from "@/types";
import { Wrapper, BackgroundText, QuoteCard } from "@/components";
import dynamic from "next/dynamic";

const ContentSwiper = dynamic(() => import("@/components").then(mod => ({ default: mod.ContentSwiper })), {
    ssr: false,
    loading: () => <div className="swiper-container-outer"><div className="swiper-container">Loading...</div></div>
}) as React.ComponentType<{ items: Testimonial[]; spaceBetween?: number; renderItem: (item: Testimonial, index: number) => React.ReactNode }>;

interface TestimonialsProps {
    testimonials: Testimonial[];
    resetAnimationOnView?: boolean;
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials, resetAnimationOnView }) => {
    const testimonialsData = useMemo(() => testimonials?.length ? testimonials : data.testimonials, [testimonials]);

    return (
        <Wrapper title={"Testimonials"} subtitle={"What Customers Say"} background={"none"} vlinePosition={"right"} resetAnimationOnView={resetAnimationOnView}>
            <div className={"items-wrapper"}>
                <div className={"items-content-wrapper"}>
                    <ContentSwiper
                        items={testimonialsData}
                        spaceBetween={40}
                        renderItem={(item, index) => (
                            <QuoteCard key={index} item={item} />
                        )}
                    />
                    <BackgroundText text={"Reviews"} />
                </div>
            </div>
        </Wrapper>
    );
};

export default Testimonials;
