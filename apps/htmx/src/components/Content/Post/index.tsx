import { Html } from "@elysiajs/html";
import Loading from "../../Loading";
import { Comments } from "./Comments";
import Like from "./Like";

type PostProps = {
    slug: string;
};

export const Post = ({ slug }: PostProps) => {
    return (
        <main hx-trigger="load" class="flex-grow">
            <article
                class="flex flex-col w-4/6 justify-center mx-auto"
                id="dynamic-post-content"
                hx-get={`${process.env.PAYLOAD_HOST}/api/posts/by-slug/${slug}`}
                hx-trigger="load"
                hx-swap="innerHTML"
                hx-target="this"
            >
                <Loading />
            </article>
            <Like slug={slug} />
            <Comments slug={slug} />
        </main>
    );
};
