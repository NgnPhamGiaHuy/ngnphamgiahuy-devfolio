import { z } from "zod";
import { faker } from "@faker-js/faker";

import BlogPostSchema from "@/schemas/content/blog-post.schema";
import { fakeSanityImage } from "@/infrastructure/persistence/mocks/factories/sanity";

type Blog = z.infer<typeof BlogPostSchema>;

const createBlogPost = (): Blog => {
    const data = {
        _id: faker.string.uuid(),
        _type: "blogPost",
        _createdAt: new Date().toISOString(),
        _updatedAt: new Date().toISOString(),
        _rev: faker.string.uuid(),

        title: faker.lorem.sentences(),

        date: faker.date.past().toISOString(),

        excerpt: faker.lorem.paragraph(),

        slug: {
            _type: "slug",
            current: faker.helpers.slugify(faker.lorem.words(3)),
        },

        image: faker.datatype.boolean() ? fakeSanityImage() : faker.image.url(),

        content: faker.helpers.arrayElements(
            [
                {
                    _type: "block",
                    children: [{ text: faker.lorem.paragraph() }],
                },
                { _type: "image", asset: { _ref: faker.string.uuid() } },
                faker.lorem.paragraph(),
            ],
            2
        ),

        categories: faker.helpers.arrayElements(
            ["tech", "javascript", "frontend", "backend", "design"],
            faker.number.int({ min: 1, max: 3 })
        ),

        author: faker.person.fullName(),
    };

    return BlogPostSchema.parse(data);
};

export default createBlogPost;
