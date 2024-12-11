import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";
import type { CollectionConfig } from "payload";

export const Comments: CollectionConfig = {
  slug: "comments",
  access: {
    create: anyone,
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
      type: "textarea",
      required: true,
    },
    {
      name: "content",
      label: "Content",
      type: "textarea",
      required: true,
    },
  ],
  endpoints: [
    {
      path: "/by-slug/:slug",
      method: "get",
      handler: async (req) => {
        const data = await req.payload.find({
          collection: "comments",
          depth: 2,
          where: {
            "post.slug": {
              equals: req.routeParams?.slug,
            },
          },
          select: {
            content: true,
            author: true,
            createdAt: true,
          },
        });

        if (data == null || data.docs.length === 0) {
          return new Response(undefined, {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          });
        } else {
          return new Response(JSON.stringify(data.docs), {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          });
        }
      }
    }
  ],
  timestamps: true,
};
