"use client";

import { useEffect, useState } from "react";

export type Comment = {
  id: string;
  content: string;
  author: string;
  createdAt: string;
};

export type CommentsBlockProps = {
  slug: string | null | undefined;
};

export default function Comments({ slug }: CommentsBlockProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function createComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError(null);

    const formData = new FormData(e.currentTarget);
    const commentData = {
      slug,
      author: formData.get("name"),
      content: formData.get("content"),
      email: formData.get("email"),
      website: formData.get("website"),
    };

    if (!formData.get("name") || !formData.get("content")) {
      setFormError("Author and content are required.");
      setFormSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/comments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to submit comment.");
      }

      const newComment = await res.json();

      setComments((prevComments) => [...prevComments,newComment,]);
    } catch (err) {
      console.error("Error creating comment:", err);
      setFormError("Could not submit the comment. Please try again.");
    } finally {
      setFormSubmitting(false);
    }
  }

  useEffect(() => {
    async function fetchComments() {
      try {
        setLoading(true);
        const res = await fetch(`/api/comments/by-slug/${slug}`);

        if (!res.ok) {
          console.error("Failed to fetch comments:", res.status, res.statusText);
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const text = await res.text();
        const data = text ? JSON.parse(text) : [];

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
    <div className="comments-block mt-8">
      <div>
        <h3 className="text-lg font-bold mb-4">Add a comment</h3>
        <form className="flex flex-col gap-4" onSubmit={createComment}>
          <label className="font-bold" htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            name="content"
            placeholder="Write your comment here..."
            className="p-4 border border-gray-300 rounded-lg"
            required
          ></textarea>
          <label className="font-bold" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="p-4 border border-gray-300 rounded-lg"
            required
          />
          <label className="font-bold" htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            className="p-4 border border-gray-300 rounded-lg"
            required
          />
          <label className="font-bold" htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            placeholder="Enter your website"
            className="p-4 border border-gray-300 rounded-lg"
          />
          <button className="self-end px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" type="submit">
            {formSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      <h3 className="text-lg font-bold mb-4">Comments ({comments.length})</h3>

      {loading && <p>Loading comments...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && comments.length === 0 && <p>No comments yet!</p>}
      {!loading && comments.length > 0 && (
        <div className="flex flex-col gap-8">
          {comments.map((comment) => (
            <div key={`${comment.id}-${comment.createdAt}`} className="p-4 pl-8 flex flex-col bg-zinc-200">
              <p>{comment.content}</p>
              <p className="font-bold text-sm">
                By {comment.author} on{" "}
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
