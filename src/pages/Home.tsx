import { FC, useState } from "react";
import { Button, CircularProgress, Stack } from "@mui/material";
import { useQuery } from "@apollo/client";

import { AnimeCard, ErrorMessage, Grid, Hero, Loader, PageWrapper, Text } from "@/components";
import { MoodSadIcon } from "@/icons";
import { useInfiniteQuery, useStorage } from "@/hooks";
import { LAYOUT } from "@/constants";
import { DateUtils, QueryBuilder } from "@/utils";

import type { TAnime } from "@/types/Anime";

type TAnimes = {
  nextSeason: TAnime[];
  popular: TAnime[];
  season: TAnime[];
  top: TAnime[];
  trending: TAnime[];
};

const SEASON = DateUtils.season();

const QUERIES = {
  summary: QueryBuilder.anime.summary({
    type: "ANIME",
    season: SEASON.current.value,
    seasonYear: SEASON.current.year,
    nextSeason: SEASON.next.value,
    nextYear: SEASON.next.year,
  }),
  season: QueryBuilder.anime.season({
    type: "ANIME",
    season: SEASON.current.value,
    seasonYear: SEASON.current.year,
    perPage: 24,
  }),
};

const Home: FC = () => {
  const [animes, setAnimes] = useState<TAnimes>({
    nextSeason: [],
    trending: [],
    popular: [],
    season: [],
    top: [],
  });
  const [moreAnimes, setMoreAnimes] = useState<TAnime[]>([]);

  const [scrollObserver, { hasNextPage }] = useInfiniteQuery(QUERIES.season.query, {
    initialPage: 2,
    variables: QUERIES.season.variables,
    onRefetch: (data) => setMoreAnimes((prev) => [...prev, ...QUERIES.season.transform(data)]),
  });

  const response = useQuery(QUERIES.summary.query, {
    variables: QUERIES.summary.variables,
    onCompleted: (data) => setAnimes(QUERIES.summary.transform(data)),
  });

  const [isFirstLoad, setIsFirstLoad] = useStorage("first-load", true, sessionStorage);

  const handleLoaderClose = () => {
    setIsFirstLoad(false);
  };

  return (
    <>
      <Loader delay={isFirstLoad ? 2500 : 0} show={response.loading} displayText={isFirstLoad} onClose={handleLoaderClose} />

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
                  <Grid cols={LAYOUT.grid.columns.six}>
                    {animes.season.map((anime) => (
                      <AnimeCard key={anime.id} anime={anime} origin="popular-this-season" />
                    ))}
                  </Grid>
                </Stack>
                <Stack spacing={2}>
                  <Text variant="h3" fontSize="1.25em" fontWeight={700}>
                    Upcoming next season
                  </Text>
                  <Grid cols={LAYOUT.grid.columns.six}>
                    {animes.nextSeason.map((anime) => (
                      <AnimeCard key={anime.id} anime={anime} origin="upcoming-next-season" />
                    ))}
                  </Grid>
                </Stack>
                <Stack spacing={2}>
                  <Text variant="h3" fontSize="1.25em" fontWeight={700}>
                    Top 10 anime
                  </Text>
                  <Grid cols={LAYOUT.grid.columns.five}>
                    {animes.top.map((anime, index) => (
                      <AnimeCard
                        key={anime.id}
                        anime={anime}
                        index={index + 1}
                        props={{ layout: LAYOUT.grid.columns.five }}
                        origin="top-10-anime"
                      />
                    ))}
                  </Grid>
                </Stack>
                <Stack spacing={2}>
                  <Text variant="h3" fontSize="1.25em" fontWeight={700}>
                    All time popular
                  </Text>
                  <Grid cols={LAYOUT.grid.columns.six}>
                    {animes.popular.map((anime) => (
                      <AnimeCard key={anime.id} anime={anime} origin="all-time-popular" />
                    ))}
                  </Grid>
                </Stack>
                <Stack spacing={2}>
                  <Text variant="h3" fontSize="1.25em" fontWeight={700}>
                    More anime
                  </Text>
                  <Grid cols={LAYOUT.grid.columns.six}>
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
