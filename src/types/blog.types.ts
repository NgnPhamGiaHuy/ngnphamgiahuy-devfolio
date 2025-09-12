import type { BlogPost } from "./sanity.types";

export interface BlogCardProps {
    blog: BlogPost;
}

export interface BlogSectionProps {
    blogs: BlogPost[];
    resetAnimationOnView?: boolean;
}