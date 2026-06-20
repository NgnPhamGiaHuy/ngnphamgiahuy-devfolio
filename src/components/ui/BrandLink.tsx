// ============================================================
// Component: BrandLink
// Purpose: Brand/logo link component for navigation
// ============================================================

import Link from "next/link";
import React from "react";

import type { BrandLinkProps } from "@/shared/types";

// ============================================================
// Anthropic-style radial spike-mark (brand wordmark prefix)
// ============================================================

const SpikeMark: React.FC = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
        style={{ color: "var(--color-ink)" }}
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
            className={`flex items-center ${className || ""}`}
            data-testid="brand-link-container"
            {...props}
        >
            <Link
                href="/"
                className="flex items-center gap-2"
                aria-label={`Go to homepage (${logoText})`}
                title={logoText}
                prefetch={false}
                data-testid="brand-link"
            >
                <SpikeMark />
                <span className="logo" data-testid="brand-link-text">
                    {logoText}
                </span>
            </Link>
        </div>
    );
};

BrandLink.displayName = "BrandLink";

export default BrandLink;
