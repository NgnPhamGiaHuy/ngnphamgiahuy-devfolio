"use client";

import React from "react";

import CopyLinkField from "@/components/ui/social/CopyLinkField";
import SocialPlatformButton from "@/components/ui/social/SocialPlatformButton";
import { useShareOrigin, useResolvedShare, useSharePlatforms } from "@/hooks";

// ============================================================
// Component: SocialShare
// Purpose: Share section with platform buttons and copyable URL
// ============================================================

// ============================================================
// Constants
// ============================================================
const TEST_IDS = {
    root: "social-share",
    list: "social-share-list",
    heading: "social-share-heading",
} as const;

// ============================================================
// Types
// ============================================================
interface SocialShareProps {
    url?: string;
    title?: string;
    className?: string;
}

// ============================================================
// Component Definition
// ============================================================
/**
 * SocialShare renders a set of social platform buttons and a copy field
 * for sharing the current or provided URL/title. Client-only by design.
 *
 * @param props - Component props
 * @param props.url - Optional explicit URL to share (defaults to current)
 * @param props.title - Optional title used in share messages
 * @param props.className - Optional wrapper className for layout composition
 * @returns JSX.Element - Rendered component
 */
const SocialShare: React.FC<SocialShareProps> = ({ url, title, className }) => {
    const origin = useShareOrigin();
    const { currentUrl, currentTitle } = useResolvedShare({
        origin,
        url,
        title,
    });
    const platforms = useSharePlatforms(currentUrl, currentTitle);

    return (
        <section className={className} aria-label="Share this page" data-testid={TEST_IDS.root}>
            <div className="flex flex-col items-start gap-4">
                <div>
                    <div className="mb-2 text-sm text-muted-foreground" data-testid={TEST_IDS.heading}>
                        Share
                    </div>
                    <ul className="flex items-center gap-2" aria-label="Share platforms" data-testid={TEST_IDS.list}>
                        {platforms.map(({ id, href, label, Icon }) => (
                            <li key={id}>
                                <SocialPlatformButton
                                    href={href}
                                    label={label}
                                    Icon={Icon}
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                <CopyLinkField url={currentUrl} />
            </div>
        </section>
    );
};

// ============================================================
// Export
// ============================================================
export default SocialShare;
