import { Html } from "@elysiajs/html";
import Loading from "../../Loading";
import { Comments } from "../Comments";

type PostProps = {
    slug: string;
};

export const Post = ({ slug }: PostProps) => {
    return (
        <main hx-trigger="load" class="flex-grow">
            <article
                class="flex flex-col w-4/6 justify-center mx-auto"
                id="dynamic-post-content"
                hx-get={`${process.env.BACKEND_HOST}/api/posts/by-slug/${slug}`}
                hx-trigger="load"
                hx-swap="innerHTML"
                hx-target="#dynamic-post-content"
            >
                <Loading />
            </article>
            <div class="flex flex-col w-4/6 justify-center mx-auto">
                <div id="like-button" class="mt-2">
                    <form
                        hx-post={`${process.env.BACKEND_HOST}/api/posts/likes/${slug}/toggle`}
                        hx-target="this"
                        hx-swap="innerHTML"
                    >
                        <input type="hidden" name="liked" value="false" />
                        <button id="btn-like" type="submit">
                            👍 Like
                        </button>
                    </form>
                </div>
            </div>
            <Comments slug={slug} />
        </main>
    );
};
