import React from "react";
import { Box } from "@mui/material";

type TImage = React.FC<{
  src: string;
  alt: string;
  aspect?: number;
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  viewTransitionName?: string;
  blur?: boolean;
  style?: React.CSSProperties;
}>;

const Image: TImage = ({
  src,
  alt,
  aspect,
  width = "auto",
  height = "auto",
  borderRadius = 0,
  objectFit = "cover",
  viewTransitionName,
  blur = false,
  style,
}) => {
  const realWidth = typeof width === "string" ? width : 8 * width;
  const realHeight = typeof height === "string" ? height : 8 * height;
  const realBorderRadius = typeof borderRadius === "string" ? borderRadius : 8 * borderRadius;

  return (
    <Box position="relative" display="flex">
      {blur && (
        <img
          src={src}
          alt={alt}
          width={realWidth}
          height={aspect ? undefined : realHeight}
          style={{
            ...style,
            position: "absolute",
            zIndex: -1,
            inset: 0,
            filter: "blur(12px) saturate(1.5)",
            borderRadius: realBorderRadius,
            objectFit: objectFit,
            aspectRatio: aspect,
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        width={realWidth}
        height={aspect ? undefined : realHeight}
        style={{
          ...style,
          borderRadius: realBorderRadius,
          objectFit: objectFit,
          aspectRatio: aspect,
          viewTransitionName: viewTransitionName,
        }}
      />
    </Box>
  );
};

export default Image;
