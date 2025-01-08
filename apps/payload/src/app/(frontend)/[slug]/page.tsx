import RichText from "@/components/RichText";
import type { Page as PageType } from "@/payload-types";
import configPromise from "@payload-config";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug?: string } }): Promise<Metadata> {
  const { slug = 'home' }  = await params;

  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return {
    title: `Page - ${capitalizeFirstLetter(slug)}`,
    description: `This is the ${capitalizeFirstLetter(slug)} page.`,
  };
}

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