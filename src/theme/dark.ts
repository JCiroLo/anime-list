import { PaletteOptions } from "@mui/material";

type TDarkTheme = PaletteOptions;

const darkMode: TDarkTheme = {
  mode: "dark",
  primary: {
    main: "#fff",
  },
  secondary: {
    main: "#646470",
  },
  background: {
    paper: "#292631e0",
    default: "#1b181d",
    dialog: "#0d0b1cfa",
  },
  text: {
    primary: "#f0edf4",
  },
  success: {
    main: "#63FF60",
    contrastText: "#000000",
  },
  warning: {
    main: "#FFDC60",
    contrastText: "#000000",
  },
  error: {
    main: "#FF6060",
    contrastText: "#FFFFFF",
  },
  custom: {
    overlay: "#00000030",
  },
};

export default darkMode;
