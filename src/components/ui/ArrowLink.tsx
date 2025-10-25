// ============================================================
// Component: ArrowLink
// Purpose: Link component with arrow styling and external link detection
// ============================================================

import clsx from "clsx";
import Link from "next/link";
import React from "react";

import type { ArrowLinkProps } from "@/types";

// ============================================================
// Component Definition
// ============================================================

/**
 * ArrowLink component renders a link with arrow styling.
 * Features external link detection, accessibility, and proper link handling.
 *
 * @param props - Component props
 * @param props.href - Link destination
 * @param props.children - Link content
 * @param props.className - Additional CSS classes
 * @returns Arrow link component
 */
const ArrowLink: React.FC<ArrowLinkProps> = ({
    href,
    children,
    className,
    ...props
}) => {
    // ============================================================
    // Data Processing
    // ============================================================

    const isExternal = /^https?:\/\//i.test(href);

    const labelText = typeof children === "string" ? children : "Link";

    // ============================================================
    // Render
    // ============================================================

    return (
        <Link
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            aria-label={labelText}
            title={labelText}
            prefetch={false}
            data-testid="arrow-link"
            {...props}
        >
            <span className={clsx("arrow-link", className)}>{children}</span>
        </Link>
    );
};

ArrowLink.displayName = "ArrowLink";

export default ArrowLink;
