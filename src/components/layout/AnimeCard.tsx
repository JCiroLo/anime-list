import { FC, useState } from "react";
import { alpha, Box, Fade, Stack } from "@mui/material";

import { AnimePopover, Image } from "@/components";
import { ANIME, LAYOUT } from "@/constants";

import type { Breakpoint, StackProps, BoxProps } from "@mui/material";
import type { TAnime } from "@/types/Anime";

type TAnimeCard = FC<{
  anime: TAnime;
  origin?: string;
  props?: {
    container?: BoxProps;
    flyout?: StackProps;
  };
}>;

const AnimeCard: TAnimeCard = ({ anime, props }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Box
      position="relative"
      display="flex"
      sx={(t) => ({
        borderRadius: 1,
        "&:hover": {
          outline: 2,
          outlineColor: alpha(t.palette.primary.main, 0.75),
        },
        ...Object.entries(LAYOUT.grid.columns.exclude("xs", "xl")).reduce(
          (breakpoints, [key, value]) => ({
            ...breakpoints,
            [t.breakpoints.only(key as Breakpoint)]: {
              [`&:nth-of-type(${value}n) > .anime-card__flyout`]: {
                transform: `translate(calc(-50% + -${ANIME.popover.flyoutWidth / 2}px), -50%)`,
                left: "calc(100% + 24px - 4px)",
              },
              [`&:nth-of-type(${value}n + 1) > .anime-card__flyout`]: {
                transform: `translate(calc(-50% + ${ANIME.popover.flyoutWidth / 2}px), -50%)`,
                left: "calc(0% - 24px + 4px)",
              },
            },
          }),
          {}
        ),
      })}
      {...props?.container}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Image src={anime.coverImage} alt={anime.title.userPreferred} width="100%" borderRadius={1} aspect={115 / 163} preload />

      <Fade in={isHovering} style={{ transitionDelay: "400ms" }} unmountOnExit>
        <Stack
          className="anime-card__flyout"
          position="absolute"
          zIndex={20}
          display={{ xs: "none", sm: "flex" }}
          left="50%"
          top="50%"
          width={ANIME.popover.flyoutWidth}
          borderRadius={2}
          overflow="hidden"
          bgcolor={(t) => t.palette.background.paper}
          sx={{
            backdropFilter: "blur(8px) saturate(1.5)",
            transform: "translate(-50%, -50%)",
            transformOrigin: "0 0",
          }}
        >
          <AnimePopover anime={anime} />
        </Stack>
      </Fade>
    </Box>
  );
};

export default AnimeCard;
