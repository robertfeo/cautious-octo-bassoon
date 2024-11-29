import RenderBlocks from "@/blocks/RenderBlocks";
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
  const url = "/" + slug;

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

  const { layout } = page;

  return (
    <div className="flex flex-col py-5 gap-y-5 px-96">
      <RenderBlocks blocks={layout} />
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
