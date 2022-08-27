import { postsData } from "../../data/data";
import type { NextApiRequest, NextApiResponse } from "next";
export default function getPostsData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.json({ data: postsData });
  return postsData;
}
