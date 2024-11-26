import config from "@payload-config";
import { getPayload } from "payload";

import { posts } from "./posts.json";

async function run() {
  try {
    const payload = await getPayload({ config });

    for (const post of posts) {
      await payload.create({
        collection: "posts",
        data: post,
      });
    }
  } catch (error) {
    console.error(JSON.stringify(error));
    process.exit(1);
  }

  process.exit(0);
}

await run();
