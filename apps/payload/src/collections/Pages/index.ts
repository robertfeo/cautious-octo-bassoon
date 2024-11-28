import { authenticated } from "@/access/authenticated";
import { authenticatedOrPublished } from "@/access/authenticatedOrPublished";
import { CodeBlock } from "@/blocks/CodeBlock/config";
import { HeroBlock } from "@/blocks/HeroBlock/config";
import { ImageBlock } from "@/blocks/ImageBlock/config";
import { RecentPostsBlock } from "@/blocks/RecentPostsBlock/config";
import { TwoColumnBlock } from "@/blocks/TwoColumnBlock/config";

import {
  BlocksFeature,
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML,
} from "@payloadcms/richtext-lexical";
import type { FieldHook } from "payload";
import { CollectionConfig } from "payload";
import { revalidatePage } from "./hooks/revalidatePage";

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
    useAsTitle: "name",
  },
  labels: {
    singular: "Page",
    plural: "Pages",
  },
  fields: [
    {
      name: "slug",
      label: "Slug",
      type: "text",
      admin: {
        position: "sidebar",
        disabled: true,
      },
      hooks: {
        beforeValidate: [formatSlug("name")],
      },
      unique: true,
    },
    {
      name: "name",
      label: "Name",
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
      required: true,
    },
    {
      name: "content",
      type: "richText",
      label: "Content",
      editor: lexicalEditor({
        features: ({ defaultFeatures, rootFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({
            blocks: [
              ImageBlock,
              HeroBlock,
              TwoColumnBlock,
              RecentPostsBlock,
              CodeBlock,
            ],
          }),
          HTMLConverterFeature({}),
        ],
      }),
    },
    lexicalHTML("content", { name: "layout_html" }),
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

        return new Response(JSON.stringify(page.docs[0]), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  ],
  hooks: {
    afterChange: [revalidatePage],
  },
};
