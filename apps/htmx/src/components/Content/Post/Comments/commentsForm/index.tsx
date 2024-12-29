import { Html } from "@elysiajs/html";

type CommentFormProps = {
    slug: string;
};

export const CommentForm = ({ slug }: CommentFormProps) => {
    return (
        <div class="flex flex-col w-full justify-center mx-auto mt-8">
            <h3 class="text-lg font-bold mb-4">Add a comment</h3>
            <form
                hx-post={`${process.env.BACKEND_HOST}/api/comments/create`}
                hx-disabled-elt="submit-btn"
                hx-headers='{"Content-Type": "application/json"}'
                hx-include="[name]"
                hx-target="#comment-section"
                hx-swap="innerHTML"
                hx-boost="true"
                hx-indicator="#loading"
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
                    id="submit-btn"
                    type="submit"
                    class="self-end px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
            <div id="loading" class="absolute w-full h-full top-0 left-0 bg-white bg-opacity-50 flex items-center justify-center">
                <div class="spinner"></div>
            </div>
        </div>
    );
};