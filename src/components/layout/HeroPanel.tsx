import { FC, useMemo } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

import { Image, Overlay } from "@/components";
import { InfoCircleIcon, MovieIcon } from "@/icons";

import { type TAnime } from "@/types/Anime";

type HeroPanelProps = FC<{
  anime: TAnime;
}>;

const HeroPanel: HeroPanelProps = ({ anime }) => {
  const title = useMemo(() => anime.getTitle(), [anime]);

  return (
    <Stack position="relative" width="100vw">
      <Overlay />
      <Overlay.Gradient color={(theme) => theme.palette.background.default} degrees={0} />
      <Image src={anime?.coverImage.large} alt={title} width="100%" />
      <Box position="absolute" zIndex={10} width="100%" height="100%">
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            gap: 6,
            width: "100%",
            height: "100%",
            p: 2,
            pb: 8,
          }}
        >
          <Stack>
            <Typography variant="h2" fontSize="2.5em" fontWeight={700}>
              {title}
            </Typography>
            <Typography>{anime?.titles.ja_jp}</Typography>
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
