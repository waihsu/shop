import { createClient } from "contentful";

export default async function handler(req, res) {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });
  // console.log(req.query);
  const slug = req.query;
  const { items } = await client.getEntries({
    content_type: "recipes",
    "fields.slug": slug,
  });
  const recipe = items[0];

  return res.status(200).json({ messg: "success", recipe: recipe });
}
