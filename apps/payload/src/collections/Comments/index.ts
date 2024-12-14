import { anyone } from "@/access/anyone";
import { commentsAsHTML } from "@/utils/htmlRender";
import type { CollectionConfig } from "payload";

export const Comments: CollectionConfig = {
  slug: "comments",
  access: {
    create: anyone,
    read: anyone,
    update: anyone,
    delete: anyone,
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
      type: "text",
      required: true,
    },
    {
      name: "content",
      label: "Content",
      type: "textarea",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      required: false,
    },
    {
      name: "website",
      label: "Website",
      type: "text",
      required: false,
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
    },
    {
      path: "/html-by-slug/:slug",
      method: "get",
      handler: async (req) => {
        const comments = await req.payload.find({
          collection: "comments",
          depth: 2,
          where: {
            "post.slug": {
              equals: req.routeParams?.slug,
            },
          },
          select: {
            id: true,
            content: true,
            author: true,
            createdAt: true,
          },
        });

        if (comments == null || comments.docs.length === 0) {
          return new Response(undefined, {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          });
        } else {
          return new Response(await commentsAsHTML(comments.docs), {
            headers: {
              "Content-Type": "text/html",
              "Access-Control-Allow-Origin": "*",
            },
          });
        }
      }
    },
    {
      path: "/create",
      method: "post",
      handler: async (req) => {
        const body = new URLSearchParams(await req.text?.()); // Parse the form data

        console.log("Received data:", body);

        const slug = body.get("slug");
        const author = body.get("name");
        const content = body.get("content");
        const website = body.get("website");
        const email = body.get("email");

        console.log("Received data:", { slug, author, content });

        if (!slug || !author || !content) {
          return new Response(
            JSON.stringify({ message: "Slug, author, and content are required." }),
            {
              status: 400,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );
        }

        try {
          const post = await req.payload.find({
            collection: "posts",
            where: {
              slug: { equals: slug },
            },
            limit: 1,
          });

          if (!post.docs.length) {
            return new Response(
              JSON.stringify({ message: "Post not found." }),
              { status: 404, headers: { "Content-Type": "application/json" } }
            );
          }

          const postId = post.docs[0].id;

          const comment = await req.payload.create({
            collection: "comments",
            data: {
              post: postId,
              author,
              content,
              website,
              email,
            },
          });

          const comments = await req.payload.find({
            collection: "comments",
            depth: 2,
            where: {
              "post.slug": {
                equals: slug,
              },
            },
          });

          console.log("Comments:", comments.docs);

          return new Response(
            /* `<div class="p-8 flex flex-col bg-zinc-200">
                  <p>${comment.content}</p>
                  <p class="font-bold">
                      By ${comment.author} on ${new Date(comment.createdAt).toLocaleDateString()}
                  </p>
              </div>` */await commentsAsHTML(comments.docs),
            {
              headers: {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );
        } catch (error) {
          console.error(error);
          return new Response(
            JSON.stringify({ message: "Internal Server Error." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
        // Response for debugging purposes
        /* return new Response(
          JSON.stringify({ body }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        ); */
      },
    },
  ],
  timestamps: true,
};
