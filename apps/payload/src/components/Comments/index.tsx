"use client";

import { useEffect, useState } from "react";

export type Comment = {
  id: string;
  content: string;
  author: { id: string; email: string };
  createdAt: string;
};

export type CommentsBlockProps = {
  slug: string | null | undefined;
};

export default function Comments({ slug }: CommentsBlockProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchComments() {
      try {
        setLoading(true);
        const res = await fetch(`/api/comments/by-slug/${slug}`);
        if (!res.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = await res.json();
        setComments(data || []);
      } catch (err) {
        setError("Could not load comments. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchComments();
  }, [slug]);

  return (
    <div className="comments-block">
      <h3 className="text-lg font-bold mb-4">Comments ({comments.length})</h3>

      {loading && <p>Loading comments...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && comments.length === 0 && <p>No comments yet!</p>}
      {!loading && comments.length > 0 && (
        <div className="flex flex-col gap-8">
          {comments.map((comment) => (
            <div className="p-8 flex flex-col bg-zinc-200" key={comment.id}>
              <p>{comment.content}</p>
              <p className="font-bold">
                By {comment.author.email} on{" "}
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
      <div>
        <h3 className="text-lg font-bold mb-4">Add a comment</h3>
        <form className="flex flex-col gap-4">
          <label htmlFor="comment">Comment</label>
          <textarea id="comment" name="comment" required></textarea>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required />
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="url" />
          <button className="bg-slate-400 p-2" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
