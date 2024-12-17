import { Html } from "@elysiajs/html";
import { Comments } from "../Comments";

type PostProps = {
    pageSlug: string;
    children?: any;
};

export const Post = ({ pageSlug, children }: PostProps) => {
    return (
        <main class="flex-grow">
            <article
                class="flex flex-col w-4/6 justify-center mx-auto"
                id="dynamic-post-content"
                hx-get={`${process.env.BACKEND_HOST}/api/posts/by-slug/${pageSlug}`}
                hx-trigger="load"
                hx-swap="innerHTML"
                hx-target="#dynamic-post-content"
                hx-cache="true"
            >
                <p class="htmx-indicator text-center">Loading Post...</p>
            </article>
            <Comments slug={pageSlug} />
        </main>
    );
};