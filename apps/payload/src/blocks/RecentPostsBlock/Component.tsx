import config from "@payload-config";
import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";

export type RecentPostsBlockProps = {
  heading: string;
  subheading: string;
  postLimit: number;
};

export const RecentPostsBlockComponent: React.FC<RecentPostsBlockProps> = async ({
  heading,
  subheading,
  postLimit,
}) => {
  const payload = await getPayload({ config });

  const posts = await payload.find({
    collection: "posts",
    limit: postLimit,
    sort: "-createdAt",
  });

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800">{heading}</h2>
      <p className="text-lg text-center text-gray-600 mt-2">{subheading}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {posts.docs.map((post: any) => (
          <div
            key={post.id}
            className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow ring-1 ring-black ring-opacity-10"
          >
            {/* Thumbnail */}
            <div className="relative w-full h-48 bg-gray-300">
              {post.thumbnail ? (
                <Image
                  src={post.thumbnail.url}
                  alt={post.thumbnail.alt || "Post thumbnail"}
                  layout="fill"
                  objectFit="cover"
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-700">
                  <span className="text-white text-sm">No Image</span>
                </div>
              )}
            </div>

            {/* Post Content */}
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-sm font-semibold text-gray-800">
                <Link
                  href={`/post/${post.slug}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {post.title}
                </Link>
              </h3>
              <div className="flex justify-between text-gray-600 mt-1 *:text-xs">
                <p>{new Date(post.createdAt).toLocaleDateString()}</p>
                <p>Likes: {post.likes}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
