import { PaletteOptions } from "@mui/material";

type TDarkTheme = PaletteOptions & {
  custom: {
    overlay: string;
  };
};

const darkMode: TDarkTheme = {
  mode: "dark",
  primary: {
    main: "#fff",
  },
  secondary: {
    main: "#646470",
  },
  background: {
    paper: "#29292ee0",
  },
  text: {
    primary: "#EDF2F4",
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
  divider: "#B1B1B1",
  custom: {
    overlay: "#00000030",
  },
};

export default darkMode;
