import cookie from '@elysiajs/cookie';
import { cors } from '@elysiajs/cors';
import { Html } from "@elysiajs/html";
import { Elysia } from "elysia";
import { Content } from '../components/Content';
import { NotFound } from '../components/Content/NotFound';
import { Post } from '../components/Content/Post';
import MainLayout from "../components/Layout";
import { fetchGlobalData } from '../utils/payload';

const router = new Elysia();

let headerGlobal = null;
let footerGlobal = null;

try {
    headerGlobal = await fetchGlobalData("header");
    footerGlobal = await fetchGlobalData("footer");
} catch (error) {
    console.error("Failed to fetch global data:", error);
}

router.use(cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Access-Control-Allow-Origin", "hx-request", "hx-target", "hx-current-url", "hx-trigger", "hx-include", "hx-swap", "hx-headers", "hx-post"],
    credentials: true,
}));

router.use(cookie());

router.get('/', async () => {
    const slug = "home";
    return (
        <MainLayout header={headerGlobal} footer={footerGlobal}>
            <Content slug={slug} />
        </MainLayout>
    );
});

router.get("/:slug", async ({ params: { slug } }) => {
    if (slug === "home" || slug === "index") {
        return new Response(null, {
            status: 302,
            headers: { Location: "/" },
        });
    }
    return (
        <MainLayout header={headerGlobal} footer={footerGlobal}>
            <Content slug={slug} />
        </MainLayout>
    );
});

router.get("post/:slug", async ({ params: { slug } }) => {
    return (
        <MainLayout header={headerGlobal} footer={footerGlobal}>
            <Post slug={slug} />
        </MainLayout>
    );
});

router.onError(({ code }) => {
    switch (code) {
        case 'NOT_FOUND':
            return (
                <NotFound />
            );
    }
});

export default router;