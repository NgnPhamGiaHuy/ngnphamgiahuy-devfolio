"use client"

import React from 'react';

import ContentSwiper from "@/components/ui/ContentSwiper";
import BackgroundText from "@/components/ui/BackgroundText";
import SectionWrapper from "@/components/sections/SectionWrapper";

import { data } from "@/data/data";

import QuoteCard from "@/components/ui/cards/QuoteCard";

const Testimonials: React.FC = () => {
    const { testimonials } = data;

    return (
        <SectionWrapper title={"Testimonials"} subtitle={"What Customers Say"} background={"none"} vlinePosition={"right"}>
            <div className={"items-wrapper"}>
                <div className={"items-content-wrapper"}>
                    <ContentSwiper
                        items={testimonials}
                        renderItem={(item, index) => (
                            <QuoteCard key={index} item={item} />
                        )}
                    />
                    <BackgroundText text={"Reviews"} />
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Testimonials;
