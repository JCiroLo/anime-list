import { PaletteOptions } from "@mui/material";

type TLightTheme = PaletteOptions & {
  custom: {
    overlay: string;
  };
};

const lightMode: TLightTheme = {
  primary: {
    main: "#175CFF",
  },
  secondary: {
    main: "#646470",
  },
  background: {
    default: "#F8F8F8",
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

export default lightMode;
