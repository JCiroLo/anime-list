import { FC } from "react";
import { Box, type Theme, useTheme } from "@mui/material";

type TGradient = FC<{
  color: string | ((theme: Theme) => string);
  zIndex?: number;
  degrees?: number;
}>;
type TOverlay = FC<{
  zIndex?: number;
}> & {
  Gradient: TGradient;
};

const Overlay: TOverlay = ({ zIndex = 5 }) => {
  const theme = useTheme();

  return (
    <Box
      position="absolute"
      zIndex={zIndex}
      bgcolor={theme.palette.custom.overlay}
      width="100%"
      height="100%"
      sx={{ inset: 0, pointerEvents: "none" }}
    />
  );
};

const Gradient: TGradient = ({ color, zIndex = 5, degrees = 180 }) => {
  const theme = useTheme();

  const gradient = `linear-gradient(${degrees}deg, ${typeof color === "function" ? color(theme) : color} 0%, rgba(0, 0, 0, 0) 100%)`;

  return (
    <Box position="absolute" zIndex={zIndex} width="100%" height="100%" sx={{ inset: 0, pointerEvents: "none", background: gradient }} />
  );
};

Overlay.Gradient = Gradient;

export default Overlay;
