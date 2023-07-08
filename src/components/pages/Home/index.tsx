import React from "react";
import { Box, Container, Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import Header from "./Header";
import SetTable from "./Table";
import useFilters from "hooks/useFilters";

import { getSets } from "utils/api";

interface IHomeProps {
  setsResponse: IGetSetsResponse;
  setsSettings: IGetSetsReqSettingsResponse;
}

export type FiltersType = {
  isArchived: boolean | undefined;
  category: string | undefined;
  clientOrBrand: string | undefined;
  sortBy: string | undefined;
  page: number;
};

const filtersInitial: FiltersType = {
  category: undefined,
  clientOrBrand: undefined,
  isArchived: undefined,
  sortBy: undefined,
  page: 0,
};

function Home({ setsResponse, setsSettings }: IHomeProps) {
  //FILTERS HOOK
  const [filters, setFilters] = useFilters<FiltersType>(filtersInitial);

  //Next Router
  const router = useRouter();

  //QUERY
  const queryProps = useQuery({
    queryKey: ["sets", { ...router.query }],
    queryFn: () => getSets(router.query),
    initialData: setsResponse,
  });

  return (
    <Container maxWidth="lg" sx={{ padding: "3rem 0" }}>
      <Header
        filters={filters}
        setFilters={setFilters}
        setsSettings={setsSettings}
      />
      <SetTable queryProps={queryProps} />
      <Box display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil((queryProps?.data?.total ?? 100) / 10)}
          color="primary"
          onChange={(_e, page) => setFilters({ page: page - 1 })}
        />
      </Box>
    </Container>
  );
}

export default Home;
