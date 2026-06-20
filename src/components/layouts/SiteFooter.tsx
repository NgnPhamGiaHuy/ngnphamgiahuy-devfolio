import React from "react";

import type { RawSocialLink } from "@/shared/types";

import { SocialLinks } from "@/components";
import { generateSocialLinks } from "@/components/ui/social";

interface SiteFooterProps extends React.HTMLAttributes<HTMLElement> {
    socialLinks: RawSocialLink[];
    /** Brand wordmark — kept in sync with the header so the name reads as one. */
    wordmark?: string;
    /** Full display name for the credit/copyright line. */
    name?: string;
}

/** Anthropic-style radial spike-mark, on-dark (matches the header BrandLink). */
const FooterMark: React.FC = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        style={{ color: "var(--color-on-dark)" }}
    >
        {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x = 12 + Math.sin(angle) * 9;
            const y = 12 - Math.cos(angle) * 9;
            return (
                <line
                    key={i}
                    x1="12"
                    y1="12"
                    x2={x.toFixed(2)}
                    y2={y.toFixed(2)}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            );
        })}
    </svg>
);

const SiteFooter: React.FC<SiteFooterProps> = ({
    socialLinks,
    wordmark = "NgnPhamGiaHuy",
    name = "NgnPhamGiaHuy",
    ...props
}) => {
    const socialLinksData = generateSocialLinks(socialLinks || []);
    const currentYear = new Date().getFullYear();

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
                    <span className="site-footer__wordmark">
                        <FooterMark />
                        {wordmark}
                    </span>
                    {socialLinksData.length > 0 ? (
                        <SocialLinks
                            links={socialLinksData}
                            iconMargin="mr-[18px]"
                            iconSize="size-[20px]"
                            className="site-footer__social"
                        />
                    ) : null}
                </div>

                {/* Colophon — the site is itself a build artifact (honest signal). */}
                <p className="site-footer__colophon" data-testid="footer-colophon">
                    This site is part of the history — built with Next.js,
                    TypeScript &amp; Sanity, and designed &amp; built by {name}.
                </p>

                <div className="site-footer__rule" aria-hidden="true" />

                <div className="site-footer__meta">
                    <p data-testid="copyright-text">
                        © {currentYear} {name}. All rights reserved.
                    </p>
                    <p data-testid="developer-credit" className="font-mono-tnum">
                        {"// the history continues"}
                    </p>
                </div>
            </div>
        </footer>
    );
};

SiteFooter.displayName = "SiteFooter";

export default SiteFooter;
