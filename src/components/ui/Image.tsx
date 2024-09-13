import { forwardRef, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { ANIME } from "@/constants";

import type { TAnimeImage } from "@/types/Anime";

type TImageProps = {
  src: string | TAnimeImage;
  alt: string;
  aspect?: number;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  viewTransitionName?: string;
  blur?: boolean;
  preload?: boolean;
};
export type TImageRef = HTMLElement;

const Image = forwardRef<TImageRef, TImageProps>((props, ref) => {
  const {
    src,
    alt,
    aspect,
    width = "auto",
    height = "auto",
    borderRadius = 0,
    objectFit = "cover",
    viewTransitionName,
    blur = false,
    preload = false,
  } = props;

  const [isLoaded, setIsLoaded] = useState(!preload);
  const computedSrc = useMemo(
    () => ({
      isLazy: typeof src !== "string",
      original: typeof src === "string" ? src : src.large,
      preview: typeof src === "string" ? src : src?.medium || src?.large,
      color: typeof src === "string" ? ANIME.coverImage.defaultColor : src?.color,
    }),
    [src]
  );
  const computedWidth = useMemo(() => (typeof width === "string" ? width : 8 * width), [width]);
  const computedHeight = useMemo(() => (typeof height === "string" ? height : 8 * height), [height]);
  const computedBorderRadius = useMemo(() => borderRadius * 4, [borderRadius]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <Box
      ref={ref}
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
          filter: "blur(12px) saturate(1.5)",
          borderRadius: borderRadius,
        },
        "&::after": {
          content: computedSrc.isLazy && !isLoaded ? "''" : "none",
          position: "absolute",
          inset: 0,
          opacity: 0.2,
          background: `url(${computedSrc.preview}) center/cover no-repeat`,
          backgroundColor: computedSrc.color,
          borderRadius: borderRadius,
        },
        "& > img": {
          transition: (t) => t.transitions.create(["opacity"]),
        },
      }}
    >
      <img
        src={computedSrc.original}
        alt={alt}
        width={computedWidth}
        height={aspect ? undefined : computedHeight}
        style={{
          borderRadius: computedBorderRadius,
          objectFit: objectFit,
          aspectRatio: aspect,
          opacity: isLoaded ? 1 : 0,
          viewTransitionName: viewTransitionName,
        }}
        onLoad={handleImageLoad}
      />
      {!isLoaded && (
        <Box
          position="absolute"
          width={computedWidth}
          height={aspect ? undefined : computedHeight}
          borderRadius={borderRadius}
          sx={{
            inset: 0,
            zIndex: 1,
            aspectRatio: aspect,
            bgcolor: (t) => t.palette.action.disabled,
            backdropFilter: "blur(16px) saturate(1.5)",
            animation: "image-pulse 2.5s ease infinite",
            "@keyframes image-pulse": {
              "0%": {
                opacity: 0.1,
              },
              "50%": {
                opacity: 0.5,
              },
              "100%": {
                opacity: 0.1,
              },
            },
          }}
        />
      )}
    </Box>
  );
});

export default Image;
