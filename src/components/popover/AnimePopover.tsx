import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Collapse, IconButton, Stack, Tooltip } from "@mui/material";

import { Grid, Image, ListSelectorDialog, Tag, Text, TrailerDialog } from "@/components";
import { ChevronDownIcon, EyeFilledIcon, EyeIcon, HeartFilledIcon, HeartIcon, PlusIcon, TVFilledIcon, TVIcon } from "@/icons";
import { useLists } from "@/stores";
import { useDialog, useViewTransition } from "@/hooks";
import { Route } from "@/utils";

import type { TAnime } from "@/types/Anime";
import type { TListSlug } from "@/types/List";

type TAnimePopoverProps = {
  anime: TAnime;
  mounted: boolean;
};

const AnimePopover: FC<TAnimePopoverProps> = ({ anime, mounted }) => {
  const dialog = useDialog();
  const navigate = useNavigate();
  const viewTransition = useViewTransition();
  const { isAnimeInList, addAnimeToList, removeAnimeFromList } = useLists();

  const [moreDetails, setMoreDetails] = useState(false);

  const isAnimeIn: Record<TListSlug, boolean> = {
    "watched-list": isAnimeInList("watched-list", anime),
    watchlist: isAnimeInList("watchlist", anime),
    favorites: isAnimeInList("favorites", anime),
  };

  const handleWatchTrailer = () => {
    dialog.open(<TrailerDialog trailer={anime.trailer} />, { dialog: TrailerDialog.defaultDialogProps() });
  };

  const handleViewDetails = () => {
    viewTransition(() => navigate(Route.to("anime", anime.id)));
  };

  const handleSelectList = (slug: TListSlug) => {
    if (isAnimeIn[slug]) {
      removeAnimeFromList(slug, anime);
    } else {
      addAnimeToList(slug, anime);
    }
  };

  const handleAddAnimeToList = (slug?: TListSlug) => {
    if (!slug) {
      dialog.open(<ListSelectorDialog anime={anime} onSelect={handleSelectList} />, { dialog: ListSelectorDialog.defaultDialogProps() });
      return;
    }

    handleSelectList(slug);
  };

  const handleToggleMoreDetails = () => {
    setMoreDetails((prev) => !prev);
  };

  return mounted ? (
    <>
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
          <Text variant="h3" fontSize="1.25em" fontWeight={600}>
            {anime.title.userPreferred}
          </Text>
          {anime.title.native && <Text variant="caption">{anime.title.native}</Text>}
        </Stack>
        <Stack direction="row" spacing={1}>
          <Tooltip title={isAnimeIn["watched-list"] ? "Remove from Watched list" : "Add to Watched list"} arrow>
            <IconButton onClick={() => handleAddAnimeToList("watched-list")}>
              {isAnimeIn["watched-list"] ? <EyeFilledIcon color="accent" /> : <EyeIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title={isAnimeIn["watchlist"] ? "Remove from Watchlist" : "Add to Watchlist"} arrow>
            <IconButton onClick={() => handleAddAnimeToList("watchlist")}>
              {isAnimeIn["watchlist"] ? <TVFilledIcon color="accent" /> : <TVIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title={isAnimeIn["favorites"] ? "Remove from Favorites" : "Add to Favorites"} arrow>
            <IconButton onClick={() => handleAddAnimeToList("favorites")}>
              {isAnimeIn["favorites"] ? <HeartFilledIcon color="accent" /> : <HeartIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Add to list" arrow>
            <IconButton onClick={() => handleAddAnimeToList()}>
              <PlusIcon />
            </IconButton>
          </Tooltip>
          <Box flexGrow={1} />
          <Tooltip title={moreDetails ? "Hide details" : "Show details"} arrow>
            <IconButton onClick={handleToggleMoreDetails}>
              <Box
                display="flex"
                sx={{ transform: moreDetails ? "rotate(180deg)" : undefined, transition: (t) => t.transitions.create(["transform"]) }}
              >
                <ChevronDownIcon />
              </Box>
            </IconButton>
          </Tooltip>
        </Stack>
        <Collapse in={moreDetails}>
          <Stack spacing={2}>
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
              <Button variant="outlined" fullWidth onClick={handleViewDetails}>
                More info
              </Button>
            </Grid>
          </Stack>
        </Collapse>
      </Stack>
    </>
  ) : (
    <>
      <Box width="100%" sx={{ aspect: 16 / 9 }} />
      <Stack spacing={2} p={2}>
        <Box height={8 * 32} />
      </Stack>
    </>
  );
};

export default AnimePopover;
