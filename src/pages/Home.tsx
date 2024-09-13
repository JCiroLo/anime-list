import { FC, useState } from "react";
import { useQuery } from "@apollo/client";
import { Container, Stack } from "@mui/material";

import { AnimeCard, Grid, Hero, Loader, Text, TrailerDialog } from "@/components";
import { LAYOUT } from "@/constants";
import { AnimeQueries } from "@/queries";

import type { TAnimeTrailer, TAnime } from "@/types/Anime";

const Home: FC = () => {
  const [animes, setAnimes] = useState({
    nextSeason: [] as TAnime[],
    popular: [] as TAnime[],
    season: [] as TAnime[],
    top: [] as TAnime[],
    trending: [] as TAnime[],
  });
  const [trailer, setTrailer] = useState({
    data: null as TAnimeTrailer | null,
    origin: null as string | null,
  });

  const response = useQuery(AnimeQueries.summary.query, {
    variables: AnimeQueries.summary.variables,
    onCompleted: (data) => setAnimes(AnimeQueries.summary.transform(data)),
  });

  const handleWatchTrailer = (trailer: TAnimeTrailer, origin: string) => {
    if (origin === LAYOUT.hero.disabledTrailerAnimationTag) {
      setTrailer({ data: trailer, origin });
      return;
    }

    setTrailer({ data: trailer, origin });
  };

  const handleCloseTrailer = () => {
    setTrailer({ data: null, origin: null });
  };

  if (response.error) {
    return <div>{response.error.message}</div>;
  }

  return (
    <>
      <Loader show={response.loading} />
      <>
        <Hero slides={animes.trending} currentTrailer={trailer.data} onWatchTrailer={handleWatchTrailer} />
        <Container sx={{ position: "relative", zIndex: 10, mt: -4 }}>
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Text variant="h3" fontSize="1.25em" fontWeight={700}>
                Popular this season
              </Text>
              <Grid cols={LAYOUT.grid.columns}>
                {animes.season.map((anime, index) => (
                  <AnimeCard
                    key={anime.id}
                    anime={anime}
                    origin="popular-this-season"
                    flyoutWidth={8 * 36}
                    props={{ flyout: { zIndex: 20 + index } }}
                    onWatchTrailer={handleWatchTrailer}
                  />
                ))}
              </Grid>
            </Stack>
            <Stack spacing={2}>
              <Text variant="h3" fontSize="1.25em" fontWeight={700}>
                Upcoming next season
              </Text>
              <Grid cols={LAYOUT.grid.columns}>
                {animes.nextSeason.map((anime, index) => (
                  <AnimeCard
                    key={anime.id}
                    anime={anime}
                    origin="upcoming-next-season"
                    flyoutWidth={8 * 36}
                    props={{ flyout: { zIndex: 20 + index } }}
                    onWatchTrailer={handleWatchTrailer}
                  />
                ))}
              </Grid>
            </Stack>
            <Stack spacing={2}>
              <Text variant="h3" fontSize="1.25em" fontWeight={700}>
                Top 10 anime
              </Text>
              <Grid cols={LAYOUT.grid.columns}>
                {animes.top.map((anime, index) => (
                  <AnimeCard
                    key={anime.id}
                    anime={anime}
                    origin="top-10-anime"
                    flyoutWidth={8 * 36}
                    props={{ flyout: { zIndex: 20 + index } }}
                    onWatchTrailer={handleWatchTrailer}
                  />
                ))}
              </Grid>
            </Stack>
            <Stack spacing={2}>
              <Text variant="h3" fontSize="1.25em" fontWeight={700}>
                All time popular
              </Text>
              <Grid cols={LAYOUT.grid.columns}>
                {animes.popular.map((anime, index) => (
                  <AnimeCard
                    key={anime.id}
                    anime={anime}
                    origin="all-time-popular"
                    flyoutWidth={8 * 36}
                    props={{ flyout: { zIndex: 20 + index } }}
                    onWatchTrailer={handleWatchTrailer}
                  />
                ))}
              </Grid>
            </Stack>
          </Stack>
        </Container>
        <TrailerDialog trailer={trailer.data} origin={trailer.origin} onClose={handleCloseTrailer} />
      </>
    </>
  );
};

export default Home;
