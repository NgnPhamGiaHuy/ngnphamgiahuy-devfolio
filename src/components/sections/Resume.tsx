import React from "react";

import { data } from "@/data/data";
import Accordion from "@/components/ui/accordion/Accordion";
import BackgroundText from "@/components/ui/BackgroundText";
import SectionWrapper from "@/components/sections/SectionWrapper";

const Resume = () => {
    return (
        <SectionWrapper title={"Resume"} subtitle={"My Story"} background={"gradientDown"} hasSectionBodyPadding={false} sectionContentMaxWidth={"1360px"} vlinePosition={"left"}>
            <div className={"resume-section-wrapper"}>
                <div className={"resume-content-wrapper"}>
                    <Accordion
                        items={data.resume.education.map(edu => ({
                            heading: edu.institution,
                            subheading: edu.degree,
                            meta: edu.year,
                            content: edu.description
                        }))}
                        label={"Educational"}
                    />
                </div>
            </div>
            <div className={"resume-section-wrapper"}>
                <div className={"resume-content-wrapper"}>
                    <Accordion
                        items={data.resume.experience.map(exp => ({
                            heading: exp.company,
                            subheading: exp.title,
                            meta: exp.year,
                            content: exp.description
                        }))}
                        label={"Experience"}
                    />
                </div>
            </div>
            <BackgroundText text={"History"} />
        </SectionWrapper>
    );
};

export default Resume;