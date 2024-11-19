import type { CollectionConfig } from 'payload'

import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'

export const Pages: CollectionConfig = {
    slug: 'pages',
    fields: [
        {
            name: 'content',
            type: 'richText',
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                    ...defaultFeatures,
                    // The HTMLConverter Feature is the feature which manages the HTML serializers.
                    // If you do not pass any arguments to it, it will use the default serializers.
                    HTMLConverterFeature({}),
                ],
            }),
        },
        lexicalHTML('content', { name: 'content_html' }),
    ],
}