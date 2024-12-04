export async function fetchPageData(slug: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/pages/by-slug/${slug}`
    );

    const data = await response.json();

    console.log("data", JSON.stringify(data, null, 2));

    if (data.length > 0) {
      return data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
}
