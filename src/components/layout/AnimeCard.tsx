import { FC } from "react";
import { alpha, Box, Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";

import { Grid, Image, Tag } from "@/components";
import { EyeIcon, PlusIcon } from "@/icons";
import { LAYOUT } from "@/constants";

import type { Breakpoint, StackProps, BoxProps } from "@mui/material";
import type { TAnime, TAnimeTrailer } from "@/types/Anime";

type TAnimeCard = FC<{
  anime: TAnime;
  origin: string;
  flyoutWidth: number;
  props?: {
    container?: BoxProps;
    flyout?: StackProps;
  };
  onWatchTrailer: (trailer: TAnimeTrailer, origin: string) => void;
}>;

const AnimeCard: TAnimeCard = ({ anime, origin, flyoutWidth, props, onWatchTrailer }) => {
  const handleWatchTrailer = () => {
    onWatchTrailer(anime.trailer, origin);
  };

  return (
    <Box
      position="relative"
      display="flex"
      sx={(t) => ({
        "&:hover": {
          borderRadius: 1,
          outline: 2,
          outlineColor: alpha(t.palette.primary.main, 0.75),
          "& > .anime-card__flyout": {
            visibility: "visible",
            opacity: 1,
            scale: 1,
            transition: t.transitions.create(["visibility", "opacity", "scale"], { delay: 400 }),
          },
        },
        ...Object.entries(LAYOUT.grid.columns.exclude("xs", "xl")).reduce(
          (breakpoints, [key, value]) => ({
            ...breakpoints,
            [t.breakpoints.only(key as Breakpoint)]: {
              [`&:nth-of-type(${value}n) > .anime-card__flyout`]: {
                transform: `translate(calc(-50% + -${flyoutWidth / 2}px), -50%)`,
                left: "calc(100% + 24px - 4px)",
              },
              [`&:nth-of-type(${value}n + 1) > .anime-card__flyout`]: {
                transform: `translate(calc(-50% + ${flyoutWidth / 2}px), -50%)`,
                left: "calc(0% - 24px + 4px)",
              },
            },
          }),
          {}
        ),
      })}
      {...props?.container}
    >
      <Image src={anime.coverImage} alt={anime.title.userPreferred} width="100%" borderRadius={1} aspect={115 / 163} preload />
      <Stack
        className="anime-card__flyout"
        position="absolute"
        zIndex={20}
        display={{ xs: "none", sm: "flex" }}
        left="50%"
        top="50%"
        width={flyoutWidth}
        borderRadius={2}
        overflow="hidden"
        bgcolor={(t) => t.palette.background.paper}
        sx={{
          backdropFilter: "blur(8px) saturate(1.5)",
          visibility: "hidden",
          opacity: 0,
          scale: 0.8,
          transform: "translate(-50%, -50%)",
          transformOrigin: "0 0",
          transition: (t) => t.transitions.create(["visibility", "opacity", "scale"], { delay: 0 }),
        }}
      >
        <Stack position="relative">
          <Image src={anime.bannerImage || anime.coverImage.large} alt={anime.title.userPreferred} aspect={16 / 9} width="100%" />
          <Stack position="absolute" direction="row" flexWrap="wrap-reverse" spacing={0.5} bottom={4} left={4}>
            {anime.genres?.map((genre) => (
              <Tag key={genre} label={genre} />
            ))}
          </Stack>
        </Stack>
        <Stack spacing={2} p={2}>
          <Stack>
            <Typography variant="h3" fontSize="1.25em" fontWeight={600}>
              {anime.title.userPreferred}
              &nbsp;
            </Typography>
            {anime.title.native && <Typography variant="caption">{anime.title.native}</Typography>}
          </Stack>
          <Stack direction="row" spacing={1}>
            <Tooltip title="Mark as watched" arrow>
              <IconButton>
                <EyeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add to list" arrow>
              <IconButton>
                <PlusIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          <Stack spacing={0.5}>
            <Typography fontWeight={700}>Synopsis:</Typography>
            <Typography
              variant="body2"
              fontWeight={300}
              sx={{ display: "-webkit-box", overflow: "hidden", WebkitBoxOrient: "vertical", WebkitLineClamp: 4 }}
            >
              {anime.description}
            </Typography>
          </Stack>
          <Grid cols={anime.trailer.id ? 2 : 1} gap={1}>
            {anime.trailer.id && (
              <Button fullWidth onClick={handleWatchTrailer}>
                Watch trailer
              </Button>
            )}
            <Button variant="outlined" fullWidth>
              More info
            </Button>
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AnimeCard;
