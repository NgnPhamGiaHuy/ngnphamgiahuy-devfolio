import React from "react";
import Link from "next/link";

import type { BlogSectionProps } from "@/types";

import { BlogPreview, BackdropText, Wrapper } from "@/components";

const Blog: React.FC<BlogSectionProps> = ({ blogs, resetAnimationOnView }) => {
    return (
        <Wrapper title={"Latest Blog"} subtitle={"My Articles and Advice"} background={"gradientUp"} vlinePosition={"right"} resetAnimationOnView={resetAnimationOnView}>
            <div className={"blog-wrapper"}>
                <div className={"blog-inner"}>
                    <div className={"blog-grid"}>
                        {blogs.slice(0, 3).map((blog, index) => (
                            <BlogPreview key={index} blog={blog} />
                        ))}
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
            <BackdropText text={"Blog"} />
        </Wrapper>
    );
};

export default Blog;
