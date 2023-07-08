import axios, { AxiosResponse } from "axios";
import { ParsedUrlQuery } from "querystring";
import { encode } from "querystring";

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

export function getSets(queries: ParsedUrlQuery) {
  const urlQueryString = encode(queries);

  const setResponse = axios
    .get<any, AxiosResponse<IGetSetsResponse, any>>(
      "http://localhost:3000/api/getSets" +
        (urlQueryString ? `?${urlQueryString}` : "")
    )
    .then((res) => res.data);

  return setResponse;
}

export function getSetsReqSettings() {
  const setsSettings = axios
    .get<any, AxiosResponse<IGetSetsReqSettingsResponse, any>>(
      "http://localhost:3000/api/getSetsReqSettings"
    )
    .then((res) => res.data);

  return setsSettings;
}
