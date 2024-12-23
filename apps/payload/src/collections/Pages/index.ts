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
import { revalidatePage } from "./hooks/revalidatePage";

export const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidatePage],
  },
  admin: {
    defaultColumns: ["name", "slug", "updatedAt"],
    useAsTitle: "title",
  },
  labels: {
    singular: "Page",
    plural: "Pages",
  },
  fields: [
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
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "layout",
      label: "Layout",
      type: "blocks",
      blocks: [
        ImageBlock,
        HeroBlock,
        TwoColumnBlock,
        RecentPostsBlock,
        CodeBlock,
      ],
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
          return new Response("Page not found", { status: 404 });
        }

        const lastModified = new Date(page.docs[0].updatedAt).toUTCString();

        if (req.headers.get("if-modified-since") === lastModified) {
          return new Response(null, { status: 304 });
        }        

        return new Response(page.docs[0].pageHtml, {
          headers: {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*",
            "Last-Modified": lastModified,
          },
        });
      },
    },
    {
      path: "/raw/:slug",
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
          return new Response("Page not found", { status: 404 });
        }

        return new Response(JSON.stringify(page.docs[0]), {
          headers: {
            "Content-Type": "text/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      },
    },
  ],
};
