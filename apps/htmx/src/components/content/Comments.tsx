import { Html } from "@elysiajs/html";

type CommentsProps = {
    slug: string;
};

export const Comments = ({ slug }: CommentsProps) => {
    return (
        <div class="flex flex-col w-4/6 justify-center mx-auto mt-8">
            <h3 class="text-lg font-bold mb-4">Comments</h3>

            <div
                id="comment-section"
                hx-get={`${process.env.BACKEND_HOST}/api/comments/html-by-slug/${slug}`}
                hx-trigger="load"
                hx-swap="innerHTML"
            >
                <p class="text-center" hx-swap-oob="true">Loading comments...</p>
            </div>

            <form
                hx-post={`${process.env.BACKEND_HOST}/api/comments/create`}
                hx-headers='{"Content-Type": "application/json"}'
                hx-include="[name]"
                hx-target="#comment-section"
                hx-swap="innerHTML"
                class="flex flex-col gap-4"
            >
                <label for="comment" class="font-bold">Comment</label>
                <textarea
                    id="comment"
                    name="content"
                    placeholder="Write your comment here..."
                    class="p-4 border border-gray-300 rounded-lg"
                    required
                ></textarea>

                <label for="email" class="font-bold">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    class="p-4 border border-gray-300 rounded-lg"
                    required
                />

                <label for="name" class="font-bold">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    class="p-4 border border-gray-300 rounded-lg"
                    required
                />

                <label for="website" class="font-bold">Website</label>
                <input
                    id="website"
                    name="website"
                    type="text"
                    placeholder="Enter your website"
                    class="p-4 border border-gray-300 rounded-lg"
                />

                <input
                    type="hidden"
                    name="slug"
                    value={slug}
                />
                <button
                    type="submit"
                    class="self-end px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Submit Comment
                </button>
            </form>
        </div>
    );
};