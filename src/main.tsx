import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "@/router";

import { ApolloProvider, BreakpointsProvider, SnackbarProvider, ThemeProvider } from "@/providers";

import "@justinribeiro/lite-youtube";
import "swiper/css";
import "swiper/css/pagination";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider>
    <ThemeProvider>
      <SnackbarProvider>
        <BreakpointsProvider>
          <RouterProvider router={router} />
        </BreakpointsProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </ApolloProvider>
);
