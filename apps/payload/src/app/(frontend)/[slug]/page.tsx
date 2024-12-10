import RichText from "@/components/RichText";
import type { Page as PageType } from "@/payload-types";
import configPromise from "@payload-config";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import { cache } from "react";

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params: paramsPromise }: PageProps) {
  const { slug = "home" } = await paramsPromise;

  let page: PageType | null;

  page = await queryPageBySlug({
    slug,
  });

  if (!page && slug === "home") {
    notFound();
  }

  if (!page) {
    notFound();
  }

  /* const { layout } = page; */

  return (
    <div className="flex flex-col w-3/4 justify-center mx-auto">
      {/* <RenderBlocks blocks={layout} /> */}
      <RichText
        content={page.content || []}
        enableGutter={false}
      />
    </div>
  );
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
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

  return result.docs?.[0] || null;
});
