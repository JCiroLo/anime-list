import { CssBaseline, ThemeProvider as Theme } from "@mui/material";

import { generateTheme } from "@/theme";
import { FC } from "react";

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
    custom: {
      overlay: string;
    };
  }
  interface PaletteOptions {
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
