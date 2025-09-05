import React from "react";

import { data } from "@/data/data";

import Wrapper from "@/components/sections/wrapper/Wrapper";
import Accordion from "@/components/ui/accordion/Accordion";
import BackgroundText from "@/components/ui/BackgroundText";

type ResumeSectionConfig = {
    label: string;
    items: Array<{ heading: string; subheading: string; meta: string; content: string }>
};

const buildResumeSections = (): ResumeSectionConfig[] => ([
    {
        label: "Educational",
        items: data.resume.education.map(edu => ({
            heading: edu.institution,
            subheading: edu.degree,
            meta: edu.year,
            content: edu.description
        }))
    },
    {
        label: "Experience",
        items: data.resume.experience.map(exp => ({
            heading: exp.company,
            subheading: exp.title,
            meta: exp.year,
            content: exp.description
        }))
    }
]);

interface ResumeProps {
    resetAnimationOnView?: boolean;
}

const Resume: React.FC<ResumeProps> = ({ resetAnimationOnView }) => {
    const sections = buildResumeSections();

    return (
        <Wrapper title={"Resume"} subtitle={"My Story"} background={"gradientDown"} hasSectionBodyPadding={false} sectionContentMaxWidth={"1360px"} vlinePosition={"left"} resetAnimationOnView={resetAnimationOnView}>
            { sections.map((section, idx) => (
                <div key={idx} className={"resume-section-wrapper"}>
                    <div className={"resume-content-wrapper"}>
                        <Accordion items={section.items} label={section.label} />
                    </div>
                </div>
            )) }
            <BackgroundText text={"History"} />
        </Wrapper>
    );
};

export default Resume;