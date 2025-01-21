import { anyone } from "@/access/anyone";
import { delay } from "@/utils/delay";
import { commentsAsHTML, sanitizeContent } from "@/utils/htmlRender";
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
        await delay(2000); // Simulate slow network
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
          return new Response(
            `<p>No comments found.</p>`,
            {
              headers: {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*",
              },
              status: 404,
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
        try {
          await delay(2000); // Simulate slow network

          const contentType = req.headers.get("content-type");
          let body;

          if (contentType === "application/json") {
            if (req.json) {
              body = await req.json();
            } else {
              console.log("Invalid JSON body.");
              return new Response(
                JSON.stringify({ message: "Invalid JSON body." }),
                {
                  status: 400,
                  headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                  },
                }
              );
            }
          } else if (contentType === "application/x-www-form-urlencoded") {
            const urlEncodedBody = new URLSearchParams(await req.text?.());
            body = Object.fromEntries(urlEncodedBody.entries());
          } else {
            return new Response(
              JSON.stringify({ message: "Unsupported Content-Type." }),
              {
                status: 400,
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                },
              }
            );
          }

          const { slug, author, content, website, email } = body;

          const sanitizedAuthor = sanitizeContent(author);
          const sanitizedContent = sanitizeContent(content);
          const sanitizedWebsite = sanitizeContent(website);
          const sanitizedEmail = sanitizeContent(email);

          if ((!slug || !sanitizedAuthor || !sanitizedContent) && contentType === "application/json") {
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
          else if ((!slug || !sanitizedAuthor || !sanitizedContent) && contentType === "application/x-www-form-urlencoded") {
            return new Response(
              `<p>Slug, author, and content are required.</p>`,
              {
                status: 400,
                headers: {
                  "Content-Type": "application/html",
                  "Access-Control-Allow-Origin": "*",
                },
              }
            );
          }

          const post = await req.payload.find({
            collection: "posts",
            where: { slug: { equals: slug } },
            limit: 1,
          });

          if (!post.docs.length) {
            return new Response(
              JSON.stringify({ message: "Post not found." }),
              { status: 404, headers: { "Content-Type": "application/json" } }
            );
          }

          await req.payload.create({
            collection: "comments",
            data: {
              post: post.docs[0].id,
              author: sanitizedAuthor,
              content: sanitizedContent,
              website: sanitizedWebsite,
              email: sanitizedEmail,
            },
          });

          const comments = await req.payload.find({
            collection: "comments",
            depth: 2,
            where: { "post.slug": { equals: slug } },
          });

          const newComment = comments.docs[0];



          if (contentType === "application/json") {
            return new Response(
              JSON.stringify(newComment),
              {
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                },
              }
            );
          } else {
            return new Response(
              await commentsAsHTML(comments.docs),
              {
                headers: {
                  "Content-Type": "text/html",
                  "Access-Control-Allow-Origin": "*",
                },
              }
            );
          }
        } catch (error) {
          console.error("Error creating comment:", error);
          return new Response(
            JSON.stringify({ message: "Internal Server Error." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },
    }
  ],
};
