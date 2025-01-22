import Comments from "@/components/Comments";
import RichText from "@/components/RichText";
import { Post } from "@/payload-types";
import { default as configPromise } from "@payload-config";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

export async function generateMetadata({ params }: { params: { slug?: string } }): Promise<Metadata> {
  const { slug = '' } = await params;
  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);
  return {
    title: `Post - ${capitalizeFirstLetter(slug)}`,
    description: `This is the ${capitalizeFirstLetter(slug)} post.`,
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

const queryPostBySlug = async (slug: string): Promise<Post | null> => {
  const payload = await getPayload({ config: configPromise });
  const result = await payload.find({
    collection: "posts",
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

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug = "" } = await params;
  const post = await queryPostBySlug(slug);

  if (!post) {
    await notFound();
  }

  return (
    <div className="flex flex-col w-4/6 justify-center mx-auto">
      <div className="flex flex-row justify-between">
        <p className="font-bold">
          Author:{" "}
          {typeof post?.author === "object" && "name" in post.author
            ? post.author.name
            : ""}
        </p>
        <p className="font-bold">
          Created:{" "}
          {typeof post?.author === "object" && "createdAt" in post.author
            ? new Date(post.author.createdAt).toLocaleDateString()
            : ""}
        </p>
      </div>
      <RichText
        className="mx-auto"
        content={post?.content || []}
      />
      <Comments slug={post?.slug} />
    </div>
  );
}