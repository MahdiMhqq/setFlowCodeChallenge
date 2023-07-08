import { faker } from "@faker-js/faker";
import type { NextApiRequest, NextApiResponse } from "next";

import { brandArr, categoryArr, clientsArr } from "utils/api";

const sets: ISetData[] = [];

const randomValue = (arr: string[]) => {
  const randomIndex = Math.floor(Math.random() * 5);
  return arr[randomIndex];
};

// Initial Data - 100 records
for (let i = 0; i < 100; i++) {
  const record = {
    index: i,
    id: faker.string.uuid(),
    createdAt: faker.date.past().toISOString(),
    name: faker.commerce.productName(),
    clientName: randomValue(clientsArr),
    isArchived: faker.datatype.boolean(),
    category: randomValue(categoryArr),
    address: faker.location.streetAddress(),
    nextAvailable: faker.date.future().toISOString(),
    updatedAt: faker.date.past().toISOString(),
    brandName: randomValue(brandArr),
    color: faker.color.rgb(),
  };

  sets.push(record);
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
  const { page, isArchived, category, clientOrBrand, sortBy } = queries;
  let data: ISetData[] = sets;
  let internalOffset = 0;
  let internalOrder = 10;
  let totalCount = 0;
  const fixedCount = 10;

  if (isArchived && isArchived === "true") {
    data = data.filter((set) => set.isArchived);
  }
  if (category) {
    const firstCategory = typeof category === "string" ? category : category[0];
    data = data.filter((set) => set.category === firstCategory);
  }
  if (clientOrBrand) {
    const firstClientOrBrand =
      typeof clientOrBrand === "string" ? clientOrBrand : clientOrBrand[0];
    data = data.filter(
      (set) =>
        set.brandName === firstClientOrBrand ||
        set.clientName === firstClientOrBrand
    );
  }
  if (page && !isNaN(Number(page))) {
    internalOffset = Number(page) * fixedCount;
    internalOrder = Number(fixedCount);
  }

  totalCount = data.length;
  data = data.slice(internalOffset, internalOffset + internalOrder);

  if (sortBy && typeof sortBy === "string") {
    switch (sortBy) {
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
