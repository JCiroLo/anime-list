import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Stack } from "@mui/material";

import { Header } from "@/components";
import router from "@/router";

import { ApolloProvider, ThemeProvider } from "@/providers";

import "swiper/css";
import "@/assets/styles/main.css";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider>
    <ThemeProvider>
      <Header />
      <Stack component="main" pb={24}>
        <RouterProvider router={router} />
      </Stack>
    </ThemeProvider>
  </ApolloProvider>
);
