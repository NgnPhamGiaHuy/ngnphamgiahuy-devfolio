import imageUrlBuilder from "@sanity/image-url";
import { createClient, type SanityClient } from "next-sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
    process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
export const config = {
    projectId,
    dataset,
    apiVersion,
    useCdn: process.env.NODE_ENV === "production",
};

export const sanityClient: SanityClient = createClient(config);

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
    return builder.image(source);
}

export async function sanityFetch<T>({
    query,
    params = {},
    tags = [],
}: {
    query: string;
    params?: Record<string, string | number | boolean | null | undefined>;
    tags?: string[];
}): Promise<T> {
    return sanityClient.fetch<T>(query, params, {
        next: { revalidate: 60, tags },
    });
}
