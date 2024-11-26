import { authenticated } from "@/access/authenticated";
import { authenticatedOrPublished } from "@/access/authenticatedOrPublished";
import { HeroBlock } from "@/blocks/HeroBlock/config";
import { ImageBlock } from "@/blocks/ImageBlock/config";
import { RecentPostsBlock } from "@/blocks/RecentPostsBlock/config";
import { TwoColumnBlock } from "@/blocks/TwoColumnBlock/config";
import type { FieldHook } from "payload";
import { CollectionConfig } from "payload";

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
      },
      hooks: {
        beforeValidate: [formatSlug("name")],
      },
      required: true,
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
      blocks: [ImageBlock, HeroBlock, TwoColumnBlock, RecentPostsBlock],
      required: true,
    },
  ],
};
