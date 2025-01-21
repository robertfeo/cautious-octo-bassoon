import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";
import { CodeBlock } from "@/blocks/CodeBlock/config";
import { HeroBlock } from "@/blocks/HeroBlock/config";
import { MediaBlock } from "@/blocks/MediaBlock/config";
import { BlockConverterFeature } from "@/features/BlockConverterFeature";
import { slugField } from "@/fields/slug";
import { getServerSideURL } from "@/utils/getURL";
import { access_control_headers } from "@/utils/headers";
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
              ...access_control_headers,
            },
          });
        } else {
          const lastModified = new Date(data.docs[0].updatedAt).toUTCString();

          if (req.headers.get("if-modified-since") === lastModified) {
            return new Response(null, { status: 304 });
          }

          return new Response(contentHtml, {
            headers: {
              ...access_control_headers,
              "Content-Type": "text/html",
              "Last-Modified": lastModified,
              "Cache-Control": "max-age=500, must-revalidate",
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
      path: "/likes/:slug/toggle",
      method: "post",
      handler: async (req) => {
        const slug = req.routeParams?.slug;
        const formData = await req.formData?.();
        const { liked } = Object.fromEntries(formData || []);

        const post = await req.payload.find({
          collection: "posts",
          where: { slug: { equals: slug } },
          limit: 1,
        });

        if (!post.docs.length) {
          return new Response(
            `
              <p>Post not found</p>
            `,
            {
              headers: {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*",
              },
              status: 404,
            }
          );
        }

        const { id: postId } = post.docs[0];
        const likes = post.docs[0].likes || 0;

        const isLiked = liked === "true";
        const updatedLikes = isLiked ? likes - 1 : likes + 1;

        await req.payload.update({
          collection: "posts",
          id: postId,
          data: { likes: updatedLikes },
        });

        const newLikedState = !isLiked;

        const icon = isLiked ? "👍" : "👎";

        const attrs: Record<string, string> = {
          "hx-post": `${getServerSideURL()}/api/posts/likes/${slug}/toggle`,
          "hx-target": "this",
          "hx-swap": "outerHTML",
        };

        const attributeString = Object.entries(attrs)
          .map(([key, val]) => `${key}="${val}"`)
          .join(" ");

        return new Response(
          `
            <form class="like-form" ${attributeString}>
              <p class="like-count">Likes: ${updatedLikes}</p>
              <input type="hidden" name="liked" value="${newLikedState}" />
              <button id="btn-like" class="like-button" type="submit">
                ${icon}
              </button>
            </form>
          `,
          {
            headers: {
              "Content-Type": "text/html",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      },
    },
  ],
};
