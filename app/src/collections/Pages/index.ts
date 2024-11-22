import { CollectionConfig } from "payload";

import { authenticated } from '@/access/authenticated';
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished';

export const Pages: CollectionConfig = {
    slug: "pages",
    access: {
        create: authenticated,
        delete: authenticated,
        read: authenticatedOrPublished,
        update: authenticated,
      },
    admin: {
        defaultColumns: ['title', 'slug', 'updatedAt'],
        useAsTitle: 'title',
      },
    labels: {
        singular: "Page",
        plural: "Pages",
    },
    fields: [
        {
            name: "title",
            label: "Title",
            type: "text",
            required: true,
        },
        {
            name: "content",
            label: "Content",
            type: "richText",
            required: true,
        },
    ],
};