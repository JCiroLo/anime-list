import { createContext, useState, ReactNode, FC } from "react";
import { Dialog } from "@mui/material";

import { GrowTransition } from "@/components";

import type { DialogProps } from "@mui/material";

export type TDialogProps = {
  dialog: Omit<DialogProps, "open" | "onClose"> | null;
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
  };

  return (
    <DialogContext.Provider value={{ open, close }}>
      {children}
      <Dialog
        PaperProps={{ elevation: 0, sx: { borderRadius: 4 } }}
        TransitionComponent={GrowTransition}
        {...props.dialog}
        // Non assignable props
        open={Boolean(content)}
        onClose={close}
      >
        {content}
      </Dialog>
    </DialogContext.Provider>
  );
};

export default DialogProvider;
