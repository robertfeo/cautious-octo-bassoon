import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";
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
import type { CollectionConfig, FieldHook } from "payload";

const format = (val: string): string =>
  val
    .replace(/ /g, "-")
    .replace(/[^\w-/]+/g, "")
    .toLowerCase();

const formatSlug =
  (fallback: string): FieldHook =>
  ({ value, originalDoc, data }) => {
    if (typeof value === "string") {
      return format(value);
    }
    const fallbackData = data?.[fallback] || originalDoc?.[fallback];

    if (fallbackData && typeof fallbackData === "string") {
      return format(fallbackData);
    }

    return value;
  };

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
      },
      hooks: {
        beforeValidate: [formatSlug("name")],
        afterChange: [formatSlug("name")],
      },
      required: true,
      unique: true,
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "likes",
      label: "Likes",
      type: "number",
      admin: {
        position: "sidebar",
      },
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
                    BlocksFeature({ blocks: [] }),
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
