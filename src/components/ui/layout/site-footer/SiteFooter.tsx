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
                <div className={"container-1300"}>
                    <div className={"flex-third"}>
                        <div className={"p-[10px] flex-wrapper"}>
                            <SocialLinks links={socialLinks} iconMargin={"mr-[15px]"} iconSize={"size-[22px]"} className={"w-full max-md:text-center"} />
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
