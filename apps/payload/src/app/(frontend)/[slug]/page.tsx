import RichText from "@/components/RichText";
import type { Page as PageType } from "@/payload-types";
import configPromise from "@payload-config";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const slug = params.slug || "home";

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return {
    title: `Page - ${capitalizeFirstLetter(slug)}`,
    description: `This is the ${capitalizeFirstLetter(slug)} page.`,
  };
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "pages",
    limit: 100,
  });

  return result.docs.map((doc) => ({
    slug: doc.slug,
  }));
}

const Page = async ({ params: paramsPromise }: { params: Promise<{ slug: string }> }) => {
  const params = await paramsPromise;
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
