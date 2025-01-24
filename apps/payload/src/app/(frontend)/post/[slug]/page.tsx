import Comments from "@/components/Comments";
import RichText from "@/components/RichText";
import { Post } from "@/payload-types";
import { default as configPromise } from "@payload-config";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

/**
 * The function generates metadata for a post with a title and description based on a provided slug.
 * @param  - The `generateMetadata` function takes in an object as a parameter, which has a `params` property containing an object with an optional `slug` property of type string. Inside the function, the `slug` property is destructured from the `params` object with a default value of an empty
 * @returns {
 *   title: `Post - Example slug title`,
 *   description: `This is the Example slug title post.`,
 * }
 */
export async function generateMetadata({ params }: { params: { slug?: string } }): Promise<Metadata> {
  const { slug = '' } = await params;
  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);
  return {
    title: `Post - ${capitalizeFirstLetter(slug)}`,
    description: `This is the ${capitalizeFirstLetter(slug)} post.`,
  };
}

/**
 * The function `generateStaticParams` retrieves a list of slugs from a collection of pages.
 * @returns The `generateStaticParams` function is returning an array of objects with the `slug` property extracted from the documents fetched from the "pages" collection. Each object in the array represents a page with its corresponding slug value.
 */
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const result = await payload.find({
    collection: "pages",
    limit: 1000,
    pagination: false,
    select: {
      slug: true,
    },
  });
  return result.docs.map((doc) => ({ slug: doc.slug }));
}

/**
 * This function queries a post by its slug and returns the post if found, otherwise returns null.
 * @param {string} slug - The `slug` parameter is a string that represents a unique identifier for a post. It is used to query a post from a collection based on its specific slug value.
 * @returns The function `queryPostBySlug` is returning a `Promise` that resolves to either a `Post` object if a post with the specified `slug` is found, or `null` if no post is found.
 */
const queryPostBySlug = async (slug: string): Promise<Post | null> => {
  const payload = await getPayload({ config: configPromise });
  const result = await payload.find({
    collection: "posts",
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  });
  return result.docs?.[0] || null;
};

/**
 * This TypeScript React function fetches a post by slug, displays author information and creation date, renders the post content using RichText component, and includes a Comments component.
 * @param  - The code you provided is a Next.js page component that fetches a post by its slug and displays its content along with author information and comments. Here's a breakdown of the code:
 * @returns The code snippet is a React component that fetches a post by slug, displays information about the post's author and creation date, renders the post content using a RichText component, and includes a Comments component for the post. The component returns a JSX structure representing the post details and comments section within a styled container.
 */
export default async function Page({ params }: { params: { slug: string } }) {
  const { slug = "" } = await params;
  const post = await queryPostBySlug(slug);

  if (!post) {
    await notFound();
  }

  return (
    <div className="flex flex-col w-4/6 justify-center mx-auto">
      <div className="flex flex-row justify-between">
        <p className="font-bold">
          Author:{" "}
          {typeof post?.author === "object" && "name" in post.author
            ? post.author.name
            : ""}
        </p>
        <p className="font-bold">
          Created:{" "}
          {typeof post?.author === "object" && "createdAt" in post.author
            ? new Date(post.author.createdAt).toLocaleDateString()
            : ""}
        </p>
      </div>
      <RichText
        className="mx-auto"
        content={post?.content || []}
      />
      <Comments slug={post?.slug} />
    </div>
  );
}