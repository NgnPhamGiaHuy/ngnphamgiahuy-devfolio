import React from "react";

import { data } from "@/data";
import { SocialLinks } from "@/components";
import { generateSocialLinks } from "@/utils";

const SiteFooter: React.FC = () => {
    const { profile } = data;

    const socialLinks = generateSocialLinks(profile.social_links);

    return (
        <footer className={"m-0 p-0 max-lg:px-[30px] border-t border-solid border-white/10"}>
            <section className={"py-[60px] relative"}>
                <div className={"max-w-[1300px] mx-auto flex flex-wrap relative"}>
                    <div className={"w-full md:w-1/3 min-h-[1px] relative"}>
                        <div className={"w-full p-[10px] flex flex-wrap items-center content-center relative"}>
                            <SocialLinks links={socialLinks} iconMargin={"mr-[15px]"} iconSize={"size-[22px]"} className={"w-full max-md:text-center"} />
                        </div>
                    </div>
                    <div className={"w-full md:w-1/3 min-h-[1px] relative"}>
                        <div className={"w-full p-[10px] flex flex-wrap items-center content-center justify-center relative"}>
                            <div className={"w-full text-center relative"}>
                                <div className={"text-[13px] font-bold uppercase tracking-wider relative"}>
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
                    <div className={"w-full md:w-1/3 min-h-[1px] relative"}>
                        <div className={"w-full p-[10px] flex flex-wrap items-center content-center justify-center relative"}>
                            <div className={"w-full text-center relative"}>
                                <div className={"text-[13px] font-bold uppercase tracking-wider relative"}>
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
