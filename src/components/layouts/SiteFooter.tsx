// ============================================================
// Component: SiteFooter
// Purpose: Main site footer with social links and copyright information
// ============================================================

import React from "react";

import type { RawSocialLink } from "@/types";

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
            className="m-0 p-0 max-lg:px-[30px] border-t border-solid border-inverse/10"
            role="contentinfo"
            aria-label="Site footer"
            data-testid="site-footer"
            {...props}
        >
            <section className="py-[60px] relative">
                <div className="container-1300">
                    <div className="flex-third">
                        {/* Social Links Section */}
                        <div className="p-[10px] flex-wrapper">
                            {socialLinksData.length > 0 ? (
                                <SocialLinks
                                    links={socialLinksData}
                                    iconMargin="mr-[15px]"
                                    iconSize="size-[22px]"
                                    className="w-full max-md:text-center"
                                />
                            ) : null}
                        </div>
                    </div>

                    {/* Copyright Section */}
                    <div className="flex-third">
                        <div className="p-[10px] flex-wrapper">
                            <div className="w-full text-center relative">
                                <div className="caption-text">
                                    <p data-testid="copyright-text">
                                        © {currentYear}&nbsp;
                                        <strong className="text-primary">
                                            NgnPhamGiaHuy
                                        </strong>
                                        . All rights reserved
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Developer Credit Section */}
                    <div className="flex-third">
                        <div className="p-[10px] flex-wrapper">
                            <div className="w-full text-center relative">
                                <div className="caption-text">
                                    <p data-testid="developer-credit">
                                        Developed by&nbsp;
                                        <strong className="text-primary">
                                            NgnPhamGiaHuy
                                        </strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    );
};

SiteFooter.displayName = "SiteFooter";

export default SiteFooter;
