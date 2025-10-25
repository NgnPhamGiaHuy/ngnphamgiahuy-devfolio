// ============================================================
// Component: BrandLink
// Purpose: Brand/logo link component for navigation
// ============================================================

import Link from "next/link";
import React from "react";

import type { BrandLinkProps } from "@/types";

// ============================================================
// Component Definition
// ============================================================

/**
 * BrandLink component renders a brand/logo link.
 * Features accessibility, proper link handling, and customizable styling.
 *
 * @param props - Component props
 * @param props.logo - Logo/brand text
 * @param props.className - Additional CSS classes
 * @returns Brand link component
 */
const BrandLink: React.FC<BrandLinkProps> = ({ logo, className, ...props }) => {
    // ============================================================
    // Data Processing
    // ============================================================

    const logoText = logo || "Portfolio";

    // ============================================================
    // Render
    // ============================================================

    return (
        <div
            className={`flex-wrapper ${className || ""}`}
            data-testid="brand-link-container"
            {...props}
        >
            <Link
                href="/"
                aria-label={`Go to homepage (${logoText})`}
                title={logoText}
                prefetch={false}
                data-testid="brand-link"
            >
                <span className="logo" data-testid="brand-link-text">
                    {logoText}
                </span>
            </Link>
        </div>
    );
};

BrandLink.displayName = "BrandLink";

export default BrandLink;
