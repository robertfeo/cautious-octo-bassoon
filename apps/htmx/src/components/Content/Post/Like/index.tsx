import { Html } from "@elysiajs/html";

type LikeProps = {
    slug: string;
};

export default function Like(props: LikeProps): JSX.Element {
    return (
        <div class="my-4 flex flex-col items-center">
            <div id="like-button">
                <form
                    class="like-form"
                    hx-post={`${process.env.BACKEND_HOST}/api/posts/likes/${props.slug}/toggle`}
                    hx-target="this"
                    hx-swap="outerHTML"
                >
                    <input type="hidden" name="liked" value="false" />
                    <button id="btn-like" class="like-button" type="submit">
                        👍
                    </button>
                </form>
            </div>
        </div>
    );
}
