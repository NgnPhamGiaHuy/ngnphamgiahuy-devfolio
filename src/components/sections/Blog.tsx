import Link from "next/link";
import React, { useMemo } from "react";

import type { BlogSectionProps } from "@/types";

import { BlogPreview, BackdropText, Wrapper } from "@/components";

const Blog: React.FC<BlogSectionProps> = ({
    id,
    blogs,
    resetAnimationOnView,
}) => {
    const displayedBlogs = useMemo(() => blogs.slice(0, 3), [blogs]);

    return (
        <Wrapper
            id={id}
            title={"Latest Blog"}
            subtitle={"My Articles and Advice"}
            backgroundVariant={"gradientUp"}
            verticalRulePosition={"right"}
            resetAnimationOnView={resetAnimationOnView}
        >
            <div className={"flex-wrap-start"}>
                <div className={"w-full relative"}>
                    <div className={"mt-[-40px] grid-responsive relative"}>
                        {displayedBlogs.map((blog, index) => (
                            <BlogPreview
                                key={
                                    (blog as any)._id ||
                                    `${blog.title}-${blog.date}-${index}`
                                }
                                blog={blog}
                            />
                        ))}
                    </div>
                    <div
                        className={
                            "mt-[70px] max-lg:mt-[50px] text-center relative z-2"
                        }
                    >
                        <Link
                            href={"/"}
                            aria-label={"View all blog posts"}
                            prefetch
                        >
                            <span className={"primary-button"}>View Blog</span>
                        </Link>
                    </div>
                </div>
            </div>
            <BackdropText text={"Blog"} />
        </Wrapper>
    );
};

Blog.displayName = "Blog";

export default Blog;
