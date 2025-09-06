import React from "react";
import Link from "next/link";

import { SocialLinksProps } from "@/types/social.types";

const SocialLinks: React.FC<SocialLinksProps> = ({ links, containerMargin = "m-0", iconSize = "size-5", iconMargin = "m-0", textColor = "text-black", hoverColor = "hover:text-primary", className = "" }) => {
    return (
        <div className={`${containerMargin} social-links-container ${className}`}>
            {links.map((link, index) => (
                <Link key={index} href={link.href}>
                    <span aria-label={link.ariaLabel} className={`${iconMargin} ${textColor} ${hoverColor} social-link-icon`}>
                        {link.icon({ className: iconSize })}
                    </span>
                </Link>
            ))}
        </div>
    );
};

export default SocialLinks;
