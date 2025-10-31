// ============================================================
// Component: BlogPostContent
// Purpose: Portable Text renderer with custom Sanity block/mark components and
//          Tailwind prose classes for consistent typography.
// ============================================================

// ============================================================
// Imports
// ============================================================
import React from "react";
import Link from "next/link";
import { Quote } from "lucide-react";
import {
    PortableText,
    PortableTextReactComponents,
    type PortableTextBlockComponent,
    type PortableTextMarkComponent,
    type PortableTextListComponent,
} from "@portabletext/react";

import type {
    BlogPostContentProps,
    CategoriesBlockValue,
    CodeValue,
    ImageValue,
    PortableTextValue,
} from "@/types";

import { CodeBlock, ImageBlock, TableBlock } from "@/components";
import {
    blockquoteClass,
    heading,
    inlineCodeClass,
    linkClass,
    listVariants,
    paragraph,
    proseWrapper,
} from "@/components/portable-text";

// ============================================================
// Constants
// ============================================================
const TEST_IDS = {
    root: "blog-post-content",
} as const;

// ============================================================
// Typed Block Components
// ============================================================
// Typed block components to satisfy PortableText typings
const H1: PortableTextBlockComponent = ({ children }) => {
    return <h1 className={heading({ level: "h1" })}>{children}</h1>;
};
const H2: PortableTextBlockComponent = ({ children }) => {
    return <h2 className={heading({ level: "h2" })}>{children}</h2>;
};
const H3: PortableTextBlockComponent = ({ children }) => {
    return <h3 className={heading({ level: "h3" })}>{children}</h3>;
};
const Paragraph: PortableTextBlockComponent = ({ children }) => {
    return <p className={paragraph()}>{children}</p>;
};
const Blockquote: PortableTextBlockComponent = ({ children }) => {
    return (
        <blockquote className={blockquoteClass()}>
            <Quote className="top-0 left-[50px] size-[58px] text-inverse! absolute" />
            {children}
        </blockquote>
    );
};

const BulletList: PortableTextListComponent = ({ children }) => {
    return <ul className={listVariants({ type: "bullet" })}>{children}</ul>;
};
const NumberList: PortableTextListComponent = ({ children }) => {
    return <ol className={listVariants({ type: "number" })}>{children}</ol>;
};

const LinkMark: PortableTextMarkComponent = ({ children, value }) => {
    const href = (value as any)?.href || "#";
    const isExternal = /^https?:\/\//.test(href);
    // Use Next.js Link for internal navigation to enable prefetch and SPA transitions
    if (!isExternal && href.startsWith("/")) {
        return (
            <Link href={href} className={linkClass()}>
                {children}
            </Link>
        );
    }
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass()}
            aria-label={`External link to ${href}`}
        >
            {children}
        </a>
    );
};

const StrongMark: PortableTextMarkComponent = ({ children }) => {
    return <strong className="font-semibold">{children}</strong>;
};
const EmMark: PortableTextMarkComponent = ({ children }) => {
    return <em className="italic">{children}</em>;
};
const InlineCodeMark: PortableTextMarkComponent = ({ children }) => {
    return <code className={inlineCodeClass()}>{children}</code>;
};

// ============================================================
// PortableText Component Map
// ============================================================
const portableComponents: Partial<PortableTextReactComponents> = {
    types: {
        image: ({ value }: { value: ImageValue }) => {
            return <ImageBlock value={value} />;
        },
        code: ({ value }: { value: CodeValue }) => {
            return <CodeBlock value={value} />;
        },
        tableBlock: ({ value }: { value: any }) => {
            return <TableBlock value={value} />;
        },
        table: ({ value }: { value: any }) => {
            return <TableBlock value={value} />;
        },
        categoriesBlock: ({ value }: { value: CategoriesBlockValue }) => {
            return (
                <div className="max-md:mt-[15px] pt-[30px] clear-both leading-[32px] max-md:leading-[30px]">
                    <span className="mt-[10px] mr-[10px] inline-block align-top">
                        Tags:
                    </span>
                    {value.categories?.map((cat) => (
                        <Link
                            href={`/tags/${cat}`}
                            key={cat}
                            className="mt-[10px] max-md:mt-[8px] mr-[10px] max-md:mr-[8px] px-[20px] max-md:px-[12px] py-[8px] text-[14px] inline-block text-inverse font-semibold border border-solid border-primary align-middle leading-none transition-shadow hover:shadow-sm"
                            aria-label={`View posts tagged ${cat}`}
                        >
                            {cat}
                        </Link>
                    ))}
                </div>
            );
        },
    },
    marks: {
        link: LinkMark,
        strong: StrongMark,
        em: EmMark,
        code: InlineCodeMark,
    },
    block: {
        h1: H1,
        h2: H2,
        h3: H3,
        normal: Paragraph,
        blockquote: Blockquote,
    },
    list: {
        bullet: BulletList,
        number: NumberList,
    },
};

// ============================================================
// Component Definition
// ============================================================
/**
 * BlogPostContent renders rich text content using Portable Text with a
 * curated set of blocks and marks for consistent typography and a11y.
 * Designed for SSR safety and predictable styling via Tailwind prose classes.
 *
 * @param props - Component props
 * @param props.value - Portable Text value (blocks array) to render
 * @returns JSX.Element - Rendered component
 */
const BlogPostContent = ({ value }: BlogPostContentProps) => {
    return (
        <div className={proseWrapper()} data-testid={TEST_IDS.root}>
            <PortableText
                value={value as PortableTextValue}
                components={portableComponents}
            />
        </div>
    );
};

// Export
export default BlogPostContent;

// DX: Explicit display name for clearer React DevTools identification
BlogPostContent.displayName = "BlogPostContent";
