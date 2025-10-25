// ============================================================
// Component: Contact
// Purpose: Display contact methods and contact form in a two-column layout
// ============================================================

import React from "react";

import type { ContactSectionProps } from "@/types";

import {
    Wrapper,
    BackdropText,
    ContactMethodCard,
    ContactForm,
} from "@/components";

// ============================================================
// Component Definition
// ============================================================

/**
 * Contact component renders a section with contact methods and contact form.
 * Features a two-column layout with contact method cards and a contact form.
 *
 * @param props - Component props
 * @param props.id - Unique identifier for the section
 * @param props.contactItems - Array of contact method data
 * @param props.resetAnimationOnView - Whether to reset animations on view
 * @returns Contact section component
 */
const Contact: React.FC<ContactSectionProps> = ({
    id,
    contactItems,
    resetAnimationOnView,
    verticalRulePosition,
}) => {
    // ============================================================
    // Data Processing
    // ============================================================

    const keyedContacts = contactItems.map((c, index) => ({
        key: (c as any)._id || `${c.type}-${c.value}-${index}`,
        item: c,
    }));

    // ============================================================
    // Render
    // ============================================================

    return (
        <Wrapper
            id={id}
            title="Contact Me"
            subtitle="Let's Talk About Ideas"
            backgroundVariant="gradientDown"
            contentMaxWidth="1180px"
            verticalRulePosition={verticalRulePosition}
            resetAnimationOnView={resetAnimationOnView}
        >
            {/* Contact Methods Column */}
            <div className="flex-2-5">
                <div className="p-[10px] flex-wrap-start">
                    <div
                        className="w-full relative z-2"
                        data-testid="contact-methods"
                        role="list"
                        aria-label="Contact methods"
                    >
                        {keyedContacts.map(({ key, item }) => (
                            <ContactMethodCard
                                key={key}
                                type={item.type}
                                value={item.value}
                                label={item.label}
                                data-testid={`contact-method-${item.type}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Form Column */}
            <div className="flex-3-5">
                <div className="p-[10px] flex-wrap-start">
                    {/* Decorative background element */}
                    <div className="size-[240px] bottom-[-32px] left-[-135px] pat-background"></div>

                    <div
                        className="w-full relative"
                        data-testid="contact-form-container"
                    >
                        <ContactForm />
                    </div>
                </div>
            </div>

            {/* Decorative backdrop text */}
            <BackdropText text="Contact Me" />
        </Wrapper>
    );
};

Contact.displayName = "Contact";

export default Contact;
