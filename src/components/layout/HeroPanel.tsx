import { FC } from "react";
import { Box, Button, Container, Stack, useTheme } from "@mui/material";

import { Image, Overlay, Text } from "@/components";
import { InfoCircleIcon, MovieIcon } from "@/icons";

import { type TAnime } from "@/types/Anime";

type HeroPanelProps = FC<{
  anime: TAnime;
}>;

const HeroPanel: HeroPanelProps = ({ anime }) => {
  const theme = useTheme();

  return (
    <Stack position="relative">
      <Overlay top={0} left={0} />
      <Overlay.Gradient top={0} left={0} color={theme.palette.background.default} degrees={0} />
      <Image
        src={anime.bannerImage || anime.coverImage.extraLarge || anime.coverImage.large}
        alt={anime.title.userPreferred}
        width="100%"
        height={theme.sizes.hero.height}
      />
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
            <Text variant="h2" fontSize="2.5em" fontWeight={700} maxLines={2}>
              {anime.title.userPreferred}
            </Text>
            {anime.title.native && <Text>{anime.title.native}</Text>}
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button startIcon={<MovieIcon />}>Watch trailer</Button>
            <Button variant="outlined" startIcon={<InfoCircleIcon />}>
              More information
            </Button>
          </Stack>
        </Container>
      </Box>
    </Stack>
  );
};

export default HeroPanel;
