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
  const gaps = {
    col: colGap || gap,
    row: rowGap || gap,
  };

  function getTemplateColumns(cols: TGridProps["cols"]) {
    if (typeof cols === "number") {
      return `repeat(${cols}, 1fr)`;
    }
    return Object.entries(cols).reduce((values, [key, value]) => ({ [key]: `repeat(${value}, 1fr)`, ...values }), {});
  }

  return (
    <Box
      {...props}
      display="grid"
      gridTemplateColumns={getTemplateColumns(cols || { xs: 3, sm: 4, md: 5, lg: 6, xl: 6 })}
      columnGap={gaps.col}
      rowGap={gaps.row}
    >
      {children}
    </Box>
  );
};

export default Grid;
