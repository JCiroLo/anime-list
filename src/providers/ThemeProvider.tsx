import { CssBaseline, ThemeProvider as Theme } from "@mui/material";

import { generateTheme } from "@/theme";

import type { FC } from "react";

declare module "@mui/material/styles" {
  interface Theme {
    sizes: {
      header: {
        height: number;
        realHeight: number;
      };
      sidebar: {
        width: number;
        realWidth: number;
        collapsedWidth: number;
        collapsedRealWidth: number;
      };
      hero: {
        height: number;
        realHeight: number;
      };
    };
  }
  interface ThemeOptions {
    sizes: {
      header: {
        height: number;
        realHeight: number;
      };
      sidebar: {
        width: number;
        realWidth: number;
        collapsedWidth: number;
        collapsedRealWidth: number;
      };
      hero: {
        height: number;
        realHeight: number;
      };
    };
  }
  interface Palette {
    accent: Palette["primary"];
    custom: {
      overlay: string;
    };
  }
  interface PaletteOptions {
    accent: PaletteOptions["primary"];
    custom?: {
      overlay: string;
    };
  }
  interface TypeBackground {
    dialog: string;
  }
  interface ZIndex {
    search: number;
  }
  interface BreakpointOverrides {
    xxl: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    accent: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    accent: true;
  }
}

declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    accent: true;
  }
}

type TThemeProvider = FC<{
  children: React.ReactNode;
}>;

const ThemeProvider: TThemeProvider = ({ children }) => {
  return (
    <Theme theme={generateTheme("dark")}>
      <CssBaseline />
      {children}
    </Theme>
  );
};

export default ThemeProvider;
