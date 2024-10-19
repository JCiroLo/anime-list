import { Box } from "@mui/material";

import type { FC, ReactNode } from "react";
import type { BoxProps, Breakpoint } from "@mui/material";

type TGridProps = BoxProps & {
  children: ReactNode;
  cols: Partial<Record<Breakpoint, number>> | number;
  gap?: number;
  colGap?: number;
  rowGap?: number;
};

const Grid: FC<TGridProps> = ({ children, cols, colGap, rowGap, gap = 1, ...props }) => {
  const cGap = colGap || gap;
  const rGap = rowGap || gap;

  function getTemplateColumns(cols: TGridProps["cols"]) {
    if (typeof cols === "number") {
      return `repeat(${cols}, 1fr)`;
    }
    return Object.entries(cols).reduce((values, [key, value]) => ({ [key]: `repeat(${value}, 1fr)`, ...values }), {});
  }

  return (
    <Box {...props} display="grid" gridTemplateColumns={getTemplateColumns(cols)} columnGap={cGap} rowGap={rGap}>
      {children}
    </Box>
  );
};

export default Grid;
