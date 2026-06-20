// ============================================================
// Component: SiteFooter
// Purpose: Main site footer with social links and copyright information
// ============================================================

import React from "react";

import type { RawSocialLink } from "@/shared/types";

import { SocialLinks } from "@/components";
import { generateSocialLinks } from "@/components/ui/social";

// ============================================================
// Component Props
// ============================================================

interface SiteFooterProps extends React.HTMLAttributes<HTMLElement> {
    socialLinks: RawSocialLink[];
}

// ============================================================
// Component Definition
// ============================================================

/**
 * SiteFooter component renders the main site footer.
 * Features social links, copyright information, and proper accessibility.
 *
 * @param props - Component props
 * @param props.socialLinks - Array of social media links
 * @returns Site footer component
 */
const SiteFooter: React.FC<SiteFooterProps> = ({ socialLinks, ...props }) => {
    // ============================================================
    // Data Processing
    // ============================================================

    const socialLinksData = generateSocialLinks(socialLinks || []);

    const currentYear = new Date().getFullYear();

    // ============================================================
    // Render
    // ============================================================

    return (
        <footer
            className="site-footer"
            role="contentinfo"
            aria-label="Site footer"
            data-testid="site-footer"
            {...props}
        >
            <div className="site-footer__inner">
                {/* Brand + social */}
                <div className="site-footer__brand">
                    <span className="site-footer__wordmark">NgnPhamGiaHuy</span>
                    {socialLinksData.length > 0 ? (
                        <SocialLinks
                            links={socialLinksData}
                            iconMargin="mr-[18px]"
                            iconSize="size-[20px]"
                            className="site-footer__social"
                        />
                    ) : null}
                </div>

                {/* Hairline divider */}
                <div className="site-footer__rule" aria-hidden="true" />

                {/* Copyright + credit */}
                <div className="site-footer__meta">
                    <p data-testid="copyright-text">
                        © {currentYear} NgnPhamGiaHuy. All rights reserved.
                    </p>
                    <p data-testid="developer-credit">
                        Designed &amp; built by NgnPhamGiaHuy
                    </p>
                </div>
            </div>
        </footer>
    );
};

SiteFooter.displayName = "SiteFooter";

export default SiteFooter;
