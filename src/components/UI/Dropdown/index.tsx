import React from "react";
import Box from "@mui/material/Box";

import DropdownMenu from "../Styled/DropdownMenu";
import DropdownButton from "./DropdownButton";

import type { SxProps, Theme } from "@mui/material/styles";

interface IDropdownProps {
  active: number;
  onChange: (selected: number) => void;
  items: string[];
  isGhost?: boolean;
  prefix?: string;
  sx?: SxProps<Theme> | undefined;
}

function Dropdown({
  items,
  active,
  onChange,
  isGhost = false,
  prefix,
  sx,
}: IDropdownProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    _event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    onChange(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={sx}>
      <DropdownButton onClick={handleClickOpen} isGhost={isGhost}>
        {prefix ?? ""} {items[active]}
      </DropdownButton>

      <DropdownMenu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        {items.map((item, index) => (
          <DropdownMenu.Item
            key={item}
            selected={index === active}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {item}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu>
    </Box>
  );
}

export default Dropdown;
