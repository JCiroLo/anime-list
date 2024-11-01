import { FC, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Button, ButtonBase, Chip, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import {
  AnimeBanner,
  AnimeData,
  CharacterDialog,
  ErrorMessage,
  Image,
  ListSelectorDialog,
  Loader,
  PageWrapper,
  Text,
  TrailerDialog,
} from "@/components";
import { GhostIcon, MovieIcon, PlusIcon } from "@/icons";
import { useBreakpoints, useDialog } from "@/hooks";
import { useLists } from "@/stores";
import { ANIME } from "@/constants";
import { QueryBuilder, Route } from "@/utils";

import type { TAnime, TAnimeCharacter } from "@/types/Anime";
import type { TListSlug } from "@/types/List";

const LAYOUT = {
  gap: 4,
  sizes: [
    { xs: "100%", md: "30%", lg: "20%" },
    { xs: "100%", md: "50%", lg: "60%" },
    { xs: "100%", md: "20%", lg: "20%" },
  ],
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
  const dialog = useDialog();
  const { addAnimeToList } = useLists();
  const { isTabletOrBelow } = useBreakpoints();

  const [anime, setAnime] = useState<TAnime | null>(null);

  const QUERIES = {
    detail: QueryBuilder.anime.detail({
      id: id || "",
      type: "ANIME",
    }),
  };

  const response = useQuery(QUERIES.detail.query, {
    variables: QUERIES.detail.variables,
    onCompleted: (data) => setAnime(QUERIES.detail.transform(data)),
  });

  const handleSelectList = (slug: TListSlug) => {
    addAnimeToList(slug, anime!);
  };

  const handleAddToList = () => {
    dialog.open(<ListSelectorDialog anime={anime!} onSelect={handleSelectList} />, { dialog: ListSelectorDialog.defaultDialogProps() });
  };

  const handleWatchTrailer = () => {
    dialog.open(<TrailerDialog trailer={anime!.trailer} />, { dialog: TrailerDialog.defaultDialogProps() });
  };

  const handleCharacterClick = (character: TAnimeCharacter) => {
    dialog.open(<CharacterDialog character={character} />, { dialog: CharacterDialog.defaultDialogProps() });
  };

  const AnimeActionsColumn = anime ? (
    <Stack spacing={LAYOUT.content.actions.gap} position={{ xs: "static", md: "sticky" }} top={16} width={LAYOUT.sizes[0]}>
      {!isTabletOrBelow && (
        <Image src={anime.coverImage} alt="Anime cover image" width="100%" aspect={ANIME.coverImage.aspectRatio} borderRadius={2} blur />
      )}
      <Button size="small" startIcon={<PlusIcon />} onClick={handleAddToList}>
        Add to list
      </Button>
      {anime.trailer.id && (
        <Button size="small" variant="outlined" startIcon={<MovieIcon />} onClick={handleWatchTrailer}>
          Watch trailer
        </Button>
      )}
    </Stack>
  ) : null;

  const AnimeDataColumn = anime ? (
    <AnimeData
      anime={anime}
      sx={{
        position: "sticky",
        top: 16,
        width: LAYOUT.sizes[2],
        paddingX: 1,
      }}
    />
  ) : null;

  return (
    <>
      <Loader show={response.loading} />

      {!response.loading && (
        <PageWrapper
          hero={anime ? <AnimeBanner anime={anime} animated hideContent /> : null}
          content={
            !anime ? (
              <ErrorMessage
                icon={<GhostIcon sx={{ fontSize: 48 }} />}
                title="There's nothing here."
                subtitle="We could not find the anime you were looking for. Please try again using another search. "
              >
                <Button component={RouterLink} to={Route.to()}>
                  Explore animes
                </Button>
              </ErrorMessage>
            ) : (
              <Stack direction={{ xs: "column", md: "row" }} alignItems="flex-start" spacing={LAYOUT.gap}>
                {!isTabletOrBelow ? AnimeActionsColumn : null}
                <Stack spacing={LAYOUT.content.gap} width={LAYOUT.sizes[1]}>
                  <Stack spacing={LAYOUT.content.section.gap}>
                    <Stack direction="row" spacing={1} alignItems="flex-end" justifyContent="space-between">
                      <Text variant="h1" fontSize={{ xs: "1.5em", md: "2.5em" }}>
                        {anime.title.userPreferred}
                      </Text>
                      {isTabletOrBelow && (
                        <Image
                          src={anime.coverImage}
                          alt="Anime cover image"
                          width={12}
                          aspect={ANIME.coverImage.aspectRatio}
                          borderRadius={1}
                        />
                      )}
                    </Stack>
                    <Text.Rich html={anime.description || ""} />
                  </Stack>
                  {anime.genres?.length && (
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {anime.genres.map((genre) => (
                        <Chip key={genre} size="small" label={genre} sx={{ fontWeight: 400 }} onClick={() => {}} />
                      ))}
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
                            <ButtonBase focusRipple onClick={() => handleCharacterClick(character)}>
                              <Image
                                key={character.id}
                                src={character.image.large}
                                alt={character?.name?.userPreferred || "Character"}
                                width="100%"
                                aspect={ANIME.coverImage.aspectRatio}
                                borderRadius={1}
                              />
                            </ButtonBase>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </Stack>
                  )}
                </Stack>
                {AnimeDataColumn}
              </Stack>
            )
          }
          headerGutter={!anime}
          separation={!anime ? 0 : isTabletOrBelow ? -14 : -8}
        />
      )}
    </>
  );
};

export default Anime;
