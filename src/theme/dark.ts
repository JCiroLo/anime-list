import { createTheme, PaletteOptions } from "@mui/material";

type TDarkTheme = PaletteOptions;

const darkMode: TDarkTheme = {
  mode: "dark",
  primary: {
    main: "#ffffff",
  },
  secondary: {
    main: "#646470",
  },
  accent: createTheme().palette.augmentColor({
    color: {
      main: "#8e60a5",
    },
    name: "accent",
  }),
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
