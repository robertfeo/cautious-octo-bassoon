// src/components/blocks/RecentPostsBlockComponent.tsx

import { Html } from "@elysiajs/html";
import { Post } from "../../../../payload/src/payload-types";

type RecentPostsBlockProps = {
  heading: string;
  subheading: string;
  postLimit: number | undefined;
};

export const RecentPostsBlockComponent = async ({
  heading,
  subheading,
  postLimit,
}: RecentPostsBlockProps) => {
  // Fetch recent posts from Payload CMS
  const posts = await fetchRecentPosts(postLimit);

  return (
    <section class="recent-posts py-8">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold">{heading}</h2>
        <p class="text-xl mt-2">{subheading}</p>
        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post: Post) => (
            <div key={post.id} class="post-card">
              {post.thumbnail && (
                <img src={post.thumbnail.url} alt={post.title} />
              )}
              <h3 class="text-xl font-semibold mt-4">{post.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Helper function to fetch recent posts
async function fetchRecentPosts(limit) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/posts?limit=${limit}&sort=-createdAt`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data.docs;
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    return [];
  }
}
