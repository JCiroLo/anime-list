import { FC, useState } from "react";
import { useQuery } from "@apollo/client";
import { Container, Stack } from "@mui/material";

import { AnimeCard, Grid, Hero, Loader, Text } from "@/components";
import { LAYOUT } from "@/constants";
import { AnimeQueries } from "@/queries";

import { type TAnime } from "@/types/Anime";

const Home: FC = () => {
  const [animes, setAnimes] = useState({
    nextSeason: [] as TAnime[],
    popular: [] as TAnime[],
    season: [] as TAnime[],
    top: [] as TAnime[],
    trending: [] as TAnime[],
  });

  const response = useQuery(AnimeQueries.summary.query, {
    variables: AnimeQueries.summary.variables,
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
        <Container sx={{ position: "relative", zIndex: 10, mt: -4 }}>
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Text variant="h3" fontSize="1.25em" fontWeight={700}>
                Popular this season
              </Text>
              <Grid cols={LAYOUT.grid.columns}>
                {animes.season.map((anime, index) => (
                  <AnimeCard key={anime.id} anime={anime} flyoutWidth={8 * 36} props={{ flyout: { zIndex: 20 + index } }} />
                ))}
              </Grid>
            </Stack>
            <Stack spacing={2}>
              <Text variant="h3" fontSize="1.25em" fontWeight={700}>
                Upcoming next season
              </Text>
              <Grid cols={LAYOUT.grid.columns}>
                {animes.nextSeason.map((anime, index) => (
                  <AnimeCard key={anime.id} anime={anime} flyoutWidth={8 * 36} props={{ flyout: { zIndex: 20 + index } }} />
                ))}
              </Grid>
            </Stack>
            <Stack spacing={2}>
              <Text variant="h3" fontSize="1.25em" fontWeight={700}>
                Top 10 anime
              </Text>
              <Grid cols={LAYOUT.grid.columns}>
                {animes.top.map((anime, index) => (
                  <AnimeCard key={anime.id} anime={anime} flyoutWidth={8 * 36} props={{ flyout: { zIndex: 20 + index } }} />
                ))}
              </Grid>
            </Stack>
            <Stack spacing={2}>
              <Text variant="h3" fontSize="1.25em" fontWeight={700}>
                All time popular
              </Text>
              <Grid cols={LAYOUT.grid.columns}>
                {animes.popular.map((anime, index) => (
                  <AnimeCard key={anime.id} anime={anime} flyoutWidth={8 * 36} props={{ flyout: { zIndex: 20 + index } }} />
                ))}
              </Grid>
            </Stack>
          </Stack>
        </Container>
      </>
    </>
  );
};

export default Home;
