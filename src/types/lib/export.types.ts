export interface ExportOptions {
    includeAssets?: boolean;
    format?: "json" | "ndjson";
    contentTypes?: string[];
    includeMetadata?: boolean;
}

export interface ExportedData {
    metadata?: {
        exportDate: string;
        totalDocuments: number;
        contentTypes: string[];
        version: string;
        failedContentTypes?: string[];
    };
    profile?: any;
    skills?: any[];
    projects?: any[];
    experience?: any[];
    education?: any[];
    services?: any[];
    testimonials?: any[];
    pricing?: any[];
    blogs?: any[];
    certificates?: any[];
    settings?: any;
}

export interface ExportCardData {
    category: string;
    icon: string;
    title: string;
    description: string;
}

export interface ExportValidationOptions {
    contentTypes?: string[];
    includeAssets?: boolean;
    includeMetadata?: boolean;
}

export type ExportContentType =
    | "profile"
    | "skills"
    | "projects"
    | "experience"
    | "education"
    | "services"
    | "testimonials"
    | "pricing"
    | "blogs"
    | "certificates"
    | "settings";

export interface ExportQueries {
    [key: string]: string;
}
