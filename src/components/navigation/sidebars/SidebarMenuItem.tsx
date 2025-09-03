import Link from "next/link";
import React, { useCallback, memo } from "react";

interface SidebarMenuItemProps {
    text: string;
    index: number;
    sidebarEntered: boolean;
    prefersReducedMotion: boolean;
    href?: string;
    onClick?: () => void;
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = memo(({ text, index, sidebarEntered, prefersReducedMotion, href = "/", onClick }) => {
    const itemClasses = `sidebar-menu-item ${sidebarEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2" }`;

    const itemStyle = {
        transitionDelay: prefersReducedMotion ? "0ms" : `${index * 90}ms`,
    };

    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onClick?.();
        }
    }, [onClick]);

    const renderMenuItem = () => (
        <span className={"sidebar-menu-text group"}>
            { text.split("").map((letter, letterIndex) => (
                <span
                    key={letterIndex}
                    className={"sidebar-menu-letter"}
                    style={{ transitionDelay: `${letterIndex * 25}ms` }}
                >
                    { letter }
                </span>
            )) }
        </span>
    );

    return (
        <li className={itemClasses} style={itemStyle} role={"menuitem"}>
            { onClick ? (
                <button
                    onClick={onClick}
                    onKeyDown={handleKeyDown}
                    className={"w-full text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"}
                    aria-label={`Navigate to ${text} section`}
                    tabIndex={sidebarEntered ? 0 : -1}
                >
                    { renderMenuItem() }
                </button>
            ) : (
                <Link
                    href={href}
                    className={"focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"}
                    aria-label={`Navigate to ${text} section`}
                    tabIndex={sidebarEntered ? 0 : -1}
                >
                    { renderMenuItem() }
                </Link>
            ) }
        </li>
    );
});

SidebarMenuItem.displayName = "SidebarMenuItem";

export default SidebarMenuItem;
