import { Html } from "@elysiajs/html";

type LikeProps = {
    slug: string;
};

export default function Like(props: LikeProps): JSX.Element {
    return (
        <div class="flex flex-col w-4/6 justify-center mx-auto">
            <div id="like-button" class="mt-2">
                <form
                    hx-post={`${process.env.BACKEND_HOST}/api/posts/likes/${props.slug}/toggle`}
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
    );
};







