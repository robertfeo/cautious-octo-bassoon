import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";
import type { CollectionConfig } from "payload";

export const Comments: CollectionConfig = {
  slug: "comments",
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: "id",
    defaultColumns: ["author", "post", "createdAt"],
  },
  fields: [
    {
      name: "post",
      label: "Post",
      type: "relationship",
      relationTo: "posts",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "author",
      label: "Author",
      type: "relationship",
      relationTo: "users",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "content",
      label: "Content",
      type: "textarea",
      required: true,
    },
  ],
  timestamps: true,
};
