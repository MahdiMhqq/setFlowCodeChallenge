import React from "react";
import { Container } from "@mui/material";

import Header from "./Header";
import SetTable from "./Table";
import useFilters from "hooks/useFilters";

interface IHomeProps {
  sets: ISetData[];
}

export type FiltersType = {
  isArchived: boolean | undefined;
  category: string | undefined;
  clientOrBrand: string | undefined;
  sortBy: string | undefined;
};

const filtersInitial: FiltersType = {
  category: undefined,
  clientOrBrand: undefined,
  isArchived: undefined,
  sortBy: undefined,
};

function Home({ sets }: IHomeProps) {
  //FILTERS HOOK
  const [filters, setFilters] = useFilters<FiltersType>(filtersInitial);

  //QUERY

  return (
    <Container maxWidth="lg">
      <Header filters={filters} setFilters={setFilters} />
      <SetTable sets={sets} />
    </Container>
  );
}

export default Home;
