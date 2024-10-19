import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Container, Stack, useTheme } from "@mui/material";

import { Image, Overlay, Text, TrailerDialog } from "@/components";
import { InfoCircleIcon, MovieIcon } from "@/icons";
import { useDialog } from "@/hooks";
import { Route } from "@/utils";

import type { TAnime } from "@/types/Anime";

type HeroPanelProps = {
  anime: TAnime;
  hideContent?: boolean;
  viewTransitionName?: string;
};

const HeroPanel: FC<HeroPanelProps> = ({ anime, viewTransitionName, hideContent }) => {
  const theme = useTheme();
  const dialog = useDialog();

  const handleWatchTrailer = () => {
    dialog.open(<TrailerDialog trailer={anime.trailer} />, { dialog: TrailerDialog.defaultDialogProps() });
  };

  return (
    <Stack position="relative">
      <Overlay top={0} left={0} />
      <Overlay.Gradient top={0} left={0} color={theme.palette.background.default} degrees={0} />
      <Image
        src={anime.bannerImage || anime.coverImage.extraLarge || anime.coverImage.large}
        alt={anime.title.userPreferred}
        width="100%"
        height={theme.sizes.hero.height}
        viewTransitionName={viewTransitionName}
      />
      {!hideContent && (
        <Box position="absolute" zIndex={10} width="100%" height="100%">
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: 4,
              width: "100%",
              height: "100%",
              p: 2,
              pb: 8,
            }}
          >
            <Stack>
              <Text variant="h2" fontSize="2.5em" fontWeight={700} maxLines={2} sx={{ textWrap: "balance" }}>
                {anime.title.userPreferred}
              </Text>
              {anime.title.english && <Text mt={1}>{anime.title.english}</Text>}
            </Stack>

            <Stack direction="row" spacing={1}>
              {anime.trailer.id && (
                <Button startIcon={<MovieIcon />} onClick={handleWatchTrailer}>
                  Watch trailer
                </Button>
              )}
              <Button component={RouterLink} to={Route.to("anime", anime.id)} variant="outlined" startIcon={<InfoCircleIcon />}>
                More information
              </Button>
            </Stack>
          </Container>
        </Box>
      )}
    </Stack>
  );
};

export default HeroPanel;
