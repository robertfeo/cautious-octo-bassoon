import cookie from '@elysiajs/cookie';
import { cors } from '@elysiajs/cors';
import { Html } from "@elysiajs/html";
import { Context, Elysia } from "elysia";
import NodeCache from "node-cache";
import { z } from "zod";
import { Content } from '../components/Content';
import { NotFound } from '../components/Content/NotFound';
import { Post } from '../components/Content/Post';
import MainLayout from "../components/Layout";
import { FooterProps } from '../components/Layout/Footer';
import { HeaderProps } from '../components/Layout/Header';
import { corsConfig, MetaDataProps, routes } from '../config';
import { fetchGlobalData } from '../utils/payload';

interface GlobalState {
    header: HeaderProps;
    footer: FooterProps;
}

const defaultMetadata = {
    title: "My ElysiaJS App",
    description: "A web app built with ElysiaJS.",
    author: "Your Name",
};

const router = new Elysia();
const cache = new NodeCache({ stdTTL: 300 });

const slugSchema = z.object({
    slug: z.string().min(1, "Slug is required").regex(/^[a-zA-Z0-9_-]+$/, "Invalid slug format"),
});

const mergeMetadata = (customMetadata: Partial<MetaDataProps>) => {
    return { ...defaultMetadata, ...customMetadata };
};

const fetchCachedGlobalState = async (): Promise<GlobalState> => {
    const cached = { header: cache.get<HeaderProps>("header"), footer: cache.get<FooterProps>("footer") };

    if (cached.header && cached.footer) return { header: cached.header, footer: cached.footer };

    try {
        const [header, footer] = await Promise.all([
            cached.header || fetchGlobalData("header"),
            cached.footer || fetchGlobalData("footer"),
        ]);

        cache.set("header", header);
        cache.set("footer", footer);

        return { header, footer };
    } catch (error) {
        console.error("Failed to fetch global state:", error);
        throw new Error("Global data unavailable");
    }
};

const withGlobalState = async (
    slug: string,
    component: (slug: string) => JSX.Element,
    metadata: MetaDataProps
): Promise<JSX.Element | Response> => {
    try {
        const { header, footer } = await fetchCachedGlobalState();
        if (!header || !footer) {
            return new Response("Service Unavailable", { status: 503 });
        }
        return (
            <MainLayout header={header} footer={footer} metadata={metadata}>
                {component(slug)}
            </MainLayout>
        );
    } catch (error) {
        return new Response("Service Unavailable", { status: 503 });
    }
};

const renderContent = async (
    ctx: Context<any>,
    component: (slug: string) => JSX.Element
): Promise<JSX.Element | Response> => {
    const metadata = {
        title: `Page: ${ctx.params.slug}`,
        description: `This is the page for ${ctx.params.slug}.`,
        keywords: `${ctx.params.slug}, ElysiaJS`,
    };
    const validation = slugSchema.safeParse(ctx.params);
    if (!validation.success) {
        return new Response("Invalid slug", { status: 400 });
    }
    const { slug } = validation.data;
    if (slug === routes.HOME || slug === routes.INDEX) {
        return new Response(null, {
            status: 302,
            headers: { Location: "/" },
        });
    }
    return await withGlobalState(slug, component, metadata);
};

router.use(cors(corsConfig));
router.use(cookie());

router.get("/", async () => {
    const metadata = mergeMetadata({
        title: "Home Page",
        description: "Welcome to the homepage!",
    });
    return await withGlobalState(routes.HOME, (slug: string) => (<Content slug={slug} />), metadata);
});

router.get("/:slug", async (ctx: Context<any>) => {
    return await renderContent(ctx, (slug) => <Content slug={slug} />);
});

router.get("post/:slug", async (ctx: Context<any>) => {
    return await renderContent(ctx, (slug) => <Post slug={slug} />);
});

router.onError(({ code }) => {
    if (code === "NOT_FOUND") {
        return <NotFound />;
    }
});

export default router;
