import RichText from "@/components/RichText";
import { Post } from "@/payload-types";
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

  const page = data.docs[0] as Post;

  return (
    <div className="px-80">
      <div className="text-justify">
        {/* @ts-expect-error */}
        <RichText
          className="mx-auto"
          content={page.content}
          enableGutter={false}
        />
      </div>
    </div>
  );
}
