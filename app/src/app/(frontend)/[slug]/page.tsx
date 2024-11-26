import RenderBlocks from "@/blocks/RenderBlocks";
import { Page as PageCollection } from "@/payload-types";
import config from "@payload-config";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

export default async function Page({ params }: { params: { slug: string } }) {
  const paramsAwait = await params;
  const slug = paramsAwait.slug || "home" || "index" || "default";
  const payload = await getPayload({ config });

  const data = await payload.find({
    collection: "pages",
    depth: 2,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (data.docs.length === 0) {
    await notFound();
  }

  const page = data.docs[0] as PageCollection;

  return (
    <div className="flex flex-col py-5 gap-y-5 px-96">
      <RenderBlocks blocks={page.layout} />
    </div>
  );
}
