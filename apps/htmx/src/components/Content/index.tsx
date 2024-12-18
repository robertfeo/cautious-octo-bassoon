import { Html } from "@elysiajs/html";

type ContentProps = {
    slug: string;
};

export const Content = ({ slug }: ContentProps) => {
    return (
        <main class="flex-grow">
            <div
                class="flex flex-col gap-10 w-4/6 justify-center mx-auto"
                id="dynamic-content"
                hx-get={`${process.env.BACKEND_HOST}/api/pages/by-slug/${slug}`}
                hx-trigger="load"
                hx-swap="innerHTML"
                hx-target="#dynamic-content"
                hx-cache="true"
            >
                <p class="text-center">Loading...</p>
            </div>
        </main>
    );
};
