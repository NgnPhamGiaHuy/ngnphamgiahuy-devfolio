import React from "react";

import type { ExperienceType, ProfileType } from "@/schemas";

import { Section } from "@/components/layouts";

interface NowFocusProps {
    id: string;
    profile: ProfileType;
    experience?: ExperienceType[];
}

/**
 * NowFocus — the live tip of the system. Honest, early-career scope: the
 * current role and what's being built now, not a "production platform" claim.
 */
const NowFocus: React.FC<NowFocusProps> = ({
    id,
    profile,
    experience = [],
}) => {
    const current = experience[0];

    return (
        <Section
            id={id}
            tone="panel"
            eyebrow="Now"
            title="The compiling edge"
            aria-label="Current focus"
        >
            <div className="measure space-y-4 text-[color:var(--graph-muted)] text-lg leading-relaxed">
                {current && (
                    <p>
                        <span className="text-[color:var(--graph-ink)]">
                            {current.title}
                        </span>{" "}
                        — {current.company}
                        {current.year ? ` · ${current.year}` : ""}.
                    </p>
                )}
                <p>
                    Right now I&apos;m building full-stack products end to end —
                    from crawlers and data pipelines to the React and Next.js
                    interfaces on top — and sharpening how I architect systems
                    for scale.
                </p>
                {profile.location && (
                    <p className="font-mono-tnum text-sm">
                        based in {profile.location}
                    </p>
                )}
            </div>
        </Section>
    );
};

NowFocus.displayName = "NowFocus";

export default NowFocus;
