import { Html } from "@elysiajs/html";
import { CommentForm } from "./commentsForm";

type CommentsProps = {
    slug: string;
};

export const Comments = ({ slug }: CommentsProps) => {
    return (
        <div class="flex flex-col w-4/6 justify-center mx-auto mt-8">
            <CommentForm slug={slug} />

            <h3 class="text-lg font-bold mb-4">Comments</h3>
            <div
                id="comment-section"
                hx-get={`${process.env.BACKEND_HOST}/api/comments/html-by-slug/${slug}`}
                hx-trigger="load"
                hx-swap="innerHTML"
            >
                <p class="text-center" hx-swap-oob="true">Loading comments...</p>
            </div>
        </div>
    );
};