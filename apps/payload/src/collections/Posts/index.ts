import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";
import { CodeBlock } from "@/blocks/CodeBlock/config";
import { formatSlug } from "@/utils/formatSlug";
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  HTMLConverterFeature,
  InlineToolbarFeature,
  lexicalEditor,
  lexicalHTML,
} from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
  },
  fields: [
    {
      name: "slug",
      label: "Slug",
      type: "text",
      admin: {
        position: "sidebar",
        disabled: false,
      },
      hooks: {
        beforeValidate: [formatSlug("name")],
      },
      unique: true,
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "likes",
      label: "Likes",
      type: "number",
      admin: {
        position: "sidebar",
      },
      defaultValue: 0,
    },
    {
      type: "tabs",
      tabs: [
        {
          fields: [
            lexicalHTML("content", { name: "post_content_html" }),
            {
              name: "content",
              type: "richText",
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HTMLConverterFeature({}),
                    HeadingFeature({
                      enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
                    }),
                    BlocksFeature({ blocks: [CodeBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ];
                },
              }),
              label: false,
              required: true,
            },
          ],
          label: "Content",
        },
        {
          fields: [
            {
              name: "thumbnail",
              label: "Thumbnail",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "relatedPosts",
              type: "relationship",
              admin: {
                position: "sidebar",
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                };
              },
              hasMany: true,
              relationTo: "posts",
            },
            {
              name: "categories",
              type: "relationship",
              admin: {
                position: "sidebar",
              },
              hasMany: true,
              relationTo: "categories",
            },
          ],
          label: "Meta",
        },
      ],
    },
  ],
  endpoints: [
    {
      path: "/post-content",
      method: "get",
      handler: async (req) => {
        const data = await req.payload.find({
          collection: "posts",
        });
        const contentHtml =
          data.docs[0]?.post_content_html || "<p>No content found</p>";
        if (contentHtml == null || contentHtml.length === 0) {
          return new Response(null, {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          });
        } else {
          return new Response(contentHtml, {
            headers: {
              "Content-Type": "text/html",
              "Access-Control-Allow-Origin": "*",
            },
          });
        }
      },
    },
  ],
};
