"use client";

// Schema is a non-serializable prop, so this page is a client component.
import React from "react";

import SkillSchema from "@/schemas/content/skill.schema";
import { CollectionEditor, type FieldDef } from "@/components/admin";

const FIELDS: FieldDef[] = [
    { name: "name", label: "Name", hint: "Join key — matched to project technologies[]." },
    { name: "category", label: "Category" },
    { name: "description", label: "Description", kind: "textarea" },
    { name: "experience_years", label: "Years of experience", kind: "number" },
];

const AdminSkillsPage: React.FC = () => (
    <CollectionEditor
        title="Skills"
        description="Each skill is a graph node; its name joins to project technologies[]."
        collectionName="skills"
        type="skill"
        schema={SkillSchema}
        fields={FIELDS}
        titleField="name"
        subtitleField="category"
        newItem={{
            name: "",
            category: "",
            description: "",
            experience_years: 1,
        }}
    />
);

export default AdminSkillsPage;
