import { Html } from "@elysiajs/html";

type ContentProps = {
    pageSlug?: string;
    children?: any;
};

export const Content = ({ pageSlug, children }: ContentProps) => {
    return (
        <main class="flex-grow">
            <div
                class="flex flex-col w-4/6 justify-center mx-auto"
                id="dynamic-content"
                hx-get={`${process.env.BACKEND_HOST}/api/pages/by-slug/${pageSlug}`}
                hx-trigger="load"
                hx-swap="innerHTML"
                hx-target="#dynamic-content"
            >
                <p class="text-center">Loading...</p>
            </div>
        </main>
    );
};
