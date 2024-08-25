import { FC, ReactNode } from "react";
import { Box, type BoxProps } from "@mui/material";

type TGrid = FC<{
  children: ReactNode;
  cols: number;
  gap?: number;
  colGap?: number;
  rowGap?: number;
  props?: {
    container: BoxProps;
  };
}>;

const Grid: TGrid = ({ children, cols, colGap, rowGap, gap = 1, props }) => {
  const templateColumns = `repeat(${cols}, 1fr)`;
  const cGap = colGap || gap;
  const rGap = rowGap || gap;

  return (
    <Box {...props?.container} display="grid" gridTemplateColumns={templateColumns} columnGap={cGap} rowGap={rGap}>
      {children}
    </Box>
  );
};

export default Grid;
