import { FC } from "react";
import { Box, BoxProps, type Theme, useTheme } from "@mui/material";

type TGradient = FC<
  BoxProps & {
    color: string | ((theme: Theme) => string);
    zIndex?: number;
    degrees?: number;
  }
>;
type TOverlay = FC<
  BoxProps & {
    zIndex?: number;
  }
> & {
  Gradient: TGradient;
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

const Gradient: TGradient = ({ color, zIndex = 5, degrees = 180, ...rest }) => {
  const theme = useTheme();

  const gradient = `linear-gradient(${degrees}deg, ${typeof color === "function" ? color(theme) : color} 0%, rgba(0, 0, 0, 0) 100%)`;

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
