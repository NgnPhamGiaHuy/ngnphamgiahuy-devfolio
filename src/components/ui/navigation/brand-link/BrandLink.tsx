import Link from "next/link";
import React, { useMemo } from "react";

import type { BrandLinkProps } from "@/types";

const BrandLink: React.FC<BrandLinkProps> = ({ logo, className }) => {
    const logoText = useMemo(() => logo || "Portfolio", [logo]);

    return (
        <div className={`flex-wrapper ${className || ""}`}>
            <Link
                href={"/"}
                aria-label={`Go to homepage (${logoText})`}
                title={logoText}
            >
                <span className={"logo"}>{logoText}</span>
            </Link>
        </div>
    );
};

BrandLink.displayName = "BrandLink";

export default BrandLink;
