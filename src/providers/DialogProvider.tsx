import { createContext, useState, ReactNode, FC } from "react";
import { Box, Dialog, IconButton } from "@mui/material";

import { GrowTransition } from "@/components";
import { CloseIcon } from "@/icons";

import type { DialogProps } from "@mui/material";

export type TDialogProps = {
  dialog: Omit<DialogProps, "open" | "onClose"> | null;
  preventClose?: boolean;
};
export type TDialogContext = {
  open: (content: ReactNode, props?: TDialogProps) => void;
  close: () => void;
};
export type TDialogProvider = FC<{
  children: ReactNode;
}>;

export const DialogContext = createContext<TDialogContext>({
  open: () => {},
  close: () => {},
});

const DialogProvider: TDialogProvider = ({ children }) => {
  const [content, setModalContent] = useState<ReactNode>(null);
  const [props, setProps] = useState<TDialogProps>({ dialog: null });

  const open = (content: ReactNode, props?: TDialogProps) => {
    setModalContent(content);
    setProps((prev) => ({ ...prev, ...props }));
  };

  const close = () => {
    setModalContent(null);

    setTimeout(() => {
      setProps({ dialog: null });
    }, 350);
  };

  return (
    <DialogContext.Provider value={{ open, close }}>
      {children}
      <Dialog
        // Assignable props
        PaperProps={{ elevation: 0, sx: { position: "relative", borderRadius: 4 } }}
        TransitionComponent={GrowTransition}
        {...props.dialog}
        // Non assignable props
        open={Boolean(content)}
        onClose={props.preventClose ? undefined : close}
      >
        {!props.preventClose && (
          <Box position="absolute" zIndex={1} sx={{ top: 8, right: 8 }}>
            <IconButton size="small" onClick={close}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}
        {content}
      </Dialog>
    </DialogContext.Provider>
  );
};

export default DialogProvider;
