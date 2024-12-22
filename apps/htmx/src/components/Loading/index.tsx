import { Html } from "@elysiajs/html";

export default function Loading(): JSX.Element {
    return (
        <div class="flex flex-col justify-center items-center w-full h-full">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    );
};