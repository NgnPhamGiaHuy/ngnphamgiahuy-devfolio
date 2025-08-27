"use client"

import React from "react";

import { data } from "@/data/data";

import SectionWrapper from "@/components/sections/SectionWrapper";
import ContentSwiper from "@/components/ui/ContentSwiper";
import BackgroundText from "@/components/ui/BackgroundText";
import ContentCard from "@/components/ui/cards/ContentCard";

const Services = () => {
    const { services } = data;

    return (
        <SectionWrapper title={"What I Do"} subtitle={"My Services"} background={"gradientDown"} vlinePosition={"right"}>
            <div className={"items-wrapper"}>
                <div className={"items-content-wrapper"}>
                    <ContentSwiper
                        items={services}
                        renderItem={(item, index) => (
                            <ContentCard item={item} index={index} />
                        )}
                    />
                    <BackgroundText text={"Services"} />
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Services;
