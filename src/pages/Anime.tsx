import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Button, Chip, Stack, useTheme } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import { AnimeBanner, AnimeData, Image, PageWrapper, Text, TrailerDialog } from "@/components";
import { MovieIcon, PlusIcon } from "@/icons";
import { AnimeQueries } from "@/queries";
import { useDialog } from "@/hooks";
import { ANIME } from "@/constants";

import type { TAnime } from "@/types/Anime";

const LAYOUT = {
  columns: {
    gap: 4,
  },
  content: {
    gap: 4,
    section: {
      gap: 2,
    },
    actions: {
      gap: 1,
    },
  },
};

const Anime: FC = () => {
  const { id } = useParams();
  const theme = useTheme();
  const dialog = useDialog();

  const [anime, setAnime] = useState<TAnime>(null!);

  useQuery(AnimeQueries.detail.query, {
    variables: {
      id,
      type: "ANIME",
      isAdult: false,
    },
    onCompleted: (data) => setAnime(AnimeQueries.detail.transform(data)),
  });

  const handleWatchTrailer = () => {
    dialog.open(<TrailerDialog trailer={anime.trailer} />, { dialog: TrailerDialog.defaultDialogProps() });
  };

  if (!anime) return null;

  return (
    <>
      <AnimeBanner anime={anime} hideContent />
      <PageWrapper topGutter={-8} keepHeaderSpacing={false}>
        <Stack direction={{ xs: "column", md: "row" }} alignItems="flex-start" spacing={LAYOUT.columns.gap}>
          <Stack
            spacing={LAYOUT.content.actions.gap}
            position="sticky"
            top={theme.sizes.header.realHeight}
            width={{ xs: "100%", md: "20%" }}
          >
            <Image
              src={anime.coverImage}
              alt="Anime cover image"
              width="100%"
              aspect={ANIME.coverImage.aspectRatio}
              borderRadius={2}
              blur
            />
            <Button size="small" startIcon={<PlusIcon />} onClick={() => {}}>
              Add to list
            </Button>
            {anime.trailer.id && (
              <Button size="small" variant="outlined" startIcon={<MovieIcon />} onClick={handleWatchTrailer}>
                Watch trailer
              </Button>
            )}
          </Stack>
          <Stack spacing={LAYOUT.content.gap} width={{ xs: "100%", md: "60%" }}>
            <Stack spacing={LAYOUT.content.section.gap}>
              <Text variant="h1">{anime.title.userPreferred}</Text>
              <Text.Rich html={anime.description || ""} />
            </Stack>
            {anime.genres?.length && (
              <Stack spacing={LAYOUT.content.section.gap}>
                <Stack direction="row" spacing={1}>
                  {anime.genres.map((genre) => (
                    <Chip key={genre} size="small" label={genre} sx={{ fontWeight: 400 }} onClick={() => {}} />
                  ))}
                </Stack>
              </Stack>
            )}
            {anime.characters?.length && (
              <Stack spacing={LAYOUT.content.section.gap}>
                <Text variant="h2">Characters</Text>
                <Swiper
                  speed={500}
                  slidesPerView={6}
                  spaceBetween={8}
                  pagination={{
                    dynamicBullets: true,
                  }}
                  modules={[Pagination]}
                  style={{ width: "100%", paddingBottom: 24 }}
                >
                  {anime.characters?.map((character) => (
                    <SwiperSlide key={character.id}>
                      <Image
                        key={character.id}
                        src={character.image.large}
                        alt={character?.name?.userPreferred || "Character"}
                        width="100%"
                        aspect={ANIME.coverImage.aspectRatio}
                        borderRadius={1}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Stack>
            )}
          </Stack>
          <AnimeData
            anime={anime}
            sx={{
              position: "sticky",
              top: theme.sizes.header.realHeight,
              width: { xs: "100%", md: "20%" },
              paddingX: 1,
            }}
          />
        </Stack>
      </PageWrapper>
    </>
  );
};

export default Anime;