import { Html } from "@elysiajs/html";

type CommentFormProps = {
    pageSlug?: string;
};

export const CommentForm = ({ pageSlug }: CommentFormProps) => {
    return (
        <div class="flex flex-col w-3/4 justify-center mx-auto mt-8">
            <form
                hx-post={`${process.env.BACKEND_HOST}/api/comments/create`}
                hx-headers='{"Content-Type": "application/json"}'
                hx-include="[name=content]"
                hx-target="#comment-section"
                hx-swap="beforeend"
                class="flex flex-col gap-4"
            >
                <textarea
                    name="content"
                    placeholder="Write your comment here..."
                    class="p-4 border border-gray-300 rounded-lg"
                    required
                ></textarea>
                <input
                    type="hidden"
                    name="postSlug"
                    value={pageSlug}
                />
                <button
                    type="submit"
                    class="self-end px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Submit Comment
                </button>
            </form>
            <div id="comment-section" class="mt-8"></div>
        </div>
    );
};