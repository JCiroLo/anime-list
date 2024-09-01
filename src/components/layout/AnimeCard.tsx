import { FC } from "react";
import { alpha, Box, type Breakpoint, Button, IconButton, Stack, type StackProps, Tooltip, Typography, type BoxProps } from "@mui/material";

import { Grid, Image } from "@/components";
import { EyeIcon, PlusIcon } from "@/icons";
import { LAYOUT } from "@/constants";

import { type TAnime } from "@/types/Anime";

type TAnimeCard = FC<{
  anime: TAnime;
  flyoutWidth: number;
  props?: {
    container?: BoxProps;
    flyout?: StackProps;
  };
}>;

const AnimeCard: TAnimeCard = ({ anime, flyoutWidth, props }) => {
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
      <Image src={anime.coverImage?.large} alt={anime.title.userPreferred} width="100%" borderRadius={0.5} />

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
          viewTransitionName: `anime-card-${anime.id}`,
          visibility: "hidden",
          opacity: 0,
          scale: 0.4,
          transform: "translate(-50%, -50%)",
          transformOrigin: "0 0",
          transition: (t) => t.transitions.create(["visibility", "opacity", "scale"], { delay: 0 }),
        }}
      >
        <Image src={anime.bannerImage || anime.coverImage.large} alt={anime.title.userPreferred} aspect={16 / 9} width="100%" />
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
          <Grid cols={2} gap={1}>
            <Button fullWidth>Watch trailer</Button>
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
