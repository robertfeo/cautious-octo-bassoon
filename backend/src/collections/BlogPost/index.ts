import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical';
import type { CollectionConfig } from 'payload';

export const blogPost: CollectionConfig = {
    slug: 'blog-post',
    fields: [
        {
            name: 'content',
            type: 'richText',
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                    ...defaultFeatures,
                    HTMLConverterFeature({}),
                ],
            }),
        },
        lexicalHTML('content', { name: 'content_html' }),
    ],
    endpoints: [
        {
            path: '/content',
            method: 'get',
            handler: async (req) => {
                const data = await req.payload.find({
                    collection: 'blog-post',
                });
                const contentHtml = data.docs[0]?.content_html || '<p>No content found</p>';
                if (contentHtml == null || contentHtml.length === 0) {
                    return new Response(null, {
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                        }
                    });
                } else {
                    return new Response(contentHtml, {
                        headers: {
                            'Content-Type': 'text/html',
                            'Access-Control-Allow-Origin': '*',
                        }
                    });
                }
            },
        },
    ],
};
