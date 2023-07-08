import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    
    primary: {
      main: "#1C1E1E",
    },
    secondary: {
      main: "#F9F000",
    },
    background: {
      default: "#FFFFFF",
    },
    divider: "#3D3F3F",
    grey: {
      "400": "#E1E1E1",
    },
    text: {
      primary: "#1C1E1E",
      secondary: "#929393",
      
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    // MuiButton: {
    //   styleOverrides: {
    //     containedSecondary: {
    //       borderRadius: 9999,
    //       padding: "0.5rem 1.5rem",
    //       boxShadow: "none",
    //       ":hover": {
    //         boxShadow: "none"
    //       }
    //     },
    //   },
    // },
    MuiTabs: {
      
    }
  },
});

export default theme;
