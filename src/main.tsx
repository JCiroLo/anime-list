import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import router from "@/router";
import { generateTheme } from "@/theme";

import "swiper/css";
import "@/assets/styles/main.css";

declare module "@mui/material/styles" {
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
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={generateTheme("dark")}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
