import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Container, Stack, useTheme } from "@mui/material";

import { Image, Overlay, Text, TrailerDialog } from "@/components";
import { InfoCircleIcon, MovieIcon } from "@/icons";
import { useBreakpoints, useDialog } from "@/hooks";
import { Route } from "@/utils";

import type { TAnime } from "@/types/Anime";

type HeroPanelProps = {
  anime: TAnime;
  hideContent?: boolean;
  viewTransitionName?: string;
  animated?: boolean;
};

const HeroPanel: FC<HeroPanelProps> = ({ anime, viewTransitionName, hideContent, animated }) => {
  const theme = useTheme();
  const dialog = useDialog();
  const { isLaptop, isDesktop, isWide, isUltraWide } = useBreakpoints();

  const bannerAnimationDuration = isUltraWide ? 15 : isWide ? 15 : isDesktop ? 20 : isLaptop ? 30 : 40;

  const handleWatchTrailer = () => {
    dialog.open(<TrailerDialog trailer={anime.trailer} />, { dialog: TrailerDialog.defaultDialogProps() });
  };

  return (
    <Stack position="relative">
      <Overlay top={0} left={0} />
      <Overlay.Gradient top={0} left={0} colors={[{ color: theme.palette.background.default }, { color: "transparent" }]} degrees={0} />
      <Image
        src={anime.bannerImage || anime.coverImage.extraLarge || anime.coverImage.large}
        alt={anime.title.userPreferred}
        width="100%"
        height={isUltraWide ? theme.sizes.hero.height * 1.25 : theme.sizes.hero.height}
        viewTransitionName={viewTransitionName}
        animation={
          animated
            ? {
                name: "image-preview",
                property: `image-preview ${bannerAnimationDuration}s linear infinite`,
                keyframes: {
                  "0%": {
                    objectPosition: "0% 0%",
                    opacity: 0,
                  },
                  "3%": {
                    opacity: 1,
                  },
                  "97%": {
                    opacity: 1,
                  },
                  "100%": {
                    objectPosition: "100% 0%",
                    opacity: 0,
                  },
                },
              }
            : undefined
        }
      />
      {!hideContent && (
        <Box position="absolute" zIndex={10} width="100%" height="100%">
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: { xs: 2, md: 4 },
              width: "100%",
              height: "100%",
              padding: 2,
              paddingBottom: 8,
            }}
          >
            <Stack>
              <Text variant="h2" fontSize={{ xs: "1.75em", md: "2.5em" }} fontWeight={700} maxLines={2} sx={{ textWrap: "balance" }}>
                {anime.title.userPreferred}
              </Text>
              {anime.title.english && <Text mt={1}>{anime.title.english}</Text>}
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
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
