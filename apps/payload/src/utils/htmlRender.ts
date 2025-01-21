import { Comment, Media } from "@/payload-types";
import configPromise from "@payload-config";
import { BlockFields, SerializedBlockNode } from "@payloadcms/richtext-lexical";
import { JsonObject, getPayload } from "payload";
import sanitizeHtml from "sanitize-html";

export const sanitizeContent = (html: string) =>
    sanitizeHtml(html, {
        allowedTags: ["b", "i", "em", "strong", "a", "p", "div", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "blockquote", "pre", "code", "img", "video", "iframe"],
        allowedAttributes: {
            "*": ["*"],
        },
    });

export const renderToHTML = async (
    node: SerializedBlockNode,
): Promise<string> => {
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
        return "<div class='error-message'>Error: Missing or invalid fields data</div>";
    }

    const { heading = "", text = "" } = fields;

    const backgroundImage = await getMediaFromPayload(fields.backgroundImage);

    const backgroundStyle = backgroundImage?.url
        ? `style="background-image: url(${backgroundImage.url});"`
        : "";

    return `
            <div class="hero-block" ${backgroundStyle}>
                <div class="hero-overlay"></div>
                <div class="hero-content">
                    ${heading ? `<h1 class="hero-heading">${heading}</h1>` : ""}
                    ${text ? `<p class="hero-text">${text}</p>` : ""}
                </div>
            </div>
        `;
}

function renderCodeHTML(fields: BlockFields<JsonObject>): string {
    if (!fields || typeof fields !== "object") {
        console.error("Error: 'fields' is undefined or not an object.");
        return `<div>Fehler: Fehlende oder ungültige Felderdaten</div>`;
    }

    const { code = "" } = fields;

    return `<pre><code>${code}</code></pre>`;
}

async function renderMediaHTML(fields: BlockFields<JsonObject>): Promise<string> {
    if (!fields || typeof fields !== "object") {
        console.error("Error: 'fields' is undefined or not an object.");
        return `<div class="error-message">Fehler: Fehlende oder ungültige Felderdaten</div>`;
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
                        src="${media.url}"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                        class="media-block-video"
                    ></iframe>
                `;
            } else {
                mediaContent = `
                    <video
                        controls
                        src="${media.url}"
                        class="media-block-video"
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
                    class="media-block-image"
                />
            `;
        }
    }

    return `
        <div class="media-block-container ${isRightAligned ? "reverse" : ""}">
            <div class="media-block-content">
                <h2 class="media-block-heading">${heading}</h2>
                ${text ? `<p class="media-block-text">${text}</p>` : ""}
            </div>
            <div class="media-block-media">
                ${mediaContent}
            </div>
        </div>
    `;
}

async function renderTwoColumnHTML(fields: BlockFields<JsonObject>): Promise<string> {
    if (!fields || typeof fields !== "object") {
        console.error("Error: 'fields' is undefined or not an object.");
        return `<div class="error-message">Fehler: Fehlende oder ungültige Felderdaten</div>`;
    }

    const { heading = "", text = "", direction = "default" } = fields;

    const isReverse = direction === "reverse";
    const image = await getMediaFromPayload(fields.image);

    return `
        <div class="two-column-block ${isReverse ? "reverse" : ""}">
            <div class="two-column-content">
                <h2 class="two-column-heading">${heading}</h2>
                <p class="two-column-text">${text}</p>
            </div>
            <div class="two-column-image">
                <img
                    src="${image?.url || ""}"
                    alt="${image?.alt || "Two Column Block Image"}"
                    width="500"
                    height="300"
                    class="responsive-image"
                />
            </div>
        </div>
    `;
}

async function renderRecentPostsHTML(
    fields: BlockFields<JsonObject>,
): Promise<string> {
    if (!fields || typeof fields !== "object") {
        console.error("Error: 'fields' is undefined or not an object.");
        return `<div class="error-message">Fehler: Fehlende oder ungültige Felderdaten</div>`;
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
                    ? `<img src="${post.thumbnail.url}" alt="${post.thumbnail.alt || "Post thumbnail"}" class="thumbnail" />`
                    : `<div class="thumbnail placeholder">
                            <span>No Image</span>
                        </div>`;

                const postDate = new Date(post.createdAt).toLocaleDateString();

                return `
                        <div class="post-card">
                            <div class="post-thumbnail">
                                ${thumbnailHTML}
                            </div>
                            <div class="post-details">
                                <h3 class="post-title">
                                    <a href="/post/${post.slug}">${post.title}</a>
                                </h3>
                                <div class="post-meta">
                                    <p class="post-date">${postDate}</p>
                                    <p class="post-likes">Likes: ${post.likes}</p>
                                </div>
                            </div>
                        </div>
                    `;
            })
            .join("");

        return `
                <div class="recent-posts-container">
                    <h2 class="section-heading">${heading}</h2>
                    <p class="section-subheading">${subheading}</p>
                    <div class="posts-grid">
                        ${postsHTML}
                    </div>
                </div>
            `;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return `<div class="error-message">Error loading recent posts</div>`;
    }
}

async function renderImageHTML(
    fields: BlockFields<JsonObject>,
): Promise<string> {
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

    return (
        await payload.find({
            collection: "media",
            limit: 1,
            where: {
                id: {
                    equals: mediaId,
                },
            },
        })
    ).docs[0];
}

export async function commentsAsHTML(comments: Comment[]): Promise<string> {
    if (!comments || comments.length === 0) {
        return "<p>No comments yet.</p>";
    } else {
        return comments
            .map((comment) => {
                return sanitizeContent(`
                <div class="comment-wrapper">
                    <div class="comment-content">
                        <p>${comment.content}</p>
                        <p class="comment-author">
                            By ${comment.author} on ${new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            `);
            })
            .join("");
    }
}
