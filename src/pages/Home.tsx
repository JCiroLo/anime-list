import { FC, useState } from "react";
import { useQuery } from "@apollo/client";
import { Stack } from "@mui/material";

import { AnimeCard, Grid, Hero, Loader, PageWrapper, Text } from "@/components";
import { LAYOUT } from "@/constants";
import { AnimeQueries } from "@/queries";

import type { TAnime } from "@/types/Anime";
import type { TQuerySummaryVariables } from "@/queries/AnimeQueries";

const Home: FC = () => {
  const [animes, setAnimes] = useState({
    nextSeason: [] as TAnime[],
    popular: [] as TAnime[],
    season: [] as TAnime[],
    top: [] as TAnime[],
    trending: [] as TAnime[],
  });

  const response = useQuery(AnimeQueries.summary.query, {
    variables: {
      type: "ANIME",
      season: "SUMMER",
      seasonYear: 2024,
      nextSeason: "FALL",
      nextYear: 2024,
    } as TQuerySummaryVariables,
    onCompleted: (data) => setAnimes(AnimeQueries.summary.transform(data)),
  });

  if (response.error) {
    return <div>{response.error.message}</div>;
  }

  return (
    <>
      <Loader show={response.loading} />
      <>
        <Hero slides={animes.trending} />
        <PageWrapper topGutter={-4} keepHeaderSpacing={false}>
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
          </Stack>
        </PageWrapper>
      </>
    </>
  );
};

export default Home;
