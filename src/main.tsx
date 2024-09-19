import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "@/router";

import { ApolloProvider, ThemeProvider } from "@/providers";

import "@justinribeiro/lite-youtube";
import "swiper/css";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </ApolloProvider>
);
