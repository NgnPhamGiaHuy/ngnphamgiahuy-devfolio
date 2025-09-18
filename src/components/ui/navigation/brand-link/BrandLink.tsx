import Link from "next/link";
import React, { memo } from "react";

import type { BrandLinkProps } from "@/types";

const BrandLink: React.FC<BrandLinkProps> = memo(({ logo, className }) => {
    return (
        <div className={`flex-container ${className || ""}`}>
            <Link href={"/src/public"}>
                <span className={"logo"}>{logo}</span>
            </Link>
        </div>
    );
});

BrandLink.displayName = "BrandLink";

export default BrandLink;