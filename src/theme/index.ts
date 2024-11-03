import { createTheme } from "@mui/material";
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
        fontSize: "2.5em",
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: "1.5em",
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h3: {
        lineHeight: 1.2,
      },
      h4: {
        lineHeight: 1.2,
      },
      h5: {
        lineHeight: 1.2,
      },
      h6: {
        lineHeight: 1.2,
      },
      body1: {
        fontWeight: 300,
        lineHeight: 1.25,
      },
      body2: {
        fontWeight: 300,
        lineHeight: 1.25,
      },
      caption: {
        fontWeight: 300,
      },
    },
    zIndex: {
      search: 900,
    },
    shape: {
      borderRadius: 4,
    },
    sizes: {
      header: {
        height: 6,
        realHeight: 6 * 8,
      },
      sidebar: {
        width: 32,
        realWidth: 32 * 8,
        collapsedWidth: 9,
        collapsedRealWidth: 9 * 8,
      },
      hero: {
        height: 40,
        realHeight: 8 * 40,
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1600,
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
            "::-webkit-scrollbar": {
              width: 6,
              height: 6,
            },
            "::-webkit-scrollbar-thumb": {
              borderRadius: 16,
              background: "#FFFFFF30",

              "&:hover": {
                background: "#FFFFFF99",
              },
            },
            "::-webkit-scrollbar-track": {
              background: "transparent",
            },
          };
        },
      },
      MuiAvatar: {
        variants: [
          {
            props: {
              variant: "rounded",
            },
            style: {
              borderRadius: 8,
            },
          },
        ],
      },
      MuiStack: {
        defaultProps: {
          useFlexGap: true,
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
        },
      },
      MuiTextField: {
        variants: [
          {
            props: {
              variant: "filled",
            },
            style: {
              "& .MuiInputBase-root": {
                borderRadius: 8,
                backdropFilter: "blur(8px) saturate(1.5)",
                "&::after, &::before": {
                  content: "none",
                },
              },
            },
          },
        ],
      },
      MuiButton: {
        defaultProps: {
          variant: "contained",
          disableElevation: true,
        },
      },
      MuiLink: {
        defaultProps: {
          underline: "hover",
        },
      },
      MuiDialog: {
        defaultProps: {
          PaperProps: {
            sx: {
              borderRadius: 4,
            },
          },
          slotProps: {
            backdrop: {
              sx: {
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                backdropFilter: "blur(4px)",
              },
            },
          },
        },
      },
      MuiDialogActions: {
        defaultProps: {
          sx: {
            padding: 2,
          },
        },
      },
      MuiTooltip: {
        defaultProps: {
          arrow: true,
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            backdropFilter: "blur(4px) saturate(1.5)",
          },
        },
      },
      MuiListItemButton: {
        defaultProps: {
          sx: {
            padding: 1,
            borderRadius: 3,
          },
        },
      },
      MuiListItemText: {
        defaultProps: {
          primaryTypographyProps: {
            variant: "body1",
            fontWeight: 500,
          },
          secondaryTypographyProps: {
            variant: "body2",
            color: "text.secondary",
          },
          sx: {
            margin: 0,
          },
        },
      },
      MuiListItemIcon: {
        defaultProps: {
          sx: {
            minWidth: 32,
            marginRight: 1,
          },
        },
      },
      MuiTableCell: {
        defaultProps: {
          sx: {
            borderBottom: "none",
          },
        },
      },
    },
  });
