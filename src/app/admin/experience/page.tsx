"use client";

import React from "react";

import ExperienceSchema from "@/schemas/content/experience.schema";
import { CollectionEditor, type FieldDef } from "@/components/admin";

const FIELDS: FieldDef[] = [
    { name: "title", label: "Title" },
    { name: "company", label: "Company" },
    {
        name: "year",
        label: "Year",
        hint: "Type “Present” / “Now” to mark the current role (drives the Now section).",
    },
    { name: "description", label: "Description", kind: "textarea" },
];

const AdminExperiencePage: React.FC = () => (
    <CollectionEditor
        title="Experience"
        description="Roles in the career graph. The current role feeds the Now section."
        collectionName="experience"
        type="experience"
        schema={ExperienceSchema}
        fields={FIELDS}
        titleField="title"
        subtitleField="company"
        newItem={{ title: "", company: "", year: "", description: "" }}
    />
);

export default AdminExperiencePage;
