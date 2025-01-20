import { authenticated } from "@/access/authenticated";
import { authenticatedOrPublished } from "@/access/authenticatedOrPublished";
import { CodeBlock } from "@/blocks/CodeBlock/config";
import { HeroBlock } from "@/blocks/HeroBlock/config";
import { ImageBlock } from "@/blocks/ImageBlock/config";
import { RecentPostsBlock } from "@/blocks/RecentPostsBlock/config";
import { TwoColumnBlock } from "@/blocks/TwoColumnBlock/config";

import { BlockConverterFeature } from "@/features/BlockConverterFeature";
import { slugField } from "@/fields/slug";
import { BlocksFeature, FixedToolbarFeature, HeadingFeature, HorizontalRuleFeature, HTMLConverterFeature, InlineToolbarFeature, lexicalEditor, lexicalHTML } from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    useAsTitle: "title",
  },
  labels: {
    singular: "Page",
    plural: "Pages",
  },
  fields: [
    ...slugField(),
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
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
    },
  ],
  endpoints: [
    {
      path: "/by-slug/:slug",
      method: "get",
      handler: async (req) => {
        const slug = req.routeParams?.slug;

        const page = await req.payload.find({
          collection: "pages",
          depth: 2,
          limit: 1,
          where: {
            slug: {
              equals: slug,
            },
          },
        });

        if (page.docs.length === 0) {
          return new Response('<a>Page not found</a>', {
            status: 404,
            statusText: "Not Found",
            headers: {
              "Content-Type": "text/html",
              "Access-Control-Allow-Origin": "*"
            },
          });
        }

        const lastModified = new Date(page.docs[0].updatedAt).toUTCString();

        if (req.headers.get("if-modified-since") === lastModified) {
          return new Response(null, { status: 304 });
        }

        return new Response(page.docs[0].pageHtml, {
          status: 200,
          headers: {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Hx-Request",
            "Access-Control-Max-Age": "86400",
            "Last-Modified": lastModified,
            "Cache-Control": "max-age=3600, must-revalidate",
          },
        });
      },
    },
  ],
};
