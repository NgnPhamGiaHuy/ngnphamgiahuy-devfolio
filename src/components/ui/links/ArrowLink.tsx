import clsx from "clsx";
import Link from "next/link";
import React, { useMemo } from "react";

import type { ArrowLinkProps } from "@/types";

const ArrowLink: React.FC<ArrowLinkProps> = ({ href, children, className }) => {
    const isExternal = useMemo(() => /^https?:\/\//i.test(href), [href]);
    const labelText = useMemo(
        () => (typeof children === "string" ? children : "Link"),
        [children]
    );

    return (
        <Link
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            aria-label={labelText}
            title={labelText}
        >
            <span className={clsx("arrow-link", className)}>{children}</span>
        </Link>
    );
};

ArrowLink.displayName = "ArrowLink";

export default ArrowLink;
