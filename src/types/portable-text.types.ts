import type {
    PortableTextBlock,
    PortableTextSpan,
    PortableTextMarkDefinition,
} from "@portabletext/types";

// Custom image value as authored in Sanity portable text
export interface ImageValue {
    _type: "image";
    asset?: { _ref?: string; _type?: string } | null;
    alt?: string | null;
    caption?: string | null;
}

// Custom code block value
export interface CodeValue {
    _type: "code";
    language?: string | null;
    code?: string | null;
}

// Custom categories block value (array of tag strings)
export interface CategoriesBlockValue {
    _type: "categoriesBlock";
    categories?: string[];
}

// Simple table value structure to support Sanity object-based tables
export interface TableRowValue {
    cells?: string[];
}

export interface TableValue {
    _type: "tableBlock";
    headers?: string[];
    rows?: TableRowValue[];
}

// Union of custom blocks we support in addition to default blocks
export type CustomPortableBlock =
    | ImageValue
    | CodeValue
    | CategoriesBlockValue
    | TableValue;

// Use correct generic parameter order: <MarkDefinition, Child>
export type RichTextBlock = PortableTextBlock<
    PortableTextMarkDefinition,
    PortableTextSpan
>;

// Final value type passed to the renderer
export type PortableTextValue = Array<RichTextBlock | CustomPortableBlock>;

export interface BlogPostContentProps {
    value: PortableTextValue;
}
