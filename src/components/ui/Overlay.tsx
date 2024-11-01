import { Box, useTheme } from "@mui/material";

import type { CSSProperties, FC } from "react";
import type { BoxProps, Theme } from "@mui/material";

type TGradientColor = {
  color: CSSProperties["color"];
  length?: number;
};
type TGradientProps = BoxProps & {
  colors: ((theme: Theme) => TGradientColor[]) | TGradientColor[];
  zIndex?: number;
  degrees?: number;
};
type TOverlayProps = BoxProps & {
  zIndex?: number;
};
type TOverlay = FC<TOverlayProps> & {
  Gradient: FC<TGradientProps>;
};

const Overlay: TOverlay = ({ zIndex = 5, ...rest }) => {
  const theme = useTheme();

  return (
    <Box
      {...rest}
      position="absolute"
      zIndex={zIndex}
      bgcolor={theme.palette.custom.overlay}
      width="100%"
      height="100%"
      sx={{ ...rest.sx, inset: 0, pointerEvents: "none" }}
    />
  );
};

const Gradient: FC<TGradientProps> = ({ colors, zIndex = 5, degrees = 180, ...rest }) => {
  const theme = useTheme();

  const colorsArray = typeof colors === "function" ? colors(theme) : colors;
  const computedColors = colorsArray.map(({ color, length }) => [color, length ? `${length}%` : null].filter(Boolean).join(" ")).join(", ");
  const gradient = `linear-gradient(${degrees}deg, ${computedColors})`;

  return (
    <Box
      {...rest}
      position="absolute"
      zIndex={zIndex}
      width="100%"
      height="100%"
      sx={{ ...rest.sx, inset: 0, pointerEvents: "none", background: gradient }}
    />
  );
};

Overlay.Gradient = Gradient;

export default Overlay;
