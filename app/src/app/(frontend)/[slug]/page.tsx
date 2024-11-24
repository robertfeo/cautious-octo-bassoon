import config from "@payload-config";
import { getPayload } from "payload";
import { cache } from "react";

import type { Page as PageType } from "../../../payload-types";

import { RenderBlocks } from "@/blocks/RenderBlocks";
import { notFound } from "next/navigation";

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const parsedSlug = decodeURIComponent(slug);

  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "pages",
    limit: 1,
    where: {
      slug: {
        equals: parsedSlug,
      },
    },
  });

  return result.docs?.[0] || null;
});

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const pages = await payload.find({
    collection: "pages",
    draft: false,
    limit: 1000,
  });

  return pages.docs
    ?.filter((doc) => {
      return doc.slug !== "home";
    })
    .map(({ slug }) => slug);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string }>;
}) {
  const { slug = "home" } = await params;

  let page: PageType | null;

  page = await queryPageBySlug({
    slug,
  });

  if (!page) {
    return notFound();
  }

  return (
    <article className="pt-16 pb-24 mx-96">
      <RenderBlocks blocks={page.layout || []} />
    </article>
  );
}
