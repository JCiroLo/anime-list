import { createContext, useState } from "react";

import type { ReactNode, FC } from "react";

export type TPopoverContext = {
  open: (content: ReactNode) => void;
  close: () => void;
};
export type TPopoverProvider = FC<{
  children: ReactNode;
}>;

export const PopoverContext = createContext<TPopoverContext>({
  open: () => {},
  close: () => {},
});

const PopoverProvider: TPopoverProvider = ({ children }) => {
  const [popover, setPopover] = useState<ReactNode>(null);

  const open = (content: ReactNode) => {
    setPopover(content);
  };

  const close = () => {
    setPopover(null);
  };

  return (
    <PopoverContext.Provider value={{ open, close }}>
      {children}
      {popover}
    </PopoverContext.Provider>
  );
};

export default PopoverProvider;
