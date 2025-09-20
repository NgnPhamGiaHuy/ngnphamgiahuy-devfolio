import React from "react";
import Link from "next/link";

import { SocialLinksProps } from "@/types";

const SocialLinks: React.FC<SocialLinksProps> = ({ links, containerMargin = "m-0", iconSize = "size-5", iconMargin = "m-0", textColor = "text-inverse", hoverColor = "hover:text-primary", className = "" }) => {
    return (
        <div className={`${containerMargin} relative z-3 ${className}`}>
            {links.map((link, index) => (
                <Link key={index} href={link.href}>
                    <span aria-label={link.ariaLabel} className={`${iconMargin} ${textColor} ${hoverColor} align-top leading-none transition-all duration-300 inline-block relative`}>
                        {link.icon({ className: iconSize })}
                    </span>
                </Link>
            ))}
        </div>
    );
};

export default SocialLinks;
