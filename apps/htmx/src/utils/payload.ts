export async function fetchPageData(slug: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/pages/by-slug/${slug}`,
      {
        headers: {
          Accept: "text/html",
        },
      }
    );

    if (!response.ok) {
      console.error("Error fetching page data:", response.statusText);
      return null;
    }

    const htmlContent = await response.text();

    return htmlContent;
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
}
