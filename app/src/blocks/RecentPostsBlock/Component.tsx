import config from "@payload-config";
import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";

type RecentPostsBlockProps = {
  heading: string;
  subheading: string;
  postLimit: number;
};

export default async function RecentPostsBlockComponent({
  heading,
  subheading,
  postLimit,
}: RecentPostsBlockProps) {
  const payload = await getPayload({ config });

  const posts = await payload.find({
    collection: "posts",
    limit: postLimit,
    sort: "-createdAt",
  });

  posts.docs.map((post: any) => {
    post.slug = post.slug || post._id;
    console.log(post);
  });

  return (
    <div className="bg-gray-900 text-white">
      {/* <h2 className="text-3xl font-bold text-center">{heading}</h2>
      <p className="text-lg text-center mt-2">{subheading}</p> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {posts.docs.map((post: any) => (
          <div key={post.id} className="bg-gray-800 overflow-hidden">
            <div className="relative w-full h-48">
              {post.thumbnail ? (
                <Image
                  src={post.thumbnail.url}
                  alt={post.thumbnail.alt || "Post thumbnail"}
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <div className="bg-gray-700 w-full h-full flex items-center justify-center">
                  <span>No Image</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-pretty">
                <Link
                  className="no-underline text-white"
                  href={`/post/${post.slug}`}
                >
                  {post.title}
                </Link>
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
