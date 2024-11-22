import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import {
    BlocksFeature,
    FixedToolbarFeature,
    HeadingFeature,
    HorizontalRuleFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
    slug: 'posts',
    access: {
        create: authenticated,
        read: anyone,
        update: authenticated,
        delete: authenticated,
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'updatedAt'],
    },
    fields: [
        /* ...slugField(), */
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
        },
        {
            name: 'likes',
            label: 'Likes',
            type: 'number',
            admin: {
                position: 'sidebar',
            },
        },
        {
            type: 'tabs',
            tabs: [
                {
                    fields: [
                        {
                            name: 'content',
                            type: 'richText',
                            editor: lexicalEditor({
                                features: ({ rootFeatures }) => {
                                    return [
                                        ...rootFeatures,
                                        HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                                        BlocksFeature({ blocks: [MediaBlock] }),
                                        FixedToolbarFeature(),
                                        InlineToolbarFeature(),
                                        HorizontalRuleFeature(),
                                    ]
                                },
                            }),
                            label: false,
                            required: true,
                        },
                    ],
                    label: 'Content',
                },
                {
                    fields: [
                        {
                            name: 'relatedPosts',
                            type: 'relationship',
                            admin: {
                                position: 'sidebar',
                            },
                            filterOptions: ({ id }) => {
                                return {
                                    id: {
                                        not_in: [id],
                                    },
                                }
                            },
                            hasMany: true,
                            relationTo: 'posts',
                        },
                        {
                            name: 'categories',
                            type: 'relationship',
                            admin: {
                                position: 'sidebar',
                            },
                            hasMany: true,
                            relationTo: 'categories',
                        },
                    ],
                    label: 'Meta',
                },
            ],
        }
    ],
}