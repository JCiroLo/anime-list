import { forwardRef } from "react";
import { CustomContentProps, SnackbarContent } from "notistack";
import { Alert } from "@mui/material";

export type TSnackbarSeverity = "success" | "info" | "warning" | "error";
type SnackbarProps = CustomContentProps & {
  severity?: TSnackbarSeverity;
};

const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(({ severity, message }, ref) => {
  return (
    <SnackbarContent ref={ref}>
      <Alert severity={severity} sx={{ width: "100%", outline: 1.5 }}>
        {message}
      </Alert>
    </SnackbarContent>
  );
});

export default Snackbar;