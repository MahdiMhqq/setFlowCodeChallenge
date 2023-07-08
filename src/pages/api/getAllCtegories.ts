import { NextApiRequest, NextApiResponse } from "next";
import { categoryArr } from "utils/api";

export interface IGetAllCategoriesResponse {
  categories: string[];
}

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<IGetAllCategoriesResponse>
) {
  res.status(200).json({ categories: categoryArr });
}
