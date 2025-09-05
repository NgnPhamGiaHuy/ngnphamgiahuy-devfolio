"use client"

import React from "react";

import Wrapper from "@/components/sections/wrapper/Wrapper";
import ContentSwiper from "@/components/ui/ContentSwiper";
import BackgroundText from "@/components/ui/BackgroundText";

import { data } from "@/data/data";

import QuoteCard from "@/components/ui/cards/QuoteCard";

interface TestimonialsProps {
    resetAnimationOnView?: boolean;
}

const Testimonials: React.FC<TestimonialsProps> = ({ resetAnimationOnView }) => {
    const { testimonials } = data;

    return (
        <Wrapper title={"Testimonials"} subtitle={"What Customers Say"} background={"none"} vlinePosition={"right"} resetAnimationOnView={resetAnimationOnView}>
            <div className={"items-wrapper"}>
                <div className={"items-content-wrapper"}>
                    <ContentSwiper
                        items={testimonials}
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
