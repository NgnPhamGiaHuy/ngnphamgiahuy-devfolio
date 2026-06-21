import React from "react";
import ProjectEditor from "@/components/admin/editors/ProjectEditor";

interface Props {
    params: Promise<{ id: string }>;
}

const AdminProjectDetailPage: React.FC<Props> = async ({ params }) => {
    const { id } = await params;
    return <ProjectEditor docId={id} />;
};

export default AdminProjectDetailPage;
