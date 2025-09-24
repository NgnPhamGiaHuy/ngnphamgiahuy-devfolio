import React from "react";

import type { RawSocialLink } from "@/types";

import { SocialLinks } from "@/components";
import { generateSocialLinks } from "@/utils";

interface SiteFooterProps {
    socialLinks: RawSocialLink[];
}

const SiteFooter: React.FC<SiteFooterProps> = ({ socialLinks }) => {
    const socialLinksData = generateSocialLinks(socialLinks);

    return (
        <footer className={"m-0 p-0 max-lg:px-[30px] border-t border-solid border-inverse/10"}>
            <section className={"py-[60px] relative"}>
                <div className={"container-1300"}>
                    <div className={"flex-third"}>
                        <div className={"p-[10px] flex-wrapper"}>
                            <SocialLinks links={socialLinksData} iconMargin={"mr-[15px]"} iconSize={"size-[22px]"} className={"w-full max-md:text-center"} />
                        </div>
                    </div>
                    <div className={"flex-third"}>
                        <div className={"p-[10px] flex-wrapper"}>
                            <div className={"w-full text-center relative"}>
                                <div className={"caption-text"}>
                                    <p>
                                        © 2025&nbsp;
                                        <strong className={"text-primary"}>
                                            NgnPhamGiaHuy
                                        </strong>
                                        . All rights reserved
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"flex-third"}>
                        <div className={"p-[10px] flex-wrapper"}>
                            <div className={"w-full text-center relative"}>
                                <div className={"caption-text"}>
                                    <p>
                                        Developed by&nbsp;
                                        <strong className={"text-primary"}>
                                            NgnPhamGiaHuy
                                        </strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    );
};

export default SiteFooter;