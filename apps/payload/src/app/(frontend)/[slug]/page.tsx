/**
 * The above code defines a TypeScript React component for rendering a page based on a slug parameter, fetching content from a payload and generating metadata for the page.
 * @param {string} slug - The `slug` parameter is used to identify and retrieve a specific page based on its unique identifier. In this code snippet, the `slug` parameter is used to query a page from a collection of pages based on its slug value. The `queryPageBySlug` function fetches the page content
 * @returns The code snippet provided is a Next.js page component that fetches and displays content based on a slug parameter. It includes functions for generating metadata, static parameters, and querying a page by slug. The `Page` component fetches the page content based on the slug parameter and renders it using the `RichText` component. If the page is not found, it returns a 404 error using `
 */
import RichText from "@/components/RichText";
import type { Page as PageType } from "@/payload-types";
import configPromise from "@payload-config";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

/**
 * The function generates metadata for a page based on a provided slug parameter, capitalizing the first letter of the slug for the title and description.
 * @param  - The `generateMetadata` function takes in an object as a parameter with a `params` property, which is also an object with an optional `slug` property of type string. If `slug` is not provided, it defaults to 'home'.
 * @returns {
 *   title: "Page - Home",
 *   description: "This is the Home page."
 * }
 */
export async function generateMetadata({ params }: { params: { slug?: string } }): Promise<Metadata> {
  const { slug = 'home' }  = await params;

  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return {
    title: `Page - ${capitalizeFirstLetter(slug)}`,
    description: `This is the ${capitalizeFirstLetter(slug)} page.`,
  };
}

/**
 * The function `generateStaticParams` retrieves a list of slugs from a collection of pages.
 * @returns The `generateStaticParams` function is returning an array of objects with the `slug` property extracted from the documents fetched from the `pages` collection. Each object in the array represents a page with its `slug` value.
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
 * The function `queryPageBySlug` retrieves a page by its slug from a payload and returns it as a Promise.
 * @param {string} slug - The `slug` parameter is a string that represents the unique identifier or URL-friendly version of a page. It is used to query a specific page from a collection based on its slug value.
 * @returns The function `queryPageBySlug` is returning a Promise that resolves to a `PageType` object or `null`. The function first retrieves a payload using `getPayload` function with a configuration promise. Then it searches for a page in the payload collection with a matching slug and returns the first document found, or `null` if no document is found.
 */
const queryPageBySlug = async (slug: string): Promise<PageType | null> => {
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "pages",
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
 * The function `Page` in TypeScript React fetches a page by slug, displays its content using RichText component, and handles not found cases.
 * @param  - The `Page` function is an asynchronous function that takes an object as a parameter with a `params` property. The `params` property is an object with a `slug` property that is optional and defaults to `'home'`.
 * @returns The Page component is returning an article element with a className of "pt-16 pb-24". Inside the article element, there is a div element with a className of "flex flex-col w-4/6 justify-center mx-auto". Inside this div, the RichText component is being rendered with the content from the page object, or an empty array if the content is not available.
 */
const Page = async ({ params }: { params: { slug?: string } }) => {
  const { slug = 'home' }  = await params;
  const page = await queryPageBySlug(slug);

  if (!page) {
    return notFound();
  }

  return (
    <article className="pt-16 pb-24">
      <div className="flex flex-col w-4/6 justify-center mx-auto">
        <RichText content={page.content || []} />
      </div>
    </article>
  );
};

export default Page;