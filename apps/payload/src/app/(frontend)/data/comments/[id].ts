import config from "@payload-config";
import type { NextApiRequest, NextApiResponse } from "next";
import { getPayload } from "payload";

const payload = await getPayload({ config });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Post ID is required" });
  }

  try {
    const data = await payload.find({
      collection: "comments",
      depth: 2,
      where: {
        "post.id": {
          equals: id,
        },
      },
    });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
}
