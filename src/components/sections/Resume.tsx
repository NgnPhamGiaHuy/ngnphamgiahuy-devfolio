import React from "react";

import type {
    Education,
    Experience,
    AccordionFieldMapping,
    ResumeSectionProps,
} from "@/types";

import { Wrapper, Accordion, BackdropText } from "@/components";

const educationFieldMapping: AccordionFieldMapping<Education> = {
    meta: "year",
    heading: "institution",
    subheading: "degree",
    content: "description",
};

const experienceFieldMapping: AccordionFieldMapping<Experience> = {
    meta: "year",
    heading: "company",
    subheading: "title",
    content: "description",
};

const Resume: React.FC<ResumeSectionProps> = ({
    id,
    experience,
    education,
    resetAnimationOnView,
}) => {
    return (
        <Wrapper
            id={id}
            title={"Resume"}
            subtitle={"My Story"}
            backgroundVariant={"gradientDown"}
            hasBodyPadding={false}
            contentMaxWidth={"1360px"}
            verticalRulePosition={"left"}
            resetAnimationOnView={resetAnimationOnView}
        >
            <div className={"flex-half"}>
                <div
                    className={
                        "p-[40px] max-md:p-[20px] max-lg:p-[30px] flex-wrap-start"
                    }
                >
                    <Accordion
                        items={education}
                        label={"Educational"}
                        fieldMapping={educationFieldMapping}
                    />
                </div>
            </div>
            <div className={"flex-half"}>
                <div
                    className={
                        "p-[40px] max-md:p-[20px] max-lg:p-[30px] flex-wrap-start"
                    }
                >
                    <Accordion
                        items={experience}
                        label={"Experience"}
                        fieldMapping={experienceFieldMapping}
                    />
                </div>
            </div>
            <BackdropText text={"History"} />
        </Wrapper>
    );
};

export default Resume;
