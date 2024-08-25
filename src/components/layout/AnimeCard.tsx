import { FC, useMemo } from "react";
import { Box, Button, IconButton, Stack, Tooltip, Typography, type BoxProps } from "@mui/material";

import { Grid, Image } from "@/components";
import { EyeIcon, PlusIcon } from "@/icons";

import { type TAnime } from "@/types/Anime";

type TAnimeCardProps = {
  width: number | string | Record<string, string>;
};
type TAnimeCard = FC<{
  anime: TAnime;
  props?: {
    container?: BoxProps;
    card?: BoxProps & TAnimeCardProps;
  };
}>;

const AnimeCard: TAnimeCard = ({ anime, props }) => {
  const title = useMemo(() => anime.getTitle(), [anime]);

  return (
    <Box
      position="relative"
      sx={{
        "&:hover > .anime-card__content": {
          visibility: "visible",
          opacity: 1,
          scale: 1,
        },
      }}
      {...props?.container}
    >
      <Image src={anime.posterImage.large} alt={title} width="100%" borderRadius={0.5} />

      <Stack
        className="anime-card__content"
        position="absolute"
        zIndex={20}
        left="50%"
        top="50%"
        width={props?.card?.width}
        borderRadius={2}
        overflow="hidden"
        bgcolor={(t) => t.palette.background.paper}
        sx={{
          backdropFilter: "blur(8px) saturate(1.5)",
          visibility: "hidden",
          opacity: 0,
          scale: 0.75,
          transform: "translate(-50%, -50%)",
          transformOrigin: "-12.5% -12.5%",
          transition: (t) => t.transitions.create(["visibility", "opacity", "scale"]),
        }}
      >
        <Image src={anime.coverImage.original} alt={title} aspect={16 / 9} width="100%" />
        <Stack spacing={2} p={2}>
          <Typography variant="h3" fontSize="1.25em" fontWeight={600}>
            {title}
            &nbsp;
            <Typography variant="caption">({anime.titles.ja_jp})</Typography>
          </Typography>
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
            <Typography fontWeight={600}>Synopsis:</Typography>
            <Typography sx={{ display: "-webkit-box", overflow: "hidden", WebkitBoxOrient: "vertical", WebkitLineClamp: 4 }}>
              {anime.synopsis}
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
