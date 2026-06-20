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
 * current identity + what's being built now, not a "production platform" claim.
 *
 * Leads with the single coherent identity (profile.job_title) rather than
 * experience[0], because the first experience entry is not guaranteed to be the
 * *current* one (it was surfacing a stale, past intern role as "now"). A genuinely
 * current role only renders when it's explicitly marked `current` in the data.
 */
const NowFocus: React.FC<NowFocusProps> = ({
    id,
    profile,
    experience = [],
}) => {
    const identity = profile.job_title || "Full-Stack & Data Engineer";
    // Only surface a role here if its date string reads as ongoing — never assume
    // experience[0] is present-tense (that was the stale "Front-end Intern,
    // Aug–Nov 2024" bug: a closed range shown as "now").
    const current = experience.find((e) =>
        /present|now|current|ongoing/i.test(e?.year ?? "")
    );

    return (
        <Section
            id={id}
            tone="dark"
            eyebrow="Now"
            title="The compiling edge"
            meta={
                <p className="font-mono-tnum mt-4 text-xs text-graph-muted">
                    HEAD · the latest commit in the history above
                </p>
            }
            aria-label="Current focus"
        >
            <div className="measure space-y-5 text-lg leading-relaxed text-graph-muted">
                <p className="font-mono-tnum flex items-center gap-2.5 text-sm">
                    <span className="status-dot" aria-hidden="true" />
                    available — open to roles &amp; collaboration in systems,
                    data &amp; AI
                </p>
                <p>
                    <span className="text-graph-ink">
                        {identity}
                    </span>
                    {current
                        ? ` — ${current.title} at ${current.company}${current.year ? ` · ${current.year}` : ""}.`
                        : "."}{" "}
                    Right now I&apos;m building systems that move and make sense
                    of data — crawlers and data tools through to the React and
                    Next.js interfaces that read them.
                </p>
                <p className="font-mono-tnum text-sm text-graph-muted">
                    {"// next — going deeper on system design, scalable architecture, and the AI on top"}
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
