import { createBrowserRouter } from "react-router-dom";

import { About, Home } from "@/pages";
import { AppWrapper } from "@/components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

export default router;
