import React from "react";
import Link from "next/link";
import clsx from "clsx";

interface ArrowLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

const ArrowLink: React.FC<ArrowLinkProps> = ({ href, children, className }) => {
    return (
        <Link href={href}>
            <span className={clsx(className && className, "arrow-link")}>{children}</span>
        </Link>
    );
};

export default ArrowLink;


