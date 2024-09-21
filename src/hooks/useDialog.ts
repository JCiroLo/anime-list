import { useContext } from "react";

import { DialogContext } from "@/providers/DialogProvider";

const useDialog = () => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }

  return context;
};

export default useDialog;
