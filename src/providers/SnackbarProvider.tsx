import React from "react";
import { SnackbarProvider as NotistackProvider } from "notistack";

import { Snackbar } from "@/components";

import type { FC } from "react";
import type { TSnackbarSeverity } from "@/components/ui/Snackbar";

type TSnackbarProviderProps = {
  children: React.ReactNode;
};

declare module "notistack" {
  interface VariantOverrides {
    mui: {
      severity?: TSnackbarSeverity;
    };
  }
}

const SnackbarProvider: FC<TSnackbarProviderProps> = ({ children }) => {
  return (
    <NotistackProvider
      maxSnack={3}
      variant="mui"
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      Components={{ mui: Snackbar }}
    >
      {children}
    </NotistackProvider>
  );
};

export default SnackbarProvider;
