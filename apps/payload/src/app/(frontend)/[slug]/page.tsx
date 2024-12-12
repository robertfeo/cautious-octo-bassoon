import RichText from "@/components/RichText";
import type { Page as PageType } from "@/payload-types";
import configPromise from "@payload-config";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

// Revalidate the cache every 60 seconds
export const revalidate = 60;

// Enable dynamic params to handle unknown slugs
export const dynamicParams = true;

// Generate metadata for each dynamic page
export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await paramsPromise; // Await the params object
  const slug = params.slug;

  return {
    title: `Page - ${slug}`,
    description: `This is the ${slug} page.`,
  };
}

// Pre-generate paths at build time
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "pages",
    limit: 100, // Adjust the limit as needed
  });

  return result.docs.map((doc) => ({
    slug: doc.slug,
  }));
}

// Page component to render the content dynamically
const Page = async ({ params: paramsPromise }: { params: Promise<{ slug: string }> }) => {
  const params = await paramsPromise; // Await the params object
  const slug = params.slug || "home";

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "pages",
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  const page: PageType | null = result.docs?.[0] || null;

  if (!page) {
    return notFound();
  }

  return (
    <>
      <div className="flex flex-col w-4/6 justify-center mx-auto">
        <RichText content={page.content || []} enableGutter={false} />
      </div>
    </>
  );
};

export default Page;
