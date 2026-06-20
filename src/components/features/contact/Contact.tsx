// ============================================================
// Component: Contact
// Purpose: Contact methods + form, unified onto the COMMIT HISTORY language
// ============================================================

import React from "react";

import type { ContactSectionProps } from "@/shared/types";

import { Section } from "@/components/layouts";
import { ContactForm, ContactMethodCard } from "@/components";

/**
 * Contact — rebuilt onto the shared Section primitive. The old decorated era
 * (Wrapper gradient + BackdropText + dotted .pat-background) is removed so the
 * page reads as one site; the form logic/hooks are untouched.
 */
const Contact: React.FC<ContactSectionProps> = ({ id, contactItems }) => {
    const keyedContacts = contactItems.map((c, index) => ({
        key: (c as any)._id || `${c.type}-${c.value}-${index}`,
        item: c,
    }));

    return (
        <Section
            id={id}
            tone="sunken"
            eyebrow="Contact"
            title="Let's talk"
            intro="Open to roles and collaboration on systems, data, and product engineering."
            aria-label="Contact"
        >
            <div className="grid gap-10 md:grid-cols-[2fr_3fr]">
                <div
                    role="list"
                    aria-label="Contact methods"
                    data-testid="contact-methods"
                    className="space-y-4"
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

                <div
                    className="w-full"
                    data-testid="contact-form-container"
                >
                    <ContactForm />
                </div>
            </div>
        </Section>
    );
};

Contact.displayName = "Contact";

export default Contact;
