import axios, { AxiosResponse } from "axios";
import { ParsedUrlQuery } from "querystring";

export const categoryArr = [
  "on Model",
  "Nature",
  "Product",
  "Still Life",
  "Night",
];
export const brandArr = ["Brand 1", "Brand 2", "Brand 3"];
export const clientsArr = ["Client 1", "Client 2"];
export const sortByArr = [
  "Recently Active",
  "Soon Available",
  "Recently Created",
];

export function getSets(queries: ParsedUrlQuery | undefined) {
  // const searchParams = new URLSearchParams(queries);
  
  // console.log("getSets", { searchParams });

  const setResponse = axios
    .get<any, AxiosResponse<IGetSetsResponse, any>>(
      "http://localhost:3000/api/getSets"
    )
    .then((res) => res.data);

  return setResponse;
}
