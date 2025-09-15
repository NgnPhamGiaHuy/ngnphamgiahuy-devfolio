import React from "react";

import type { Education, Experience, AccordionFieldMapping, ResumeSectionProps } from "@/types";

import { Wrapper, Accordion, BackdropText } from "@/components";

const educationFieldMapping: AccordionFieldMapping<Education> = {
    meta: "year",
    heading: "institution",
    subheading: "degree",
    content: "description"
};

const experienceFieldMapping: AccordionFieldMapping<Experience> = {
    meta: "year",
    heading: "company",
    subheading: "title",
    content: "description"
};

const Resume: React.FC<ResumeSectionProps> = ({ experience, education, resetAnimationOnView }) => {
    return (
        <Wrapper title={"Resume"} subtitle={"My Story"} background={"gradientDown"} hasSectionBodyPadding={false} sectionContentMaxWidth={"1360px"} vlinePosition={"left"} resetAnimationOnView={resetAnimationOnView}>
            <div className={"resume-section-wrapper"}>
                <div className={"resume-content-wrapper"}>
                    <Accordion
                        items={education}
                        label="Educational"
                        fieldMapping={educationFieldMapping}
                    />
                </div>
            </div>
            <div className={"resume-section-wrapper"}>
                <div className={"resume-content-wrapper"}>
                    <Accordion
                        items={experience}
                        label="Experience"
                        fieldMapping={experienceFieldMapping}
                    />
                </div>
            </div>
            <BackdropText text={"History"} />
        </Wrapper>
    );
};

export default Resume;