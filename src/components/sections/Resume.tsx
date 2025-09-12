import React, { useMemo } from "react";

import { data } from "@/data";
import { Wrapper, Accordion, BackgroundText } from "@/components";
import { Education, Experience, AccordionFieldMapping } from "@/types";

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

interface ResumeProps {
    experience: Experience[];
    education: Education[];
    resetAnimationOnView?: boolean;
}

const Resume: React.FC<ResumeProps> = ({ experience, education, resetAnimationOnView }) => {
    const educationData = useMemo(() => education?.length ? education : data.education, [education]);
    const experienceData = useMemo(() => experience?.length ? experience : data.experience, [experience]);

    return (
        <Wrapper title={"Resume"} subtitle={"My Story"} background={"gradientDown"} hasSectionBodyPadding={false} sectionContentMaxWidth={"1360px"} vlinePosition={"left"} resetAnimationOnView={resetAnimationOnView}>
            <div className={"resume-section-wrapper"}>
                <div className={"resume-content-wrapper"}>
                    <Accordion
                        items={educationData}
                        label="Educational"
                        fieldMapping={educationFieldMapping}
                    />
                </div>
            </div>
            <div className={"resume-section-wrapper"}>
                <div className={"resume-content-wrapper"}>
                    <Accordion
                        items={experienceData}
                        label="Experience"
                        fieldMapping={experienceFieldMapping}
                    />
                </div>
            </div>
            <BackgroundText text={"History"} />
        </Wrapper>
    );
};

export default Resume;