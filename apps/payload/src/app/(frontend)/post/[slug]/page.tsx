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
      <div>
        <div className="flex flex-row justify-between">
          <p className="font-bold">
            Author:{" "}
            {typeof page.author === "object" && "name" in page.author
              ? page.author.name
              : ""}
          </p>
          <p className="font-bold">
            Created:{" "}
            {typeof page.author === "object" && "createdAt" in page.author
              ? page.author.createdAt
              : ""}
          </p>
        </div>
        <RichText
          className="mx-auto"
          content={page.content}
          enableGutter={false}
        />
      </div>
    </div>
  );
}
