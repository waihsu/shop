import { createClient } from "contentful";

export default async function handler(req, res) {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });
  if (req.method === "GET") {
    const data = await client.getEntries({ content_type: "recipes" });
    const recipes = data.items;
    return res.status(200).json({ recipes });
  }
}
