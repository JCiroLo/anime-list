import { createTheme, PaletteOptions } from "@mui/material";

type TLightTheme = PaletteOptions;

const lightMode: TLightTheme = {
  primary: {
    main: "#175CFF",
  },
  secondary: {
    main: "#646470",
  },
  accent: createTheme().palette.augmentColor({
    color: {
      main: "#a154db",
    },
    name: "accent",
  }),
  background: {
    default: "#F8F8F8",
    dialog: "#FFFFFF",
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
