import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BlackTabs from "components/UI/Styled/BlackTabs";
import CTAButton from "components/UI/Styled/CTAButton";
import Dropdown from "components/UI/Dropdown";
import { brandArr, categoryArr, clientsArr, sortByArr } from "utils/api";

import type { FiltersType } from "..";

interface IHeaderProps {
  filters: FiltersType;
  setFilters: (filters: Partial<FiltersType>) => void;
}

const categoryArrDropdown = ["All", ...categoryArr];
const brandsAndClientsArrDropdown = ["All", ...brandArr, ...clientsArr];
const sortByArrDropdown = [...sortByArr];

function Header({ filters, setFilters }: IHeaderProps) {
  //LOGIC
  ////// Category
  const categoryActive = (filters: FiltersType) => {
    if (!filters.category) return 0;
    else return categoryArrDropdown.indexOf(filters.category);
  };
  const categoryChangeHandler = (selected: number) => {
    if (selected === 0) setFilters({ category: undefined });
    else setFilters({ category: categoryArrDropdown[selected] });
  };

  ////// Category
  const brandActive = (filters: FiltersType) => {
    if (!filters.clientOrBrand) return 0;
    else return brandsAndClientsArrDropdown.indexOf(filters.clientOrBrand);
  };
  const brandChangeHandler = (selected: number) => {
    if (selected === 0) setFilters({ clientOrBrand: undefined });
    else setFilters({ clientOrBrand: brandsAndClientsArrDropdown[selected] });
  };

  ////// SortBy
  const sortByActive = (filters: FiltersType) => {
    if (!filters.sortBy) return 0;
    else return sortByArrDropdown.indexOf(filters.sortBy);
  };
  const sortByChangeHandler = (selected: number) => {
    if (selected === 0) setFilters({ sortBy: undefined });
    else setFilters({ sortBy: sortByArrDropdown[selected] });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ marginTop: "6rem", marginBottom: "2rem", fontWeight: "500" }}
      >
        Sets
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        <BlackTabs
          value={!!filters?.isArchived ? 1 : 0}
          onChange={(_e, index) => {
            console.log(index);
            setFilters({ isArchived: index === 1 ? true : undefined });
          }}
        >
          <BlackTabs.Tab label="Active" />
          <BlackTabs.Tab label="Archived" />
        </BlackTabs>
        <CTAButton endIcon={<AddIcon />}>New Set</CTAButton>
      </Box>
      <Divider variant="fullWidth" sx={{ marginBottom: "1rem" }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <Box sx={{ display: "flex", gapX: "0.5rem" }}>
          <Dropdown
            isGhost
            items={categoryArrDropdown}
            prefix="Category: "
            active={categoryActive(filters)}
            onChange={categoryChangeHandler}
          />
          <Divider orientation="vertical" flexItem />
          <Dropdown
            isGhost
            items={brandsAndClientsArrDropdown}
            prefix="Client/Brand: "
            active={brandActive(filters)}
            onChange={brandChangeHandler}
          />
        </Box>
        <Dropdown
          items={sortByArrDropdown}
          prefix="Sort By: "
          active={sortByActive(filters)}
          onChange={sortByChangeHandler}
        />
      </Box>
      <Divider variant="fullWidth" sx={{ marginBottom: "1rem" }} />
    </Box>
  );
}

export default Header;
