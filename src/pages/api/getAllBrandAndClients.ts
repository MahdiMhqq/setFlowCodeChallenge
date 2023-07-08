import { NextApiRequest, NextApiResponse } from "next";
import { brandArr, clientsArr } from "utils/api";

export interface IGetAllCategoriesResponse {
  brandOrClients: string[];
}

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<IGetAllCategoriesResponse>
) {
  res.status(200).json({ brandOrClients: [...brandArr, ...clientsArr] });
}
