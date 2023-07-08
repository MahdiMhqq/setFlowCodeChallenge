import { faker } from "@faker-js/faker";
import type { NextApiRequest, NextApiResponse } from "next";

import { brandArr, categoryArr, clientsArr } from "utils/api";

interface ISetData {
  index: number;
  id: string;
  createdAt: string;
  name: string;
  clientName: string;
  isArchived: boolean;
  category: string;
  address: string;
  nextAvailable: string;
  updatedAt: string;
  brandName: string;
}

const sets: ISetData[] = [];

const randomValue = (arr: string[]) => {
  const randomIndex = Math.floor(Math.random() * 5);
  return arr[randomIndex];
};

// Initial Data - 100 records
for (let i = 0; i < 100; i++) {
  const record = {
    index: i,
    id: faker.datatype.uuid(),
    createdAt: faker.date.past().toISOString(),
    name: faker.commerce.productName(),
    clientName: randomValue(clientsArr),
    isArchived: faker.datatype.boolean(),
    category: randomValue(categoryArr),
    address: faker.address.streetAddress(),
    nextAvailable: faker.date.future().toISOString(),
    updatedAt: faker.date.past().toISOString(),
    brandName: randomValue(brandArr),
  };

  sets.push(record);
}

interface IGetSetsResponse {
  items: ISetData[];
  total: number;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IGetSetsResponse>
) {
  const queries = req.query;
  const requestedSets = prepareResponse(queries);
  res
    .status(200)
    .json({ items: requestedSets.data, total: requestedSets.totalCount });
}

const prepareResponse = (
  queries: Partial<{
    [key: string]: string | string[];
  }>
) => {
  const { offset, order, isArchived, category, brandOrClientName, sort } =
    queries;
  let data: ISetData[] = sets;
  let internalOffset = 0;
  let internalOrder = 10;
  let totalCount = 0;

  if (isArchived && isArchived === "true") {
    data = data.filter((set) => set.isArchived);
  }
  if (category) {
    const firstCategory = typeof category === "string" ? category : category[0];
    data = data.filter((set) => set.category === firstCategory);
  }
  if (brandOrClientName) {
    const firstBrandOrClientName =
      typeof brandOrClientName === "string"
        ? brandOrClientName
        : brandOrClientName[0];
    data = data.filter(
      (set) =>
        set.brandName === firstBrandOrClientName ||
        set.clientName === firstBrandOrClientName
    );
  }
  if (offset && !isNaN(Number(offset))) {
    internalOffset = Number(offset);
  }
  if (order && !isNaN(Number(order))) {
    internalOrder = Number(order);
  }

  totalCount = data.length;
  data = data.slice(internalOffset, internalOrder);

  if (sort && typeof sort === "string") {
    switch (sort) {
      case "recentlyActive":
        data.sort(
          (a, b) =>
            new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf()
        );
        break;
      case "soonAvailable":
        data.sort(
          (a, b) =>
            new Date(a.nextAvailable).valueOf() -
            new Date(b.nextAvailable).valueOf()
        );
        break;
      default:
        data.sort(
          (a, b) =>
            new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
        );
        break;
    }
  }

  return { data, totalCount };
};
