import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import router from "@/router";

import { ApolloProvider, ThemeProvider } from "@/providers";

import "@justinribeiro/lite-youtube";
import "swiper/css";
import "swiper/css/pagination";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider>
    <ThemeProvider>
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </ThemeProvider>
  </ApolloProvider>
);
