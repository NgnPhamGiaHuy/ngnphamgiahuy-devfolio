import React from "react";

import type { HomePageData } from "@/types";

import { data as FallbackData } from "@/data";
import { homePageDataQuery, sanityFetch } from "@/lib";
import { normalizeProfileData, normalizeProjectsData } from "@/utils";
import {
    Portfolios,
    ScrollToTopButton,
    SiteFooter,
    SiteHeader,
} from "@/components";

const PortfoliosPage = async () => {
    const data = await sanityFetch<HomePageData>({
        query: homePageDataQuery,
        tags: ["profile", "project", "siteSettings"],
    });

    const profile = normalizeProfileData(data.profile, FallbackData);
    const projects = normalizeProjectsData(data.projects, FallbackData);

    return (
        <div className={"min-h-[50vh] overflow-hidden relative"}>
            <SiteHeader profile={profile} logo={data.siteSettings?.logo} />
            <div className={"pt-[200px] relative"}>
                <Portfolios
                    id={"portfolios"}
                    projects={projects}
                    hideSeeMore={true}
                    backgroundVariant={"none"}
                />
            </div>
            <SiteFooter socialLinks={profile.social_links} />
            <ScrollToTopButton />
        </div>
    );
};

export default PortfoliosPage;
