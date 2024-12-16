import Comments from "@/components/Comments";
import RichText from "@/components/RichText";
import { Post } from "@/payload-types";
import config from "@payload-config";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

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
    title: `Post - ${capitalizeFirstLetter(slug)}`,
    description: `This is the ${capitalizeFirstLetter(slug)} page.`,
  };
}

function generateStaticParams() { }

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
    <div className="flex flex-col w-4/6 justify-center mx-auto">
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
            ? new Date(page.author.createdAt).toLocaleDateString()
            : ""}
        </p>
      </div>
      <RichText
        className="mx-auto"
        content={page.content}
        enableGutter={false}
      />
      <Comments slug={page.slug} />
    </div>
  );
}
