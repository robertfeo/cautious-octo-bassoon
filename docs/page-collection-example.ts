export const Pages: CollectionConfig = {
    slug: "pages",
    access: {
        create: authenticated,
        delete: authenticated,
        read: authenticatedOrPublished,
        update: authenticated,
    },
    admin: {
        defaultColumns: ["name", "slug", "updatedAt"],
        useAsTitle: "title",
    },
    labels: {
        singular: "Page",
        plural: "Pages",
    },
};
    /* fields: [
        ...slugField(),
        lexicalHTML("content", { name: "pageHtml" }),
        {
            name: "content",
            type: "richText",
            editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                    return [
                        ...rootFeatures,
                        HTMLConverterFeature({}),
                        BlockConverterFeature(),
                        HeadingFeature({
                            enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
                        }),
                        BlocksFeature({
                            blocks: [ImageBlock,
                                HeroBlock,
                                TwoColumnBlock,
                                RecentPostsBlock,
                                CodeBlock,],
                        }),
                        FixedToolbarFeature(),
                        InlineToolbarFeature(),
                        HorizontalRuleFeature(),
                    ];
                },
            }),
            label: false,
            required: false,
        }
    ], 
};*/