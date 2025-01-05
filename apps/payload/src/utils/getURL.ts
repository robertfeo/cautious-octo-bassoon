import canUseDOM from "./canUseDOM"

export const getServerSideURL = () => {
    let url = process.env.NEXT_PUBLIC_SERVER_URL

    if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
        return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    }

    if (!url) {
        url = 'http://localhost:3000'
    }

    return url
}

export const getClientSideURL = () => {
    if (canUseDOM) {
        const protocol = window.location.protocol
        const domain = window.location.hostname
        const port = window.location.port

        return `${protocol}//${domain}${port ? `:${port}` : ''}`
    }

    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
        return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    }

    return process.env.NEXT_PUBLIC_SERVER_URL || ''
}

export function getAllowedOrigins(): string[] {
    const serverSideURL = process.env.PAYLOAD_HOST || "http://localhost:3000";
    const htmxContainerURL = process.env.HTMX_CONTAINER_NAME && process.env.HTMX_PORT
        ? `http://${process.env.HTMX_CONTAINER_NAME}:${process.env.HTMX_PORT}`
        : null;

    const localhostURL = "http://localhost:3001";

    return [serverSideURL, localhostURL, htmxContainerURL].filter(Boolean) as string[];
}
