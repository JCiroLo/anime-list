import { forwardRef, ReactNode, useState } from "react";
import { IconButton } from "@mui/material";

import type { MouseEvent } from "react";
import type { IconButtonProps } from "@mui/material";

type TIconButtonSwitchProps = {
  children: ({ state }: { state: boolean }) => ReactNode;
  timeout?: number;
  slotProps?: {
    button?: IconButtonProps;
  };
  onClick?: () => void;
};

const IconButtonSwitch = forwardRef<HTMLButtonElement, TIconButtonSwitchProps>(function IconButtonSwitch(props, ref) {
  const { children, timeout, slotProps, onClick } = props;

  const [state, setState] = useState(true);

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    setState((prev) => !prev);

    if (timeout) {
      setTimeout(() => setState((prev) => !prev), timeout);
    }

    onClick?.();
    slotProps?.button?.onClick?.(event);
  };

  return (
    <IconButton ref={ref} {...slotProps?.button} onClick={handleButtonClick}>
      {children({ state })}
    </IconButton>
  );
});

export default IconButtonSwitch;
