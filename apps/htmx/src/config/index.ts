export interface MetaDataProps {
    title: string;
    description: string;
    keywords?: string;
}

export const corsConfig = {
    origin: "*",
    allowedHeaders: [
        "Content-Type",
        "Access-Control-Allow-Origin",
        "hx-request",
        "hx-target",
        "hx-current-url",
        "hx-trigger",
        "hx-include",
        "hx-swap",
        "hx-headers",
        "hx-post",
    ],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
};

export const routes = {
    HOME: "home",
    INDEX: "index",
};