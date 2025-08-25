"use client"

import React from "react";

import VLineBlock from "@/components/ui/VLineBlock";
import BackgroundText from "@/components/ui/BackgroundText";
import ServicesSwiper from "@/components/sections/services/ServicesSwiper";

import { ServicesProps } from "@/types";

const ServicesContent: React.FC<ServicesProps> = ({ services }) => {
    return (
        <section className={"services-content-section"}>
            <div className={"services-content-container"}>
                <div className={"services-wrapper"}>
                    <div className={"services-content-wrapper"}>
                        <ServicesSwiper services={services} />
                        <BackgroundText text={"Services"} />
                    </div>
                </div>
                <VLineBlock top={"-70px"} right={"-100px"} bottom={"-30px"} left={"auto"} shadow={"before:shadow-[-5px_-5px_0_rgb(0_0_0/0.2)] after:shadow-[-5px_-5px_0_rgb(0_0_0/0.2)]"} className={"rotate-180 transform"} />
            </div>
        </section>
    );
};

export default ServicesContent;
