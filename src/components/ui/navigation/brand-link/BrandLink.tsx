import Link from "next/link";
import React, { memo } from "react";

import { HeaderLogoProps } from "@/types";

const BrandLink: React.FC<HeaderLogoProps> = memo(({ logo, className }) => {
    return (
        <div className={`header-content ${className || ""}`}>
            <Link href={"/src/public"}>
                <span className={"header-logo"}>{logo}</span>
            </Link>
        </div>
    );
});

BrandLink.displayName = "BrandLink";

export default BrandLink;