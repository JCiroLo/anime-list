import type { PopoverOrigin } from "@mui/material";

export type TPopoverOrigin = {
  transform: PopoverOrigin;
  anchor: PopoverOrigin;
};
export type TArrowPosition =
  | "left-top"
  | "left-center"
  | "left-bottom"
  | "right-top"
  | "right-center"
  | "right-bottom"
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

const Popover = () => {
  return <div>Popover</div>;
};

export default Popover;
