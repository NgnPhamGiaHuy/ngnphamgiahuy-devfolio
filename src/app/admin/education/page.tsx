"use client";

import React from "react";

import EducationSchema from "@/schemas/content/education.schema";
import { CollectionEditor, type FieldDef } from "@/components/admin";

const FIELDS: FieldDef[] = [
    { name: "degree", label: "Degree" },
    { name: "institution", label: "Institution" },
    { name: "year", label: "Year", hint: "e.g. 2018 — 2022" },
    { name: "description", label: "Description", kind: "textarea" },
];

const AdminEducationPage: React.FC = () => (
    <CollectionEditor
        title="Education"
        description="The education spine of the career graph."
        collectionName="education"
        type="education"
        schema={EducationSchema}
        fields={FIELDS}
        titleField="degree"
        subtitleField="institution"
        newItem={{ degree: "", institution: "", year: "", description: "" }}
    />
);

export default AdminEducationPage;
