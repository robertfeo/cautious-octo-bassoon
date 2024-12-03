import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";
import { CodeBlock } from "@/blocks/CodeBlock/config";
import { HeroBlock } from "@/blocks/HeroBlock/config";
import { MediaBlock } from "@/blocks/MediaBlock/config";
import { slugField } from "@/fields/slug";
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  HTMLConverterFeature,
  InlineToolbarFeature,
  lexicalEditor,
  lexicalHTML
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
    ...slugField(),
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
                    HTMLConverterFeature({
                      
                    }),
                    /* HeroBlockFeature(), */
                    HeadingFeature({
                      enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
                    }),
                    BlocksFeature({
                      blocks: [CodeBlock, HeroBlock, MediaBlock],
                    }),
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
              type: "relationship",
              relationTo: "media",
              required: true,
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
    {
      path: "/by-slug/:slug",
      method: "get",
      handler: async (req) => {
        const slug = req.routeParams?.slug;

        const page = await req.payload.find({
          collection: "posts",
          depth: 2,
          limit: 1,
          where: {
            slug: {
              equals: slug,
            },
          },
        });

        if (page.docs.length === 0) {
          return new Response("Page not found", { status: 404 });
        }

        /* const content = page.docs[0].content;

        const editorConfig = {
          ...defaultEditorConfig,
          features: [
            ...defaultEditorFeatures,
            HTMLConverterFeature({}),
            HeroBlockFeature(),
          ],
        };

        const sanitizedEditorConfig = await sanitizeServerEditorConfig(editorConfig, req.payload.config);

        // Consolidate the HTML converters
        const htmlConverters = consolidateHTMLConverters({
          editorConfig: sanitizedEditorConfig,
        });

        // Convert the content to HTML
        const html = await convertLexicalToHTML({
          converters: htmlConverters,
          data: content,
          req,
        });

        return new Response(html, {
          headers: { "Content-Type": "text/json" },
        }); */

        return new Response(JSON.stringify(page.docs[0]), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  ],
};
