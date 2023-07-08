declare interface ISetData {
  index: number;
  id: string;
  createdAt: string;
  name: string;
  color: string;
  clientName: string;
  isArchived: boolean;
  category: string;
  address: string;
  nextAvailable: string;
  updatedAt: string;
  brandName: string;
}

declare interface IGetSetsResponse {
  items: ISetData[];
  total: number;
}
