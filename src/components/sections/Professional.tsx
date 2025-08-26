"use client"

import React from "react";
import CountUp from "react-countup";

import data from "@/data/data.json";

import SectionWrapper from "@/components/sections/SectionWrapper";

const Professional = () => {
    const { skills } = data;

    return (
        <SectionWrapper title={"Professional Skills"} subtitle={"My Talent"} background={"bg-[linear-gradient(0deg,#fff_0%,#f0ebe3_100%)]"} vlinePosition={"left"}>
            <div className="p-[20px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
                { skills.map((item, index) => (
                    <div key={index} className={"transform translate-x-0 translate-y-0 relative"}>
                        <h6 className="!mx-[30px] !mb-[20px] text-[21px] max-md:text-[18px] leading-5">
                            { item.name }
                        </h6>
                        <div className="!mx-[30px] !mb-[30px]">
                            <p>{ item.description }</p>
                        </div>
                        <div className="flex gap-1">
                            { Array.from({ length: item.experience_years }).map((_, i) => (
                                <div key={i} className="h-[2px] w-4 bg-black rounded"></div>
                            )) }
                        </div>
                        <div className="top-0 right-[30px] absolute">
                            <span className="px-3 py-1 inline-flex items-center text-black bg-primary/10 font-bold rounded-full">
                                <CountUp end={item.experience_years} duration={2.5} />+&nbsp;
                                <span className="text-primary font-medium">Years</span>
                            </span>
                        </div>
                    </div>
                )) }
            </div>
        </SectionWrapper>
    );
};

export default Professional;