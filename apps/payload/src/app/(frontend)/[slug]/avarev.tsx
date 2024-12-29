type PageProps = {
    params: Promise<{ slug: string }>;
};

const Page = async ({ params: paramsPromise }: PageProps) => {
    const params = await paramsPromise;
    const slug = params.slug || "home";

    const payload = await getPayload({ config: configPromise });

    const result = await payload.find({
        collection: "pages",
        limit: 1,
        where: {
            slug: {
                equals: slug,
            },
        },
    });

    const page: PageType | null = result.docs?.[0] || null;

    if (!page) {
        return notFound();
    }

    return (
        <>
            <div className="flex flex-col w-4/6 justify-center mx-auto">
                <RichText content={page.content || []} />
            </div>
        </>
    );
};

export default Page;