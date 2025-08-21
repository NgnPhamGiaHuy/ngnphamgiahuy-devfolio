import React from "react";
import Link from "next/link";
import { MusicalNoteIcon } from "@heroicons/react/24/outline";

const MenuSocialLinks: React.FC = () => {
    return (
        <div className={"ml-[130px] relative z-3"}>
            <Link href={"/"}>
                <span className={"mr-[14px] text-black hover:text-primary align-top leading-none transition-all duration-300 relative"}>
                    <MusicalNoteIcon className={"w-5 h-5"} />
                </span>
            </Link>
        </div>
    );
};

export default MenuSocialLinks;
