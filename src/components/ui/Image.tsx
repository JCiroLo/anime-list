import { forwardRef, useState } from "react";
import { alpha, Box } from "@mui/material";
import { ANIME } from "@/constants";

import type { CSSProperties } from "react";
import type { TAnimeImage } from "@/types/Anime";

type TImageProps = {
  alt: string;
  src?: string | TAnimeImage;
  aspect?: number;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  viewTransitionName?: string;
  animation?: {
    name: string;
    property: string;
    keyframes: Record<string, CSSProperties>;
  };
  blur?: boolean;
  preload?: boolean;
  lazy?: boolean;
};
export type TImageRef = HTMLElement;

const Image = forwardRef<TImageRef, TImageProps>((props, ref) => {
  const {
    src = ANIME.coverImage.notFound,
    alt,
    aspect,
    width = "auto",
    height = "auto",
    borderRadius = 0,
    objectFit = "cover",
    viewTransitionName,
    animation,
    blur = false,
    preload = false,
    lazy = false,
  } = props;

  const [isLoaded, setIsLoaded] = useState(!preload);

  const computedWidth = typeof width === "string" ? width : 8 * width;
  const computedHeight = typeof height === "string" ? height : 8 * height;
  const computedBorderRadius = borderRadius * 4;
  const imgWidth = String(width).includes("%") ? "100%" : computedWidth;
  const imgHeight = String(height).includes("%") ? "100%" : computedHeight;
  const computedSrc = {
    isLazy: typeof src !== "string",
    original: typeof src === "string" ? src : src.large,
    preview: typeof src === "string" ? src : src?.medium || src?.large,
    color: typeof src === "string" ? ANIME.coverImage.defaultColor : src?.color,
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <Box
      ref={ref}
      component="span"
      position="relative"
      display="flex"
      width={computedWidth}
      height={aspect ? undefined : computedHeight}
      sx={{
        aspectRatio: aspect,
        "&::before": {
          content: blur ? "''" : "none",
          position: "absolute",
          zIndex: -1,
          inset: 0,
          backgroundImage: `url(${computedSrc.preview || computedSrc.original})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(16px) saturate(1.5)",
          borderRadius: borderRadius,
          opacity: 0.6,
        },
        "& > img": {
          transition: (t) => t.transitions.create(["opacity"]),
          ...(animation ? { [`@keyframes ${animation.name}`]: animation.keyframes } : {}),
        },
      }}
    >
      <img
        src={computedSrc.original}
        alt={alt}
        width={imgWidth}
        height={aspect ? undefined : imgHeight}
        loading={lazy ? "lazy" : undefined}
        style={{
          borderRadius: computedBorderRadius,
          objectFit: objectFit,
          aspectRatio: aspect,
          opacity: isLoaded ? 1 : 0,
          viewTransitionName: viewTransitionName,
          animation: animation?.property,
        }}
        onLoad={handleImageLoad}
      />
      {!isLoaded && (
        <Box
          position="absolute"
          component="span"
          width={computedWidth}
          height={aspect ? undefined : computedHeight}
          borderRadius={borderRadius}
          sx={{
            inset: 0,
            zIndex: 2,
            aspectRatio: aspect,
            backdropFilter: "blur(4px) saturate(1.5)",
            animation: "image-pulse 2.5s ease infinite",
            "@keyframes image-pulse": {
              "0%": {
                bgcolor: (t) => alpha(t.palette.action.disabled, 0.1),
              },
              "50%": {
                bgcolor: (t) => alpha(t.palette.action.disabled, 0.3),
              },
              "100%": {
                bgcolor: (t) => alpha(t.palette.action.disabled, 0.1),
              },
            },
          }}
        />
      )}
    </Box>
  );
});

export default Image;
