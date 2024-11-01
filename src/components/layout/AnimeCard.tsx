import { useState } from "react";
import { alpha, Box, Stack } from "@mui/material";

import { AnimePopover, Image, Overlay, Text } from "@/components";
import { useBreakpoints, useViewTransition } from "@/hooks";
import { ANIME, LAYOUT } from "@/constants";
import { BreakpointsUtils, Route } from "@/utils";

import type { FC } from "react";
import type { Breakpoint, BoxProps } from "@mui/material";
import type { TAnime } from "@/types/Anime";
import { useNavigate } from "react-router-dom";

type TAnimeCardProps = {
  anime: TAnime;
  origin?: string;
  index?: number;
  props?: {
    layout?: Record<Breakpoint, number>;
    container?: BoxProps;
  };
  onClick?: (anime: TAnime) => void;
};

const AnimeCard: FC<TAnimeCardProps> = ({ anime, index, props }) => {
  const { layout = LAYOUT.grid.columns.six, container } = props || {};

  const navigate = useNavigate();
  const viewTransition = useViewTransition();
  const { isTabletOrBelow } = useBreakpoints();

  const [renderPopover, setRenderPopover] = useState(false);

  const handleMouseEnter = () => {
    setRenderPopover(true);
  };

  const handleMouseLeave = () => {
    setRenderPopover(false);
  };

  const handleCardClick = () => {
    if (isTabletOrBelow) {
      viewTransition(() => navigate(Route.to("anime", anime.id)));

      return;
    }

    if (!renderPopover) {
      setRenderPopover(true);
    }
  };

  return (
    <Box
      component="article"
      position="relative"
      display="flex"
      sx={(t) => ({
        borderRadius: 1,
        outlineColor: alpha(t.palette.primary.main, 0.75),
        "&:hover": {
          outline: 2,
          "& > .anime-card__flyout": {
            visibility: "visible",
            opacity: 1,
            scale: 1,
            transition: t.transitions.create(["visibility", "opacity", "scale"], { delay: 400 }),
          },
        },
        ...Object.entries(BreakpointsUtils.exclude(layout, ["xs", "xl"])).reduce(
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
      {...container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      <Image src={anime.coverImage} alt={anime.title.userPreferred} width="100%" borderRadius={1} aspect={115 / 163} preload lazy />

      {index !== undefined && (
        <>
          <Overlay.Gradient
            colors={(theme) => [
              { color: theme.palette.background.default, length: 5 },
              { color: "transparent", length: 30 },
            ]}
            zIndex={1}
            degrees={15}
          />
          <Text
            className="anime-card__index"
            component="span"
            fontSize="2.5em"
            fontWeight={700}
            lineHeight={1}
            color="text.secondary"
            position="absolute"
            zIndex={2}
            left={4}
            bottom={4}
          >
            {index}
          </Text>
        </>
      )}

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
          viewTransitionName: `anime-card-${anime.id}`,
          visibility: "hidden",
          opacity: 0,
          scale: 0.4,
          transform: "translate(-50%, -50%)",
          transformOrigin: "0 0",
          transition: (t) => t.transitions.create(["visibility", "opacity", "scale"], { delay: 0 }),
        }}
      >
        <AnimePopover anime={anime} mounted={renderPopover} />
      </Stack>
    </Box>
  );
};

export default AnimeCard;
