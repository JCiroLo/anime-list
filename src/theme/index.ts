import { Shadows, createTheme } from "@mui/material";
import dark from "./dark";
import light from "./light";

type TThemeMode = "light" | "dark";

export const generateTheme = (mode: TThemeMode) =>
  createTheme({
    palette: mode === "light" ? light : dark,
    typography: {
      fontFamily: "'Lato', sans-serif",
      button: {
        textTransform: "initial",
        fontWeight: 700,
      },
      h1: {
        lineHeight: 1,
      },
      h2: {
        lineHeight: 1,
      },
      h3: {
        lineHeight: 1,
      },
      h4: {
        lineHeight: 1,
      },
      h5: {
        lineHeight: 1,
      },
      h6: {
        lineHeight: 1,
      },
    },
    shape: { borderRadius: 4 },
    breakpoints: {
      values: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
      },
    },
    // debouncing: {
    //   delay: 500,
    // },
    components: {
      MuiCssBaseline: {
        styleOverrides() {
          return {
            "*": {
              boxSizing: "border-box",
            },
          };
        },
      },
      MuiDialog: {
        defaultProps: {
          sx: {
            "& .MuiModal-backdrop": {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(2.5px)",
            },
          },
        },
      },
      MuiStack: {
        defaultProps: {
          useFlexGap: true,
        },
      },
      MuiButton: {
        defaultProps: {
          variant: "contained",
          disableElevation: true,
        },
      },
      MuiListItemIcon: {
        defaultProps: {
          sx: {
            minWidth: 32,
          },
        },
      },
    },
  });
