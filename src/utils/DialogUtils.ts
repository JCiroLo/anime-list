import { DialogProps } from "@mui/material";

export type TDefaultDialogProps = Omit<DialogProps, "open" | "onClose">;
