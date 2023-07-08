import React from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  borderRadius: 9999,
  padding: "0.5rem 1rem 0.5rem 1.5rem",
  boxShadow: "none",
  maxHeight: "2rem",
  ":hover": {
    boxShadow: "none",
  },
}));

function DropdownButton({
  isGhost,
  ...props
}: Omit<ButtonProps, "variant" | "endIcon"> & { isGhost?: boolean }) {
  return (
    <StyledButton
      variant={!isGhost ? "outlined" : "text"}
      endIcon={<KeyboardArrowDownIcon />}
      sx={{
        border: !isGhost ? "1px solid primary.main" : "none",
      }}
      {...props}
    />
  );
}

export default DropdownButton;
