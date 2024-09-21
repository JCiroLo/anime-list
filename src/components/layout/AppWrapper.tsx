import { FC } from "react";
import { Outlet } from "react-router-dom";

import { Header, SearchDialog } from "@/components";
import { DialogProvider } from "@/providers";

type TAppWrapper = FC;

const AppWrapper: TAppWrapper = () => {
  return (
    <DialogProvider>
      <Header />
      <Outlet />
      <SearchDialog />
    </DialogProvider>
  );
};

export default AppWrapper;
