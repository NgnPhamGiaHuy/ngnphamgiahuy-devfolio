import Link from "next/link";
import React, { useMemo } from "react";

import type { NavItemProps } from "@/types";

import { SIDEBAR_CONFIG } from "@/config";

const NavItem: React.FC<NavItemProps> = ({ text, index, sidebarEntered }) => {
    const itemClasses = useMemo(
        () =>
            `nav-item ${sidebarEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`,
        [sidebarEntered]
    );

    const itemStyle = useMemo(
        () =>
            ({
                transitionDelay: `${index * SIDEBAR_CONFIG.ANIMATION.ITEM_STAGGER_DELAY}ms`,
            }) as React.CSSProperties,
        [index]
    );

    const { sectionId, href } = useMemo(() => {
        const base = (text || "").toString().toLowerCase().trim();
        const id =
            base.replace(/\s+/g, "-").replace(/[^a-z0-9-_]/g, "") || base || "";
        return { sectionId: id, href: id ? `#${id}` : "#" };
    }, [text]);

    const letters = useMemo(() => Array.from(text), [text]);

    const renderMenuItem = () => (
        <span className={"nav-item-text group"}>
            {letters.map((letter, letterIndex) => (
                <span
                    key={`${sectionId}-${letterIndex}`}
                    className={"nav-item-letter"}
                    style={{
                        transitionDelay: `${letterIndex * SIDEBAR_CONFIG.ANIMATION.LETTER_STAGGER_DELAY}ms`,
                    }}
                >
                    {letter}
                </span>
            ))}
        </span>
    );

    return (
        <li className={itemClasses} style={itemStyle} role={"menuitem"}>
            <Link
                href={href}
                className={"focus:outline-none"}
                aria-label={`Navigate to ${text} section`}
                title={`Navigate to ${text}`}
                tabIndex={sidebarEntered ? 0 : -1}
            >
                {renderMenuItem()}
            </Link>
        </li>
    );
};

NavItem.displayName = "NavItem";

export default NavItem;
