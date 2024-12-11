import { Media } from "@/payload-types";
import configPromise from "@payload-config";
import { BlockFields, SerializedBlockNode } from "@payloadcms/richtext-lexical";
import { JsonObject, getPayload } from "payload";

export const renderToHTML = async (node: SerializedBlockNode): Promise<string> => {
    const { fields } = node;
    const blockType = fields.blockType;

    switch (blockType) {
        case "hero":
            return renderHeroHTML(fields);
        case "code":
            return renderCodeHTML(fields);
        case "media":
            return await renderMediaHTML(fields);
        case "twoColumn":
            return renderTwoColumnHTML(fields);
        case "recentPosts":
            return renderRecentPostsHTML(fields);
        case "image":
            return renderImageHTML(fields);
        default:
            return `<span>Unknown block type ${blockType}</span>`;
    }
};

async function renderHeroHTML(fields: BlockFields<JsonObject>): Promise<string> {
    if (!fields || typeof fields !== "object") {
        console.error("Error: 'fields' is undefined or not an object.");
        return "<div>Error: Missing or invalid fields data</div>";
    }

    const { heading = "", text = "" } = fields;

    const backgroundImage = await getMediaFromPayload(fields.backgroundImage);

    const backgroundStyle = backgroundImage?.url
        ? `style="background-image: url(${backgroundImage.url}); background-size: cover; background-position: center;"`
        : "";

    return `
        <div class="relative flex flex-col justify-center p-8" ${backgroundStyle}>
            <div class="absolute inset-0 bg-black bg-opacity-50 m-5"></div>
            <div class="relative z-10">
                ${heading ? `<h1 class="text-white text-3xl font-bold mb-4">${heading}</h1>` : ""}
                ${text ? `<p class="text-white text-lg">${text}</p>` : ""}
            </div>
        </div>
    `;
};

function renderCodeHTML(fields: BlockFields<JsonObject>): string {
    if (!fields || typeof fields !== "object") {
        console.error("Error: 'fields' is undefined or not an object.");
        return `<div>Fehler: Fehlende oder ungültige Felderdaten</div>`;
    }

    const { code = "" } = fields;

    return `<pre><code>${code}</code></pre>`;
};

async function renderMediaHTML(fields: BlockFields<JsonObject>): Promise<string> {
    if (!fields || typeof fields !== "object") {
        console.error("Error: 'fields' is undefined or not an object.");
        return `<div>Fehler: Fehlende oder ungültige Felderdaten</div>`;
    }

    const { heading = "", text = "", alignment = "left" } = fields;

    const media = await getMediaFromPayload(fields.media);

    const isRightAligned = alignment === "right";

    const isYouTubeVideo = (url: string) =>
        url.includes("youtube.com") || url.includes("youtu.be");

    let mediaContent = "";
    if (media) {
        if (media["url-type"] === "video") {
            if (isYouTubeVideo(media.url)) {
                mediaContent = `
                    <iframe
                        width="560"
                        height="315"
                        src="${media.url}"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                        class="w-full max-w-lg"
                    ></iframe>
                `;
            } else {
                mediaContent = `
                    <video
                        controls
                        src="${media.url}"
                        width="560"
                        height="315"
                        class="w-full max-w-lg h-auto"
                    >
                        Your browser does not support the video tag.
                    </video>
                `;
            }
        } else {
            mediaContent = `
                <img
                    src="${media.url}"
                    alt="${media.alt || heading || "Media Block"}"
                    class="object-cover w-full max-w-lg h-auto"
                />
            `;
        }
    }

    return `
        <div
            class="flex flex-col md:flex-row ${isRightAligned ? "md:flex-row-reverse" : ""
        } justify-between items-center"
        >
            <div class="flex flex-col text-center md:text-left max-w-md">
                <h2 class="text-2xl font-bold mb-4">${heading}</h2>
                ${text ? `<p class="text-justify">${text}</p>` : ""}
            </div>
            <div class="flex-1 max-w-lg">
                ${mediaContent}
            </div>
        </div>
    `;
}

async function renderTwoColumnHTML(fields: BlockFields<JsonObject>): Promise<string> {
    if (!fields || typeof fields !== "object") {
        console.error("Error: 'fields' is undefined or not an object.");
        return `<div>Fehler: Fehlende oder ungültige Felderdaten</div>`;
    }

    const { heading = "", text = "", direction = "default" } = fields;

    const isReverse = direction === "reverse";

    const image = await getMediaFromPayload(fields.image);

    return `
        <div
            class="flex flex-col md:flex-row ${isReverse ? "md:flex-row-reverse" : ""} justify-between gap-6"
        >
            <div class="flex flex-col text-center md:text-left">
                <h2>${heading}</h2>
                <p class="text-justify">${text}</p>
            </div>

            <div>
                <img
                    src="${image.url || ""}"
                    alt="${image.alt || "Two Column Block Image"}"
                    width="500"
                    height="300"
                    class="object-cover size-full"
                />
            </div>
        </div>
    `;
}

async function renderRecentPostsHTML(fields: BlockFields<JsonObject>): Promise<string> {
    if (!fields || typeof fields !== "object") {
        console.error("Error: 'fields' is undefined or not an object.");
        return `<div>Fehler: Fehlende oder ungültige Felderdaten</div>`;
    }

    const { heading = "", subheading = "", postLimit = 4 } = fields;

    const payload = await getPayload({ config: await configPromise });

    try {
        const posts = await payload.find({
            collection: "posts",
            limit: postLimit,
            sort: "-createdAt",
        });

        const postsHTML = posts.docs
            .map((post: any) => {
                const thumbnailHTML = post.thumbnail
                    ? `<img src="${post.thumbnail.url}" alt="${post.thumbnail.alt || "Post thumbnail"}" class="object-cover w-full h-full" />`
                    : `<div class="bg-zinc-700 w-full h-full flex items-center justify-center">
                        <span class="text-white">No Image</span>
                    </div>`;

                const postDate = new Date(post.createdAt).toLocaleDateString();

                return `
                    <div class="overflow-hidden ring-1 ring-black ring-opacity-25">
                        <div class="relative w-full h-48">
                            ${thumbnailHTML}
                        </div>
                        <div class="p-4">
                            <h3 class="text-sm font-semibold text-pretty">
                                <a class="no-underline text-zinc-600" href="/post/${post.slug}">
                                    ${post.title}
                                </a>
                            </h3>
                            <p class="text-xs text-zinc-600 mt-1">${postDate}</p>
                        </div>
                    </div>
                `;
            })
            .join("");

        return `
            <div>
                <h2 class="text-3xl font-bold text-center">${heading}</h2>
                <p class="text-lg text-center mt-2">${subheading}</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                    ${postsHTML}
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return `<div>Error loading recent posts</div>`;
    }
}

async function renderImageHTML(fields: BlockFields<JsonObject>): Promise<string> {

    const media = await getMediaFromPayload(fields.image);

    if (!media || typeof media === "number") {
        return "";
    }

    return `
        <div class="flex flex-col justify-center items-center">
            <div class="w-full h-60 overflow-hidden">
                <img
                    src="${media.url}"
                    alt="${media.alt || ""}"
                    class="w-full h-full object-cover"
                />
            </div>
            <p>${fields.caption || ""}</p>
        </div>
    `;
}

async function getMediaFromPayload(mediaId: number): Promise<Media> {
    const payload = await getPayload({ config: configPromise });

    const media = (await payload.find({
        collection: "media",
        limit: 1,
        where: {
            id: {
                equals: mediaId,
            },
        },
    })).docs[0];

    return media;
}