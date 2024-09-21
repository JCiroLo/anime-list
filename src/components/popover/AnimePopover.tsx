import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, IconButton, Stack, Tooltip } from "@mui/material";

import { Grid, Image, Tag, Text, TrailerDialog } from "@/components";
import { EyeIcon, PlusIcon } from "@/icons";
import { useDialog } from "@/hooks";
import { Route } from "@/utils";

import type { TAnime } from "@/types/Anime";

type TAnimePopover = FC<{
  anime: TAnime;
}>;

const AnimePopover: TAnimePopover = ({ anime }) => {
  const dialog = useDialog();

  const handleWatchTrailer = () => {
    dialog.open(<TrailerDialog trailer={anime.trailer} />, { dialog: TrailerDialog.defaultDialogProps() });
  };

  return (
    <>
      <Stack position="relative">
        <Image src={anime.bannerImage || anime.coverImage.large} alt={anime.title.userPreferred} aspect={16 / 9} width="100%" preload />
        <Stack position="absolute" direction="row" flexWrap="wrap-reverse" spacing={0.5} bottom={4} left={4}>
          {anime.genres?.map((genre) => (
            <Tag key={genre} label={genre} />
          ))}
        </Stack>
      </Stack>
      <Stack spacing={2} p={2}>
        <Stack>
          <Text variant="h3" fontSize="1.25em" fontWeight={600}>
            {anime.title.userPreferred}
          </Text>
          {anime.title.native && <Text variant="caption">{anime.title.native}</Text>}
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
          <Text fontWeight={700}>Description:</Text>
          <Text.Rich
            html={anime.description || "No description available"}
            variant="body2"
            fontWeight={300}
            sx={{ display: "-webkit-box", overflow: "hidden", WebkitBoxOrient: "vertical", WebkitLineClamp: 4 }}
          />
        </Stack>
        <Grid cols={anime.trailer.id ? 2 : 1} gap={1}>
          {anime.trailer.id && (
            <Button fullWidth onClick={handleWatchTrailer}>
              Watch trailer
            </Button>
          )}
          <Button component={RouterLink} to={Route.to("anime", anime.id)} variant="outlined" fullWidth>
            More info
          </Button>
        </Grid>
      </Stack>
    </>
  );
};

export default AnimePopover;
