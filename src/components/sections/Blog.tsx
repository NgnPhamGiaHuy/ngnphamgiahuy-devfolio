import React, { useMemo } from "react";
import Link from "next/link";

import { data } from "@/data";
import { BlogPost, BlogSectionProps } from "@/types";
import { BlogCard, BackgroundText, Wrapper } from "@/components";

const Blog: React.FC<BlogSectionProps> = ({ blogs, resetAnimationOnView }) => {
    const blogsData: BlogPost[] = useMemo(() => blogs?.length ? blogs : data.blogs, [blogs]);

    return (
        <Wrapper title={"Latest Blog"} subtitle={"My Articles and Advice"} background={"gradientUp"} vlinePosition={"right"} resetAnimationOnView={resetAnimationOnView}>
            <div className={"blog-wrapper"}>
                <div className={"blog-inner"}>
                    <div className={"blog-grid"}>
                        {blogsData.slice(0, 3).map((blog, index) => (
                            <BlogCard key={index} blog={blog} />
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
            <BackgroundText text={"Blog"} />
        </Wrapper>
    );
};

export default Blog;
