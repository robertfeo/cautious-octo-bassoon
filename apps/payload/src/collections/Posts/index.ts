import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";
import { CodeBlock } from "@/blocks/CodeBlock/config";
import { HeroBlock } from "@/blocks/HeroBlock/config";
import { MediaBlock } from "@/blocks/MediaBlock/config";
import { BlockConverterFeature } from "@/features/BlockConverterFeature";
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
            lexicalHTML("content", { name: "postHtml" }),
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
      path: "/by-slug/:slug",
      method: "get",
      handler: async (req) => {
        const data = await req.payload.find({
          collection: "posts",
          where: {
            slug: {
              equals: req.routeParams?.slug,
            },
          },
        });
        const contentHtml =
          data.docs[0]?.postHtml || "<p>No content found</p>";
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
      path: "/likes/:slug",
      method: "get",
      handler: async (req) => {
        const post = await req.payload.find({
          collection: "posts",
          where: { slug: { equals: req.routeParams?.slug } },
          limit: 1,
        });

        const likeCount = post.docs[0]?.likes || 0;

        return new Response(`<span>${likeCount} Likes</span>`, {
          headers: {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*",
          },
        });
      },
    },
    {
      path: "/likes/:slug/create",
      method: "post",
      handler: async (req) => {
        const slug = req.routeParams?.slug;

        const post = await req.payload.find({
          collection: "posts",
          where: { slug: { equals: slug } },
          limit: 1,
        });

        if (!post.docs.length) {
          return new Response("Post not found", { status: 404 });
        }

        const postId = post.docs[0].id;
        const currentLikes = post.docs[0].likes || 0;

        await req.payload.update({
          collection: "posts",
          id: postId,
          data: { likes: currentLikes + 1 },
        });

        return new Response(`<span>${currentLikes + 1} Likes</span>`, {
          headers: {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*",
          },
        });
      },
    },
    {
      path: "/likes/:slug/toggle",
      method: "post",
      handler: async (req) => {
        const slug = req.routeParams?.slug;
        const { liked } = Object.fromEntries(await req.formData?.() || []); // Extract 'liked' from form data

        const post = await req.payload.find({
          collection: "posts",
          where: { slug: { equals: slug } },
          limit: 1,
        });

        if (!post.docs.length) {
          return new Response("Post not found", { status: 404 });
        }
        const { id: postId } = post.docs[0];
        const likes = post.docs[0].likes || 0;
        const isLiked = liked === "true";
        const updatedLikes = isLiked ? likes - 1 : likes + 1;
        const newLikedState = isLiked ? "false" : "true";

        await req.payload.update({
          collection: "posts",
          id: postId,
          data: { likes: updatedLikes },
        });

        const buttonLabel = isLiked ? "👍 Like" : "✅ Liked";

        return new Response(
          `
            <input type="hidden" name="liked" value="${isLiked}" />
            <p hx-disable>
              ${buttonLabel} (${updatedLikes} Likes)
            </p>
          `,
          {
            headers: {
              "Content-Type": "text/html",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      },
    }

  ],
};
