import { FC, useState } from "react";
import { Button, CircularProgress, Stack } from "@mui/material";
import { useQuery } from "@apollo/client";

import { AnimeCard, ErrorMessage, Grid, Hero, Loader, PageWrapper, Text } from "@/components";
import { MoodSadIcon } from "@/icons";
import { useInfiniteQuery } from "@/hooks";
import { LAYOUT } from "@/constants";
import { QueryBuilder } from "@/utils";

import type { TAnime } from "@/types/Anime";

type TAnimes = {
  nextSeason: TAnime[];
  popular: TAnime[];
  season: TAnime[];
  top: TAnime[];
  trending: TAnime[];
};

const QUERIES = {
  summary: QueryBuilder.anime.summary({
    type: "ANIME",
    season: "FALL",
    seasonYear: 2024,
    nextSeason: "WINTER",
    nextYear: 2024,
  }),
  season: QueryBuilder.anime.season({
    type: "ANIME",
    season: "FALL",
    seasonYear: 2024,
    perPage: 24,
  }),
};

const Home: FC = () => {
  const [animes, setAnimes] = useState<TAnimes>({
    nextSeason: [],
    popular: [],
    season: [],
    top: [],
    trending: [],
  });

  const [moreAnimes, setMoreAnimes] = useState<TAnime[]>([]);

  const [scrollObserver, { hasNextPage }] = useInfiniteQuery(QUERIES.season.query, {
    variables: QUERIES.season.variables,
    onRefetch: (data) => setMoreAnimes((prev) => [...prev, ...QUERIES.season.transform(data)]),
  });

  const response = useQuery(QUERIES.summary.query, {
    variables: QUERIES.summary.variables,
    onCompleted: (data) => setAnimes(QUERIES.summary.transform(data)),
  });

  return (
    <>
      <Loader show={response.loading} />

      {!response.loading && (
        <PageWrapper
          hero={response.error ? null : <Hero slides={animes.trending} />}
          content={
            response.error ? (
              <ErrorMessage
                icon={<MoodSadIcon sx={{ fontSize: 48 }} />}
                title="Something went wrong"
                subtitle="We could not load the page. Please try again later or contact us if the problem persists."
              >
                <Button component="a" href="mailto:contact-hikarime@gmail.com">
                  Contact us
                </Button>
              </ErrorMessage>
            ) : (
              <Stack spacing={4}>
                <Stack spacing={2}>
                  <Text variant="h3" fontSize="1.25em" fontWeight={700}>
                    Popular this season
                  </Text>
                  <Grid cols={LAYOUT.grid.columns}>
                    {animes.season.map((anime) => (
                      <AnimeCard key={anime.id} anime={anime} origin="popular-this-season" />
                    ))}
                  </Grid>
                </Stack>
                <Stack spacing={2}>
                  <Text variant="h3" fontSize="1.25em" fontWeight={700}>
                    Upcoming next season
                  </Text>
                  <Grid cols={LAYOUT.grid.columns}>
                    {animes.nextSeason.map((anime) => (
                      <AnimeCard key={anime.id} anime={anime} origin="upcoming-next-season" />
                    ))}
                  </Grid>
                </Stack>
                <Stack spacing={2}>
                  <Text variant="h3" fontSize="1.25em" fontWeight={700}>
                    Top 10 anime
                  </Text>
                  <Grid cols={LAYOUT.grid.columns}>
                    {animes.top.map((anime) => (
                      <AnimeCard key={anime.id} anime={anime} origin="top-10-anime" />
                    ))}
                  </Grid>
                </Stack>
                <Stack spacing={2}>
                  <Text variant="h3" fontSize="1.25em" fontWeight={700}>
                    All time popular
                  </Text>
                  <Grid cols={LAYOUT.grid.columns}>
                    {animes.popular.map((anime) => (
                      <AnimeCard key={anime.id} anime={anime} origin="all-time-popular" />
                    ))}
                  </Grid>
                </Stack>
                <Stack spacing={2}>
                  <Text variant="h3" fontSize="1.25em" fontWeight={700}>
                    More anime
                  </Text>
                  <Grid cols={LAYOUT.grid.columns}>
                    {moreAnimes.map((anime, index) => (
                      <AnimeCard key={anime.id + index} anime={anime} origin="all-time-popular" />
                    ))}
                  </Grid>
                </Stack>
                {hasNextPage && <CircularProgress ref={scrollObserver.ref} sx={{ alignSelf: "center" }} />}
              </Stack>
            )
          }
          separation={-2}
          headerGutter={Boolean(response.error)}
        />
      )}
    </>
  );
};

export default Home;
