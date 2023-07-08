import * as React from "react";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem, { MenuItemProps } from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";

const MenuStyled = styled(Menu)<MenuProps>(({ theme }) => ({
  "& .MuiMenu-paper": {
    marginTop: "0.25rem",
    borderRadius: "1.5rem",
    border: `1px solid ${theme.palette.primary.main}`,
  },
  "& .MuiList-root": {
    minWidth: "16rem"
  }
}));

function DropdownMenu(props: MenuProps) {
  return <MenuStyled {...props} />;
}

export default DropdownMenu;

const MenuItemStyled = styled(MenuItem)<MenuItemProps>(({ theme }) => ({}));

function Item(props: MenuItemProps) {
  return <MenuItemStyled {...props} />;
}

type DropdownMenu = React.FunctionComponent & {
  Item: React.FC;
};

DropdownMenu.Item = Item;
