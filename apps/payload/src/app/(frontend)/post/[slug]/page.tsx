import { Post as PostCollection } from "@/payload-types";
import config from "@payload-config";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

export default async function Page({ params }: { params: { slug: string } }) {
  const paramsAwait = await params;
  const slug = paramsAwait.slug;
  const payload = await getPayload({ config });

  const data = await payload.find({
    collection: "posts",
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

  const page = data.docs[0] as PostCollection;

  return (
    <div className="px-96">
      <div
        className="text-justify"
        dangerouslySetInnerHTML={{ __html: page.post_content_html || "" }}
      ></div>
    </div>
  );
}
