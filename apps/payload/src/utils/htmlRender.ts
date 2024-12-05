import { BlockFields, SerializedBlockNode } from "@payloadcms/richtext-lexical";
import { JsonObject } from "payload";

export const renderToHTML = (node: SerializedBlockNode): string => {
    const { fields } = node;
    const blockType = fields.blockType;

    switch (blockType) {
        case "hero":
            return renderHeroHTML(fields);
        case "code":
            return renderCodeHTML(fields);
        default:
            return `<span>Unknown block type ${blockType}</span>`;
    }
};

const renderHeroHTML = (fields: BlockFields<JsonObject>) => {
    if (!fields || typeof fields !== "object") {
        console.error("Error: 'fields' is undefined or not an object.");
        return "<div>Error: Missing or invalid fields data</div>";
    }

    const { backgroundImage, heading = "", text = "" } = fields;

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

const renderCodeHTML = (fields: BlockFields<JsonObject>) => {
    if (!fields || typeof fields !== "object") {
        console.error("Error: 'fields' is undefined or not an object.");
        return /*html*/ `<div>Error: Missing or invalid fields data</div>`;
    }

    const { code = "" } = fields;

    return /*html*/ `<pre><code>${code}</code></pre>`;
};
