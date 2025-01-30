const PAYLOAD_HOST = process.env.PAYLOAD_HOST || "http://localhost:3000";

export async function fetchPageData(slug: string) {
  try {
    const response = await fetch(`${PAYLOAD_HOST}/api/pages/by-slug/${slug}`, {
      headers: {
        Accept: "text/html",
      },
    });

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

export async function fetchPostData(slug: string) {
  try {
    const response = await fetch(`${PAYLOAD_HOST}/api/post/by-slug/${slug}`, {
      headers: {
        Accept: "text/html",
      },
    });

    if (!response.ok) {
      console.error("Error fetching post data:", response.statusText);
      return null;
    }

    const htmlContent = await response.text();
    return htmlContent;
  } catch (error) {
    console.error("Error fetching post data:", error);
    return null;
  }
}

export async function fetchGlobalData(slug: string, retries = 5, delay = 5000) {
  try {
    const response = await fetch(`${PAYLOAD_HOST}/api/globals/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Error fetching global data:", response.statusText);
      if (retries > 0) {
        console.log(`Retrying in ${delay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchGlobalData(slug, retries - 1, delay);
      }
      return null;
    }

    const globalData = await response.json();
    return globalData;
  } catch (error) {
    console.error("Error fetching global data:", error);
    if (retries > 0) {
      console.log(`Retrying in ${delay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchGlobalData(slug, retries - 1, delay);
    }
    return null;
  }
}