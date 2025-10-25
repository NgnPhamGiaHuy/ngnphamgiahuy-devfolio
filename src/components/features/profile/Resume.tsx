// ============================================================
// Component: Resume
// Purpose: Display education and experience in a two-column accordion layout
// ============================================================

import React from "react";

import type {
    Education,
    Experience,
    AccordionFieldMapping,
    ResumeSectionProps,
} from "@/types";

import { Wrapper, Accordion, BackdropText } from "@/components";

// ============================================================
// Constants
// ============================================================

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

// ============================================================
// Component Definition
// ============================================================

/**
 * Resume component renders education and experience in a two-column layout.
 * Features accordion components for expandable content sections.
 *
 * @param props - Component props
 * @param props.id - Unique identifier for the section
 * @param props.experience - Array of experience data
 * @param props.education - Array of education data
 * @param props.resetAnimationOnView - Whether to reset animations on view
 * @returns Resume section component
 */
const Resume: React.FC<ResumeSectionProps> = ({
    id,
    experience,
    education,
    resetAnimationOnView,
    verticalRulePosition,
}) => {
    // ============================================================
    // Render
    // ============================================================

    return (
        <Wrapper
            id={id}
            title="Resume"
            subtitle="My Story"
            backgroundVariant="gradientDown"
            hasBodyPadding={false}
            contentMaxWidth="1360px"
            verticalRulePosition={verticalRulePosition}
            resetAnimationOnView={resetAnimationOnView}
        >
            {/* Education Column */}
            <div className="flex-half">
                <div className="p-[40px] max-md:p-[20px] max-lg:p-[30px] flex-wrap-start">
                    <Accordion
                        items={education}
                        label="Educational Background"
                        fieldMapping={educationFieldMapping}
                        data-testid="education-accordion"
                    />
                </div>
            </div>

            {/* Experience Column */}
            <div className="flex-half">
                <div className="p-[40px] max-md:p-[20px] max-lg:p-[30px] flex-wrap-start">
                    <Accordion
                        items={experience}
                        label="Professional Experience"
                        fieldMapping={experienceFieldMapping}
                        data-testid="experience-accordion"
                    />
                </div>
            </div>

            {/* Decorative backdrop text */}
            <BackdropText text="History" />
        </Wrapper>
    );
};

Resume.displayName = "Resume";

export default Resume;
