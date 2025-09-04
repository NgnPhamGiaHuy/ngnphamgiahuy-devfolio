import React from "react";
import Link from "next/link";

import { data } from "@/data/data";

import BlogCard from "@/components/ui/cards/BlogCard";
import BackgroundText from "@/components/ui/BackgroundText";
import Wrapper from "@/components/sections/wrapper/Wrapper";

const Blog = () => {
    const { blogs } = data;

    return (
        <Wrapper title={"Latest Blog"} subtitle={"My Articles and Advice"} background={"gradientUp"} vlinePosition={"right"}>
            <div className={"blog-wrapper"}>
                <div className={"blog-inner"}>
                    <div className={"blog-grid"}>
                        { blogs.slice(0, 3).map((blog, index) => (
                            <BlogCard key={index} blog={blog} />
                        )) }
                    </div>
                    <div className={"blog-cta-container"}>
                        <Link href={"/"}>
                            <span className={"primary-button"}>
                                View Blog
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            <BackgroundText text={"Blog"} />
        </Wrapper>
    );
};

export default Blog;
