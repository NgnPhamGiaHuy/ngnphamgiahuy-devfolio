import { z } from "zod";
import { faker } from "@faker-js/faker";
import { SanityDocumentSchema, SanityImageSchema } from "@/schemas";

function generateSanityAssetId(): string {
    const id = faker.string.alphanumeric(22); // Sanity uses 22-char alphanumeric IDs
    const width = faker.number.int({ min: 800, max: 2000 });
    const height = faker.number.int({ min: 600, max: 3000 });
    const format = faker.helpers.arrayElement(["jpg", "png", "webp"]);

    return `image-${id}-${width}x${height}-${format}`;
}

export function fakeSanityImage(
    overrides?: Partial<z.infer<typeof SanityImageSchema>>
): z.infer<typeof SanityImageSchema> {
    const image: z.infer<typeof SanityImageSchema> = {
        _type: "image",
        asset: {
            _ref: generateSanityAssetId(),
            _type: "reference",
        },
        ...(faker.datatype.boolean() && { alt: faker.lorem.sentence() }),
        ...(faker.datatype.boolean() && { caption: faker.lorem.sentence() }),
        ...overrides,
    };

    return SanityImageSchema.parse(image);
}

export function fakeSanityDocument(
    type: string,
    overrides?: Partial<z.infer<typeof SanityDocumentSchema>>
): z.infer<typeof SanityDocumentSchema> {
    const document: z.infer<typeof SanityDocumentSchema> = {
        _id: faker.string.uuid(),
        _type: type,
        _createdAt: faker.date.past().toISOString(),
        _updatedAt: faker.date.recent().toISOString(),
        _rev: faker.string.uuid(),
        ...overrides,
    };

    return SanityDocumentSchema.parse(document);
}

export function fakeSanityReference(documentId?: string): {
    _type: "reference";
    _ref: string;
} {
    return {
        _type: "reference",
        _ref: documentId ?? faker.string.uuid(),
    };
}
