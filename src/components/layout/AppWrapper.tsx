import { FC } from "react";
import { Outlet } from "react-router-dom";

import { Header, SearchDialog } from "@/components";

type TAppWrapper = FC;

const AppWrapper: TAppWrapper = () => {
  return (
    <>
      <Header />
      <Outlet />
      <SearchDialog />
    </>
  );
};

export default AppWrapper;
