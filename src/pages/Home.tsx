import { FC, useState } from "react";
import { useQuery } from "@apollo/client";
import { Stack } from "@mui/material";

import { AnimeCard, Grid, Hero, Loader, PageWrapper, Text, TrailerDialog } from "@/components";
import { LAYOUT } from "@/constants";
import { AnimeQueries } from "@/queries";

import type { TAnimeTrailer, TAnime } from "@/types/Anime";
import type { TQuerySummaryVariables } from "@/queries/AnimeQueries";

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
    variables: {
      type: "ANIME",
      season: "SUMMER",
      seasonYear: 2024,
      nextSeason: "FALL",
      nextYear: 2024,
    } as TQuerySummaryVariables,
    onCompleted: (data) => setAnimes(AnimeQueries.summary.transform(data)),
  });

  const handleWatchTrailer = (trailer: TAnimeTrailer, origin: string) => {
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
        <PageWrapper topGutter={-4} keepHeaderSpacing={false}>
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
        </PageWrapper>
        <TrailerDialog trailer={trailer.data} origin={trailer.origin} onClose={handleCloseTrailer} />
      </>
    </>
  );
};

export default Home;
