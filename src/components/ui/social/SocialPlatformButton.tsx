import React from "react";
import Link from "next/link";

// ============================================================
// Component: SocialPlatformButton
// Purpose: Rounded icon button linking to an external social platform
// ============================================================

// ============================================================
// Constants
// ============================================================
const TEST_IDS = {
    root: "social-platform-button",
} as const;

// ============================================================
// Types
// ============================================================
interface SocialPlatformButtonProps {
    href: string;
    label: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

// ============================================================
// Component Definition
// ============================================================
/**
 * SocialPlatformButton renders an accessible circular icon button that opens
 * the provided social URL in a new tab.
 *
 * @param props - Component props
 * @param props.href - Absolute URL to the social profile
 * @param props.label - Accessible label and tooltip text
 * @param props.Icon - SVG icon component to display
 * @returns JSX.Element - Rendered component
 */
const SocialPlatformButton: React.FC<SocialPlatformButtonProps> = ({
    href,
    label,
    Icon,
}) => {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="size-9 inline-flex items-center justify-center rounded-full border border-border bg-transparent transition-[colors,transform,opacity] duration-300 hover:border-primary! active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 group"
            title={label}
            data-testid={TEST_IDS.root}
        >
            <Icon
                aria-hidden="true"
                className="size-4 text-inverse! transition-colors duration-300 group-hover:text-primary!"
            />
            <span className="sr-only">{label}</span>
        </Link>
    );
};

// ============================================================
// Export
// ============================================================
export default SocialPlatformButton;

// DX: Explicit display name for clearer React DevTools identification
SocialPlatformButton.displayName = "SocialPlatformButton";
