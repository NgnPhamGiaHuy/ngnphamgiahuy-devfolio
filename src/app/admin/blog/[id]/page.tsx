import React from "react";

import BlogEditor from "@/components/admin/editors/BlogEditor";

interface Props {
    params: Promise<{ id: string }>;
}

const AdminBlogDetailPage: React.FC<Props> = async ({ params }) => {
    const { id } = await params;
    return <BlogEditor docId={id} />;
};

export default AdminBlogDetailPage;
