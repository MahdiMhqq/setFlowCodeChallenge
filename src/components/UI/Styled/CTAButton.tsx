import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const ButtonStyled = styled(Button)<ButtonProps>(() => ({
  borderRadius: 9999,
  padding: "0.5rem 1.5rem",
  boxShadow: "none",
  ":hover": {
    boxShadow: "none",
  },
}));

function CTAButton(props: Omit<ButtonProps, "variant" | "color">) {
  return <ButtonStyled variant="contained" color="secondary" {...props} />;
}

export default CTAButton;
