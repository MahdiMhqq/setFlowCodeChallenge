import { NextApiRequest, NextApiResponse } from "next";
import { categoryArr, brandArr, clientsArr } from "utils/api";

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<IGetSetsReqSettingsResponse>
) {
  res.status(200).json({
    categories: categoryArr,
    brandOrClients: [...brandArr, ...clientsArr],
  });
}
